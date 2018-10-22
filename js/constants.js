let DEBUG = false;
const FRAME_RATE = 60;
const CANVAS_PADDING = 60;

const DEC2RAD = (Math.PI / 180);
const ANGLE360 = Math.PI * 2;

const ANGLE35 = 35 * DEC2RAD;
const ANGLE145 = 145 * DEC2RAD;
const ANGLE235 = 235 * DEC2RAD;
const ANGLE305 = 305 * DEC2RAD;

const TILE_W = 32;
const TILE_H = 32;

const LASSO_COLOR = '#ffffce';
const SELECTED_COLOR = '#ffe6ad';
const UNIT_RANKS_SPACING = 115;

const STATE = {
  IDLE: 'idle',
  MOVE: 'move',
  ATTACK: 'attack',
  DEAD: 'dead'
};

const KEY = {
  MOUSE_LEFT: 'MOUSE_LEFT',
  MOUSE_MIDDLE: 'MOUSE_MIDDLE',
  MOUSE_RIGHT: 'MOUSE_RIGHT',

  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  PAUSE: 19,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,

  ZERO: 48,
  ONE: 49,
  TWO: 50,
  THREE: 51,
  FOUR: 52,
  FIVE: 53,
  SIX: 54,
  SEVEN: 55,
  EIGHT: 56,
  NINE: 57,
};
