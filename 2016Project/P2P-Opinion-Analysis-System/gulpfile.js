//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-clean-css');

//定义一个testLess任务(自定义任务名称)
gulp.task('testLess',function(){
	gulp.src('css/style.less')//该任务针对的文件
		.pipe(less())//该任务调用的模块
		.pipe(gulp.dest('css/'));//在css/下生成style.css
});
gulp.task('cssMin',function(){
	gulp.src('css/*.css')
		.pipe(cssmin({
			advanced:false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
			compatibility:'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
			keepBreaks:false,//类型：Boolean 默认：false [是否保留换行]
			keepSpecialComments:'*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
		}))
		.pipe(gulp.dest('src/css'));
});
gulp.task('default', ['testLess','cssMin']);