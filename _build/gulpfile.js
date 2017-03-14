//定义输出文件夹名称
var distFolder = "distH5";

//定义根目录路径
var baseUrl = "../src";
//定义html目录路径
var tplUrl = "../src/tpl/";
//定义js目录路径
var jsUrl = "../src/js/";
//定义css目录路径
var cssUrl = "../src/css/";
//定义sass目录路径
var sassUrl = "../src/sass/";
//定义less目录路径
var lessUrl = "../src/less/";
//定义font目录路径
var fontUrl = "../src/fonts/";
//定义img目录路径
var imgUrl = "../src/img/";
//定义媒体目录路径
var mediaUrl = "../media/";
//定义第三方库目录路径
var libUrl = "../src/lib/";
//定义版本号文件输出根目录
var revDist = "../rev/";
//定义html版本号输出目录路径
var revTplUrl = "../rev/tpl/";
//定义js版本号输出目录路径
var revJsUrl = "../rev/js/";
//定义css版本号输出目录路径
var revCssUrl = "../rev/css/";
//定义font版本号输出目录路径
var revFontUrl = "../rev/fonts/";
//定义img版本号输出目录路径
var revImgUrl = "../rev/img/";
//定义媒体文件版本号输出目录路径
var revMediaUrl = "../rev/media/";
//定义第三方库版本号输出目录路径
var revLibUrl = "../rev/lib/";

setDistFolder(distFolder);

function setDistFolder(distFolder){
    //定义输出目录名称
    distName = distFolder;
    //定义输出根目录
    dist = "../"+distFolder+"/";
    //定义html输出目录路径
    distTplUrl = "../"+distFolder+"/tpl/";
    //定义js输出目录路径
    distJsUrl = "../"+distFolder+"/js/";
    //定义css输出目录路径
    distCssUrl = "../"+distFolder+"/css/";
    //定义font输出目录路径
    distFontUrl = "../"+distFolder+"/fonts/";
    //定义img输出目录路径
    distImgUrl = "../"+distFolder+"/img/";
    //定义媒体输出目录路径
    distMediaUrl = "../"+distFolder+"/media/";
    //定义第三方库输出目录路径
    distLibUrl = "../"+distFolder+"/lib/";
    //定义html版本号输出目录路径
    revHtmlUrl = "../" + distFolder + "/rev/";
    //定义js版本号输出目录路径
    revJsUrl = "../" + distFolder + "/rev/js/";
    //定义css版本号输出目录路径
    revCssUrl = "../" + distFolder + "/rev/css/";
    //定义img版本号输出目录路径
    revImgUrl = "../" + distFolder + "/rev/img/";
    //定义字体文件版本号输出目录路径
    revFontsUrl = "../" + distFolder + "/rev/fonts/";
    revFontAwesomeUrl = "../" + distFolder + "/rev/font-awesome/";
    //定义第三方库版本号输出目录路径
    revLibUrl = "../" + distFolder + "/rev/lib/";
    //定义views输出目录路径
    revViewsUrl = "../" + distFolder + "/rev/views/";
    revCssUrl = "../" + distFolder + "/rev/css/";
}

var gulp = require('gulp'),
    //压缩html，可以压缩页面javascript、css，去除页面空格、注释，删除多余属性等操作
    html = require('gulp-htmlmin'),
    //sass编译
    sass = require('gulp-sass'),
    //对sass路径进行转换
    slash = require('slash'),
    //less编译
    less = require('gulp-less'),
    //css压缩
    minifycss = require('gulp-clean-css'),
    //js压缩
    uglify = require('gulp-uglify'),
    //文件合并
    concat = require('gulp-concat'),
    //文件重命名
    rename = require('gulp-rename'),
    //清空文件夹
    clean = require('gulp-clean'),
    //压缩图片文件（包括PNG、JPEG、GIF和SVG图片）
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    //对文件名加MD5后缀
    rev = require('gulp-rev'),
    //路径替换
    revCollector = require('gulp-rev-collector'),
    //上传ftp服务器
    ftp = require('gulp-ftp'),
    //上传sftp服务器
    sftp = require('gulp-sftp'),
    //控制task顺序
    gulpSequence = require('gulp-sequence');
    //创建服务器
    connect = require('gulp-connect');
    //任务提醒
    notify = require('gulp-notify');

//gulp-html参数配置
var htmlOptions = {
    //清除HTML注释
    removeComments: true,
    //压缩HTML
    //collapseWhitespace: true,
    //省略布尔属性的值 <input checked="true"/> ==> <input />
    collapseBooleanAttributes: true,
    //删除所有空格作属性值 <input id="" /> ==> <input />
    removeEmptyAttributes: true,
    //删除<script>的type="text/javascript"
    removeScriptTypeAttributes: true,
    //删除<style>和<link>的type="text/css"
    removeStyleLinkTypeAttributes: true,
    //压缩页面JS
    //minifyJS: true,
    //压缩页面CSS
    //minifyCSS: true
};

//tpl模板压缩
gulp.task('tpl',function(){
   gulp.src(baseUrl+'index.html')
    .pipe(html(htmlOptions))
    //.pipe(rev())
    .pipe(gulp.dest(dist))
    //.pipe(rev.manifest())
    //.pipe(gulp.dest(revDist))

   gulp.src(tplUrl+'**/*.html')
    .pipe(html(htmlOptions))
    // .pipe(rev())
    .pipe(gulp.dest(distTplUrl))
    .pipe(rev.manifest())
    .pipe(gulp.dest(revTplUrl))
});

//css压缩添加版本号
gulp.task('cssMin', function() {
    return gulp.src(cssUrl+'*.css')
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest(distCssUrl))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revCssUrl));
});

//css合并添加版本号
gulp.task('cssCon', function() {
    //需要处理的css文件，放到一个字符串数组里
    return gulp.src(cssUrl+'*.css')
        //合并后的文件名
        .pipe(concat('build.min.css'))
        //压缩处理成一行
        .pipe(minifycss())
        //文件名加MD5后缀
        .pipe(rev())
        //输出文件本地
        .pipe(gulp.dest(distCssUrl))
        //生成一个rev-manifest.json
        .pipe(rev.manifest())
        //将 rev-manifest.json 保存到 rev 目录内
        .pipe(gulp.dest(revCssUrl+'combine/'));
});

//复制未压缩的js添加版本号
gulp.task('jsNotMin', function () {
    return gulp.src([jsUrl+'config.js'])
        .pipe(rev())
        .pipe(gulp.dest(distJsUrl))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revJsUrl+'notmin/'));
});

//js压缩添加版本号
gulp.task('jsMin', function () {
    return gulp.src([jsUrl+'*.js', "!"+jsUrl+'config.js'])
        //.pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(distJsUrl))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revJsUrl+'min/'));
});

//js合并添加版本号
gulp.task('jsCon', function () {
    return gulp.src([jsUrl+'*.js', "!"+jsUrl+'config.js', "!"+jsUrl+'shareMin.js'])
        .pipe(uglify())
        .pipe(concat('build.min.js'))
        .pipe(rev())
        .pipe(gulp.dest(distJsUrl))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revJsUrl+'combine/'));
});

//图片压缩添加版本号
gulp.task('img',function() {
    return gulp.src(imgUrl+'**/*')
//      .pipe(rev())
        .pipe(imagemin({progressive: true, svgoPlugins:[{removeViewBox:false}], use:[pngquant({quality: '70'})]}))
        .pipe(gulp.dest(distImgUrl))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revImgUrl))
});

//sass编译
gulp.task('sass', function () {
    return gulp.src(sassUrl+'*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(cssUrl))
        //.pipe(connect.reload());
});

//less编译
gulp.task('less', function () {
    return gulp.src(lessUrl+'*.less')
        .pipe(less())
        .pipe(gulp.dest(cssUrl));
});

//添加版本号
gulp.task('revIndex', function () {
    return gulp.src([revDist+'**/*.json', dist+'index.html'])
        .pipe(revCollector({ replaceReved:true }))
        .pipe(gulp.dest(dist))
});
gulp.task('revTpl', function () {
    return gulp.src([revDist+'**/*.json', distTplUrl+'**/*.html'])
        .pipe(revCollector({ replaceReved:true }))
        .pipe(gulp.dest(distTplUrl))
});
gulp.task('revCss', function () {
    return gulp.src([revDist+'**/*.json', distCssUrl+'**/*.css'])
        .pipe(revCollector({ replaceReved:true }))
        .pipe(gulp.dest(distCssUrl))
});
gulp.task('revJs', function () {
    return gulp.src([revDist+'**/*.json', distJsUrl+'**/*.js'])
        .pipe(revCollector({ replaceReved:true }))
        .pipe(gulp.dest(distJsUrl))
});

//复制媒体文件和lib文件
gulp.task('copyFile', function () {
    gulp.src([mediaUrl+'**/*'])
        .pipe(rev())
        .pipe(gulp.dest(distMediaUrl))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revMediaUrl));

    gulp.src([fontUrl+'**/*'])
        .pipe(rev())
        .pipe(gulp.dest(distFontUrl))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revFontUrl));

    gulp.src([libUrl+'**/*'])
        .pipe(rev())
        .pipe(gulp.dest(distLibUrl))
        .pipe(rev.manifest())
        .pipe(gulp.dest(revLibUrl));
});

//清空输出目录并删除改目录
gulp.task('clean', function() {
    return gulp.src([baseUrl+distName, baseUrl+'/rev'], {read: false})
        .pipe(clean({force: true}));
});

//var ftpConfig = {
//    "localPath": {
//        "base": "../dist/"
//    },
//    "remotePath": {
//        "base": "dreamGame",
//        "project": "/var/disk/web/dev_local/app_web0/m.huanhuba.com/h5dev/dreamGame"
//    },
//    "project":{
//        "ftpTest": {
//            "use": true,
//            "host": "120.55.102.1",
//            "port":"220",
//            "user": "web",
//            "pass": "web123!@#"
//        }
//    }
//}
////上传ftp服务器
//gulp.task('ftp', function () {
//    return gulp.src(ftpConfig)
//            .pipe(sftp({
//                host: '120.55.102.1',
//                port: 220,
//                user: 'web',
//                pass: 'web123!@#'
//            }));
//})

//使用connect启动一个Web服务器
gulp.task('connect', function () {
  connect.server({
    //服务器根目录
    root: baseUrl,
    //访问IP
    ip: '127.1.1.1',
    //访问端口
    port: '8080',
    //是否启用热加载
    livereload: false
  });
});

//添加版本号
gulp.task('revHtml', function() {
    return gulp.src([revHtmlUrl + '**/*.json', distTplUrl + '*.html'])
        .pipe(revCollector({ replaceReved: true }))
        .pipe(gulp.dest(distTplUrl))
});
gulp.task('revCss', function() {
    return gulp.src([revHtmlUrl + '**/*.json', distCssUrl + '**/*.css'])
        .pipe(revCollector({ replaceReved: true }))
        .pipe(gulp.dest(distCssUrl))
});
gulp.task('revJs', function() {
    return gulp.src([revHtmlUrl + '**/*.json', distJsUrl + '**/*.js'])
        .pipe(revCollector({ replaceReved: true }))
        .pipe(gulp.dest(distJsUrl))
});

//打包任务
//[]中的是异步，运行完后运行rev
gulp.task("build", function(cb) {
    setDistFolder(distFolder);
    gulpSequence(['clean'], ['tpl'],['copyFile','jsMin', 'jsCon', 'img'], ['revHtml', 'revCss', 'revJs'])(cb)
});


//监控
gulp.task('watch', function() {
    gulp.watch(sassUrl + '**/*.scss', ['sass']);
});

