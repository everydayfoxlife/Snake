//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Food (Base)
var constants = require('./constants');

function Food(type){
	var appleSprite = 0;

	this.isEdible = false;

	this.apples = [];
}

module.exports = Food;

Food.prototype.draw = function(){

	for(i = 0; i < this.apples.length; i++){
		sprite(this.apples[i].sprite, this.apples[i].x　* constants.CELLWIDTH, this.apples[i].y * constants.CELLHEIGHT);
	}

};

Food.prototype.destroy = function(apple){

	var index = this.apples.indexOf(apple);
	if (index === -1) return console.warn('food does not exist in foods array');
	this.apples.splice(index,1);

};

Food.prototype.initFood = function (amount) {
	var self = this;

	function getRandomPosition() {
		var x = random(15);
		var y = random(15);

		for(var i = 0; i < self.apples.length; i++){
			if(x === self.apples[i].x && y === self.apples[i].y){
				return getRandomPosition();
			}
		}

		return { x: x, y: y };
	}

	for(var i = 0; i < amount; i++){
		var position = getRandomPosition();
		this.apples.push(new RedApple(position.x, position.y));

		var position = getRandomPosition();
		this.apples.push(new GreenApple(position.x, position.y));
	}
	
};

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Food (Red Apple) (inherit Food)
function RedApple(x, y){
	this.sprite = 168;
	this.x = x;
	this.y = y;
	this.isEdible = true;
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// Food (Green Apple) (inherit Food)
function GreenApple(x, y){
	this.sprite = 167;
	this.x = x;
	this.y = y;
	this.isEdible = false;


}