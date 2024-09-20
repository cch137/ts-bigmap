# BigMap

`BigMap<K, V>` is a custom implementation of the native JavaScript `Map` interface designed to handle an extremely large number of entries. It breaks down large datasets into smaller segments, each managed by its own `Map`, while maintaining the same API as the native `Map` for ease of use.

## Features

- **Extremely Large Capacity**: Supports over 16 million entries by segmenting data across multiple internal `Map` instances.
- **Familiar API**: Most methods behave exactly like the native `Map`, so you can use it without needing to learn a new interface.
- **Efficient Data Handling**: Automatically balances and restructures internal maps to ensure efficient access and memory management.

## Usage

```typescript
import BigMap from "your-library";

const bigMap = new BigMap<string, number>([
  ["key1", 1],
  ["key2", 2],
]);

bigMap.set("key3", 3);
console.log(bigMap.get("key1")); // 1
console.log(bigMap.has("key2")); // true
console.log(bigMap.size); // 3

bigMap.delete("key2");
console.log(bigMap.has("key2")); // false

for (const [key, value] of bigMap) {
  console.log(key, value);
}
```

## Methods

Since `BigMap` mirrors most native `Map` methods, detailed descriptions of individual methods are unnecessary. Common methods such as `set`, `get`, `has`, `delete`, and iteration (e.g., `entries()`, `keys()`, `values()`) work identically to native `Map`.

## Why BigMap?

When you need to manage an exceptionally large dataset that exceeds the limitations of native `Map`, `BigMap` ensures that your data remains accessible and organized without compromising on the familiar `Map` interface.

## License

This project is licensed under MIT License.
