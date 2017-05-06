var CANVAS_HEIGHT = 400;
var CANVAS_WIDTH = 400;
var FIXED_UPDATES_IN_A_SECOND = 1500;
var FIXED_STEP_IDEAL_DURATION_MS = 1000/FIXED_UPDATES_IN_A_SECOND;
var WALK_SPEED_PIXELS_PER_SECOND = 15;
var WALK_SPEED_PIXELS_PER_UPDATE = WALK_SPEED_PIXELS_PER_SECOND/FIXED_UPDATES_IN_A_SECOND;
var USER_INPUT_BUFFER_CAPACITY = 10;

var CANVAS = document.getElementById("canvas");
var STAGE = new createjs.Stage(canvas);
var STAGE1 = new createjs.Stage(canvas);
var RUNCODE = false;
var ATTACK = false;

var PLAYER = null;
var BIT = null;
var SWORD = null;
var BEAM = null;
var PORTAL = null;
var MODEL = null;

var SPAWN = false;
var BIT_RANGE = 4;

var GAME_ENTITIES = new Array();

var PLAYER_SHEET = new createjs.SpriteSheet({
	"images": ["assets/allProtagSprites_74px.png"],
	"frames": {"height": 74, "width": 74, "count": 556, "regX": 0, "regY": 0},
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
		"attackDown": [240,267],
		"attackRight": [280,305],
		"attackLeft": [320,345],
		"attackUp": [360,383],
		"hurtDown": [400,410],
		"hurtRight": [420,431],
		"hurtLeft": [440,451],
		"hurtUp": [460,470],
		"dieDown": [480,495],
		"dieRight": [500,515],
		"dieLeft": [520,535],
		"dieUp": [540,555]
		}
});

var BIT_SHEET = new createjs.SpriteSheet({
	"images": ["assets/bit_36px.png"],
	"frames": {"height": 36, "width": 36, "count": 25, "regX": 18, "regY": 18},
	"animations": {
		"idle": {
			frames: [0, 1, 2, 3, 2],
			speed: 0.8
		},
		"agro": [5, 8],
		"charge": [10, 14],
		"die": {
			frames: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
			speed: 0.6
		}
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

var TILE_SHEET1 = new createjs.SpriteSheet({
	"images": ["enlargedAssets/lvl1.png"],
	"frames": {
		"height": 500,
		"width": 500,
		"regX": 0,
		"regY": 0,
		"count": 1
	}
})

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

var WALKABLE_SHEET = new createjs.SpriteSheet({
	"images": ["assets/shine.png"],
	"frames": {"height": 50, "width": 50, "regX": 0, "regY": 0, "count": 10},
	"animations": {
		"noshine": [0],
		"shine": {
			"frames": [0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0],
			"speed": 0.8,
			"next": "wait"
		},
		"wait": {
			"frames": [0, 0, 0, 0, 0],
			"speed": 0.1,
			"next": "shine"
		}
	}
});

var MAP_LAYOUT = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
	[1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
];

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

var LEVEL_MAP = new map(MAP_LAYOUT, STAGE, TILE_SHEET, WALKABLE_SHEET);
var LEVEL_MAP1 = new map(MAP_LAYOUT1, STAGE1, TILE_SHEET1, WALKABLE_SHEET);

function resetUPS(ups) {
	FIXED_UPDATES_IN_A_SECOND = ups;
	FIXED_STEP_IDEAL_DURATION_MS = 1000/FIXED_UPDATES_IN_A_SECOND;
	WALK_SPEED_PIXELS_PER_UPDATE = WALK_SPEED_PIXELS_PER_SECOND/FIXED_UPDATES_IN_A_SECOND;
}
