let DEBUG = false;
const FRAME_RATE = 60;
const CANVAS_PADDING = 60;

const PREVIEW_PATHS = true; // if true, we draw pathfinding previews showing what would happen when you right click

const FONT_COLOR = '#7f5333';
const SHADOW_COLOR = '#351b14';
const UNITS_FONT = '18px compass';
const SLIME_FONT = '26px compass';

const DEC2RAD = (Math.PI / 180);
const ANGLE360 = Math.PI * 2;

const ANGLE15 = 15 * DEC2RAD;
const ANGLE35 = 35 * DEC2RAD;
const ANGLE55 = 55 * DEC2RAD;
const ANGLE90 = 90 * DEC2RAD;
const ANGLE145 = 145 * DEC2RAD;
const ANGLE180 = 180 * DEC2RAD;
const ANGLE235 = 235 * DEC2RAD;
const ANGLE305 = 305 * DEC2RAD;

const TILE_SIZE = 32;
const TILE_HALF_SIZE = TILE_SIZE / 2;
const TILE_COLLISION_SIZE = TILE_HALF_SIZE + 2;

const LASSO_COLOR = '#ffffce';
const SELECTED_COLOR = '#ffe6ad';

const STATE = {
  IDLE: 'idle',
  MOVE: 'move',
  ATTACK: 'attack',
  DEAD: 'dead'
};

const TILE = {
  GRASS: 0,
  TREES: 1,

  PLAYER_CHICKEN: 30,
  PLAYER_PIG: 31,
  PLAYER_GOBLIN: 32,
  PLAYER_HOUSE: 33,
  PLAYER_BARRACKS: 34,
  PLAYER_MUD_PIT: 35,
  PLAYER_SLIME: 36,

  ENEMY_CHICKEN: 50,
  ENEMY_PIG: 51,
  ENEMY_GOBLIN: 52,
  ENEMY_HOUSE: 53,
  ENEMY_BARRACKS: 54,
  ENEMY_MUD_PIT: 55,
  ENEMY_SLIME: 56,
};

const WALKABLE_TILES = [
  TILE.GRASS,

  // character tiles need to be walkable during level initializing
  TILE.PLAYER_CHICKEN,
  TILE.PLAYER_PIG,
  TILE.PLAYER_GOBLIN,
  TILE.ENEMY_CHICKEN,
  TILE.ENEMY_PIG,
  TILE.ENEMY_GOBLIN
];

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

  DELETE: 46,
  PERIOD: 190,

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
