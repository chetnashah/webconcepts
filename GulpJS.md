
### Recipes

https://github.com/gulpjs/gulp/tree/v3.9.1/docs/recipes

### What not to use

https://github.com/gulpjs/plugins/blob/master/src/blackList.json

### Globs

Patterns used to match a set of files, e.g.
`**/*.js`

A glob is a string of literal and/or wildcard characters used to match filepaths. Globbing is the act of locating files on a filesystem using one or more globs.

The `src()` method expects a single glob string or an array of globs to determine which files your pipeline will operate on. At least one match must be found for your glob(s) otherwise `src()` will error. When an array of globs is used, they are matched in array order - especially useful for negative globs

### `gulp.src(blobs[, options])`

Emits files matching provided glob or an array of globs. Returns a stream of Vinyl files that can be piped to plugins.
e.g.
```js
gulp.src('client/templates/*.jade')
  .pipe(jade())
  .pipe(minify())
  .pipe(gulp.dest('build/minified_templates'));
```

### `gulp.dest(path[, options])`

Write the current stream to path and re-emit all the data passed to it.
Folders that do not exist will be created.

### Declaring task

```js
// task mytask - is dependent on task 'one', 'two' and 'three'
// so they will be run first in order to run mytask
gulp.task('mytask', ['one', 'two', 'three'], function() {
  // Do stuff
});
```

The function provided does main function of the task e.g.
```js
gulp.task('buildStuff', function() {
  // Do something that "builds stuff"
  var stream = gulp.src(/*some source path*/)
  .pipe(somePlugin())
  .pipe(someOtherPlugin())
  .pipe(gulp.dest(/*some destination*/));
  
  return stream; // generally good idea to return stream to indicate completion
  });
```

The function can also take a cb, which should be called back when work
is finished.

#### Task running order

By default, all tasks are run parellelly.
To define order between tasks,
specify
1. dependencies between tasks.
2. give a hint telling a task is done.

Either take in a callback and call it when you're done or return a promise or stream that the engine should wait to resolve or end respectively.

### `gulp.watch(glob[, opts], tasks)`

This gulp function gives you power to watch changes to files.
Watch a bunch of files, and run tasks when change is observed.
```js
var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
```



### Useful gulp plugins


#### gulp-rename

Rename files in transit for destination filenames:
e.g.
```js
gulp.src("./src/**/hello.txt")
  .pipe(rename(function (path) {
    path.dirname += "/ciao";
    path.basename += "-goodbye";
    path.extname = ".md";
  }))
  .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/hello-goodbye.md
```

#### gulp-concat

Concatenate multiple files into a single file.

e.g.
```js
//script paths
var jsFiles = 'assets/scripts/**/*.js',
    jsDest = 'dist/scripts';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
```

#### gulp-watch
`gulp-watch` is a plugin different from `gulp.watch()`

`gulp-watch` uses super-fast chokidar and emits vinyl objects.

https://github.com/floatdrop/gulp-watch/blob/master/docs/readme.md

#### gulp-rev

Static asset revisioning by appending content hash to filenames: `unicorn.css` → `unicorn-d41d8cd98f.css`.
Need some more plugins to work with this, visit github page.

```js
const gulp = require('gulp');
const rev = require('gulp-rev');

gulp.task('default', () =>
	// By default, Gulp would pick `assets/css` as the base,
	// so we need to set it explicitly:
	gulp.src(['assets/css/*.css', 'assets/js/*.js'], {base: 'assets'})
		.pipe(gulp.dest('build/assets'))  // copy original assets to build dir
		.pipe(rev())
		.pipe(gulp.dest('build/assets'))  // write rev'd assets to build dir
		.pipe(rev.manifest())
		.pipe(gulp.dest('build/assets'))  // write manifest to build dir
);
```


### Faster/Incremental builds

https://github.com/gulpjs/gulp#incremental-builds


### Vinyl

A virtual file format. When a file is read by `src()`, a Vinyl object is generated to represent the file - including the path, contents, and other metadata.

Vinyl objects can have transformations applied using plugins. They may also be persisted to the file system using `dest()`.

When creating your own Vinyl objects - instead of generating with `src()` - use the external vinyl module, as shown in Usage below.


```js
const Vinyl = require('vinyl');

const file = new Vinyl({
  cwd: '/',
  base: '/test/',
  path: '/test/file.js',
  contents: new Buffer('var x = 123')
});

file.relative === 'file.js';

file.dirname === '/test';
file.dirname = '/specs';
file.path === '/specs/file.js';

file.basename === 'file.js';
file.basename = 'file.txt';
file.path === '/specs/file.txt';

file.stem === 'file';
file.stem = 'foo';
file.path === '/specs/foo.txt';
file.extname === '.txt';
file.extname = '.js';
file.path === '/specs/file.js';
```