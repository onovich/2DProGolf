import { CLUBS, CONSTANTS, COURSE_CONFIG, TERRAIN } from '../../data/constants';
import { CITY_CONTENT } from '../../data/content/city';
import { COMPETITION_CONTENT } from '../../data/content/competition';
import { PROLOGUE_EVENTS } from '../../data/content/prologue';
import { TUTORIAL_HOLES } from '../../data/content/tutorial';
import { WORLD_MAP_CONTENT } from '../../data/content/worldMap';

const GAME_PHASES = {
  INTRO: 'intro',
  PLAYING: 'playing',
  SUMMARY: 'summary',
  CITY: 'city',
  WORLD_MAP: 'world-map',
};

class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  sub(v) {
    return new Vec2(this.x - v.x, this.y - v.y);
  }

  mult(n) {
    return new Vec2(this.x * n, this.y * n);
  }

  magSq() {
    return this.x * this.x + this.y * this.y;
  }

  mag() {
    return Math.sqrt(this.magSq());
  }

  normalize() {
    const magnitude = this.mag();
    return magnitude === 0 ? new Vec2(0, 0) : new Vec2(this.x / magnitude, this.y / magnitude);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  lerp(v, t) {
    return new Vec2(this.x + (v.x - this.x) * t, this.y + (v.y - this.y) * t);
  }
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function distPointToSegment(p, v, w) {
  const l2 = v.sub(w).magSq();
  if (l2 === 0) {
    return p.sub(v).mag();
  }
  const t = Math.max(0, Math.min(1, p.sub(v).dot(w.sub(v)) / l2));
  const projection = v.add(w.sub(v).mult(t));
  return p.sub(projection).mag();
}

function rotateVector(v, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return new Vec2(v.x * cos - v.y * sin, v.x * sin + v.y * cos);
}

function getRandomInRange(min, max, random = Math.random) {
  return min + random() * (max - min);
}

function createSeededRandom(seed) {
  let state = (seed >>> 0) || 1;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createRandomSeed() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}

function createSimplexNoise(seed = createRandomSeed()) {
  const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
  const random = createSeededRandom(seed);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i += 1) {
    p[i] = Math.floor(random() * 256);
  }
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i += 1) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
  const grad3 = new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]);

  return (xin, yin) => {
    let n0;
    let n1;
    let n2;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;

    let i1;
    let j1;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + 2.0 * G2;
    const y2 = y0 - 1.0 + 2.0 * G2;

    const ii = i & 255;
    const jj = j & 255;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 < 0) {
      n0 = 0.0;
    } else {
      t0 *= t0;
      const gi0 = permMod12[ii + perm[jj]] * 3;
      n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 < 0) {
      n1 = 0.0;
    } else {
      t1 *= t1;
      const gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
      n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 < 0) {
      n2 = 0.0;
    } else {
      t2 *= t2;
      const gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
      n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
    }

    return 70.0 * (n0 + n1 + n2);
  };
}

function fBm(noise2D, x, y, octaves = 3) {
  let value = 0;
  let amplitude = 1;
  let frequency = 0.003;
  let maxVal = 0;
  for (let i = 0; i < octaves; i += 1) {
    value += noise2D(x * frequency, y * frequency) * amplitude;
    maxVal += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value / maxVal;
}

export function initGame(options = {}) {
  const autoStart = options.autoStart !== false;
  const gameState = {
    hole: 1,
    strokes: 0,
    par: 4,
    phase: GAME_PHASES.PLAYING,
    status: 'aiming',
    camera: new Vec2(0, 0),
    wind: new Vec2(0, 0),
    startPos: new Vec2(0, 0),
    holePos: new Vec2(0, 0),
    bunkers: [],
    baseHoleHeight: 0,
    courseSeed: createRandomSeed(),
  };

  const ball = {
    pos: new Vec2(0, 0),
    vel: new Vec2(0, 0),
    z: 0,
    vz: 0,
    club: 'iron',
    lastSafePos: new Vec2(0, 0),
  };

  const input = {
    isAiming: false,
    isPanning: false,
    dragStart: new Vec2(0, 0),
    dragCurrent: new Vec2(0, 0),
    panStartPointer: new Vec2(0, 0),
    panStartCamera: new Vec2(0, 0),
  };

  const storyState = {
    activeEvent: null,
    index: 0,
    seenEventIds: new Set(),
  };

  const summaryState = {
    visible: false,
    resultLabel: 'Hole Complete',
    title: '',
    speaker: '精灵',
    text: '',
    nextObjective: '',
    reward: '',
    goals: [],
    transition: [],
    nextAction: null,
    nextActionLabel: '前往下一洞',
  };

  const cityState = {
    cityId: null,
    viewId: 'default',
    focusedNpcId: null,
    primaryAction: null,
    secondaryAction: null,
  };

  const worldMapState = {
    mapId: null,
    selectedNodeId: null,
    primaryAction: null,
    secondaryAction: null,
  };

  const competitionState = {
    activeCompetitionId: null,
    currentHoleIndex: 0,
  };

  const progressionState = {
    completedCompetitionIds: new Set(),
    claimedTourPass: false,
  };

  const holeState = {
    events: new Set(),
    usedClubs: new Set(),
    settledTerrains: new Set(),
    penalties: 0,
  };

  const particles = [];
  const lifecycle = {
    isPaused: false,
  };
  let cameraFollowBall = true;
  let noise2D = createSimplexNoise(gameState.courseSeed);

  function normalizeSeed(seed) {
    if (!Number.isFinite(seed)) {
      return createRandomSeed();
    }
    const normalized = Math.floor(seed) >>> 0;
    return normalized || 1;
  }

  function setCourseSeed(seed) {
    gameState.courseSeed = normalizeSeed(seed);
    noise2D = createSimplexNoise(gameState.courseSeed);
  }

  function toPlainVec2(vec) {
    return { x: vec.x, y: vec.y };
  }

  function hydrateVec2(value, fallback = new Vec2(0, 0)) {
    if (!value || !Number.isFinite(value.x) || !Number.isFinite(value.y)) {
      return new Vec2(fallback.x, fallback.y);
    }
    return new Vec2(value.x, value.y);
  }

  function setPaused(paused) {
    lifecycle.isPaused = Boolean(paused);
  }

  function setGamePhase(phase) {
    gameState.phase = phase;
    updateGuidePanel();
    updateSummaryPanel();
    updateCityPanel();
    updateWorldMapPanel();
  }

  function updateGuidePanel() {
    const panel = document.getElementById('guide-panel');
    const speaker = document.getElementById('guide-speaker');
    const text = document.getElementById('guide-text');
    const progress = document.getElementById('guide-progress');

    if (!storyState.activeEvent) {
      panel.classList.remove('visible');
      return;
    }

    const currentLine = storyState.activeEvent.lines[storyState.index];
    speaker.innerText = currentLine.speaker;
    text.innerText = currentLine.text;
    progress.innerText = `${storyState.index + 1}/${storyState.activeEvent.lines.length}`;
    panel.classList.add('visible');
  }

  function updateSummaryPanel() {
    const panel = document.getElementById('summary-panel');
    if (!summaryState.visible) {
      panel.classList.remove('visible');
      return;
    }

    document.getElementById('summary-kicker').innerText = summaryState.resultLabel;
    document.getElementById('summary-title').innerText = summaryState.title;
    document.getElementById('summary-speaker').innerText = summaryState.speaker;
    document.getElementById('summary-text').innerText = summaryState.text;
    document.getElementById('summary-strokes').innerText = gameState.strokes;
    document.getElementById('summary-par').innerText = gameState.par;
    document.getElementById('summary-next').innerText = summaryState.nextActionLabel;
    document.getElementById('summary-objective').innerText = summaryState.nextObjective ? `下一目标：${summaryState.nextObjective}` : '';
    document.getElementById('summary-reward').innerText = summaryState.reward ? `阶段奖励：${summaryState.reward}` : '';

    const goalsContainer = document.getElementById('summary-goals');
    goalsContainer.innerHTML = '';
    summaryState.goals.forEach((goal) => {
      const goalElement = document.createElement('div');
      goalElement.className = `summary-goal ${goal.completed ? 'is-complete' : 'is-failed'}`;

      const labelElement = document.createElement('span');
      labelElement.innerText = goal.label;

      const statusElement = document.createElement('span');
      statusElement.className = 'summary-goal-status';
      statusElement.innerText = goal.completed ? '完成' : '未达成';

      goalElement.append(labelElement, statusElement);
      goalsContainer.append(goalElement);
    });

    panel.classList.add('visible');
  }

  function getCurrentTutorialHole() {
    return TUTORIAL_HOLES[gameState.hole] ?? null;
  }

  function getCurrentCompetition() {
    return competitionState.activeCompetitionId ? COMPETITION_CONTENT[competitionState.activeCompetitionId] ?? null : null;
  }

  function getCompetitionHoleByIndex(index = competitionState.currentHoleIndex) {
    const competition = getCurrentCompetition();
    return competition?.holes[index] ?? null;
  }

  function getCurrentHoleContent() {
    return getCompetitionHoleByIndex() ?? getCurrentTutorialHole();
  }

  function getTerrainKey(terrainType) {
    if (terrainType === TERRAIN.GREEN) {
      return 'green';
    }
    if (terrainType === TERRAIN.FAIRWAY) {
      return 'fairway';
    }
    if (terrainType === TERRAIN.BUNKER) {
      return 'bunker';
    }
    if (terrainType === TERRAIN.WATER) {
      return 'water';
    }
    return 'rough';
  }

  function getBaseCourseConfig() {
    const baseDistance = COURSE_CONFIG.HOLE_DISTANCE.base + gameState.hole * COURSE_CONFIG.HOLE_DISTANCE.perHole;
    return {
      startX: COURSE_CONFIG.START_X,
      teeYJitter: COURSE_CONFIG.TEE_Y_JITTER,
      angleRange: COURSE_CONFIG.ANGLE_RANGE,
      holeHeightBuffer: COURSE_CONFIG.HOLE_HEIGHT_BUFFER,
      parThresholds: COURSE_CONFIG.PAR_THRESHOLDS,
      holeDistance: {
        min: baseDistance,
        max: baseDistance + COURSE_CONFIG.HOLE_DISTANCE.variance,
      },
      windMin: COURSE_CONFIG.WIND.min,
      windMax: COURSE_CONFIG.WIND.max,
      windMode: COURSE_CONFIG.WIND.mode,
      windJitter: COURSE_CONFIG.WIND.jitter,
      bunkerCount: COURSE_CONFIG.BUNKER.base + gameState.hole * COURSE_CONFIG.BUNKER.perHole,
      bunkerOffsetRange: COURSE_CONFIG.BUNKER.offsetRange,
      bunkerRadius: {
        min: COURSE_CONFIG.BUNKER.radius.min,
        max: COURSE_CONFIG.BUNKER.radius.max,
      },
    };
  }

  function getCourseConfig() {
    const holeCourse = getCurrentHoleContent()?.course ?? {};
    const baseConfig = getBaseCourseConfig();
    return {
      ...baseConfig,
      ...holeCourse,
      holeDistance: {
        ...baseConfig.holeDistance,
        ...(holeCourse.holeDistance ?? {}),
      },
      bunkerRadius: {
        ...baseConfig.bunkerRadius,
        ...(holeCourse.bunkerRadius ?? {}),
      },
    };
  }

  function getCoursePar(holeDistance, parThresholds) {
    if (holeDistance < parThresholds.par3Max) {
      return 3;
    }
    if (holeDistance < parThresholds.par4Max) {
      return 4;
    }
    return 5;
  }

  function getCourseWind(courseConfig, random = Math.random) {
    const holeDirection = gameState.holePos.sub(gameState.startPos).normalize();
    let windDirection;

    switch (courseConfig.windMode) {
      case 'headwind':
        windDirection = holeDirection.mult(-1);
        break;
      case 'tailwind':
        windDirection = holeDirection;
        break;
      case 'cross-left':
        windDirection = new Vec2(-holeDirection.y, holeDirection.x);
        break;
      case 'cross-right':
        windDirection = new Vec2(holeDirection.y, -holeDirection.x);
        break;
      default:
        windDirection = new Vec2(random() - 0.5, random() - 0.5).normalize();
        break;
    }

    const jitter = courseConfig.windJitter ? getRandomInRange(-courseConfig.windJitter, courseConfig.windJitter, random) : 0;
    return rotateVector(windDirection, jitter)
      .normalize()
      .mult(getRandomInRange(courseConfig.windMin, courseConfig.windMax, random));
  }

  function resetHoleProgress() {
    holeState.events.clear();
    holeState.usedClubs.clear();
    holeState.settledTerrains.clear();
    holeState.penalties = 0;
  }

  function recordHoleEvent(eventName, payload = {}) {
    holeState.events.add(eventName);
    if (payload.club) {
      holeState.usedClubs.add(payload.club);
    }
    if (payload.terrainKey) {
      holeState.settledTerrains.add(payload.terrainKey);
    }
  }

  function isGoalComplete(goal) {
    switch (goal.type) {
      case 'event':
        return holeState.events.has(goal.event);
      case 'penalty-free':
        return holeState.penalties === 0;
      case 'max-strokes':
        return gameState.strokes <= goal.max;
      case 'distinct-clubs-used':
        return holeState.usedClubs.size >= goal.target;
      case 'settle-on-terrain':
        return holeState.settledTerrains.has(goal.terrain);
      default:
        return false;
    }
  }

  function getSummaryActionLabel(summary) {
    if (summary?.nextActionLabel) {
      if (summary?.nextAction?.type === 'complete-competition') {
        return '返回巡回航线图';
      }
      return summary.nextActionLabel;
    }
    if (summary?.transition?.length) {
      return '继续';
    }
    if (TUTORIAL_HOLES[gameState.hole + 1]) {
      return '继续下一课';
    }
    return '前往下一洞';
  }

  function buildHoleSummary(resultLabel) {
    const holeContent = getCurrentHoleContent();
    const holeSummary = holeContent?.summary;
    const nextAction = holeSummary?.nextAction ?? { type: 'advance-hole' };
    const isCompetitionWrap = nextAction.type === 'complete-competition';
    return {
      resultLabel,
      title: holeSummary?.title ?? resultLabel,
      speaker: holeSummary?.speaker ?? '精灵',
      text: holeSummary?.text ?? `第 ${gameState.hole} 洞完成。你已经开始把这一洞打成一个完整回合，而不是只是一杆一杆往前推。`,
      nextObjective: isCompetitionWrap ? '返回巡回航线图，查看新解锁的地标与下一站。' : holeSummary?.nextObjective ?? '',
      reward: holeSummary?.reward ?? '',
      goals: (holeContent?.goals ?? []).map((goal) => ({
        label: goal.label,
        completed: isGoalComplete(goal),
      })),
      transition: holeSummary?.transition ?? [],
      nextAction,
      nextActionLabel: getSummaryActionLabel(holeSummary),
    };
  }

  function getCurrentWorldMap() {
    return worldMapState.mapId ? WORLD_MAP_CONTENT[worldMapState.mapId] ?? null : null;
  }

  function getWorldMapPresentation(mapDefinition) {
    if (!mapDefinition) {
      return null;
    }

    let subtitle = mapDefinition.subtitle;
    let description = mapDefinition.description;
    let objective = mapDefinition.objective;

    if (mapDefinition.completeWhenCompetitionCompleted && isCompetitionCompleted(mapDefinition.completeWhenCompetitionCompleted)) {
      subtitle = mapDefinition.completedSubtitle ?? subtitle;
      description = mapDefinition.completedDescription ?? description;
      objective = mapDefinition.completedObjective ?? objective;
    }

    mapDefinition.presentationStages?.forEach((stage) => {
      if (isCompetitionCompleted(stage.whenCompetitionCompleted)) {
        subtitle = stage.subtitle ?? subtitle;
        description = stage.description ?? description;
        objective = stage.objective ?? objective;
      }
    });

    return { subtitle, description, objective };
  }

  function isCompetitionCompleted(competitionId) {
    return progressionState.completedCompetitionIds.has(competitionId);
  }

  function getWorldNodePresentation(node) {
    let status = node.status;
    let statusLabel = node.statusLabel ?? '未开放';
    let description = node.description;

    if (node.completeWhenCompetitionCompleted && isCompetitionCompleted(node.completeWhenCompetitionCompleted)) {
      status = 'completed';
      statusLabel = node.completedStatusLabel ?? '已完成';
      description = node.completedDescription ?? description;
    } else if (!node.unlockWhenCompetitionCompleted || isCompetitionCompleted(node.unlockWhenCompetitionCompleted)) {
      status = status === 'locked' ? 'unlocked' : status;
      statusLabel = node.unlockedStatusLabel ?? statusLabel;
      description = node.unlockedDescription ?? description;
    }

    node.presentationStages?.forEach((stage) => {
      if (isCompetitionCompleted(stage.whenCompetitionCompleted)) {
        status = stage.status ?? status;
        statusLabel = stage.statusLabel ?? statusLabel;
        description = stage.description ?? description;
      }
    });

    if (node.cityId === cityState.cityId && status !== 'completed') {
      status = 'current';
      statusLabel = node.statusLabel ?? '当前据点';
      description = node.currentDescription ?? description;
    }

    return { status, statusLabel, description };
  }

  function findWorldMapIdForCompetition(competitionId) {
    return Object.entries(WORLD_MAP_CONTENT).find(([, mapDefinition]) => {
      if (mapDefinition.completeWhenCompetitionCompleted === competitionId) {
        return true;
      }
      return mapDefinition.nodes.some(
        (node) => node.completeWhenCompetitionCompleted === competitionId || node.unlockWhenCompetitionCompleted === competitionId,
      );
    })?.[0] ?? 'frontier-preview';
  }

  function findWorldMapNodeAfterCompetition(mapDefinition, competitionId) {
    const completedNodeIndex = mapDefinition.nodes.findIndex((node) => node.completeWhenCompetitionCompleted === competitionId);
    if (completedNodeIndex !== -1) {
      const nextAvailableNode = mapDefinition.nodes
        .slice(completedNodeIndex + 1)
        .find((node) => getWorldNodePresentation(node).status !== 'locked');

      if (nextAvailableNode) {
        return nextAvailableNode.id;
      }
    }

    return (
      mapDefinition.nodes.find((node) => node.unlockWhenCompetitionCompleted === competitionId)
      ?? mapDefinition.nodes.find((node) => node.completeWhenCompetitionCompleted === competitionId)
      ?? mapDefinition.nodes.find((node) => getWorldNodePresentation(node).status !== 'locked')
      ?? mapDefinition.nodes[0]
    )?.id;
  }

  function getCurrentCity() {
    return cityState.cityId ? CITY_CONTENT[cityState.cityId] : null;
  }

  function getCurrentCityView() {
    const city = getCurrentCity();
    return city?.views?.[cityState.viewId] ?? null;
  }

  function getNpcRecord(city, npcId) {
    return city?.npcs.find((npc) => npc.id === npcId) ?? null;
  }

  function getNpcDialogue(city, cityView, npcId) {
    return cityView?.npcDialogue?.[npcId] ?? getNpcRecord(city, npcId)?.dialogue ?? [];
  }

  function focusCityNpc(npcId) {
    cityState.focusedNpcId = npcId;
    updateCityPanel();
  }

  function updateCityPanel() {
    const panel = document.getElementById('city-panel');
    if (gameState.phase !== GAME_PHASES.CITY || !cityState.cityId) {
      panel.classList.remove('visible');
      return;
    }

    const city = getCurrentCity();
    const cityView = getCurrentCityView();
    if (!city || !cityView) {
      panel.classList.remove('visible');
      return;
    }

    const focusedNpc = getNpcRecord(city, cityState.focusedNpcId ?? city.npcs[0]?.id);
    const focusedDialogue = focusedNpc ? getNpcDialogue(city, cityView, focusedNpc.id) : [];

    cityState.primaryAction = cityView.primaryAction ?? null;
    cityState.secondaryAction = cityView.secondaryAction ?? null;

    document.getElementById('city-title').innerText = city.title;
    document.getElementById('city-subtitle').innerText = city.subtitle;
    document.getElementById('city-description').innerText = cityView.description;
    document.getElementById('city-objective').innerText = cityView.objective;
    document.getElementById('city-progress').innerText = cityView.progressSummary ?? city.progressSummary ?? '';
    document.getElementById('city-focus-name').innerText = focusedNpc?.name ?? '';
    document.getElementById('city-focus-role').innerText = focusedNpc?.role ?? '';
    document.getElementById('city-focus-summary').innerText = focusedNpc?.summary ?? '';
    document.getElementById('city-focus-dialogue').innerText = focusedDialogue[0] ?? '';

    const npcList = document.getElementById('city-npc-list');
    npcList.innerHTML = '';
    city.npcs.forEach((npc) => {
      const npcButton = document.createElement('button');
      npcButton.type = 'button';
      npcButton.className = `city-npc-chip ${npc.id === focusedNpc?.id ? 'is-active' : ''}`;
      npcButton.dataset.npcId = npc.id;
      npcButton.innerText = npc.name;
      npcList.append(npcButton);
    });

    const primaryButton = document.getElementById('city-primary-action');
    primaryButton.innerText = cityState.primaryAction?.label ?? '继续';
    primaryButton.style.display = cityState.primaryAction ? 'inline-flex' : 'none';

    const secondaryButton = document.getElementById('city-secondary-action');
    secondaryButton.innerText = cityState.secondaryAction?.label ?? '查看角色';
    secondaryButton.style.display = cityState.secondaryAction ? 'inline-flex' : 'none';

    panel.classList.add('visible');
  }

  function selectWorldMapNode(nodeId) {
    worldMapState.selectedNodeId = nodeId;
    updateWorldMapPanel();
  }

  function updateWorldMapPanel() {
    const panel = document.getElementById('world-map-panel');
    if (gameState.phase !== GAME_PHASES.WORLD_MAP || !worldMapState.mapId) {
      panel.classList.remove('visible');
      return;
    }

    const mapDefinition = getCurrentWorldMap();
    if (!mapDefinition) {
      panel.classList.remove('visible');
      return;
    }

    const selectedNode = mapDefinition.nodes.find((node) => node.id === worldMapState.selectedNodeId) ?? mapDefinition.nodes[0];
    const presentation = selectedNode ? getWorldNodePresentation(selectedNode) : null;
    const mapPresentation = getWorldMapPresentation(mapDefinition);

    document.getElementById('world-map-title').innerText = mapDefinition.title;
    document.getElementById('world-map-subtitle').innerText = mapPresentation?.subtitle ?? mapDefinition.subtitle;
    document.getElementById('world-map-description').innerText = mapPresentation?.description ?? mapDefinition.description;
    document.getElementById('world-map-objective').innerText = mapPresentation?.objective ?? mapDefinition.objective;
    document.getElementById('world-map-focus-name').innerText = selectedNode?.name ?? '';
    document.getElementById('world-map-focus-status').innerText = presentation?.statusLabel ?? '';
    document.getElementById('world-map-focus-description').innerText = presentation?.description ?? '';

    const regionLayer = document.getElementById('world-map-region-layer');
    regionLayer.innerHTML = '';
    mapDefinition.visualRegions?.forEach((region) => {
      const regionElement = document.createElement('div');
      regionElement.className = `world-map-region world-map-region-tone-${region.tone}`;
      regionElement.style.left = `${region.x}%`;
      regionElement.style.top = `${region.y}%`;
      regionElement.style.width = `${region.width}%`;
      regionElement.style.height = `${region.height}%`;

      const labelElement = document.createElement('div');
      labelElement.className = 'world-map-region-label';
      labelElement.innerText = `${region.title}\n${region.subtitle}`;
      regionElement.append(labelElement);
      regionLayer.append(regionElement);
    });

    const routeLayer = document.getElementById('world-map-route-layer');
    routeLayer.innerHTML = '';
    for (let index = 0; index < mapDefinition.nodes.length - 1; index += 1) {
      const fromNode = mapDefinition.nodes[index];
      const toNode = mapDefinition.nodes[index + 1];
      if (!fromNode.visual?.position || !toNode.visual?.position) {
        continue;
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${fromNode.visual.position.x} ${fromNode.visual.position.y} L ${toNode.visual.position.x} ${toNode.visual.position.y}`);
      routeLayer.append(path);
    }

    const landmarkLayer = document.getElementById('world-map-landmark-layer');
    landmarkLayer.innerHTML = '';
    mapDefinition.nodes.forEach((node) => {
      const nodePresentation = getWorldNodePresentation(node);
      const landmark = document.createElement('button');
      landmark.type = 'button';
      landmark.dataset.nodeId = node.id;
      landmark.className = `world-map-landmark ${node.id === selectedNode?.id ? 'is-active' : ''} ${nodePresentation.status === 'locked' ? 'is-locked' : ''} ${nodePresentation.status === 'current' ? 'is-current' : ''} ${nodePresentation.status === 'completed' ? 'is-completed' : ''}`;
      landmark.style.left = `${node.visual?.position?.x ?? 0}%`;
      landmark.style.top = `${node.visual?.position?.y ?? 0}%`;

      const dot = document.createElement('span');
      dot.className = 'world-map-landmark-dot';

      const label = document.createElement('span');
      label.className = 'world-map-landmark-label';
      label.innerText = node.name;

      const tags = document.createElement('div');
      tags.className = 'world-map-landmark-tags';
      node.visual?.markers?.slice(0, 2).forEach((marker) => {
        const tag = document.createElement('span');
        tag.className = 'world-map-landmark-tag';
        tag.innerText = marker.label;
        tags.append(tag);
      });

      landmark.append(dot, label, tags);
      landmarkLayer.append(landmark);
    });

    const nodeList = document.getElementById('world-map-node-list');
    nodeList.innerHTML = '';
    mapDefinition.nodes.forEach((node) => {
      const nodePresentation = getWorldNodePresentation(node);
      const nodeButton = document.createElement('button');
      nodeButton.type = 'button';
      nodeButton.dataset.nodeId = node.id;
      nodeButton.className = `world-map-node-chip ${node.id === selectedNode?.id ? 'is-active' : ''} ${nodePresentation.status === 'locked' ? 'is-locked' : ''}`;
      nodeButton.innerText = `${node.name} · ${nodePresentation.statusLabel}`;
      nodeList.append(nodeButton);
    });

    worldMapState.primaryAction = selectedNode?.primaryAction ?? mapDefinition.primaryAction ?? null;
    worldMapState.secondaryAction = selectedNode?.secondaryAction ?? mapDefinition.secondaryAction ?? null;

    const primaryButton = document.getElementById('world-map-primary-action');
    primaryButton.innerText = worldMapState.primaryAction?.label ?? '继续';
    primaryButton.style.display = worldMapState.primaryAction ? 'inline-flex' : 'none';
    primaryButton.disabled = presentation?.status === 'locked';

    const secondaryButton = document.getElementById('world-map-secondary-action');
    secondaryButton.innerText = worldMapState.secondaryAction?.label ?? '查看据点';
    secondaryButton.style.display = worldMapState.secondaryAction ? 'inline-flex' : 'none';

    panel.classList.add('visible');
  }

  function resolveCityView(cityId, requestedView = 'default') {
    if (requestedView !== 'default') {
      return requestedView;
    }

    const completedCompetitionEntry = Object.entries(COMPETITION_CONTENT).find(
      ([competitionId, competition]) => competition.cityId === cityId && progressionState.completedCompetitionIds.has(competitionId),
    );

    if (!completedCompetitionEntry) {
      return 'default';
    }

    if (cityId === 'misty-range-town' && progressionState.claimedTourPass && CITY_CONTENT[cityId]?.views?.['pass-issued']) {
      return 'pass-issued';
    }

    return completedCompetitionEntry[1].completionCityView ?? 'default';
  }

  function enterCity(cityId, viewId = 'default') {
    const city = CITY_CONTENT[cityId];
    if (!city) {
      return;
    }

    const preferredViewId = resolveCityView(cityId, viewId);
    const resolvedViewId = city.views?.[preferredViewId] ? preferredViewId : 'default';
    const cityView = city.views?.[resolvedViewId] ?? null;
    cityState.cityId = cityId;
    cityState.viewId = resolvedViewId;
    cityState.focusedNpcId = cityView?.secondaryAction?.npcId ?? city.npcs[0]?.id ?? null;
    setGamePhase(GAME_PHASES.CITY);
    updateCityPanel();
  }

  function openWorldMap(mapId, selectedNodeId = null) {
    const mapDefinition = WORLD_MAP_CONTENT[mapId];
    if (!mapDefinition) {
      return;
    }

    worldMapState.mapId = mapId;
    worldMapState.selectedNodeId = selectedNodeId ?? mapDefinition.nodes[0]?.id ?? null;
    worldMapState.primaryAction = null;
    worldMapState.secondaryAction = null;
    setGamePhase(GAME_PHASES.WORLD_MAP);
    updateWorldMapPanel();
  }

  function startCompetition(competitionId) {
    const competition = COMPETITION_CONTENT[competitionId];
    if (!competition) {
      return;
    }

    competitionState.activeCompetitionId = competitionId;
    competitionState.currentHoleIndex = 0;
    const firstHole = competition.holes[0];
    gameState.hole = firstHole?.hole ?? competition.startHole;
    showMessage(competition.title);
    setGamePhase(GAME_PHASES.PLAYING);
    generateCourse();
  }

  function advanceCompetitionHole() {
    const competition = getCurrentCompetition();
    if (!competition) {
      return;
    }

    const nextIndex = competitionState.currentHoleIndex + 1;
    const nextHole = competition.holes[nextIndex];
    if (!nextHole) {
      return;
    }

    competitionState.currentHoleIndex = nextIndex;
    gameState.hole = nextHole.hole;
    setGamePhase(GAME_PHASES.PLAYING);
    generateCourse();
  }

  function completeCompetition(competitionId) {
    const competition = COMPETITION_CONTENT[competitionId];
    if (!competition) {
      return;
    }

    progressionState.completedCompetitionIds.add(competitionId);
    competitionState.activeCompetitionId = null;
    competitionState.currentHoleIndex = 0;
    const mapId = competition.nextMapId ?? findWorldMapIdForCompetition(competitionId);
    const mapDefinition = WORLD_MAP_CONTENT[mapId];
    const selectedNodeId = competition.nextMapNodeId ?? (mapDefinition ? findWorldMapNodeAfterCompetition(mapDefinition, competitionId) : null);
    showMessage('新地标已解锁');
    openWorldMap(mapId, selectedNodeId);
    if (selectedNodeId) {
      selectWorldMapNode(selectedNodeId);
    }
  }

  function runFlowAction(action) {
    if (!action) {
      return;
    }

    if (action.type === 'set-phase') {
      setGamePhase(action.phase);
      return;
    }

    if (action.type === 'advance-hole') {
      summaryState.visible = false;
      updateSummaryPanel();
      setGamePhase(GAME_PHASES.PLAYING);
      gameState.hole += 1;
      generateCourse();
      return;
    }

    if (action.type === 'enter-city') {
      enterCity(action.cityId, action.viewId ?? action.view ?? 'default');
      return;
    }

    if (action.type === 'open-world-map') {
      openWorldMap(action.mapId, action.selectedNodeId ?? action.nodeId ?? null);
      return;
    }

    if (action.type === 'start-competition') {
      startCompetition(action.competitionId);
      return;
    }

    if (action.type === 'next-hole') {
      advanceCompetitionHole();
      return;
    }

    if (action.type === 'complete-competition') {
      completeCompetition(action.competitionId);
      return;
    }

    if (action.type === 'claim-tour-pass') {
      progressionState.claimedTourPass = true;
      enterCity(cityState.cityId, action.nextView ?? cityState.viewId);
      if (action.focusNpcId) {
        focusCityNpc(action.focusNpcId);
      }
      return;
    }

    if (action.type === 'focus-npc') {
      focusCityNpc(action.npcId);
      return;
    }
  }

  function getStoryEventSources() {
    return [...PROLOGUE_EVENTS, ...(getCurrentHoleContent()?.storyEvents ?? [])];
  }

  function continueFromSummary() {
    const nextAction = summaryState.nextAction ?? { type: 'advance-hole' };
    const transitionLines = summaryState.transition ?? [];

    summaryState.visible = false;
    updateSummaryPanel();

    if (transitionLines.length > 0) {
      startStoryEvent({
        id: `summary-transition-${gameState.hole}`,
        phase: GAME_PHASES.INTRO,
        lines: transitionLines,
        onComplete: nextAction,
      });
      return;
    }

    runFlowAction(nextAction);
  }

  function findStoryEvent(trigger) {
    return getStoryEventSources().find((event) => {
      if (event.trigger !== trigger) {
        return false;
      }
      if (typeof event.hole === 'number' && event.hole !== gameState.hole) {
        return false;
      }
      if (event.once && storyState.seenEventIds.has(event.id)) {
        return false;
      }
      return true;
    });
  }

  function completeStoryEvent() {
    if (!storyState.activeEvent) {
      return;
    }

    const completedEvent = storyState.activeEvent;
    storyState.seenEventIds.add(completedEvent.id);
    storyState.activeEvent = null;
    storyState.index = 0;
    updateGuidePanel();
    runFlowAction(completedEvent.onComplete);
    if (!completedEvent.onComplete) {
      setGamePhase(GAME_PHASES.PLAYING);
    }
  }

  function startStoryEvent(event) {
    storyState.activeEvent = event;
    storyState.index = 0;
    setGamePhase(event.phase ?? GAME_PHASES.INTRO);
  }

  function advanceStoryEvent() {
    if (!storyState.activeEvent) {
      return;
    }

    if (storyState.index >= storyState.activeEvent.lines.length - 1) {
      completeStoryEvent();
      return;
    }

    storyState.index += 1;
    updateGuidePanel();
  }

  function triggerStoryEvent(trigger) {
    const event = findStoryEvent(trigger);
    if (!event) {
      return false;
    }
    startStoryEvent(event);
    return true;
  }

  function resetBallToSafePosition() {
    ball.pos = new Vec2(ball.lastSafePos.x, ball.lastSafePos.y);
    ball.vel = new Vec2(0, 0);
    ball.z = 0;
    ball.vz = 0;
    gameState.status = 'aiming';
    setGamePhase(GAME_PHASES.PLAYING);
    updateUI();
  }

  function recoverFromPenalty(message) {
    gameState.status = 'penalty';
    holeState.penalties += 1;
    showMessage(message);
    gameState.strokes += 1;
    updateUI();
    setTimeout(resetBallToSafePosition, 2000);
  }

  function getHoleResultLabel() {
    const score = gameState.strokes - gameState.par;
    if (gameState.strokes === 1) {
      return 'Hole in One!';
    }
    if (score <= -3) {
      return 'Albatross';
    }
    if (score === -2) {
      return 'Eagle';
    }
    if (score === -1) {
      return 'Birdie';
    }
    if (score === 0) {
      return 'Par';
    }
    if (score === 1) {
      return 'Bogey';
    }
    return `+${score}`;
  }

  function finishHole() {
    const result = getHoleResultLabel();
    Object.assign(summaryState, buildHoleSummary(result), { visible: true });
    gameState.status = 'holed';
    setGamePhase(GAME_PHASES.SUMMARY);
    updateSummaryPanel();
    showMessage(result);
  }

  function getTerrainAt(x, y) {
    const p = new Vec2(x, y);
    const baseHeight = (fBm(noise2D, x, y) + 1) * 0.5 * 100;

    const edgeNoise = noise2D(x * 0.02, y * 0.02) * 15;
    const distHole = p.sub(gameState.holePos).mag() + edgeNoise;
    const distTee = p.sub(gameState.startPos).mag() + edgeNoise;

    const pathNoise = noise2D(x * 0.01, y * 0.01) * 35;
    const distPath = distPointToSegment(p, gameState.startPos, gameState.holePos) + pathNoise;

    let type = TERRAIN.ROUGH;
    let finalHeight = baseHeight;

    const greenRadius = 90;
    if (distHole < greenRadius) {
      type = TERRAIN.GREEN;
      const t = smoothstep(0, greenRadius, distHole);
      const greenMicroBump = noise2D(x * 0.05, y * 0.05) * 2;
      finalHeight = gameState.baseHoleHeight * (1 - t) + baseHeight * t + greenMicroBump;
    } else if (distTee < 60) {
      type = TERRAIN.FAIRWAY;
      const t = smoothstep(0, 60, distTee);
      finalHeight = (baseHeight * 0.5 + 30) * (1 - t) + baseHeight * t;
    } else if (distPath < 120) {
      type = TERRAIN.FAIRWAY;
      const targetSmoothHeight = Math.max(CONSTANTS.WATER_LEVEL + 5, baseHeight * 0.7 + 15);
      const t = smoothstep(40, 120, distPath);
      finalHeight = targetSmoothHeight * (1 - t) + baseHeight * t;
    }

    let inBunker = false;
    for (const bunker of gameState.bunkers) {
      const db = p.sub(bunker.pos).mag() + noise2D(x * 0.04, y * 0.04) * 10;
      if (db < bunker.r) {
        type = TERRAIN.BUNKER;
        const t = smoothstep(0, bunker.r, db);
        finalHeight -= 15 * (1 - t);
        inBunker = true;
        break;
      }
    }

    if (!inBunker && type === TERRAIN.ROUGH && finalHeight < CONSTANTS.WATER_LEVEL) {
      type = TERRAIN.WATER;
      finalHeight = CONSTANTS.WATER_LEVEL;
    }

    return { type, height: finalHeight };
  }

  function getGradient(x, y) {
    const d = 2.0;
    const hLeft = getTerrainAt(x - d, y).height;
    const hRight = getTerrainAt(x + d, y).height;
    const hUp = getTerrainAt(x, y - d).height;
    const hDown = getTerrainAt(x, y + d).height;
    return new Vec2((hLeft - hRight) / (2 * d), (hUp - hDown) / (2 * d));
  }

  const bgCanvas = document.getElementById('bg-canvas');
  const bgCtx = bgCanvas.getContext('2d', { alpha: false });
  const fgCanvas = document.getElementById('fg-canvas');
  const fgCtx = fgCanvas.getContext('2d');

  window.addEventListener('resize', () => {
    fgCanvas.width = window.innerWidth;
    fgCanvas.height = window.innerHeight;
  });
  window.dispatchEvent(new Event('resize'));

  function setSelectedClub(clubType) {
    ball.club = clubType;
    document.querySelectorAll('.club-btn').forEach((button) => {
      button.classList.toggle('active', button.dataset.club === clubType);
    });
  }

  function seedCourseLayout(courseSeed) {
    setCourseSeed(courseSeed);
    const random = createSeededRandom(gameState.courseSeed ^ 0x9e3779b9);
    const courseConfig = getCourseConfig();

    gameState.startPos = new Vec2(courseConfig.startX, CONSTANTS.MAP_HEIGHT / 2 + (random() - 0.5) * courseConfig.teeYJitter);

    const holeDistance = getRandomInRange(courseConfig.holeDistance.min, courseConfig.holeDistance.max, random);
    gameState.par = getCoursePar(holeDistance, courseConfig.parThresholds);

    const angle = getRandomInRange(-courseConfig.angleRange, courseConfig.angleRange, random);
    gameState.holePos = new Vec2(
      gameState.startPos.x + Math.cos(angle) * holeDistance,
      gameState.startPos.y + Math.sin(angle) * holeDistance,
    );

    gameState.baseHoleHeight = Math.max(
      CONSTANTS.WATER_LEVEL + courseConfig.holeHeightBuffer,
      (fBm(noise2D, gameState.holePos.x, gameState.holePos.y) + 1) * 0.5 * 100,
    );
    gameState.wind = getCourseWind(courseConfig, random);

    gameState.bunkers = [];
    const numHazards = courseConfig.bunkerCount;
    for (let i = 0; i < numHazards; i += 1) {
      const t = 0.2 + random() * 0.7;
      const basePos = gameState.startPos.lerp(gameState.holePos, t);
      const offset = new Vec2((random() - 0.5) * courseConfig.bunkerOffsetRange, (random() - 0.5) * courseConfig.bunkerOffsetRange);
      gameState.bunkers.push({
        pos: basePos.add(offset),
        r: getRandomInRange(courseConfig.bunkerRadius.min, courseConfig.bunkerRadius.max, random),
      });
    }
  }

  async function renderCoursePresentation(options = {}) {
    const triggerHoleStart = options.triggerHoleStart !== false;

    document.getElementById('loading').style.opacity = 1;
    document.getElementById('loading').style.pointerEvents = 'auto';
    await new Promise((resolve) => setTimeout(resolve, 100));

    bgCanvas.width = CONSTANTS.MAP_WIDTH;
    bgCanvas.height = CONSTANTS.MAP_HEIGHT;
    const imgData = bgCtx.createImageData(CONSTANTS.MAP_WIDTH, CONSTANTS.MAP_HEIGHT);
    const data = imgData.data;

    for (let y = 0; y < CONSTANTS.MAP_HEIGHT; y += 1) {
      for (let x = 0; x < CONSTANTS.MAP_WIDTH; x += 1) {
        const terrain = getTerrainAt(x, y);
        const color = terrain.type.colorBase;
        let r = color[0];
        let g = color[1];
        let b = color[2];

        if (terrain.type !== TERRAIN.WATER) {
          const contourValue = (terrain.height % CONSTANTS.CONTOUR_STEP) / CONSTANTS.CONTOUR_STEP;
          const shadow = contourValue < 0.15 ? 0.85 : 0.9 + (terrain.height / 100) * 0.3;
          r *= shadow;
          g *= shadow;
          b *= shadow;
        } else if (noise2D(x * 0.05, y * 0.05) > 0.6) {
          r *= 1.2;
          g *= 1.2;
          b *= 1.2;
        }

        const idx = (y * CONSTANTS.MAP_WIDTH + x) * 4;
        data[idx] = Math.min(255, Math.max(0, r));
        data[idx + 1] = Math.min(255, Math.max(0, g));
        data[idx + 2] = Math.min(255, Math.max(0, b));
        data[idx + 3] = 255;
      }
    }
    bgCtx.putImageData(imgData, 0, 0);

    bgCtx.fillStyle = '#000';
    bgCtx.beginPath();
    bgCtx.arc(gameState.holePos.x, gameState.holePos.y, CONSTANTS.HOLE_RADIUS, 0, Math.PI * 2);
    bgCtx.fill();
    bgCtx.fillStyle = '#eee';
    bgCtx.fillRect(gameState.holePos.x - 1, gameState.holePos.y - 45, 3, 45);
    bgCtx.fillStyle = '#f43f5e';
    bgCtx.beginPath();
    bgCtx.moveTo(gameState.holePos.x + 2, gameState.holePos.y - 45);
    bgCtx.lineTo(gameState.holePos.x + 22, gameState.holePos.y - 35);
    bgCtx.lineTo(gameState.holePos.x + 2, gameState.holePos.y - 25);
    bgCtx.fill();

    updateUI();
    updateGuidePanel();
    updateSummaryPanel();
    updateCityPanel();
    updateWorldMapPanel();

    setTimeout(() => {
      document.getElementById('loading').style.opacity = 0;
      if (triggerHoleStart && !triggerStoryEvent('hole-start')) {
        setGamePhase(GAME_PHASES.PLAYING);
      }
      setTimeout(() => {
        document.getElementById('loading').style.pointerEvents = 'none';
      }, 500);
    }, 300);
  }

  async function generateCourse(courseSeed = createRandomSeed()) {
    seedCourseLayout(courseSeed);

    ball.pos = new Vec2(gameState.startPos.x, gameState.startPos.y);
    ball.vel = new Vec2(0, 0);
    ball.z = 0;
    ball.vz = 0;
    ball.lastSafePos = new Vec2(ball.pos.x, ball.pos.y);
    gameState.strokes = 0;
    gameState.status = 'aiming';
    resetHoleProgress();
    summaryState.visible = false;
    summaryState.resultLabel = 'Hole Complete';
    summaryState.title = '';
    summaryState.speaker = '精灵';
    summaryState.text = '';
    summaryState.nextObjective = '';
    summaryState.reward = '';
    summaryState.goals = [];
    summaryState.transition = [];
    summaryState.nextAction = null;
    summaryState.nextActionLabel = '前往下一洞';
    cameraFollowBall = true;

    gameState.camera.x = ball.pos.x - fgCanvas.width / 2;
    gameState.camera.y = ball.pos.y - fgCanvas.height / 2;
    setSelectedClub('iron');
    await renderCoursePresentation({ triggerHoleStart: true });
  }

  async function restoreGame(snapshot) {
    if (!snapshot || !snapshot.gameState || !snapshot.ball) {
      throw new Error('Invalid save data');
    }

    gameState.hole = snapshot.gameState.hole ?? 1;
    gameState.strokes = snapshot.gameState.strokes ?? 0;
    gameState.par = snapshot.gameState.par ?? 4;
    gameState.phase = snapshot.gameState.phase ?? GAME_PHASES.PLAYING;
    gameState.status = snapshot.gameState.status ?? 'aiming';
    gameState.camera = hydrateVec2(snapshot.gameState.camera);
    gameState.wind = hydrateVec2(snapshot.gameState.wind);
    gameState.startPos = hydrateVec2(snapshot.gameState.startPos);
    gameState.holePos = hydrateVec2(snapshot.gameState.holePos);
    gameState.bunkers = Array.isArray(snapshot.gameState.bunkers)
      ? snapshot.gameState.bunkers.map((bunker) => ({ pos: hydrateVec2(bunker.pos), r: bunker.r ?? 30 }))
      : [];
    gameState.baseHoleHeight = snapshot.gameState.baseHoleHeight ?? 0;
    setCourseSeed(snapshot.gameState.courseSeed);

    ball.pos = hydrateVec2(snapshot.ball.pos);
    ball.vel = hydrateVec2(snapshot.ball.vel);
    ball.z = snapshot.ball.z ?? 0;
    ball.vz = snapshot.ball.vz ?? 0;
    ball.lastSafePos = hydrateVec2(snapshot.ball.lastSafePos, ball.pos);

    competitionState.activeCompetitionId = snapshot.competitionState?.activeCompetitionId ?? null;
    competitionState.currentHoleIndex = snapshot.competitionState?.currentHoleIndex ?? 0;
    progressionState.completedCompetitionIds = new Set(snapshot.progressionState?.completedCompetitionIds ?? []);
    progressionState.claimedTourPass = Boolean(snapshot.progressionState?.claimedTourPass);

    storyState.index = snapshot.storyState?.index ?? 0;
    storyState.seenEventIds = new Set(snapshot.storyState?.seenEventIds ?? []);
    storyState.activeEvent = (snapshot.storyState?.activeEventId
      ? getStoryEventSources().find((event) => event.id === snapshot.storyState.activeEventId)
      : null) ?? null;

    cityState.cityId = snapshot.cityState?.cityId ?? null;
    cityState.viewId = snapshot.cityState?.viewId ?? 'default';
    cityState.focusedNpcId = snapshot.cityState?.focusedNpcId ?? null;
    cityState.primaryAction = snapshot.cityState?.primaryAction ?? null;
    cityState.secondaryAction = snapshot.cityState?.secondaryAction ?? null;

    worldMapState.mapId = snapshot.worldMapState?.mapId ?? null;
    worldMapState.selectedNodeId = snapshot.worldMapState?.selectedNodeId ?? null;
    worldMapState.primaryAction = snapshot.worldMapState?.primaryAction ?? null;
    worldMapState.secondaryAction = snapshot.worldMapState?.secondaryAction ?? null;
    resetHoleProgress();

    summaryState.visible = Boolean(snapshot.summaryState?.visible);
    summaryState.resultLabel = snapshot.summaryState?.resultLabel ?? 'Hole Complete';
    summaryState.title = snapshot.summaryState?.title ?? '';
    summaryState.speaker = snapshot.summaryState?.speaker ?? '精灵';
    summaryState.text = snapshot.summaryState?.text ?? '';
    summaryState.nextObjective = snapshot.summaryState?.nextObjective ?? '';
    summaryState.reward = snapshot.summaryState?.reward ?? '';
    summaryState.goals = snapshot.summaryState?.goals ?? [];
    summaryState.transition = snapshot.summaryState?.transition ?? [];
    summaryState.nextAction = snapshot.summaryState?.nextAction ?? null;
    summaryState.nextActionLabel = snapshot.summaryState?.nextActionLabel ?? '前往下一洞';
    cameraFollowBall = snapshot.cameraFollowBall !== false;

    setSelectedClub(snapshot.ball.club ?? 'iron');
    await renderCoursePresentation({ triggerHoleStart: false });
  }

  async function startNewGame() {
    gameState.hole = 1;
    storyState.activeEvent = null;
    storyState.index = 0;
    storyState.seenEventIds = new Set();
    competitionState.activeCompetitionId = null;
    competitionState.currentHoleIndex = 0;
    progressionState.completedCompetitionIds = new Set();
    progressionState.claimedTourPass = false;
    cityState.cityId = null;
    cityState.viewId = 'default';
    cityState.focusedNpcId = null;
    cityState.primaryAction = null;
    cityState.secondaryAction = null;
    worldMapState.mapId = null;
    worldMapState.selectedNodeId = null;
    worldMapState.primaryAction = null;
    worldMapState.secondaryAction = null;
    summaryState.visible = false;
    summaryState.resultLabel = 'Hole Complete';
    summaryState.title = '';
    summaryState.speaker = '精灵';
    summaryState.text = '';
    summaryState.nextObjective = '';
    summaryState.reward = '';
    summaryState.goals = [];
    summaryState.transition = [];
    summaryState.nextAction = null;
    summaryState.nextActionLabel = '前往下一洞';
    resetHoleProgress();
    await generateCourse();
  }

  function saveState() {
    return {
      version: 1,
      gameState: {
        hole: gameState.hole,
        strokes: gameState.strokes,
        par: gameState.par,
        phase: gameState.phase,
        status: gameState.status,
        camera: toPlainVec2(gameState.camera),
        wind: toPlainVec2(gameState.wind),
        startPos: toPlainVec2(gameState.startPos),
        holePos: toPlainVec2(gameState.holePos),
        bunkers: gameState.bunkers.map((bunker) => ({ pos: toPlainVec2(bunker.pos), r: bunker.r })),
        baseHoleHeight: gameState.baseHoleHeight,
        courseSeed: gameState.courseSeed,
      },
      ball: {
        pos: toPlainVec2(ball.pos),
        vel: toPlainVec2(ball.vel),
        z: ball.z,
        vz: ball.vz,
        club: ball.club,
        lastSafePos: toPlainVec2(ball.lastSafePos),
      },
      storyState: {
        activeEventId: storyState.activeEvent?.id ?? null,
        index: storyState.index,
        seenEventIds: Array.from(storyState.seenEventIds),
      },
      summaryState: {
        visible: summaryState.visible,
        resultLabel: summaryState.resultLabel,
        title: summaryState.title,
        speaker: summaryState.speaker,
        text: summaryState.text,
        nextObjective: summaryState.nextObjective,
        reward: summaryState.reward,
        goals: summaryState.goals,
        transition: summaryState.transition,
        nextAction: summaryState.nextAction,
        nextActionLabel: summaryState.nextActionLabel,
      },
      cityState: {
        cityId: cityState.cityId,
        viewId: cityState.viewId,
        focusedNpcId: cityState.focusedNpcId,
        primaryAction: cityState.primaryAction,
        secondaryAction: cityState.secondaryAction,
      },
      worldMapState: {
        mapId: worldMapState.mapId,
        selectedNodeId: worldMapState.selectedNodeId,
        primaryAction: worldMapState.primaryAction,
        secondaryAction: worldMapState.secondaryAction,
      },
      competitionState: {
        activeCompetitionId: competitionState.activeCompetitionId,
        currentHoleIndex: competitionState.currentHoleIndex,
      },
      progressionState: {
        completedCompetitionIds: Array.from(progressionState.completedCompetitionIds),
        claimedTourPass: progressionState.claimedTourPass,
      },
      cameraFollowBall,
    };
  }

  function getScreenPointer(e) {
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return new Vec2(cx, cy);
  }

  function getWorldPointer(e) {
    const screen = getScreenPointer(e);
    const rect = fgCanvas.getBoundingClientRect();
    return new Vec2(screen.x - rect.left + gameState.camera.x, screen.y - rect.top + gameState.camera.y);
  }

  function handlePointerDown(e) {
    if (lifecycle.isPaused) {
      return;
    }
    if (gameState.phase !== GAME_PHASES.PLAYING || gameState.status !== 'aiming') {
      return;
    }
    const worldPos = getWorldPointer(e);
    const screenPos = getScreenPointer(e);

    if (worldPos.sub(ball.pos).mag() < 100) {
      input.isAiming = true;
      input.dragStart = worldPos;
      input.dragCurrent = worldPos;
      cameraFollowBall = true;
    } else {
      input.isPanning = true;
      input.panStartPointer = screenPos;
      input.panStartCamera = new Vec2(gameState.camera.x, gameState.camera.y);
      cameraFollowBall = false;
    }
  }

  function handlePointerMove(e) {
    if (lifecycle.isPaused) {
      return;
    }
    if (input.isAiming) {
      input.dragCurrent = getWorldPointer(e);
    } else if (input.isPanning) {
      const currentScreenPos = getScreenPointer(e);
      const delta = input.panStartPointer.sub(currentScreenPos);
      const newCamX = input.panStartCamera.x + delta.x;
      const newCamY = input.panStartCamera.y + delta.y;
      gameState.camera.x = Math.max(0, Math.min(newCamX, CONSTANTS.MAP_WIDTH - fgCanvas.width));
      gameState.camera.y = Math.max(0, Math.min(newCamY, CONSTANTS.MAP_HEIGHT - fgCanvas.height));
    }
  }

  function handlePointerUp() {
    if (lifecycle.isPaused) {
      input.isAiming = false;
      input.isPanning = false;
      return;
    }
    if (input.isAiming) {
      input.isAiming = false;
      const dragVector = input.dragStart.sub(input.dragCurrent);
      const power = dragVector.mag() * 0.12;
      if (power > 1) {
        shootBall(dragVector.normalize(), power);
      }
    }
    input.isPanning = false;
  }

  fgCanvas.addEventListener('mousedown', handlePointerDown);
  fgCanvas.addEventListener('mousemove', handlePointerMove);
  window.addEventListener('mouseup', handlePointerUp);

  fgCanvas.addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault();
      handlePointerDown(e);
    },
    { passive: false },
  );
  fgCanvas.addEventListener(
    'touchmove',
    (e) => {
      e.preventDefault();
      handlePointerMove(e);
    },
    { passive: false },
  );
  window.addEventListener('touchend', handlePointerUp);

  function centerCamera() {
    cameraFollowBall = true;
  }

  fgCanvas.addEventListener('dblclick', centerCamera);
  fgCanvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    centerCamera();
  });

  document.querySelectorAll('.club-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (lifecycle.isPaused) {
        return;
      }
      if (gameState.phase !== GAME_PHASES.PLAYING || gameState.status !== 'aiming') {
        return;
      }
      setSelectedClub(e.target.dataset.club);
    });
  });

  document.getElementById('guide-next').addEventListener('click', advanceStoryEvent);
  document.getElementById('guide-skip').addEventListener('click', completeStoryEvent);
  document.getElementById('summary-next').addEventListener('click', continueFromSummary);
  document.getElementById('city-primary-action').addEventListener('click', () => runFlowAction(cityState.primaryAction));
  document.getElementById('city-secondary-action').addEventListener('click', () => runFlowAction(cityState.secondaryAction));
  document.getElementById('world-map-primary-action').addEventListener('click', () => runFlowAction(worldMapState.primaryAction));
  document.getElementById('world-map-secondary-action').addEventListener('click', () => runFlowAction(worldMapState.secondaryAction));
  document.getElementById('city-npc-list').addEventListener('click', (e) => {
    const npcButton = e.target.closest('[data-npc-id]');
    if (!npcButton) {
      return;
    }
    focusCityNpc(npcButton.dataset.npcId);
  });
  document.getElementById('world-map-node-list').addEventListener('click', (e) => {
    const nodeButton = e.target.closest('[data-node-id]');
    if (!nodeButton) {
      return;
    }
    selectWorldMapNode(nodeButton.dataset.nodeId);
  });
  document.getElementById('world-map-landmark-layer').addEventListener('click', (e) => {
    const landmarkButton = e.target.closest('[data-node-id]');
    if (!landmarkButton) {
      return;
    }
    selectWorldMapNode(landmarkButton.dataset.nodeId);
  });

  function autoSelectClub() {
    const dist = ball.pos.sub(gameState.holePos).mag() / CONSTANTS.METER_TO_PIXEL;
    const terrainType = getTerrainAt(ball.pos.x, ball.pos.y).type;
    let clubType = 'wood';
    if (terrainType === TERRAIN.GREEN) {
      clubType = 'putter';
    } else if (dist < 50) {
      clubType = 'wedge';
    } else if (dist < 160 || terrainType === TERRAIN.BUNKER) {
      clubType = 'iron';
    }

    setSelectedClub(clubType);
  }

  function shootBall(dir, power) {
    gameState.strokes += 1;
    recordHoleEvent('shot-taken', { club: ball.club });
    gameState.status = 'moving';
    cameraFollowBall = true;
    updateUI();
    const club = CLUBS[ball.club];
    const actualPower = Math.min(power, club.maxPower);
    const xyPower = actualPower * (1 - Math.min(club.lift, 0.8));
    ball.vel = dir.mult(xyPower);
    ball.vz = actualPower * club.lift;
    ball.z = 0.1;
  }

  function showMessage(text) {
    const overlay = document.getElementById('message-overlay');
    overlay.innerText = text;
    overlay.classList.remove('show');
    void overlay.offsetWidth;
    overlay.classList.add('show');
  }

  function applyGroundForces(terrain, grad) {
    const slopeMult = ball.club === 'putter' ? 2.2 : CONSTANTS.GRAVITY_SLOPE;
    const slopeForce = grad.mult(slopeMult);
    const slopeStrength = slopeForce.mag();
    const staticGrip = terrain.type.slopeGrip;
    const rollingResistance = terrain.type.rollingFriction;

    if (ball.vel.mag() < staticGrip && slopeStrength < staticGrip * 1.15) {
      ball.vel = new Vec2(0, 0);
      return;
    }

    const slopeAfterGrip = slopeStrength > 0
      ? slopeForce.normalize().mult(Math.max(0, slopeStrength - Math.min(staticGrip, slopeStrength)))
      : new Vec2(0, 0);

    ball.vel = ball.vel.add(slopeAfterGrip);

    if (ball.vel.mag() > 0) {
      const resistance = ball.vel.normalize().mult(Math.min(ball.vel.mag(), rollingResistance));
      ball.vel = ball.vel.sub(resistance);
    }

    ball.vel = ball.vel.mult(terrain.type.velocityRetention);
  }

  function updatePhysics() {
    if (gameState.status !== 'moving') {
      return;
    }

    const club = CLUBS[ball.club];
    const inAir = ball.z > 0;

    if (inAir) {
      ball.pos = ball.pos.add(ball.vel);
      ball.z += ball.vz;
      ball.vz -= CONSTANTS.GRAVITY_Z;

      if (ball.club !== 'putter') {
        const windForce = gameState.wind.mult(0.006 * (1 + ball.z * 0.035));
        ball.vel = ball.vel.add(windForce);
      }
      ball.vel = ball.vel.mult(club.airResist);

      if (ball.z <= 0) {
        ball.z = 0;
        const terrainType = getTerrainAt(ball.pos.x, ball.pos.y).type;

        if (terrainType === TERRAIN.WATER) {
          recoverFromPenalty('Water Penalty');
          return;
        }

        const bounceDamp = terrainType === TERRAIN.BUNKER ? 0.1 : 0.4;
        const frictionDamp = terrainType === TERRAIN.BUNKER ? 0.3 : 0.8;

        if (ball.vz < -3) {
          ball.vz = -ball.vz * bounceDamp;
          ball.vel = ball.vel.mult(frictionDamp);
        } else {
          ball.vz = 0;
        }
      }
    } else {
      ball.pos = ball.pos.add(ball.vel);
      const terrain = getTerrainAt(ball.pos.x, ball.pos.y);

      applyGroundForces(terrain, getGradient(ball.pos.x, ball.pos.y));

      const distToHole = ball.pos.sub(gameState.holePos).mag();
      if (distToHole < CONSTANTS.HOLE_RADIUS && ball.vel.mag() < 6) {
        ball.pos = new Vec2(gameState.holePos.x, gameState.holePos.y);
        ball.vel = new Vec2(0, 0);
        finishHole();
        return;
      }

      if (ball.vel.mag() < 0.1) {
        ball.vel = new Vec2(0, 0);
        gameState.status = 'aiming';
        if (terrain.type !== TERRAIN.WATER) {
          ball.lastSafePos = new Vec2(ball.pos.x, ball.pos.y);
        }
        recordHoleEvent('shot-settled', { terrainKey: getTerrainKey(terrain.type) });
        autoSelectClub();
        updateUI();
        triggerStoryEvent('shot-settled');
      }
    }

    if (ball.pos.x < 0 || ball.pos.x > CONSTANTS.MAP_WIDTH || ball.pos.y < 0 || ball.pos.y > CONSTANTS.MAP_HEIGHT) {
      recoverFromPenalty('Out of Bounds');
    }
  }

  function updateCamera() {
    if (cameraFollowBall && !input.isPanning) {
      let targetX = ball.pos.x - fgCanvas.width / 2;
      let targetY = ball.pos.y - fgCanvas.height / 2;

      if (gameState.status === 'aiming' && input.isAiming) {
        const dragVec = input.dragStart.sub(input.dragCurrent);
        targetX += dragVec.x * 2;
        targetY += dragVec.y * 2;
      }

      targetX = Math.max(0, Math.min(targetX, CONSTANTS.MAP_WIDTH - fgCanvas.width));
      targetY = Math.max(0, Math.min(targetY, CONSTANTS.MAP_HEIGHT - fgCanvas.height));
      gameState.camera.x += (targetX - gameState.camera.x) * 0.1;
      gameState.camera.y += (targetY - gameState.camera.y) * 0.1;
    }
  }

  function updateTargetIndicator() {
    const indicator = document.getElementById('target-indicator');
    const screenX = gameState.holePos.x - gameState.camera.x;
    const screenY = gameState.holePos.y - gameState.camera.y;

    const margin = 20;
    const isOffScreen = screenX < 0 || screenX > fgCanvas.width || screenY < 0 || screenY > fgCanvas.height;

    if (isOffScreen && gameState.status !== 'holed') {
      indicator.classList.add('visible');

      const indicatorX = Math.max(margin, Math.min(screenX, fgCanvas.width - margin));
      const indicatorY = Math.max(margin, Math.min(screenY, fgCanvas.height - margin));

      let dx = screenX - indicatorX;
      let dy = screenY - indicatorY;
      if (dx === 0 && dy === 0) {
        dx = screenX - fgCanvas.width / 2;
        dy = screenY - fgCanvas.height / 2;
      }
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      indicator.style.left = `${indicatorX}px`;
      indicator.style.top = `${indicatorY}px`;
      indicator.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    } else {
      indicator.classList.remove('visible');
    }
  }

  function renderLoop() {
    if (!lifecycle.isPaused) {
      updatePhysics();
      updateCamera();
    }
    updateTargetIndicator();

    if (!lifecycle.isPaused && Math.random() < 0.1 * gameState.wind.mag()) {
      particles.push({
        pos: new Vec2(gameState.camera.x + (gameState.wind.x < 0 ? fgCanvas.width + 100 : -100), gameState.camera.y + Math.random() * fgCanvas.height),
        life: 150 + Math.random() * 50,
      });
    }

    fgCtx.clearRect(0, 0, fgCanvas.width, fgCanvas.height);
    fgCtx.drawImage(bgCanvas, gameState.camera.x, gameState.camera.y, fgCanvas.width, fgCanvas.height, 0, 0, fgCanvas.width, fgCanvas.height);

    fgCtx.save();
    fgCtx.translate(-gameState.camera.x, -gameState.camera.y);

    if (gameState.status === 'aiming' && input.isAiming) {
      const dragVec = input.dragStart.sub(input.dragCurrent);
      const maxP = CLUBS[ball.club].maxPower;
      const currentP = dragVec.mag() * 0.12;
      const powerRatio = Math.min(currentP / maxP, 1.0);
      const aimDir = dragVec.normalize();

      fgCtx.beginPath();
      fgCtx.moveTo(ball.pos.x, ball.pos.y);
      const endX = ball.pos.x + aimDir.x * powerRatio * 300;
      const endY = ball.pos.y + aimDir.y * powerRatio * 300;

      const gradColor = fgCtx.createLinearGradient(ball.pos.x, ball.pos.y, endX, endY);
      gradColor.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradColor.addColorStop(1, powerRatio >= 1 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.0)');

      fgCtx.strokeStyle = gradColor;
      fgCtx.lineWidth = 3;
      fgCtx.setLineDash([8, 8]);
      fgCtx.lineTo(endX, endY);
      fgCtx.stroke();
      fgCtx.setLineDash([]);

      fgCtx.fillStyle = '#fff';
      fgCtx.font = "bold 14px 'Segoe UI'";
      fgCtx.fillText(`${Math.round(powerRatio * 100)}%`, ball.pos.x - 15, ball.pos.y - 20);
    }

    const scale = 1 + ball.z * 0.02;
    const shadowOffset = ball.z * 0.6;
    const shadowAlpha = Math.max(0.05, 0.4 - ball.z * 0.005);

    if (gameState.status !== 'holed') {
      fgCtx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
      fgCtx.beginPath();
      fgCtx.arc(ball.pos.x + shadowOffset, ball.pos.y + shadowOffset, CONSTANTS.BALL_RADIUS, 0, Math.PI * 2);
      fgCtx.fill();

      const gradient = fgCtx.createRadialGradient(
        ball.pos.x - CONSTANTS.BALL_RADIUS * 0.3 * scale,
        ball.pos.y - CONSTANTS.BALL_RADIUS * 0.3 * scale,
        0,
        ball.pos.x,
        ball.pos.y,
        CONSTANTS.BALL_RADIUS * scale,
      );
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.8, '#e0e0e0');
      gradient.addColorStop(1, '#999999');

      fgCtx.fillStyle = gradient;
      fgCtx.beginPath();
      fgCtx.arc(ball.pos.x, ball.pos.y, CONSTANTS.BALL_RADIUS * scale, 0, Math.PI * 2);
      fgCtx.fill();
    }

    fgCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let i = particles.length - 1; i >= 0; i -= 1) {
      const p = particles[i];
      p.pos = p.pos.add(gameState.wind.mult(1.5));
      p.life -= 1;
      fgCtx.beginPath();
      fgCtx.arc(p.pos.x, p.pos.y, 1.2, 0, Math.PI * 2);
      fgCtx.fill();
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    fgCtx.restore();
    requestAnimationFrame(renderLoop);
  }

  function updateUI() {
    document.getElementById('hole-num').innerText = gameState.hole;
    document.getElementById('hole-par').innerText = gameState.par;
    document.getElementById('stroke-count').innerText = gameState.strokes;
    document.getElementById('dist-to-hole').innerText = (ball.pos.sub(gameState.holePos).mag() / CONSTANTS.METER_TO_PIXEL).toFixed(1);

    document.getElementById('wind-speed').innerText = gameState.wind.mag().toFixed(1);
    document.getElementById('wind-arrow').style.transform = `rotate(${(Math.atan2(gameState.wind.y, gameState.wind.x) * 180) / Math.PI + 90}deg)`;
  }

  if (autoStart) {
    generateCourse();
  }
  requestAnimationFrame(renderLoop);

  return {
    startNewGame,
    saveState,
    loadState: restoreGame,
    setPaused,
  };
}
