define (["GameScene", "canvas", "config", "world", "images", "assetsManager",
	"imageManager", "Vector2", "time", "inputs", "enclos", "feedbacks", "sheepManager",
	"gameManager", "sign"],
	function (GameScene, canvas, config, world, images, assetsManager,
		imageManager, Vector2, time, inputs, enclos, feedbacks, sheepManager,
		gameManager, sign) {

	var sampleScene = new GameScene("sample1");


	// This is called first and you should launch assets loading there


	sampleScene.init = function (callback) {
		self.startCallback = callback;
		// Adds the images to the scene
		imageManager.pushImages(images);
		time.reset();
		sheepManager.start();
		feedbacks.start();
		gameManager.reset();
		callback();
	};
	// This is always called during loading (before init's callback is called)
	sampleScene.loading = function () {
		if (assetsManager.isLoaded()) {
			this._loadCallback();
		}
	};

	// This is called after init's callback, you can initialize gameplay there
	sampleScene.start = function (callback) {
		gameManager.reset();
		var self = this;
		callback();
	};
	sampleScene.inputs = function () {
		if (inputs.mouse.buttons.left.pressed) {
			sheepManager.click (inputs.mouse.position);
		}
		if (gameManager.lost) {
			console.log("Lost, dafuq");
		}
		if (gameManager.lost && inputs.mouse.buttons.left.pressed) {
			console.log("WTTTTFFFF");
			this._changeScene("menu");
		}
	};
	
	sampleScene.update = function () {
		sheepManager.update();
		feedbacks.update();
	};
	sampleScene.render = function () {
		canvas.ctx.drawImage(imageManager.get("background"), 0, 0);
		enclos.render();
		sign.render();
		sheepManager.render();
		feedbacks.render();
	};


	return sampleScene;
});