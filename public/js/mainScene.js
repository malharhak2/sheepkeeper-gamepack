define (["GameScene", "canvas", "config", "world", "images", "assetsManager",
	"imageManager", "Vector2", "time", "inputs", "enclos", "feedbacks", "sheepManager",
	"gameManager", "sign", "jquery", "loadingBar", "leadbolt"],
	function (GameScene, canvas, config, world, images, assetsManager,
		imageManager, Vector2, time, inputs, enclos, feedbacks, sheepManager,
		gameManager, sign, $, loadingBar, ads) {

	var startDate = time.time;
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
		startDate = time.time;
		this.showAds();
		console.log(startDate);
		callback();
	};
	// This is always called during loading (before init's callback is called)
	sampleScene.loading = function () {
		var t = config.adsTimer;
		if (assetsManager.isLoaded() && time.time - startDate > t) {
			console.log("dafuq", time.time - startDate);
			this.hideAds();
			this._loadCallback();
		}
		var percentage = (imageManager.getPercentage() + (time.time - startDate)) / (t + 1);
		canvas.ctx.drawImage(imageManager.get("background"), 0, 0);
		loadingBar.render (
			percentage, 
			canvas.ctx, 
			new Vector2(config.canvas.width / 2, config.canvas.height / 4)
		);
	};

	sampleScene.showAds = function () {
		ads.show();
	};
	sampleScene.hideAds = function () {
		ads.hide();
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