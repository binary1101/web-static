gulp             = require 'gulp'
source           = require 'vinyl-source-stream'
browserify       = require 'browserify'
watchify         = require 'watchify'
coffeeReactify   = require 'coffee-reactify'
reactify         = require 'reactify'
glob             = require 'glob'
bundleLogger = require '../../util/bundleLogger'
handleErrors = require '../../util/handleErrors'

gulp.task '[M] TestScripts', ->
  testFiles = glob.sync './app/scripts/specs/**/*.spec.js'
  testBundler = browserify
    entries: testFiles
    transform: [reactify]
    cache: {}, packageCache: {}

  rebundleTests = ->
    bundleLogger.start 'specs.js'

    testBundler.bundle()
      .on 'error', handleErrors
      .pipe source('specs.js')
      .pipe gulp.dest('./build/specs')
      .on 'end', ->
        bundleLogger.end 'specs.js'

  testBundler = watchify testBundler
  testBundler.on 'update', rebundleTests
  rebundleTests()

# gulp.task 'test', ->
#   return gulp.src('./build/testrunner-phantomjs.html').pipe(jasminePhantomJS());


# gulp.task('autotest', function() {
#   return gulp.watch(['www/js/**/*.js', 'test/spec/*.js'], ['test']);
# });