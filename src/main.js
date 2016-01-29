// Base values
var constants = require('./constants');
var CELLWIDTH = constants.CELLWIDTH;
var CELLHEIGHT = constants.CELLHEIGHT;

var Snake = require('./Snake');
var Food = require('./Food');
var Rock = require('./Rocks');

var clock = new Clock(10);
var snake = new Snake();
var food = new Food();
var rock = new Rock();

var levels =[
	{fruitAmt: 5, snakeSpd: 10, rockAmt: 3},
	{fruitAmt: 10, snakeSpd: 10, rockAmt: 5},
	{fruitAmt: 15, snakeSpd: 10, rockAmt: 4},
	{fruitAmt: 5, snakeSpd: 6, rockAmt: 5},
	{fruitAmt: 10, snakeSpd: 6, rockAmt: 6},
	{fruitAmt: 8, snakeSpd: 4, rockAmt: 7}
]

var game = {
	state: 'running',
	currentLvl: 0,
	fruitAmt: 5,
	rockAmt: 5,
	snakeSpd: 10
};

function updateLevel() {

	if (game.currentLvl < levels.length){

		var index = game.currentLvl;

		game.fruitAmt = levels[index].fruitAmt;
		game.snakeSpd = levels[index].snakeSpd;
		game.rockAmt = levels[index].rockAmt;
	}

}

function gameLoad(){

	updateLevel();

	clock = new Clock(game.snakeSpd);
	food = new Food();
	rock = new Rock();

	food.initFood(game.fruitAmt);
	rock.initRocks(food, game.rockAmt);

	console.log(game);
}

function gameReset(){
	game.currentLvl = 0;
	updateLevel();

	clock = new Clock(game.snakeSpd);
	food = new Food();
	rock = new Rock();

	food.initFood(game.fruitAmt);
	rock.initRocks(food, game.rockAmt);
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// gameLose
function gameLose(){
	// check against game status
	paper(5);
	cls();
	pen(15);
	sprite(128, 40, 58);
	print("loser", 50, 60);
	game.state = "gameover";
	return;
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// gameWin
function gameWin(){
	// if obstacles are cleared then move to next level
	game.currentLvl += 1;

	paper(7);
	cls();
	pen(1);
	sprite(146, 40, 58);
	print("next level: " + game.currentLvl, 50, 60);
	game.state = "won";

}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Base functions

food.initFood(game.fruitAmt);
rock.initRocks(food, game.rockAmt);

var turnRequired = false;

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Update is called once per frame
exports.update = function () {
	if (game.state === "gameover") {
		if (btnp.A) {
			gameReset();

			snake.reset();

			game.state = "running";		
		}

	} else if (game.state === "won") {

		if (btnp.A) {
			gameLoad();

			var snakeBody = snake.segments.length;
			snake.reset(); // can take snakeBody as an argument

			game.state = "running";
		}

	} else if (game.state === "done") {

		paper(15);
		cls();
		pen(1);
		print("won game", 50, 60);

	} else if (game.state === "running") {

		if (btnp.A) turnRequired = true;

		if (!clock.tic()) return;

		if (!snake.alive){
			gameLose();
			return;
		}

		if (food.apples.length === 0){
			
			if (game.currentLvl === levels.length){
				console.log("win");
				game.state = "done";

				if (btnp.A) {
					gameReset();

					snake.reset();

					game.state = "running";		
				}

			}

			gameWin();

			return;
		}

		paper(14);
		cls();
		pen(8);
		print("level " + game.currentLvl, 10, 110);

		if (turnRequired) {
			snake.turn();
			turnRequired = false;
		}

		snake.draw();
		snake.move();

		// Draw Food
		food.draw();
		rock.draw();

		// Update Snake
		snake.update(food, rock);

	}
};
