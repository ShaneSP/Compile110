var CANVAS_HEIGHT = 400;
var CANVAS_WIDTH = 400;
var FIXED_UPDATES_IN_A_SECOND = 1500;
var FIXED_STEP_IDEAL_DURATION_MS = 1000/FIXED_UPDATES_IN_A_SECOND;
var WALK_SPEED_PIXELS_PER_SECOND = 15;
var WALK_SPEED_PIXELS_PER_UPDATE = WALK_SPEED_PIXELS_PER_SECOND/FIXED_UPDATES_IN_A_SECOND;
var USER_INPUT_BUFFER_CAPACITY = 10;

var CANVAS = document.getElementById("canvas");
var STAGE = new createjs.Stage(canvas);

var PLAYER = null;
var BIT = null;
var SWORD = null;
var BEAM = null;
var PORTAL = null;

var SPAWN = false;
var BIT_RANGE = 6;

var GAME_ENTITIES = new Array();

var PLAYER_SHEET = new createjs.SpriteSheet({
	"images": ["assets/allProtagSprites_74px.png"],
	"frames": {"height": 74, "width": 74, "count": 394, "regX": 0, "regY": 0},
	"animations": {
		"wkDown": [0, 6],
		"wkRight": [20, 28],
		"wkLeft": [40, 48],
		"wkUp": [60, 66],
		"fcDown": [0],
		"fcRight": [20],
		"fcLeft": [40],
		"fcUp": [60],
		"idleU": [80,86],
		"idleD": [100,106],
		"idleR": [120,126],
		"idleL": [140,146],
		"shDownAni": [160,166],
		"shRightAni": [180,186],
		"shLeftAni": [200,206],
		"shUpAni": [220,226],
		"shDownDone": [165,166],
		"shRightDone": [185,186],
		"shLeftDone": [205,206],
		"shUpDone": [225,226],
		"attackD": [240,267],
		"attackR": [280,305],
		"attackL": [320,345],
		"attackU": [360,383]
		}
});

var BIT_SHEET = new createjs.SpriteSheet({
	"images": ["assets/bit_36px.png"],
	"frames": {"height": 36, "width": 36, "count": 15, "regX": 18, "regY": 18},
	"animations": {
		"idle": {
			frames: [0, 1, 2, 3],
			speed: 0.8
		},
		"agro": [5, 8],
		"charge": [10, 14],
		"die": [15,23]
	}
});

var BEAM_SHEET = new createjs.SpriteSheet({
	"images": ["assets/bitbeamanimation_72px.png"],
	"frames": {"height": 72, "width": 72, "count": 6, "regX": 0, "regY": 0},
	"animations": {
		"idle": [0,5]
	}
});

var TILE_SHEET = new createjs.SpriteSheet({
	"images": ["enlargedAssets/lvl0.png"],
	"frames": {
		"height": 500,
		"width": 500,
		"regX": 0,
		"regY": 0,
		"count": 1
	}
});

var SWORD_SHEET = new createjs.SpriteSheet({
	"images": ["assets/Recolorsword_42px.png"],
	"frames": {
		"height": 42,
		"width": 42,
		"regX": 0,
		"regY": 0,
		"count": 9
	},
	"animations": {
		"idle": [0,8]
	}
});

var PORTAL_SHEET = new createjs.SpriteSheet({
	"images": ["assets/portal_40px.png"],
	"frames": {"height": 40, "width": 40, "regX": 0, "regY": 0, "count":8},
	"animations": {
		"idle": [0,7]
	}
});


var MAP_LAYOUT = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
	[0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var MAP_LAYOUT1 = [
	[1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
	[1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
	[1, 1, 0, 1, 1, 1, 0, 0, 1, 1],
	[1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
	[1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
	[1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
	[1, 0, 1, 1, 0, 1, 0, 0, 1, 1],
	[1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
]

var MAP_LAYOUT2 = [
	[1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
	[1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
	[1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 1, 0, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

var LEVEL_MAP = new map(MAP_LAYOUT, STAGE, TILE_SHEET);

function resetUPS(ups) {
	FIXED_UPDATES_IN_A_SECOND = ups;
	FIXED_STEP_IDEAL_DURATION_MS = 1000/FIXED_UPDATES_IN_A_SECOND;
	WALK_SPEED_PIXELS_PER_UPDATE = WALK_SPEED_PIXELS_PER_SECOND/FIXED_UPDATES_IN_A_SECOND;
}
