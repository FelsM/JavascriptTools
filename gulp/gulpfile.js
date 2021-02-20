const {task, src, dest, watch, parallel, series} = require('gulp');
const server = require('gulp-server-livereload');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const minifyJs = require('gulp-minify');
const concatJs = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const gulpDeployFtp = require('gulp-deploy-ftp');
const pug = require('gulp-pug');
 


sass.compiler = require('node-sass');
 
//1

/* dev tasks start*/
function webserver() {
  return src('app')
    .pipe(server({
      livereload: true,
      open: true,
      port: 3333
    }));
}

function deploy(){
 return src('dist/').pipe(gulpDeployFtp({
    remotePath: '/tmp',
    host: 'localhost',
    port: 21,
    user: 'foo',
    pass: 'bar'
  }))
  .pipe(dest('/'));
}
/* dev tasks end*/


/*Html tasks start*/
function buildHTML(){
  return src('app/pug/*.pug')
  .pipe(pug({pretty: true, basedir: 'app/'}))
  .pipe(dest('app/'))
};

function buildHTMLWatch(){
  watch(['app/pug/**/*.pug'], buildHTML);
};


/*html tasks end*/
 

/*Sass tasks start*/ 
function gulpSass() {
  return src('app/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('app/css'));
};
 

function gulpSassWatch(){
	watch(['app/sass/**/*.sass'], gulpSass);
} 
/*Sass tasks end*/
 

/* Css tasks start*/

function minifyCss() {
  return src('dist/css/bundle.css')
    .pipe(cleanCSS({debug: true, compatibility: 'ie7'}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
  .pipe(rename('bundle.min.css'))
  .pipe(dest('dist/css/'));
}

function cssConcat() {
  return src('app/css/**/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(dest('dist/css/'));
}

function prefix(){
  return src('dist/css/bundle.css')
        .pipe(autoprefixer({cascade: true}))
        .pipe(dest('dist/css/'))
}

/* Css tasks end*/


/*js tasks start*/

function jsMinify(){
  return src('dist/js/bundle.js')
    .pipe(minifyJs({noSource: true}))
    .pipe(rename('bundle.min.js'))
    .pipe(dest('dist/js/'))
};

function jsConcat() {
  return src('app/js/**/*.js')
    .pipe(concatJs('bundle.js'))
    .pipe(dest('dist/js/'));
};




/*js tasks end*/

/*image tasks start*/

 function minifyImg(){
    return src('app/img/*')
        .pipe(imagemin())
        .pipe(dest('dist/img'))
 };



/*image tasks end*/


//2

// gulp.task('sass', function () {
//   return gulp.src('./sass/**/*.scss')
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });


exports.dev = parallel(webserver, gulpSassWatch, buildHTMLWatch);


exports.webserver = webserver;

exports.buildHTML = buildHTML;

exports.gulpSass = gulpSass;
exports.gulpSassWatch = gulpSassWatch;

exports.minifyCss = minifyCss;
exports.cssConcat = cssConcat;
exports.prefix = prefix;

exports.jsMinify = jsMinify;
exports.jsConcat = jsConcat;

exports.minifyImg = minifyImg;


exports.prepareCss = series(gulpSass,cssConcat,prefix,minifyCss);
exports.prepareJs = series(jsConcat,jsMinify);

exports.build = parallel(series(gulpSass,cssConcat,prefix,minifyCss),series(jsConcat,jsMinify), minifyImg);


