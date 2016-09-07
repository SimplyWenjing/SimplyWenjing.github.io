//导入工具包 require('node_modules里对应模块')
var gulp     = require('gulp'),
    less     = require('gulp-less'),
	cssmin   = require('gulp-clean-css'),
	htmlmin  = require('gulp-htmlmin'),
	imagemin = require('gulp-imagemin'),
	jsmin    = require('gulp-uglify'),
	jsconcat = require('gulp-concat');
//定义一个testLess任务(自定义任务名称)
/*gulp.task('testLess',function(){
	gulp.src('src/css/*.less')//该任务针对的文件
		.pipe(less())//该任务调用的模块
		.pipe(gulp.dest('dist/css/less'));//在css/下生成style.css
});*/
//压缩css
gulp.task('cssMin',function(){
	gulp.src('css/*.css')
		.pipe(cssmin({
			advanced:false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
			compatibility:'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
			keepBreaks:false,//类型：Boolean 默认：false [是否保留换行]
			keepSpecialComments:'*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
		}))
		.pipe(gulp.dest('dist/css'));
});
//压缩html
gulp.task('htmlMin',function() {
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')
    	.pipe(htmlmin(options))
    	.pipe(gulp.dest('dist'));
});
//压缩图片
gulp.task('imageMin',function () {
	var options = {
		optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
	}
	gulp.src('src/images/*.{jpg,png,ico,gif}')
		.pipe(imagemin(options))
		.pipe(gulp.dest('dist/images'));
});
//压缩js
gulp.task('jsMin',function() {
	var options = {
		mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
        //preserveComments: 'all' //保留所有注释
	}
	gulp.src('src/js/*.js')
		.pipe(jsmin(options))
		.pipe(gulp.dest('dist/js'))
});
//合并js文件，减少http请求
gulp.task('jsConcat',function(){
	gulp.src('src/js/*.js')
        .pipe(jsconcat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
})
//默认任务
gulp.task('default', ['cssMin','htmlMin','imageMin','jsMin','jsConcat']);
