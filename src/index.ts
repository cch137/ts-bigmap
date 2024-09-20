export default class BigMap<K = any, V = any> implements Map<K, V> {
  private static readonly MAX_SIZE = 2 ** 24;

  private readonly segs: Map<K, V>[] = [];

  constructor(entries?: readonly (readonly [K, V])[] | null) {
    if (entries) {
      const _entries = [...entries];
      const parts: (readonly [K, V])[][] = [];
      while (_entries.length > 0) {
        parts.push(_entries.splice(0, BigMap.MAX_SIZE));
      }
    }
  }

  get(key: K): V | undefined {
    for (const map of this.segs) {
      if (map.has(key)) return map.get(key);
    }
  }

  has(key: K): boolean {
    for (const map of this.segs) {
      if (map.has(key)) return true;
    }
    return false;
  }

  set(key: K, value: V): this {
    let map = this.segs.at(-1);
    if (!map || map.size === BigMap.MAX_SIZE) {
      map = new Map();
      this.segs.push(map);
    }
    map.set(key, value);
    return this;
  }

  delete(key: K): boolean {
    const length = this.segs.length;
    for (let i = 0; i < length; i++) {
      const map = this.segs[i];
      if (map.delete(key)) {
        if (map.size === 0) {
          this.segs.splice(this.segs.indexOf(map), 1);
        } else {
          const nextMap = this.segs[i + 1];
          if (nextMap && nextMap.size > map.size) {
            this.segs[i] = nextMap;
            this.segs[i + 1] = map;
          }
        }
        return true;
      }
    }
    return false;
  }

  clear(): void {
    this.segs.splice(0);
  }

  forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: any
  ): void {
    for (const map of this.segs) {
      map.forEach(callbackfn, thisArg);
    }
  }

  // @ts-ignore
  *entries(): IterableIterator<[K, V]> {
    for (const map of this.segs) {
      yield* map.entries();
    }
  }

  // @ts-ignore
  *keys(): IterableIterator<K> {
    for (const map of this.segs) {
      yield* map.keys();
    }
  }

  // @ts-ignore
  *values(): IterableIterator<V> {
    for (const map of this.segs) {
      yield* map.values();
    }
  }

  get size(): number {
    return this.segs.reduce((p, c) => p + c.size, 0);
  }

  get _size(): bigint {
    return this.segs.reduce((p, c) => p + BigInt(c.size), 0n);
  }

  // @ts-ignore
  get [Symbol.iterator]() {
    return () => this.entries();
  }

  get [Symbol.toStringTag]() {
    return "BigMap";
  }
}
