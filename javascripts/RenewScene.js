;(function(game) {
	var renewScene = game.RenewScene = new Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			renewScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var renewTips = new Hilo.Bitmap({
				id: 'pauseTips',
				image: Game.asset.gameRenew,
				rect: [0, 0,506,216],
				scaleX: 0.5,
				scaleY: 0.5
			});
			var baseBtn = new Hilo.Bitmap({
				id: 'baseBtn',
				image: Game.asset.gameRenew,
				rect: [0, 231,424,96],
				//width: 100,
				scaleX: 0.5,
				scaleY: 0.5
			});
			var cancelBtn  = new Hilo.Bitmap({
				id: 'cancelBtn',
				image: Game.asset.gameRenew,
				rect: [219, 342,204,86],
				scaleX: 0.5,
				scaleY: 0.5
			});
			var confirmBtn = new Hilo.Bitmap({
				id: 'confirmBtn',
				image: Game.asset.gameRenew,
				rect: [521, 101,204,86],
				scaleX: 0.5,
				scaleY: 0.5
			});

			renewTips.x = (game.width - renewTips.width*renewTips.scaleX)/2;
			
			renewTips.y = game.height/3;
			baseBtn.x = (game.width - baseBtn.width*baseBtn.scaleX)/2;
			baseBtn.y = renewTips.y + renewTips.height*renewTips.scaleY/4*3;
			cancelBtn.x = baseBtn.x + 4;
			cancelBtn.y = baseBtn.y + 2;
			confirmBtn.x = cancelBtn.x + cancelBtn.width*cancelBtn.scaleX + 2;
			confirmBtn.y = cancelBtn.y;

			//confirmBtn.x = 0;

			this.addChild(renewTips,baseBtn,cancelBtn,confirmBtn);
			confirmBtn.on('touchstart', function() {
				game.stage.removeChild(game.renewScene);
				game.playAgain();
			});
			cancelBtn.on('touchstart', function() {
				this.pauseTips = null;
				//console.log('游戏继续');
				game.startTime = new Date();
				Game.state = 'playing';
				Game.ticker.resume();
				Game.stage.removeChild(Game.renewScene);
				//console.log("進入了這裏？");
			});
			// console.log(cancelBtn);
			
		}
	});
})(window.Game);