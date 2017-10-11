const cssnano = require('cssnano');
const gulp = require('gulp');
const jsonEditor = require('gulp-json-editor');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sassError = require('gulp-sass-error').gulpSassError;
const sourcemaps = require('gulp-sourcemaps');

const inlineResources = require('./inline-resources');

gulp.task('copyHtml', () => {
  return gulp.src([
    'src/app/common/**/*.html',
    'src/app/common/**/*.scss'
  ])
  .pipe(gulp.dest('dist'));
});

gulp.task('updateStyleExt', () => {
  return gulp.src('dist/**/*.js')
  .pipe(replace(/styleUrls: \[(\'\.\/|\')(.*?)\.scss\'\]/g, 'styleUrls: [\'$2.css\']'))
  .pipe(gulp.dest('dist'));
});

gulp.task('copySecurityAssets', () => {
  return gulp.src([
    'node_modules/oidc-client/dist/oidc-client.min.js',
    'src/app/common/security/assets'
  ])
  .pipe(gulp.dest('dist/security'));
});

gulp.task('copyAssets', ['copySecurityAssets'], () => {
  return gulp.src([
    'src/app/common/assets/**'
  ])
  .pipe(gulp.dest('dist/assets'));
});

gulp.task('copyFonts', () => {
  return gulp.src([
    'src/app/common/fonts/**'
  ])
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copyStyles', () => {
  return gulp.src([
    'src/app/common/styles/**'
  ])
  .pipe(gulp.dest('dist/styles'));
});

gulp.task('compileScss', () => {
  return gulp.src([
    'src/app/common/**/*.scss',
    '!src/app/common/styles/**',
    '!src/app/common/fonts/**',
  ])
  //.pipe(sourcemaps.init())
  .pipe(sass().on('error', sassError(true)))
  .pipe(postcss([
    cssnano({
      autoprefixer: {
        add: true,
        remove: false,
      },
      normalizeString: {
        preferredQuote: 'single', // So it doesn't need to be escaped when inlined
      },
    }),
  ]))
  //.pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));
});

gulp.task('copyPackageJson', () => {
  return gulp.src('package.json')
    .pipe(jsonEditor(json => {
      json.peerDependencies = json.dependencies;
      delete json.dependencies;
      delete json.devDependencies;
      delete json.private;
      delete json.scripts;
      return json;
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('inlineResources', ['copyHtml', 'updateStyleExt', 'compileScss'], () => {
  inlineResources('dist');
});

gulp.task('default', ['inlineResources', 'copyAssets', 'copyStyles', 'copyFonts', 'copyPackageJson'], () => {
});
