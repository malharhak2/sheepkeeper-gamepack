define (["Vector2", "time", "config", "utils", "enclos", "gameManager", "Renderer", "graphics"],
function (Vector2, time, config, utils, enclos, gameManager, Renderer, graphics) {
	
	var Sheep = function (position) {
		this.position = position;
		this.takeRandomDirection();
		this.gettingHome = false;
		this.lastDirChange = time.time;
		this.nextDirChange = utils.random(config.sheeps.dirInterval[0], config.sheeps.dirInterval[1]);
		this.secondaryDirection = new Vector2(0, 0);
		this.renderer = new Renderer ({
			position : this.position,
			rotation : 0,
			pivot : new Vector2(35 / 2, 22 / 2),
			image : "sheep",
			width : 35,
			height : 22,
			scale : config.sheeps.scale

		});
	};

	Sheep.prototype.update = function () {
		if (this.gettingHome) {
			if (Math.abs (this.position.x - enclos.center.x) < 40 && Math.abs (this.position.y - enclos.center.y) < 40) {
				this.gettingHome = false;
				this.takeRandomDirection();
			}
		}
		if (time.time - this.lastDirChange > this.nextDirChange) {
			this.randomSecondaryDirection();
			this.lastDirChange = time.time;
			this.nextDirChange = utils.random(config.sheeps.dirInterval[0], config.sheeps.dirInterval[1]);
		}
		this.updateDirection();
		var moveOffset = this.move();
		this.position = this.position.add(moveOffset);
	};

	Sheep.prototype.move = function () {
		return this.actualDirection.scale (time.deltaTime * config.sheeps.speed);
	};

	Sheep.prototype.takeRandomDirection = function () {
		
		this.changeDirection(new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize());
	};

	Sheep.prototype.randomSecondaryDirection = function () {
		this.secondaryDirection = new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize().scale(0.4);
		this.lastDirChange = Date.now();
	};

	Sheep.prototype.changeDirection = function (direction) {
		this.direction = direction;
	};

	Sheep.prototype.updateDirection = function () {
		this.actualDirection = this.direction.add(this.secondaryDirection).normalize();
		this.angle = Math.atan2(this.actualDirection.y, this.actualDirection.x);
	}

	Sheep.prototype.goToHouse = function () {
		this.changeDirection( new Vector2(enclos.center.x - this.position.x, enclos.center.y - this.position.y).normalize() );
		this.gettingHome = true;
		return true;
	};

	Sheep.prototype.render = function () {
		this.renderer.position = this.position;
		this.renderer.rotation = utils.angleFromDir (this.actualDirection);
		graphics.renderObject (this.renderer);
	}

	return Sheep;
});