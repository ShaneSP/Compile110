// the game's canvas element
var canvas = null;

// the canvas 2d context
var ctx = null;

// an image containing all the sprites
var spritesheet = null;

// true when the spritesheet has been downloaded
var spritesheetLoaded = false;

// the world grid: a 2d array of tiles
var world = [[]];

// size in the world in sprite tiles
var worldWidth = 3;
var worldHeight = 3;

// size of a tile in pixels
var tileWidth = 32;
var tileHeight = 32;

// start and end of path
var pathStart = [worldWidth, worldHeight];
var pathEnd = [0, 0];
var currentPath = [];

// ensure that console.log doesn't cause errors
if (typeof console == "undefined") {
    var console = { log: function() }
};

function onload()
    {
        console.log('Page loaded.');
        canvas = document.getElementById('gameCanvas');
        canvas.width = worldWidth * tileWidth;
        canvas.height = worldHeight * tileHeight;
        canvas.addEventListener("click", canvasClick, false);
        ctx = canvas.getContext("2d");
        spritesheet = new Image();
        // spritesheet.src = 'spritesheet.png';
        // spritesheet.src = ''
        spritesheet.onload = loaded;
    }