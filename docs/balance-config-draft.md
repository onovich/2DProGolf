# 2D Pro Golf 参数配置草案

## 1. 文档目的

这份文档用于指导第一阶段的参数配置化工作，目标如下：

1. 把当前散落在引擎里的关键参数集中管理。
2. 优先修复风力失衡问题。
3. 为后续城市差异、赛事规则和教学阶段提供统一调参入口。

这是一份策划和程序共用的草案，不代表最终定值。首要目标是让参数可调、可测、可复现。

## 2. 现状问题摘要

当前参数主要分成两类：

1. 已配置化参数：位于 src/data/constants.js，包括基础重力、地形摩擦和球杆基础性能。
2. 未配置化参数：位于 src/logic/engine/gameEngine.js，包括风力范围、洞长、标准杆判定、果岭半径、球道宽度、沙坑数量、沙坑半径等。

当前最突出问题：

1. 风力强度偏高，且在空中阶段不断叠加，导致逆风和高弹道时的结果经常过于夸张。
2. 沙坑数量随洞号线性增长，会让长期模式难度失控。
3. 标准杆只按距离分段，不足以反映真实难度。
4. 不同阶段、城市、赛事还没有独立修正层。

## 3. 推荐配置文件拆分

建议后续拆为以下数据文件：

1. src/data/physicsConfig.js
2. src/data/clubConfig.js
3. src/data/courseConfig.js
4. src/data/cityConfig.js
5. src/data/eventConfig.js
6. src/data/tutorialConfig.js

如果想先保持简单，也可以先合并成一个 src/data/gameConfig.js，等系统扩展后再拆。

## 4. 风力系统草案

### 4.1 目标

1. 风会改变策略，但不会夺走主方向控制权。
2. 玩家能学会读风。
3. 新手阶段和高难阶段的风体验可分别控制。

### 4.2 推荐字段

```js
export const WIND_CONFIG = {
  baseRange: { min: 0, max: 6 },
  gustRange: { min: 0, max: 2.5 },
  airborneForce: 0.0045,
  altitudeScale: 0.018,
  groundInfluence: 0.0,
  headwindForwardClamp: 0.55,
  forecastSamples: 12,
  tutorialRange: { min: 0, max: 2.5 },
};
```

### 4.3 字段解释

1. baseRange：常规稳定风范围。
2. gustRange：阵风额外扰动区间，仅在高难内容开启。
3. airborneForce：空中受风基础系数，当前版本建议显著低于现有实现。
4. altitudeScale：随着高度增加的受风提升系数。
5. groundInfluence：地滚球受风系数，建议默认保持为 0。
6. headwindForwardClamp：逆风最多能削减的前进比例上限，避免玩家频繁出现几乎打不动的体验。
7. forecastSamples：瞄准时简化风偏预估的采样数。
8. tutorialRange：教学阶段的专用风范围。

### 4.4 首版数值建议

当前体验修正建议：

1. 把整体风速上限从体感上的“强风常驻”降到“中风为主、强风稀有”。
2. 空中风力基础系数先降低约 40%。
3. 推杆受风维持为 0。
4. 仅在第三城市之后再引入阵风。

## 5. 球杆配置草案

### 5.1 推荐字段

```js
export const CLUB_CONFIG = {
  wood: {
    label: '1W 木杆',
    maxPower: 40,
    launch: 0.32,
    airResist: 0.992,
    windFactor: 0.7,
    rolloutFactor: 1.15,
    forgiveness: 0.8,
  },
  iron: {
    label: '7I 铁杆',
    maxPower: 28,
    launch: 0.72,
    airResist: 0.985,
    windFactor: 1.0,
    rolloutFactor: 1.0,
    forgiveness: 1.0,
  },
  wedge: {
    label: 'PW 挖起杆',
    maxPower: 18,
    launch: 1.15,
    airResist: 0.978,
    windFactor: 1.25,
    rolloutFactor: 0.55,
    forgiveness: 0.9,
  },
  putter: {
    label: 'PT 推杆',
    maxPower: 15,
    launch: 0,
    airResist: 1,
    windFactor: 0,
    rolloutFactor: 0.92,
    forgiveness: 1.2,
  },
};
```

### 5.2 调整意图

1. 木杆：低弹道、低受风、长距离推进，负责开球稳定性。
2. 铁杆：中弹道、均衡，是大部分中距离场景的默认选择。
3. 挖起杆：保留高弹道和高受风特性，但稍微降低离谱漂移，突出停球价值。
4. 推杆：纯地面工具，强调坡度阅读，不额外引入风干扰。

### 5.3 当前版本推荐修正

1. 挖起杆 lift 建议从 1.5 下调到 1.1 到 1.2 区间。
2. 木杆 airResist 可略微提高，减少飞行过程中过度损耗。
3. 新增 windFactor，不再只靠统一风模型处理所有球杆。
4. 后续如加入角色成长，再把 forgiveness 作为容错修正使用。

## 6. 地形与摩擦配置草案

### 6.1 推荐字段

```js
export const TERRAIN_CONFIG = {
  green: { friction: 0.975, slopeFactor: 1.0, bounceDamp: 0.35 },
  fairway: { friction: 0.955, slopeFactor: 1.0, bounceDamp: 0.4 },
  rough: { friction: 0.91, slopeFactor: 0.95, bounceDamp: 0.3 },
  bunker: { friction: 0.82, slopeFactor: 0.75, bounceDamp: 0.12 },
  water: { friction: 0.0, slopeFactor: 0.0, bounceDamp: 0.0 },
};
```

### 6.2 调整意图

1. 果岭与球道的差异应主要体现在细腻滚动和推杆读取，而不是简单极端摩擦差。
2. 长草要有惩罚，但不能让球场变成大量不可救药的卡顿落点。
3. 沙坑要明确降低弹跳和滚动，强化停滞感。

## 7. 球洞生成配置草案

### 7.1 推荐结构

```js
export const COURSE_CONFIG = {
  map: {
    width: 3000,
    height: 1500,
    meterToPixel: 10,
    waterLevel: 15,
    contourStep: 10,
  },
  startArea: {
    x: 300,
    yVariance: 600,
  },
  holeDistance: {
    tutorial: [700, 950],
    short: [900, 1200],
    medium: [1200, 1750],
    long: [1750, 2300],
  },
  green: {
    radius: 95,
    microBump: 1.2,
  },
  fairway: {
    teeRadius: 70,
    pathHalfWidth: 135,
    smoothingStart: 45,
    smoothingEnd: 135,
  },
  hazards: {
    bunkerCountByTemplate: {
      tutorial: [1, 3],
      basic: [3, 6],
      tactical: [5, 8],
      championship: [6, 10],
    },
    bunkerRadius: [24, 48],
    bunkerOffset: 380,
  },
  parRules: {
    par3Max: 1250,
    par4Max: 1850,
  },
};
```

### 7.2 当前硬编码项对应表

1. 开球点 X 坐标：当前约为 300，应转入 startArea.x。
2. 开球点 Y 随机摆幅：当前约为 600，应转入 startArea.yVariance。
3. 洞长：当前按洞号增长，应改为按模板和章节决定。
4. 果岭半径：当前为 90，应转入 green.radius。
5. 球道半宽：当前为 120，应转入 fairway.pathHalfWidth。
6. 沙坑数量：当前为 8 + 洞号乘 2，应彻底废弃，改为模板区间。
7. 沙坑半径：当前为 25 到 65，应转入 hazards.bunkerRadius。

### 7.3 关键改法

1. 不再用球洞编号直接推高难度。
2. 用洞型模板和城市修正共同决定球长、弯折、障碍密度和风力权重。
3. 教学阶段强制使用低风险模板。

## 8. 城市修正器草案

### 8.1 推荐结构

```js
export const CITY_MODIFIERS = {
  mistHarbor: {
    windMultiplier: 0.45,
    waterChance: 0.1,
    bunkerDensity: 0.4,
    roughPenalty: 0.8,
    greenSpeed: 0.95,
    allowedTemplates: ['tutorialStraight', 'shortDogleg', 'introApproach'],
  },
  sandScript: {
    windMultiplier: 0.8,
    waterChance: 0.05,
    bunkerDensity: 1.35,
    roughPenalty: 1.0,
    greenSpeed: 1.0,
    allowedTemplates: ['crossBunker', 'doglegLeft', 'splitFairway'],
  },
  rainMarsh: {
    windMultiplier: 0.7,
    waterChance: 1.4,
    bunkerDensity: 0.7,
    roughPenalty: 1.15,
    greenSpeed: 0.88,
    allowedTemplates: ['waterCarry', 'narrowLanding', 'wetGreen'],
  },
};
```

### 8.2 用途

1. 控制城市地形风格，不需要为每个城市重写生成器。
2. 让不同城市形成稳定的学习主题。
3. 为后续世界地图和章节内容提供统一入口。

## 9. 赛事规则参数草案

```js
export const EVENT_CONFIG = {
  practice: {
    windMultiplier: 0.5,
    penaltyMultiplier: 0.5,
    allowHints: true,
  },
  standard: {
    windMultiplier: 1,
    penaltyMultiplier: 1,
    allowHints: true,
  },
  strict: {
    windMultiplier: 1.15,
    penaltyMultiplier: 1.2,
    allowHints: false,
  },
  oneClub: {
    windMultiplier: 0.9,
    penaltyMultiplier: 1,
    clubRestriction: true,
  },
};
```

## 10. 教学阶段参数草案

```js
export const TUTORIAL_CONFIG = {
  aimAssist: true,
  showWindForecast: true,
  showTerrainHint: true,
  showGreenRead: true,
  autoClubSelect: true,
  maxWind: 2.5,
  maxSlopeNoise: 0.65,
};
```

教学阶段的核心不是降低一切难度，而是只暴露当前正在学习的变量。

## 11. 调试与验证建议

参数配置化完成后，建议同时建立以下验证流程：

1. 固定 5 个测试洞种子，覆盖顺风、逆风、侧风、沙坑、水域场景。
2. 每次调风后，记录木杆、铁杆、挖起杆的平均飞行距离和偏移量。
3. 单独测试逆风最小推进保障，确保不会出现严重反直觉场景。
4. 记录不同地形上的落地后平均滚动距离。
5. 用教学参数和标准参数分别跑一次，确保两者体验明确不同。

## 12. 实施顺序建议

1. 先抽出 WIND_CONFIG 和 CLUB_CONFIG。
2. 再抽 COURSE_CONFIG。
3. 然后补 CITY_MODIFIERS 和 EVENT_CONFIG。
4. 最后接调试面板和测试种子。

## 13. 当前最值得先改的三件事

1. 把风力基础系数下调，并新增 windFactor。
2. 把沙坑数量生成逻辑从“随洞号无限增长”改成“按模板区间生成”。
3. 把洞长和标准杆逻辑改成模板驱动，而不是简单按当前洞号线性拉长。