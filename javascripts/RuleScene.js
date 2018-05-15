;(function(game) {
	var ruleScene = game.RuleScene = Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			ruleScene.superclass.constructor.call(this,properties);
			this.init(properties);
		},
		init: function(properties) {
			var background = new Hilo.Bitmap({
				id: 'enterbackground',
				image: game.asset.gameRules,
				rect: [0,0,720,1166],
				scaleX: game.scaleX,
				scaleY: game.scaleY,
				x: 0,
				y: 0
			});
			var tipsBackground = new Hilo.Bitmap({
				id: 'ruleTipsBackground',
				image: game.asset.gameRules,
				rect: [734, 0,558,664],
				scaleX: game.scaleX + 0.05,
				scaleY: game.scaleY  + 0.05
			});
			var tipsContent = new Hilo.Bitmap({
				id: 'ruleTipsContent',
				image: game.asset.gameRules,
				rect: [734, 679,444,448],
				scaleX: game.scaleX + 0.1,
				scaleY: game.scaleY + 0.1
			});
			//游戏开始按钮
			var startBtn = new Hilo.Bitmap({
				id: 'startBtn',
				image: game.asset.gameRules,
				width: game.Width/2,
				rect: [1307, 143,432,128],
				scaleX: game.scaleX,
				scaleY: game.scaleY,
			});
			tipsBackground.x =  (game.width - tipsBackground.width * tipsBackground.scaleX)/2;
			tipsBackground.y = game.height/10;
			tipsContent.x = tipsBackground.x + tipsBackground.width/15*tipsBackground.scaleX;
			tipsContent.y = tipsBackground.y + tipsBackground.height/5*tipsBackground.scaleY;
			startBtn.x = (game.width - startBtn.width * startBtn.scaleX)/2;
			startBtn.y = game.height/5*4;

			this.addChild(background,tipsBackground,tipsContent,startBtn);
			//绑定进入按钮的事件
			startBtn.on('touchstart', function(e) {
				//console.log("这个是开始游戏的按钮");
				game.stage.removeChild(game.ruleScene);
				game.initSence();
				game.initPersion();
				game.gameCutDown();
			});
		}
	});
})(window.Game);