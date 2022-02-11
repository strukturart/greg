# Change log

## 3.0.1

- Improve Yarn compatibility (https://github.com/borodean/assets/pull/8)
- Updates the `engines` field of `package.json` to match the actually supported Node versions

## 3.0.0

Drop nodejs 0.12 support

## 2.1.1

Updates package dependencies.

## 2.1.0

Allows globs to be passed to `loadPaths`:
```js
var options = { loadPaths: ['assets/*'] };
```

Also, `loadPaths` now also accepts a single string instead of an array:
```js
var options = { loadPaths: 'images' };
```

## 2.0.0

Removes `currentPath` support.

## 1.0.1

Allows numbers to be returned from a cachebuster.

## 1.0.0

Initial release.
