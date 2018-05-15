;(function(game) {
	//console.log(window.Game);
	var Asset = game.Asset = Hilo.Class.create({
		Mixes: Hilo.EventMixin,
		queue: null,
		sound: null,
		timeflag: null,
		dom: null,

		gameEnter: null,
		gameRules: null,
		gameScene: null,
		gamePause: null,
		gameRenew: null,
		gameOver: null,
		cutDown: null,
		appGrade: null,
		//预加载游戏所需要的资源
		load: function() {
			//资源列表
			var resource = [
				{id: 'cutDown', src: '../images/cutDown_sprite.png'},
				{id:'enterGame', src:'../images/enterGame_sprite.png'},
				{id: 'gameRules', src: '../images/gameRules_sprite.png'},
				{id: 'gameScene', src: '../images/gameScene_sprite.png'},
				{id: 'gamePause', src: '../images/gamePause_sprite.png'},
				{id: 'gameRenew', src: '../images/gameRenew_sprite.png'},
				{id: 'gameOver', src: '../images/wx_Grade_sprite.png'},
				{id: 'appGrade', src: '../images/app_Grade_sprite.png'}
			//	{id: 'sprite', src: '../images/sprite.png'}
			];
			this.dom = document.getElementById('load-progress');
			//console.log(resource);
			//创建资源加载的队列
			this.queue = new Hilo.LoadQueue();
			this.queue.maxConnections = 4;
			this.queue.add(resource);
			//绑定资源加载完成后的处理事件
			this.queue.on('complete',this.onComplete.bind(this));
			//资源预加载启动
			this.queue.start();
			this.timeflag = window.setInterval(this.checkLoad.bind(this),10);
		},
		checkLoad: function() {
			var loaded = this.queue.getLoaded();
			if(this.queue.getSize) console.log("资源的大小：" + this.queue.getSize(false));
			else console.log("getSize方法失效");
			//console.log("已经加载的资源:"+loaded);
			var totalLoad = this.queue.getTotal();
			//console.log("需要加载的全部资源：" + totalLoad);
			var pixs = parseFloat(loaded/totalLoad * 100);
			//console.log(pixs);
			pixs = pixs.toFixed(2);
			this.dom.innerHTML = pixs + '%';
			if(pixs == 100.00) window.clearInterval(this.timeflag);
		},
		onComplete: function() {
			//再资源加载完成后获取相应的资源
			//this.background = this.queue.get('bg').content;
			//this.sprite = this.queue.get('sprite').content;

			//雪碧图数据接收
			this.gameEnter = this.queue.get('enterGame').content;
			this.gameRules = this.queue.get('gameRules').content;
			this.gameScene = this.queue.get('gameScene').content;
			this.gamePause = this.queue.get('gamePause').content;
			this.gameRenew = this.queue.get('gameRenew').content;
			this.gameOver = this.queue.get('gameOver').content;
			this.cutDown = this.queue.get('cutDown').content;
			this.appGrade = this.queue.get('appGrade').content;
			this.queue.off('complete');
			//window.clearInterval(this.flag);
			this.dom.style.display = 'none';
        		this.fire('complete');
		}
		
	});

})(window.Game);
;(function(game) {
	var enterScene = game.EnterScene = Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			enterScene.superclass.constructor.call(this,properties);
			this.init();
		},
		init: function(properties) {
			var background = new Hilo.Bitmap({
				id: 'enterbackground',
				image: game.asset.gameEnter,
				rect: [0,0,720,1166],
				//width: 1440
				scaleX: game.scaleX,
				scaleY: game.scaleY,
				x: 0,
				y: 0
			});
			// background.width *= 2;
			// background.height *= 2;
			// background.scaleX /= 2;
			// background.scaleY /=2;
			//console.log(game);
			//进入按钮的设定
			var enterBtn = new Hilo.Bitmap({
				id: 'enterBtn',
				image: game.asset.gameEnter,
				rect: [735, 0,318,100],
				// // height: bgHeight,
				 y: game.stage.height/5*4,
				scaleX: game.scaleX,
				scaleY: game.scaleY
			});
			// enterBtn.width *= 2;
			// enterBtn.height *= 2;
			console.log(enterBtn);
			// var enterBtnContainer = new Hilo.Container({
			// 	id: 'enterBtnContainer',
			// 	 y: game.height/5*4
			// });
			//enterBtn.addChild(enterBtn);
			this.addChild(background,enterBtn);
			enterBtn.x = (game.width - enterBtn.width * enterBtn.scaleX)/2;
			//绑定进入按钮的事件
			enterBtn.on('touchstart',function(e) {
				Game.stage.removeChild(game.enterScene);
				Game.gameReady();
				console.log("正在点击图片");
			});
		}
	});
})(window.Game);
;(function(game) {
	var gameBtn = game.GameBtn = new Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			gameBtn.superclass.constructor.call(this, properties);
			this.init();
		},
		init: function(properties) {
			var left_btn = new Hilo.Bitmap({
				id: 'runBtn_left',
				image: game.asset.gameScene,
				rect: [0, 446,266,120],
				scaleX: game.scaleX,
				scaleY: game.scaleY
			});
			var right_btn = new Hilo.Bitmap({
				id: 'runBtn_right',
				image: game.asset.gameScene,
				rect: [570, 135,266,120],
				scaleX: game.scaleX,
				scaleY: game.scaleY
			});
			left_btn.x = (game.width - (left_btn.width * 2 + left_btn.width/4)*left_btn.scaleX)/2;
			right_btn.x = left_btn.x + left_btn.width*5/4*left_btn.scaleX;
			left_btn.y = right_btn.y = this.width/8;
			this.addChild(left_btn,right_btn);
			right_btn.on('touchstart', function() {
				game.nextFoot = 'right';
				game.gamestep();
			});
			left_btn.on('touchstart', function() {
				game.nextFoot = 'left';
				game.gamestep();
			});
		}
	});
})(window.Game);
;(function(game) {

})(window.Game);
;(function(game) {
	var overScene = game.OverScene = new Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			overScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			console.log(properties);
			var overTips = new Hilo.Bitmap({
				id: 'overTips',
				image: game.asset.gameOver,
				rect: [0, 0,556,606],
				scaleX: 0.55,
				scaleY: 0.55
			});
			var shareBtn = null;
			var downLoadBtn = null;
			if(game.configs.uid) {
				shareBtn = new Hilo.Bitmap({
					id: 'shareBtn',
					image: game.asset.appGrade,
					rect: [571, 249,204,62],
					scaleX: 0.5,
					scaleY: 0.5
				});
				shareBtn.on('touchstart',function() {
					console.log(game.overScene);
					console.log('test');
					game.stage.removeChild(game.OverScene);
					//$('.rank-container').show();
				});
				downLoadBtn = new Hilo.Bitmap({
					id: 'viewRankListBtn',
					image: game.asset.appGrade,
					rect: [571, 0,422,68],
					scaleX: 0.5,
					scaleY: 0.5
				});
			} else  {
				shareBtn = new Hilo.Bitmap({
					id: 'shareBtn',
					image: game.asset.gameOver,
					rect: [571, 249,204,62],
					scaleX: 0.5,
					scaleY: 0.5
				});

				downLoadBtn = new Hilo.Bitmap({
					id: 'viewRankListBtn',
					image: game.asset.gameOver,
					rect: [571, 0,422,68],
					scaleX: 0.5,
					scaleY: 0.5
				});
			}
			var playAgainBtn = new Hilo.Bitmap({
				id: 'playAgainBtn',
				image: game.asset.gameOver,
				rect: [571, 403,204,62],
				scaleX: 0.5,
				scaleY: 0.5
			});
			var overBaseBtn = new Hilo.Bitmap({
				id: 'overBaseBtn',
				image: game.asset.gameOver,
				rect: [571, 166,418,68],
				scaleX: 0.5,
				scaleY: 0.5
			});
			var showText = new Hilo.Text({
				width: this.width*0.4,
				text: '恭喜你，你的成绩是',
				scaleX: 1.8,
				scaleY: 1.8,
				textAlign: 'center',
				y: overTips.y
			});

			var GradeTime = new Hilo.Text({
				id: 'GradeTime',
				text: properties.Grade.score + '秒',
				color: '#d34',
				scaleX: 3,
				scaleY: 3,
				width: this.width/4,
				textAlign: 'center'
			});
			var rankText = new Hilo.Text({
				id: 'rankText',
				text: '本次排名'+ properties.Grade.cur_rank +'名',
				width: this.width/3,
				scaleX: 1.8,
				scaleY: 1.8,
				textAlign: 'center'
			});
			var historyRank = new Hilo.Text({
				id: 'historyRank',
				text: '历史最好排名'+ properties.Grade.best_rank +'名',
				width: this.width/3,
				scaleX: 1.5,
				scaleY: 1.5,
				textAlign: 'center'
			});

			var overRank = new Hilo.Text({
				id: 'overRank',
				text: '打败了'+properties.Grade.beat+'%的参赛者',
				width: this.width/3,
				scaleX: 1.8,
				scaleY: 1.8,
				textAlign: 'center'
			});
			var coinText = new Hilo.Text({
				id: 'coinText',
				text: '奖励' + properties.Grade.coin + '个奥运币',
				width: this.width/3,
				scaleX: 1.5,
				scaleY: 1.5,
				textAlign: 'center'
			});
			GradeTime.x = (this.width - GradeTime.width*GradeTime.scaleX)/2;
			GradeTime.y = this.height/3 + 15;
			rankText.x = (this.width - rankText.width*rankText.scaleX)/2;
			rankText.y = GradeTime.y + 45;
			historyRank.x = (this.width - historyRank.width*historyRank.scaleX)/2;
			historyRank.y = rankText.y + 32;
			overRank.x = rankText.x;
			overRank.y = historyRank.y + 30;
			coinText.x =  (this.width - coinText.width*coinText.scaleX)/2;
			coinText.y = overRank.y + 32;
			overTips.x = (game.width - overTips.width*overTips.scaleX)/2;
			overTips.y = game.height/5;
			showText.x =  overTips.x;
			showText.y = overTips.y + overTips.height*overTips.scaleY/5;
			downLoadBtn.x  =  (game.width - downLoadBtn.width*downLoadBtn.scaleX)/2;
			downLoadBtn.y = overTips.y + overTips.height*overTips.scaleY/5*4;
			overBaseBtn.x = (game.width - overBaseBtn.width*overBaseBtn.scaleX)/2;
			overBaseBtn.y = overTips.y + overTips.height*overTips.scaleY - overBaseBtn.height* overBaseBtn.scaleY/3*2;
			shareBtn.x = overBaseBtn.x +1;
			shareBtn.y = overBaseBtn.y + 2;
			playAgainBtn.x = shareBtn.x + shareBtn.width*shareBtn.scaleX + 2;
			playAgainBtn.y = shareBtn.y;
			this.addChild(overTips,downLoadBtn,overBaseBtn,shareBtn,playAgainBtn,showText,GradeTime,rankText,historyRank,overRank,coinText);
			playAgainBtn.on('touchstart', function() {
				game.stage.removeChild(game.overScene);
				game.playAgain();
			});
		}
	});

	function showRank() {
		
	}
})(window.Game);


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
				console.log('游戏继续');
				game.state = 'playing';
				game.startTime = new Date();
				game.ticker.resume();
				game.stage.removeChild(Game.pauseScene);
				console.log("進入了這裏？");
			});
		}
	});
})(window.Game);
;(function(game) {
	var Person = game.Person = new Hilo.Class.create({
		Extends: Hilo.Container,
		constructor: function(properties) {
			Person.superclass.constructor.call(this,properties);
			this.init(properties);
		},
		init: function(properties) {
			var person = new Hilo.Bitmap({
				id: 'personChild',
				image: properties.image,
				rect: [285, 0,270,332],
				scaleX: 0.5,
				scaleY: 0.5
			});
			person.x = (game.width - person.width*person.scaleX)/2;
			person.y = game.height/12*7;
			this.addChild(person);
		}
	});
})(window.Game);
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
				scaleX: game.scaleX,
				scaleY: game.scaleY,
				x: progressBar.x + progressBar.width * progressBar.scaleX*0.12,
				y: progressBar.y + progressBar.height * progressBar.scaleY*0.27
			});
			console.log(progress);
			console.log(progressBar);
			console.log(properties.image);
			// return;
			var GradeBar = new Hilo.Bitmap({
				image: properties.image,
				rect: [281, 446,200,64],
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
			console.log(Grade);
			//绑定游戏暂停处理事件
			console.log(pauseBtn);
			console.log(renewBtn);
			pauseBtn.on(Hilo.event.POINTER_START, function() {
				console.log("这个是游戏暂停按钮");
				game.gamePause('pause');
			});
			//绑定游戏重新开始处理事件
			renewBtn.on(Hilo.event.POINTER_START, function() {
				game.gameRenew();
				console.log("这个是游戏重来按钮");
			});
			this.addChild(background,GradeBar,Grade,progressBar,progress,pauseBtn,renewBtn);
		}
	});
})(window.Game);
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
				console.log('游戏继续');
				game.startTime = new Date();
				Game.state = 'playing';
				Game.ticker.resume();
				Game.stage.removeChild(Game.renewScene);
				console.log("進入了這裏？");
			});
			// console.log(cancelBtn);
			
		}
	});
})(window.Game);
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
				console.log("这个是开始游戏的按钮");
				game.stage.removeChild(game.ruleScene);
				game.initSence();
				game.initPersion();
				game.gameCutDown();
			});
		}
	});
})(window.Game);
;(function(game){
	var Tips = game.Tips = Hilo.Class.create({
			Extends: Hilo.Container,
			constructor: function(properties) {
				Tips.superclass.constructor.call(this, properties);
				this.initTips(properties);
			},
		gameTips: null,
		gameRulesContent: null,
		initTips:function(properties) {
			this.gameTips = new Hilo.Bitmap({
				id: 'gameRules',
				x: game.width/8,
				width: game.width/8*7,
				y: game.height/7,
				rect: properties.rect,
				image: properties.image,
				scaleX: 0.5,
				scaleY: 0.5
				//rect: properties.rect
			});
			this.gameRulesContent = new Hilo.Bitmap({
				id: 'gameRulesContent',
				width: game.width/8*7,
				x: game.width/8 + this.gameTips.width/20,
				y: game.height/7 + this.gameTips.height/8,
				rect: [734, 679,444,448],
				image: properties.image,
				scaleX: 0.5,
				scaleY: 0.5
			});
			//var startBtn = 
			this.addChild(this.gameTips,this.gameRulesContent);

		},
		addGameChar: function(properties) {
		}
	});
})(window.Game);