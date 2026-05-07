export const CONSTANTS = {
  GRAVITY_Z: 0.8,
  GRAVITY_SLOPE: 2.5,
  METER_TO_PIXEL: 10,
  BALL_RADIUS: 4,
  HOLE_RADIUS: 8,
  MAP_WIDTH: 3000,
  MAP_HEIGHT: 1500,
  CONTOUR_STEP: 10,
  WATER_LEVEL: 15,
};

export const COURSE_CONFIG = {
  START_X: 300,
  TEE_Y_JITTER: 600,
  ANGLE_RANGE: Math.PI * 0.15,
  HOLE_HEIGHT_BUFFER: 10,
  PAR_THRESHOLDS: {
    par3Max: 1300,
    par4Max: 1900,
  },
  HOLE_DISTANCE: {
    base: 900,
    perHole: 150,
    variance: 300,
  },
  WIND: {
    min: 0,
    max: 7,
    mode: 'random',
    jitter: 0.25,
  },
  BUNKER: {
    base: 8,
    perHole: 2,
    offsetRange: 400,
    radius: {
      min: 25,
      max: 65,
    },
  },
};

export const TERRAIN = {
  GREEN: { velocityRetention: 0.982, slopeGrip: 0.1, rollingFriction: 0.018, colorBase: [144, 214, 110] },
  FAIRWAY: { velocityRetention: 0.95, slopeGrip: 0.18, rollingFriction: 0.045, colorBase: [93, 179, 83] },
  ROUGH: { velocityRetention: 0.88, slopeGrip: 0.28, rollingFriction: 0.08, colorBase: [61, 133, 53] },
  BUNKER: { velocityRetention: 0.72, slopeGrip: 0.42, rollingFriction: 0.14, colorBase: [235, 218, 150] },
  WATER: { velocityRetention: 0.0, slopeGrip: 0.0, rollingFriction: 1.0, colorBase: [59, 130, 246] },
};

export const CLUBS = {
  wood: { name: '1W 木杆', maxPower: 40, lift: 0.35, airResist: 0.99 },
  iron: { name: '7I 铁杆', maxPower: 28, lift: 0.8, airResist: 0.98 },
  wedge: { name: 'PW 挖起杆', maxPower: 18, lift: 1.5, airResist: 0.97 },
  putter: { name: 'PT 推杆', maxPower: 15, lift: 0.0, airResist: 1.0 },
};
