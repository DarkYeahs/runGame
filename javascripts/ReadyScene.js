;(function(game) {
	var ReadyScene = game.ReadyScene = Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			ReadyScene.superclass.constructor.call(this,properties);
			this.init(properties);
		},
		init: function(properties) {
			var background = new Hilo.Bitmap({
				id: 'gameBackground',
				image: game.asset.gameRules,
				rect: [0, 0,720,1166],
				scaleX: game.scaleX,
				scaleY: game.scaleY,
				x: 0,
				y:0
			});
			var progressBar = new Hilo.Bitmap({
				id: 'progressBar',
				image: properties.image,
				rect: [0, 347,464,84],
				scaleX: game.scaleX,
				scaleY: game.scaleY,
				x: 15,
				y: 10
			});
			var progress = new Hilo.Bitmap({
				id: 'progress',
				image: properties.image,
				rect: [496, 446,252,32],
				scaleX: 0,
				scaleY: game.scaleY,
				x: progressBar.x + progressBar.width * progressBar.scaleX*0.12,
				y: progressBar.y + progressBar.height * progressBar.scaleY*0.27
			});
			game.limitLength = progressBar.width*progressBar.scaleX*0.87/progress.width;
			// console.log(progress);
			// console.log(progressBar);
			// console.log(properties.image);
			// return;
			var GradeBar = new Hilo.Bitmap({
				image: properties.image,
				rect: [195, 446,200,64],
				x: 15,
				scaleX: game.scaleX,
				scaleY: game.scaleY,
			});
			var Grade = new Hilo.Text({
				width: GradeBar.width/8,
				text: '0',
				color: '#fff',
				scaleY: 1.7,
				scaleX: 1.7,
				textAlign: 'center'
			});
			//progressBar.addChild(progress);
			var pauseBtn = new Hilo.Bitmap({
				id: 'pauseBtn',
				image: properties.image,
				rect: [297, 581,84,84],
				scaleX: game.scaleX,
				scaleY: game.scaleY,
				y: 10
			});
			var renewBtn = new Hilo.Bitmap({
				id: 'renewBtn',
				image: properties.image,
				rect: [99, 581,84,84],
				scaleX: game.scaleX,
				scaleY: game.scaleY,
				y: 10
			});
			// progress.x = 0;
			// progress.y = 0;
			//progressBar.x = game.width/10;
			//progressBar.y = game.height/15;
			//pauseBtn.x = progressBar.x + progressBar.width + 10;	
			pauseBtn.x = progressBar.x + progressBar.width*progressBar.scaleX + 10;
			renewBtn.x = pauseBtn.x + pauseBtn.width*pauseBtn.scaleX + 8;
			GradeBar.y = progressBar.y + progressBar.height*progressBar.scaleY + 10;
			Grade.y = GradeBar.y + GradeBar.height*GradeBar.scaleY * 0.07;
			Grade.x = GradeBar.x + GradeBar.width*GradeBar.scaleX/3;
			//console.log(Grade);
			//绑定游戏暂停处理事件
			// console.log(pauseBtn);
			// console.log(renewBtn);
			pauseBtn.on(Hilo.event.POINTER_START, function() {
				game.gamePause('pause');
			});
			//绑定游戏重新开始处理事件
			renewBtn.on(Hilo.event.POINTER_START, function() {
				game.gameRenew();
				//console.log("这个是游戏重来按钮");
			});
			this.addChild(background,GradeBar,Grade,progressBar,progress,pauseBtn,renewBtn);
		}
	});
})(window.Game);