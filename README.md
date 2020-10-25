# `xstream-tuplewise`

![npm](https://img.shields.io/npm/v/xstream-tuplewise)

An xstream operator that groups consecutive events into N-tuples

```typescript
function tuplewise<N extends number, T>(n: N): ($: Stream<T>) => Stream<T[] & { length: N }>;
```

## Installation

Note that [`xstream`](https://www.npmjs.com/package/xstream) is a peer dependencies of this library, which need to be installed separately.

### Using [`npm`](https://www.npmjs.com/)

```
$ npm install xstream-tuplewise
```

### Using [`yarn`](https://yarnpkg.com/)

```
$ yarn add xstream-tuplewise
```

## Example

### `tuplewise(0)`

```
---0---1-------2-------3-----------4--------|
      tuplewise(0)
[]-[]--[]------[]------[]----------[]-------|
```

### `tuplewise(1)`

```
---0---1-------2-------3-----------4--------|
      tuplewise(1)
---[0]-[1]-----[2]-----[3]---------[4]------|
```

### `tuplewise(2)`

```
---0---1-------2-------3-----------4--------|
      tuplewise(2)
-------[0,1]---[1,2]---[2,3]-------[3,4]----|
```

### `tuplewise(3)`

```
---0---1-------2-------3-----------4--------|
      tuplewise(3)
---------------[0,1,2]-[1,2,3]-----[2,3,4]--|
```

## License

MIT
