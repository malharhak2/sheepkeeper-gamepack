define (["Sheep", "config", "time", "Vector2", "enclos", "utils", "gameManager", "feedbacks"],
function (Sheep, config, time, Vector2, enclos, utils, gameManager, feedbacks) {
	var SheepManager = function () {
		this.lastSifflet = time.time;
	};

	SheepManager.prototype.start = function () {
		this.sheeps = [];
		for (var i = 0; i < config.sheeps.initialCount; i++) {
			this.createSheep();
		};
		this.lastSpawn = time.time;	
		this.lastSifflet = time.time - 1;
	}

	SheepManager.prototype.createSheep = function () {
		this.sheeps.push (new Sheep ( new Vector2(
			utils.random(enclos.x + 88, enclos.x + enclos.w - 88), 
			utils.random(enclos.y + 88, enclos.y + enclos.h - 88)
		) ) );
		this.lastSpawn = time.time;
	};

	SheepManager.prototype.click = function (position) {
		if (time.time - this.lastSifflet < config.sifflet.timer) {
			return;
		}
		feedbacks.add("sheepHome", {
			position : new Vector2(position.x, position.y)
		});
		this.lastSifflet = time.time;
		var x = position.x;
		var y = position.y;
	
		for (var i = 0; i < this.sheeps.length; i++) {
			var s = this.sheeps[i];
			if (utils.circleIntersect (position, config.sifflet.radius / 2, s.position, config.caseSize)) {
				this.sendSheepHome(s);
			}
			var pos = new Vector2(x, y);
			
		}
	};

	SheepManager.prototype.sendSheepHome = function (sheep) {
		if (sheep.goToHouse()) {
			gameManager.killEnemy();
		}
	};

	SheepManager.prototype.update = function () {
		if (time.time - this.lastSpawn > config.sheeps.spawnTimer) {
			this.createSheep();
		}
		for (var i = 0; i < this.sheeps.length; i++) {
			this.checkCollision (i);
			this.sheeps[i].update();
		};
	};

	SheepManager.prototype.checkCollision = function (id) {
		var s = this.sheeps[id];
		if (!utils.aabb (
			s.position.x, enclos.x + config.caseSize,
			s.position.y, enclos.y + config.caseSize,
			config.enclos.caseSize, enclos.w - config.caseSize * 2,
			config.enclos.caseSize, enclos.h - config.caseSize * 2)) {
			gameManager.lose();
		}
	}

	SheepManager.prototype.render = function () {
		for (var i = 0; i < this.sheeps.length; i++) {
			this.sheeps[i].render();
		};

	};

	SheepManager.prototype.destroySheep = function (id) {
		this.sheeps.splice(id, 1);
	};
	SheepManager.prototype.reset = function () {
		this.start();
	}

	return new SheepManager();
});