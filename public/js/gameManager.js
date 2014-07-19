define(["time", "config"], function (time, config) {
	var gameManager = {
		score : 0,
		frags : 0,
		lost : false
	};

	gameManager.killEnemy = function () {
		this.score++;
		this.frags++;
	};

	gameManager.gameOver = function () {

	};
	gameManager.lose = function () {
		if (!this.lost) {
			this.lost = true;
			time.pause();
			this.saveScore();
		}
	};
	gameManager.saveScore = function () {
		var score = new NScore();
		score.setValue(this.score);
		nuggetaPlug.submitScoreRequest(score, "topscore", function (response) {
			if (config.debug) {
				console.log(response);
			}
		});
	};
	
	gameManager.reset = function () {
		time.reset();
		this.score = 0;
		this.frags = 0;
		this.lost = false;
	};

	return gameManager;
});