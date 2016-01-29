var CEILING = 0;
var LEFTWALL = 0;
var RIGHTWALL = 15;
var FLOOR = 15;

var constants = require('./constants');

var CELLWIDTH = constants.CELLWIDTH;
var CELLHEIGHT = constants.CELLHEIGHT;

function SnakeSegment(sprite, x, y) {
	this.sprite = sprite;
	this.x = x;
	this.y = y;
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Snake
function Snake(){

	this.segments = [
		new SnakeSegment(128, 2, 1)
	];

	this.direction = "right";

	this.alive = true;
	this.redApplesEaten = false;
}

module.exports = Snake;

Snake.prototype.setBodyLength = function (length) {
	for(var i = 0; i < length; i++){
		this.segments.push(new SnakeSegment(133, -1, 0));
	}
};


Snake.prototype.draw = function(){

	for (var i = 0; i < this.segments.length; i++){
		sprite(this.segments[i].sprite, this.segments[i].x * CELLWIDTH, this.segments[i].y * CELLHEIGHT);
	
	}
};

Snake.prototype.move = function(){

	var segPosX = this.segments[0].x;
	var segPosY = this.segments[0].y;

	if(!this.alive){
		return;
	}	

	if(this.direction === "right"){
		this.segments[0].x += 1;
	} else if(this.direction === "left"){
		this.segments[0].x -= 1;
	} else if(this.direction === "up"){
		this.segments[0].y -= 1;
	} else if(this.direction === "down"){
		this.segments[0].y += 1;
	}

	for (var i = 1; i < this.segments.length; i++){
		var currSegPosX = this.segments[i].x;
		var currSegPosY = this.segments[i].y;

		this.segments[i].x = segPosX;
		segPosX = currSegPosX;

		this.segments[i].y = segPosY;
		segPosY = currSegPosY;
	}

};

Snake.prototype.turn = function(){
	if (this.direction === "right"){
		this.direction = "down";
	} else if (this.direction === "down"){
		this.direction = "left";
	} else if (this.direction === "left"){
		this.direction = "up";
	} else if (this.direction === "up"){
		this.direction = "right";
	}
};

Snake.prototype.update = function (food, rock){
	for(var i = 0; i < food.apples.length; i++){
		if (this.segments[0].x === food.apples[i].x && this.segments[0].y === food.apples[i].y){
			if (food.apples[i].isEdible){
				this.redApplesEaten = true;
				food.destroy(food.apples[i]);
				this.segments.push(new SnakeSegment(149, -1, 0));
				this.segments[0].sprite = 146;
			} else if (!food.apples[i].isEdible && this.redApplesEaten){
				food.destroy(food.apples[i]);
				this.segments.push(new SnakeSegment(149, -1, 0));
			} else if (!food.apples[i].isEdible && !this.redApplesEaten){
				this.alive = false;
			} 

		}
	}

	for(var i = 0; i < rock.rocks.length; i++){
		if (this.segments[0].x === rock.rocks[i].x && this.segments[0].y === rock.rocks[i].y){
			this.alive = false;
		}
	}

	for(var i = 1; i < this.segments.length; i++){
		if (this.segments[0].x === this.segments[i].x && this.segments[0].y === this.segments[i].y){
			this.alive = false;
		}
	}

	if (this.segments[0].x > RIGHTWALL || 
		this.segments[0].x < LEFTWALL ||
		this.segments[0].y > FLOOR ||
		this.segments[0].y < CEILING){
		this.alive = false;
	}

};

Snake.prototype.reset = function(length){
	length = length || 0;
	this.segments = [
		new SnakeSegment(129, 2, 1)
	];
	this.direction = "right";
	this.segments[0].x = 0;
	this.segments[0].y = 0;
	this.alive = true;
	this.redApplesEaten = false;
	if (length) this.setBodyLength(length);
}