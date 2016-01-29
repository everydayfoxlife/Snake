var constants = require('./constants');

var CELLWIDTH = constants.CELLWIDTH;
var CELLHEIGHT = constants.CELLHEIGHT;

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Rocks

function Rock(x,y){
	this.x = x || 0;
	this.y = y || 0;

	this.sprite = 96;

	this.rocks = [];
}

module.exports = Rock;

Rock.prototype.initRocks = function (food, amount) {
	var self = this;

	function getRandomPosition() {
		var x = random(15);
		var y = random(15);

		for(var i = 0; i < self.rocks.length; i++){
			if(x === self.rocks[i].x && y === self.rocks[i].y){
				return getRandomPosition();
			}
		}

		for(var i = 0; i < food.apples.length; i++){
			if(x === food.apples[i].x && y === food.apples[i].y){
				return getRandomPosition();
			}
		}

		return { x: x, y: y };
	}

	for(var i = 0; i < amount; i++){
		var position = getRandomPosition();
		this.rocks.push(new Rock(position.x, position.y));
	}
	
};

Rock.prototype.draw = function(){
	for(i = 0; i < this.rocks.length; i++){
		sprite(this.rocks[i].sprite, this.rocks[i].x　* CELLWIDTH, this.rocks[i].y * CELLHEIGHT);
	}

};