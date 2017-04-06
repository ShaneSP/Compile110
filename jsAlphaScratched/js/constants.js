var CANVAS_HEIGHT = 400;
var CANVAS_WIDTH = 400;
var FIXED_UPDATES_IN_A_SECOND = 30;
var FIXED_STEP_IDEAL_DURATION_MS = 1000/FIXED_UPDATES_IN_A_SECOND;
var WALK_SPEED_PIXELS_PER_SECOND = 70;
var WALK_SPEED_PIXELS_PER_UPDATE = WALK_SPEED_PIXELS_PER_SECOND/FIXED_UPDATES_IN_A_SECOND;
var STATES_HISTORY_CAPACITY = 10;
var USER_INPUT_BUFFER_CAPACITY = 10;

var CANVAS = document.getElementById("canvas");
var STAGE = new createjs.Stage(canvas);

var PLAYER_SHEET = new createjs.SpriteSheet({
	"images": ["assets/spritesheet_2.png"],
	"frames": {"height": 42, "width": 42, "count": 74, "regX": 0, "regY": 1, "spacing": 1, "margin": 1},
	"animations": {
		"wkForward": [0, 6],
		"wkRight": [9, 17],
		"wkLeft": [18, 26],
		"wkBackward": [27, 33],
		"fcForward": [0],
		"fcRight": [9],
		"fcLeft": [18],
		"fcBackward": [27],
		"shieldR": [36,42],
		"shieldL": [45,51],
		"shieldF": [54,60],
		"shieldB": [63,69]
		}
});

var BIT_SHEET = new createjs.SpriteSheet({
	"images": ["assets/bitSprite36px.png"],
	"frames": {"height": 36, "width": 36, "count": 15, "regX": 18, "regY": 18},
	"animations": {
		"idle": [0, 3],
		"agro": [5, 8],
		"charge": [10, 14]
	}
});

var TILE_SHEET = new createjs.SpriteSheet({
	"images": ["assets/floortiles40px.png"],
	"frames": {
		"height": 40,
		"width": 40,
		"regX": 0,
		"regY": 0,
		"count": 14
	}
});

var MAP_LAYOUT = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var LEVEL_MAP = new map(MAP_LAYOUT, STAGE, TILE_SHEET);

var ANIMATION_MANAGER = new AnimationManager();

var INPUT_EVENT_STATE = {
	"start":1,
	"end":0
};

//implement method calls for these types
var INPUT_EVENT_TYPE = {
	"shieldR":10,
  "shieldL":12,
  "shieldU":14,
  "shieldD":16,
	"faceR":20,
  "faceL":22,
  "faceU":24,
  "faceD":26,
	"right":30,
	"left":40,
	"down":50,
  "up":60
};

function resetUPS(ups) {
	FIXED_UPDATES_IN_A_SECOND = ups;
	FIXED_STEP_IDEAL_DURATION_MS = 1000/FIXED_UPDATES_IN_A_SECOND;
	WALK_SPEED_PIXELS_PER_UPDATE = WALK_SPEED_PIXELS_PER_SECOND/FIXED_UPDATES_IN_A_SECOND;
}
