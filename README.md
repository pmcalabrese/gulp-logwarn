gulp-logwarn
============

A configurable gulp plugin that warns you if you left debug code

## Install

Use npm for install the package

```javascript
npm install gulp-logwarn
```

## How it works
In your gulpfile.js import gulp-logwarn and call it in a pipe ```logwarn()```. If you want, you can extend the strings to be checked by passing an array of strings as argument to logwarn ,something like ```logwarn(["console.debug","$log.info"])```

in the gulpfile.js
```javascript
var logwarn = require('gulp-logwarn');

var appJs = [
	'js/app.js',
	'js/services.js',
	'js/filters.js',
	'js/directives.js',
	'js/controllers.js'
];

gulp.task('logwarn', function(){
  gulp.src(appJs)
    .pipe(logwarn());
});

...

// if you want to extend you can pass an array so...

gulp.task('logwarn', function(){
	gulp.src(appJs)
		.pipe(logwarn(['console.debug,console.dir']));
});

```

run it with ```gulp logwarn``` and it will produce as output

![alt tag](https://raw.githubusercontent.com/pmcalabrese/gulp-logwarn/master/console.png)

## TODO

- tests
- clean up the code
