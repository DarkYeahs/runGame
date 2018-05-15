;(function(game) {
	var pauseScene = game.PauseScene = Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			pauseScene.superclass.constructor.call(this,properties);
			this.init(properties);
		},
		init: function(properties) {

			var pauseTips = new Hilo.Bitmap({
				id: 'pauseTips',
				image: Game.asset.gamePause,
				rect: [0, 0,520,220],
				scaleX: 0.5,
				scaleY: 0.5,
				// // width: Game.width/3*2,
				// height: Game.height/3*2,
			});

			var continueBtn = new Hilo.Bitmap({
				id: 'continueBtn',
				image: Game.asset.gamePause,
				rect: [0, 370,286,120],
				scaleX: 0.5,
				scaleY: 0.5,
				width: 286,
				height: 120
			});
			pauseTips.x = (game.width - pauseTips.width*pauseTips.scaleX)/2;
			pauseTips.y = game.height/3;
			continueBtn.x = (game.width - continueBtn.width*continueBtn.scaleX)/2;
			continueBtn.y = pauseTips.y + pauseTips.height/3;
			
			this.addChild(pauseTips,continueBtn);
			continueBtn.on('touchstart', function() {
				this.pauseTips = null;
				//console.log('游戏继续');
				game.state = 'playing';
				game.startTime = new Date();
				game.ticker.resume();
				game.stage.removeChild(Game.pauseScene);
				//console.log("進入了這裏？");
			});
		}
	});
})(window.Game);