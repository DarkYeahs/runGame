window.onload = function() {
	zjnative.init(function() {
		Game.init();
		var config = zjnative.getUserInfo();
		if(config && config.token && config.uid) {
			Game.configs.ak = config.token;
			Game.configs.uid = config.uid
			Game.env_flag = true;
		} else {
			Game.env_flag = false;
		}
	});
	$('.share-btn').on('touchend', function() {
		if(!Game.configs.uid) {
			location.href = "http://dl.app.doubimeizhi.com/fingertip/?from=activity";
		} else {
			var data = [];
			data[0] = "玩指尖飞人，赢大奖";
			data[1] = "我在指尖飞人上跑出了" + Game.GradeTime + "秒的成绩，不服来战";
			jznative.startShare(function(){},data);
		}
	});
	$('.play-btn').on('touchend', function() {
		$('.grade-container').hide();
		Game.playAgain();
	});	
	$('.view-rank-btn').on('touchend', function() {
		if(!Game.configs.uid) {
			
		} else {
			$('.grade-container').hide();
			$('.grade-dialog').hide();
			$('.rank-container').show();
			//var url = 'http://active.app.doubimeizhi.com/olympic/v1/game/rank/report';
			var url = 'http://active.app.doubimeizhi.com/olympic/v1/game/rank/top';
			url += '?' + getString(Game.configs,salt);
			console.log(salt);
			var tpl =  "<li class='rank-item'>"
					+ "<span class='name'>$rank   $name</span>"
					+ "<span class='time'>$time秒</span>"
					+ "</li>";
			var tplActive =  "<li class='rank-item active'>"
					+ "<span class='name'>$rank   $name</span>"
					+ "<span class='time'>$time秒</span>"
					+ "</li>";
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				success: function(data) {
					console.log(data);
					var html = '';
					var personRank  = data.myrank.rank;
					var topData = data.top;
					for(var i = 0, len = topData.length; i < len ; i++) {
						if(topData[i].rank == personRank) {
							html += tplActive.replace(/\$rank/g, 'NO.' + topData[i].rank).replace(/\$name/g, topData[i].nick_name).replace(/\$time/g,topData[i].score);
						} else {
							html += tpl.replace(/\$rank/g, 'NO.' + topData[i].rank).replace(/\$name/g, topData[i].nick_name).replace(/\$time/g,topData[i].score);
						}
					}
					if(personRank > 10){
						html += tpl.replace(/\$rank/g, 'NO.' + data.myrank.rank).replace(/\$name/g, data.myrank.nick_name).replace(/\$time/g,data.myrank.score);
					}
					$('.rank-list').html(html);
					$('.rank-dialog').show();
				}
			});
		}
		
	});
	$('.btn').on('touchend', function() {
		$('.rank-container').hide();
		Game.playAgain();
	});
};
var Game = window.Game = {
	width:0,
	height: 0,

	widthSize: 720,
	heightSize: 1166,
	asset: null,
	stage: null,
	ticket: null,
	runTime: 0,
	startTime: 0,
	endTime: 0,
	clickNum: 0,
	runLength: 0,
	runSpeech: 0,
	limitLength: 0,
	refreshTime: 12,
	enterBtn: null,
	sound: null,
	person: null,
	gameReadySence: null,
	gameOverSence: null,
	flag: null,
	startBtn: null,
	state: null,
	pauseScene: null,
	renewScene: null,
	GradeTime:null,
	enterScene: null,
	ruleScene: null,
	leftMove: 0,
	totalClick: 0,
	scaleX: 0,
	scaleY:0,
	currentFoot: null,
	nextFoot: null,
	personFlag: false,
	oldClick: 0,
	init: function(num) {
		console.log(window);
		console.log(window.devicePixelRatio);
		this.asset = new Game.Asset();
		this.totalClick = 200;
		console.log(this.asset);
		this.limitLength = 200;
		this.asset.on('complete', function(e) {
			this.asset.off('complete');
			this.initStage();
			console.log("测试图片加载");
		}.bind(this));
		this.asset.load();
	},
	initStage: function() {
		//舞台初始化
		this.width = document.body.offsetWidth ||document.documentElement.clientWidth;
		this.height = document.body.offsetHeight || document.documentElement.clientHeight;
		var gameContainer = document.getElementById('game-container');
		this.stage = new Hilo.Stage({
		    id: 'runStage',
		    renderType:'canvas',
		    container: gameContainer,
		    width: this.width,
		    height: this.height 
		});
		// this.stage.canvas.height *= 2;
		//  this.stage.canvas.width *= 2;
		if(this.stage.canvas.clearCanvas) {
			console.log(this.stage.canvas.clearCanvas);
		} else {
			console.log("不存在該方法");
			console.log(this.stage);
		}
		this.scaleX = this.width/this.widthSize;
		this.scaleY = this.height/this.heightSize;
		
		console.log(this.stage.canvas.getContext('2d'));
		//启动计时器
		this.ticker = new Hilo.Ticker(30);
		this.ticker.addTick(this.stage);
		this.ticker.addTick(Hilo.Tween);
		this.ticker.start();
		this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
		
		//绑定舞台刷新事件
		this.stage.onUpdate = this.onUpdate.bind(this);
		//初始化
		this.initEnterSence();
	},
	/**
	 * 游戏进入场景的初始化
	 * 对游戏一开始进入的场景
	 * 进行初始化排版
	 */
	initEnterSence:function() {
		if(!this.enterScene) {
			this.enterScene = new this.EnterScene({
				id: 'enterScene',
				width: this.width*2,
				height: this.height*2,
				x: 0,
				y: 0
			});
		}
		this.stage.addChild(this.enterScene);
	},
	/**
	 * 初始化游戏开始的场景
	 * 对进入游戏倒计时开始时
	 * 的场景进行排版初始化
	 */
	initSence: function() {
		//this.stage.removeChild(this.background);
		//绑定各种统计数据的场景
		this.gameReadySence = new this.ReadyScene({
			id:'readyScence',
			width: this.width,
			height: this.height/5,
			x: 0,
			y: 0,
			image: this.asset.gameScene
		}).addTo(this.stage);
		console.log(this.gameReadySence);
	//	
	//终点旗帜
		this.flag = new Hilo.Bitmap({
			id: 'flag',
			image: this.asset.gameScene,
			rect: [396, 581,148,42],
			scaleY: 0.2,
			scaleX: 0.2
		}).addTo(this.stage);
		this.leftMove = this.flag.x / this.totalClick;
		this.flag.x = (this.width - (this.flag.width*this.flag.scaleX))/2;
		this.flag.y = this.height/2 - 30;
		console.log(this.flag)
	},
	/**
	 * 对游戏人物进行初始化
	 */
	initPersion:function() {
		if(!this.person) {
			this.person = new this.Person({
				id: 'person',
				image: this.asset.gameScene,
				rect: [285, 0,370,332],
				x: 0,
				y: 0
			})
		}
		this.stage.addChild(this.person);
	},
	/**
	 * 初始化相应数据
	 */
	initCurrentScore: function() {
	},
	gamestep: function() {
		//if(Game.currentFoot && Game.currentFoot == Game.nextFoot) return;
		this.currentFoot = this.nextFoot;
		// var nextRect = null;
		// var target = this.person.children[0];
		// var currentRect = target.drawable.rect;
		// nextRect = currentRect.toString() == [0, 0,270,332].toString() ?  [285, 0,270,332] : [0, 0,270,332];
		// target.setImage(target.drawable.image,nextRect);
		this.clickNum++;
		console.log(this.clickNum);
		var increase = this.clickNum/10000;
		var bgincrease = increase*3/10;
		this.flag.scaleX += increase;
		this.flag.scaleY += increase;
		this.gameReadySence.children[0].scaleX += bgincrease;
		this.gameReadySence.children[0].scaleY += bgincrease;
		this.gameReadySence.children[0].y = (this.height - this.gameReadySence.children[0].height*this.gameReadySence.children[0].scaleY)/2;
		this.gameReadySence.children[0].x = (this.width - this.gameReadySence.children[0].width*this.gameReadySence.children[0].scaleX)/2;
		this.flag.x = (this.width - this.flag.width* this.flag.scaleX)/2;
		//this.stage.updateViewport();
	},
	gameReady: function() {
		if(!this.ruleScene) {
			this.ruleScene = new this.RuleScene({
				id: 'ruleScene',
				width: this.width,
				height: this.height,
				x: 0,
				y:0
			});
		}
		this.stage.addChild(this.ruleScene);
	},
	/**
	 * 游戏倒计时场景设定
	 */
	gameCutDown: function() {
		//设定遮罩层
		this.shade = new Hilo.Container({
			width: Game.width*2,
			height: Game.height*2,
			x: 0,
			y: 0,
			background: 'rgba(0,0,0,0.5)'
		}).addTo(this.stage);
		var numArea = [
			[0, 303,288,288],
			[606, 0,288,288],
			[303, 303,288,288]
		];
		var readyText = new Hilo.Text({
			color: '#fff',
			//font: '',
			text: '准备！！',
			//textHeight: 40,
			textAlign: 'center',
			width: Game.width/3,
			scaleX: 4,
			scaleY:4
		}).addTo(this.shade);
		readyText.x = (this.width - readyText.width*readyText.scaleX)/2 + 20;
		readyText.y = (this.height - readyText.height)/4;
		//倒计时文字
		var cutDownNum = new Hilo.Bitmap({
			id: 'cutDown',
			image: this.asset.cutDown,
			rect: numArea[2],
			scaleX:this.scaleX,
			scaleY:this.scaleY
		}).addTo(this.shade);
		cutDownNum.y = (this.height - cutDownNum.height*cutDownNum.scaleY)/2;
		cutDownNum.x = (this.width - cutDownNum.width*cutDownNum.scaleX)/2;
		var index = 0,nowNum = 3;
		//倒计时缓动器的设定
		Hilo.Tween.to(cutDownNum,{scaleX:this.scaleX},{
			duration: 3300,
			onUpdate: function() {
				index++;
				if(index%30 ==0) {
					nowNum--;
					if(nowNum == 0) return;
					cutDownNum.setImage(Game.asset.cutDown,numArea[nowNum-1]);
				}
			},
			onComplete: function() {
				console.log("倒计时结束，游戏开始了");
				this.clickNum = 0;
				cutDownNum.setImage(Game.asset.cutDown,numArea[0]);
				Game.stage.removeChild(Game.shade);
				Game.shade.removeChild(cutDownNum);
				Game.shade.removeChild(readyText);
				readyText = null;
				cutDownNum = null;
				Hilo.Tween.remove(this);
				Game.gameStart();
			}
		});
	},
	gameStart: function() {
		console.log("游戏在进行中");
		//j记录游戏开始时间
		
		this.startTime = new Date();
		//设定游戏按钮以及绑定按钮处理事件
		if(!this.gameBtn) {
			this.gameBtn = new this.GameBtn({
				width: this.width,
				height: this.height/4,
				x: 0,
				y: this.height/4*3
			});
		}
		this.stage.addChild(this.gameBtn);
	},
	gameOver: function() {
		console.log("游戏结束了");
		this.state = 'over';
		this.oldClick = 0;
		this.endTime = new Date();
		var time = ((this.endTime - this.startTime  + this.runTime) / 1000).toFixed(2);
		this.GradeTime = time;
		console.log("现在游戏已经持续了:" + time);
		var url = 'http://active.app.doubimeizhi.com/olympic/v1/game/rank/report';
		//var url = 'http://active.app.doubimeizhi.com/olympic/v1/game/rank/top';
		url += '?' + getString(this.configs,salt);
		//console.log(salt);
		$('.grade-container').show();

		if(!Game.configs.ak) {
			$('.share-btn img').attr('src','./images/btn_downLoad.png');
			$('.view-rank-btn img').attr('src','./images/btn_wshare.png');
		}
		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify({score:time,source: 0}),
			dataType: 'json',
			success: function(data) {
				console.log(data);
				var gradeContent = $('.grade-content');
				gradeContent.find('.time span').html(data.score);
				gradeContent.find('.current-rank span').html(data.cur_rank);
				if(data.best_rank > data.cur_rank && Game.env_flag) {
					gradeContent.find('.history-rank').hide();
					gradeContent.find('.rise-rank').show().find('span')
					.html(data.rank_up);
				} else if(Game.env_flag) {
					gradeContent.find('.rise-rank').hide();
					gradeContent.find('.history-rank span').show().html(data.best_rank);
				} else {
					gradeContent.find('.history-rank').hide();
					gradeContent.find('.rise-rank').hide();
				}
				gradeContent.find('.beat-num span').html(data.beat + '%');
				if(data.coin != 0) {
					gradeContent.find('.get-coin').show().find('span').html(data.coin);
				} else {
					gradeContent.find('.get-coin').hide();
				}
				$('.grade-dialog').show();
			}
		});
		//this.ticker.pause();
	},
	gamePause: function(state) {
		if(!this.pauseScene) {
			this.pauseScene = new this.PauseScene({
				width: this.width,
				height: this.height,
				x: 0,
				y: 0,
				background : 'rgba(0,0,0,0.5)'
			});
		}
		this.stage.addChild(this.pauseScene);
		console.log("游戏开始暂停");
		this.pause();
	},
	/**
	 * 暂停操作
	 * 
	 */
	pause: function() {
		console.log(this.runTime);
		console.log(this.startTime);
		this.endTime = new Date();
		console.log(this.endTime);
		this.runTime = this.runTime + parseInt(this.endTime - this.startTime);
		//this.startTime = this.endTime;
		this.state = 'pause';
	},
	gameRenew: function() {
		if(!Game.renewScene) {
			console.log(Game);
			Game.renewScene = new Game.RenewScene({
				id: 'renewScene',
				width: this.width,
				height: this.height,
				x: 0,
				y: 0,
				background: 'rgba(0,0,0,0.5)'
			});
		}
		this.stage.addChild(this.renewScene,10000);
		this.pause();
	},
	playAgain: function() {
		console.log('游戏重新开始');
		Game.state = 'playing';
		Game.runTime = 0;
		Game.startTime = 0;
		Game.endTime = 0;
		Game.clickNum = 0;
		//Game.initSence();
		this.flag.scaleX = 0.2;
		this.flag.scaleY = 0.2;
		Game.gameReadySence.children[0].scaleX = this.scaleX;
		Game.gameReadySence.children[0].scaleY = this.scaleY;
		Game.gameReadySence.children[0].x = 0;
		Game.gameReadySence.children[0].y = 0;
		this.flag.x = (this.width - (this.flag.width*this.flag.scaleX))/2;
		this.flag.y = this.height/2 - 30;
		Game.ticker.resume();
		Game.stage.removeChild(Game.shade);
		Game.shade.removeChild(this);
		Game.stage.removeChildById('runBtn_left');
		Game.stage.removeChildById('runBtn_right');
		Game.gameCutDown();
	},
	onUpdate: function() {
		//console.log(this.clickNum);
		
		if(this.person && this.person.children[0] && this.oldClick < this.clickNum) {
			console.log(this.oldClick,this.clickNum)
			this.oldClick++;
			var target = this.person.children[0];
			var currentRect = target.drawable.rect;
			var nextRect = currentRect.toString() == [0, 0,270,332].toString() ?  [285, 0,270,332] : [0, 0,270,332];
			target.setImage(target.drawable.image,nextRect);
		} else if(this.oldClick > this.clickNum) {
			this.oldClick = 0;
		}
		var allTime = (this.runTime + parseFloat(new Date() - this.startTime) + 1)/1000;
		var speed = this.clickNum / allTime;
		var speedShow = speed/this.refreshTime * 0.78;
		var readyLength = parseInt(this.clickNum/this.totalClick * 200);
		if(this.gameReadySence && this.gameReadySence.children) {
			//console.log(this.gameReadySence.children[3]);
			this.gameReadySence.children[4].scaleX = speedShow;
			this.gameReadySence.children[2].text = readyLength;
		}
		if(this.clickNum >= this.totalClick) this.gameOver();
		//if(this.clickNum == 20) this.gameOver();
		if(this.state == 'pause') this.ticker.pause(); 
		if(this.state == 'over') this.ticker.pause(); 
	}
};

Game.configs = {}; 
Game.configs.appkey = "067d2589ad6141799d935fb56495010c";
var salt = "7fb5e9cfa0184773be03006fc6064645";
// Game.configs.ak = "3c1997db10d74ffc98b558713a7b3248";
// Game.configs.uid = "5eb5aea94a3b4caf95179965ef602941";
function getSign(param,salt) {
	console.log(param);
	var keys = [];
	var str = '';
	for(var item in param) {
		if(item == 'sign' || !param[item]) continue;
		keys.push(item);
	}
	keys = keys.sort();
	for(var i = 0,len = keys.length ; i < len ; i++) {
		str += keys[i] + param[keys[i]];
	}
	str +=  salt;
	return md5(str);
}

function getString(configs,salt) {
	var params = [],
	i = 0;
	configs.time = parseInt(new Date()/1000);
	//console.log(configs);
	configs.sign = getSign(configs,salt);
	for(var item in configs) {
		params[i++] = item + "=" + configs[item];
	}
	params = params.join('&');
	return params;
}