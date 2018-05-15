var gulp = require('gulp');
//引入gulp组件

//雪碧图生成
var spritesmith = require('gulp.spritesmith');
//js语法检查
var jshint = require('gulp-jshint');
//sass预处理
var sass = require('gulp-sass');
//文件合并
var concat = require('gulp-concat');
//js压缩
var uglify = require('gulp-uglify');
//重命名
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
//server服务
browserSync = require('browser-sync').create();


var jsFiles = [
    './Hilo/build/standalone/hilo-standalone.min.js',
    './Hilo/build/flash/hilo-flash.min.js'
];


//检查脚本
gulp.task('lint', function() {
  gulp.src('./javascripts/**/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('default'));

});
var imagesSrc = [
  // 'image_modules/app_Grade/*.png',
  // 'image_modules/cutDown/*.png',
  // 'image_modules/enterGame/*.png',
  // 'image_modules/gamePause/*.png',
  // 'image_modules/gameRenew/*.png',
  // 'image_modules/gameRules/*.png',
  'image_modules/gameScene/*.png'
  // 'image_modules/rankList/*.png',
  // 'image_modules/wx_Grade/*.png'
];
var imagesName = [
  // 'app_Grade',
  // 'cutDown',
  // 'enterGame',
  // 'gamePause',
  // 'gameRenew',
  // 'gameRules',
  'gameScene'
  // 'rankList',
  // 'wx_Grade'
];
//合成雪碧图
gulp.task('images', function() {
    for(var i = 0 ; i < imagesSrc.length ; i++) {
         gulp.src(imagesSrc[i])                                      //需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'images/' + imagesName[i] + '_sprite.png',                                     //保存合并后图片的地址
            cssName: './dist/css/' + imagesName[i] + '_sprite.css',                                //保存合并后对于css样式的地址
            padding: 15,                                                        //合并时两个图片的间距
            algorithm: 'binary-tree',                                 //注释1
            cssTemplate:function (data) {
                var arr=[];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-"+sprite.name+
                    "{" +
                    "background-image: url(‘"+sprite.escaped_image+"‘);"+
                    "rect: ["+parseFloat(sprite.px.offset_x)*-1+", "+ parseFloat(sprite.px.offset_y)*-1+","+parseFloat(sprite.px.width)+","+parseFloat(sprite.px.height)+"]"+
                    "}\n");
                });
                return arr.join("");
            }
        }))
        .pipe(gulp.dest('./'));

    }
});

//编译Sass
gulp.task('sass', function() {
  console.log('sass!');
  gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./scss'));
  gulp.src('./scss/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./styles/'))
    .pipe(minifycss())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('./dist/css/'))
})

//合并、压缩js文件
gulp.task('scripts', function() {
  console.log("scripts/");
  gulp.src('./javascripts/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(rename('index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
    gulp.src('./dist/js/game.js')
    .pipe(rename('game.min.js'))
    .pipe(uglify())
    .pipe(rename('game.min.js'))
    .pipe(gulp.dest('./dist/js'));
});
//合并、压缩来自npm的js资源文件
gulp.task('npmscripts', function() {
  return gulp.src(jsFiles)
  .pipe(concat('hilo.js'))
  .pipe(gulp.dest('./dist/js'))

  .pipe(rename('hilo.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'));
})

gulp.task('xh_js', function() {
	return gulp.src('./xh_js/*.js')
			.pipe(uglify())
			.pipe(gulp.dest('./xh_js/'));
});

//合并、压缩css文件
// gulp.task('css', function() {
//   gulp.src('./app/style/*.css')
//     .pipe(concat('style.css'))
//     .pipe(gulp.dest('./dist/css'))
//     // .pipe(rename('style.min.css'))
//     // .pipe(uglify())
//     // .pipe(gulp.dest('./dist/css'));
// });

 gulp.task('min-css', function() {
   gulp.src('./minCss/*.css')
     .pipe(uglify())
     .pipe(gulp.dest('./minCss/index.min.js'));
 });

//使用connect启动一个Web服务器
gulp.task('browserSync', function () {
  browserSync.init({
         server: {
             baseDir: "./"
         }
     });
});

//默认任务
gulp.task('default', function() {
  //gulp.run('npmscripts');
  gulp.run('sass');
 // gulp.run('scripts');
//监听js变化
browserSync.init({
       server: {
           baseDir: "./"
       }
   });

gulp.watch('./javascripts/*.js', ['lint', 'scripts']);
gulp.watch('./dist/js/game.js',['scripts']);
gulp.watch('./scss/*.scss', ['sass']);

// gulp.watch('./app/style/**/*.css', ['css'])

gulp.watch('./dist/**', function() {
       console.log('reload');
       browserSync.reload();    
});

})
