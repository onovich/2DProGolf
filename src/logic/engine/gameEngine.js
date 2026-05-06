import { CLUBS, CONSTANTS, TERRAIN } from '../../data/constants';

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

function createSimplexNoise() {
  const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i += 1) {
    p[i] = Math.floor(Math.random() * 256);
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

const noise2D = createSimplexNoise();

function fBm(x, y, octaves = 3) {
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

export function initGame() {
  const gameState = {
    hole: 1,
    strokes: 0,
    par: 4,
    status: 'aiming',
    camera: new Vec2(0, 0),
    wind: new Vec2(0, 0),
    startPos: new Vec2(0, 0),
    holePos: new Vec2(0, 0),
    bunkers: [],
    baseHoleHeight: 0,
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

  const particles = [];
  let cameraFollowBall = true;

  function getTerrainAt(x, y) {
    const p = new Vec2(x, y);
    const baseHeight = (fBm(x, y) + 1) * 0.5 * 100;

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

  async function generateCourse() {
    document.getElementById('loading').style.opacity = 1;
    document.getElementById('loading').style.pointerEvents = 'auto';
    await new Promise((resolve) => setTimeout(resolve, 100));

    gameState.startPos = new Vec2(300, CONSTANTS.MAP_HEIGHT / 2 + (Math.random() - 0.5) * 600);

    const holeDistance = 900 + gameState.hole * 150 + Math.random() * 300;
    gameState.par = holeDistance < 1300 ? 3 : holeDistance < 1900 ? 4 : 5;

    const angle = (Math.random() - 0.5) * Math.PI * 0.3;
    gameState.holePos = new Vec2(
      gameState.startPos.x + Math.cos(angle) * holeDistance,
      gameState.startPos.y + Math.sin(angle) * holeDistance,
    );

    gameState.baseHoleHeight = Math.max(CONSTANTS.WATER_LEVEL + 10, (fBm(gameState.holePos.x, gameState.holePos.y) + 1) * 0.5 * 100);
    gameState.wind = new Vec2(Math.random() - 0.5, Math.random() - 0.5).normalize().mult(Math.random() * 10);

    gameState.bunkers = [];
    const numHazards = 8 + gameState.hole * 2;
    for (let i = 0; i < numHazards; i += 1) {
      const t = 0.2 + Math.random() * 0.7;
      const basePos = gameState.startPos.lerp(gameState.holePos, t);
      const offset = new Vec2((Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400);
      gameState.bunkers.push({ pos: basePos.add(offset), r: 25 + Math.random() * 40 });
    }

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

    ball.pos = new Vec2(gameState.startPos.x, gameState.startPos.y);
    ball.vel = new Vec2(0, 0);
    ball.z = 0;
    ball.vz = 0;
    ball.lastSafePos = new Vec2(ball.pos.x, ball.pos.y);
    gameState.strokes = 0;
    gameState.status = 'aiming';
    cameraFollowBall = true;

    gameState.camera.x = ball.pos.x - fgCanvas.width / 2;
    gameState.camera.y = ball.pos.y - fgCanvas.height / 2;

    updateUI();

    setTimeout(() => {
      document.getElementById('loading').style.opacity = 0;
      setTimeout(() => {
        document.getElementById('loading').style.pointerEvents = 'none';
      }, 500);
    }, 300);
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
    if (gameState.status !== 'aiming') {
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
      if (gameState.status !== 'aiming') {
        return;
      }
      document.querySelectorAll('.club-btn').forEach((button) => button.classList.remove('active'));
      e.target.classList.add('active');
      ball.club = e.target.dataset.club;
    });
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

    ball.club = clubType;
    document.querySelectorAll('.club-btn').forEach((button) => button.classList.remove('active'));
    document.querySelector(`.club-btn[data-club="${clubType}"]`).classList.add('active');
  }

  function shootBall(dir, power) {
    gameState.strokes += 1;
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
        const windForce = gameState.wind.mult(0.008 * (1 + ball.z * 0.05));
        ball.vel = ball.vel.add(windForce);
      }
      ball.vel = ball.vel.mult(club.airResist);

      if (ball.z <= 0) {
        ball.z = 0;
        const terrainType = getTerrainAt(ball.pos.x, ball.pos.y).type;

        if (terrainType === TERRAIN.WATER) {
          gameState.status = 'penalty';
          showMessage('Water Penalty');
          gameState.strokes += 1;
          setTimeout(() => {
            ball.pos = new Vec2(ball.lastSafePos.x, ball.lastSafePos.y);
            ball.vel = new Vec2(0, 0);
            ball.z = 0;
            ball.vz = 0;
            gameState.status = 'aiming';
            updateUI();
          }, 2000);
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

      const grad = getGradient(ball.pos.x, ball.pos.y);
      const slopeMult = ball.club === 'putter' ? 3.0 : CONSTANTS.GRAVITY_SLOPE;
      const slopeForce = grad.mult(slopeMult);
      ball.vel = ball.vel.add(slopeForce);
      ball.vel = ball.vel.mult(terrain.type.friction);

      const distToHole = ball.pos.sub(gameState.holePos).mag();
      if (distToHole < CONSTANTS.HOLE_RADIUS && ball.vel.mag() < 6) {
        ball.pos = new Vec2(gameState.holePos.x, gameState.holePos.y);
        ball.vel = new Vec2(0, 0);
        gameState.status = 'holed';

        const score = gameState.strokes - gameState.par;
        let term = score <= -3 ? 'Albatross' : score === -2 ? 'Eagle' : score === -1 ? 'Birdie' : score === 0 ? 'Par' : score === 1 ? 'Bogey' : `+${score}`;
        if (gameState.strokes === 1) {
          term = 'Hole in One!';
        }
        showMessage(term);

        setTimeout(() => {
          gameState.hole += 1;
          generateCourse();
        }, 3500);
        return;
      }

      if (ball.vel.mag() < 0.1) {
        ball.vel = new Vec2(0, 0);
        gameState.status = 'aiming';
        if (terrain.type !== TERRAIN.WATER) {
          ball.lastSafePos = new Vec2(ball.pos.x, ball.pos.y);
        }
        autoSelectClub();
        updateUI();
      }
    }

    if (ball.pos.x < 0 || ball.pos.x > CONSTANTS.MAP_WIDTH || ball.pos.y < 0 || ball.pos.y > CONSTANTS.MAP_HEIGHT) {
      gameState.status = 'penalty';
      showMessage('Out of Bounds');
      gameState.strokes += 1;
      setTimeout(() => {
        ball.pos = new Vec2(ball.lastSafePos.x, ball.lastSafePos.y);
        ball.vel = new Vec2(0, 0);
        ball.z = 0;
        ball.vz = 0;
        gameState.status = 'aiming';
        updateUI();
      }, 2000);
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
    updatePhysics();
    updateCamera();
    updateTargetIndicator();

    if (Math.random() < 0.1 * gameState.wind.mag()) {
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

  generateCourse();
  requestAnimationFrame(renderLoop);
}
