import { Stream, Operator } from 'xstream';

class TuplewiseOperator<N extends Exclude<number, 0>, T> implements Operator<T, T[] & { length: N }> {
  public type = 'tuplewise';
  private buf: T[] = [];
  public out: Stream<T[] & { length: N }> = null as any;

  constructor(public readonly n: N, public ins: Stream<T>) {}

  _start(out: Stream<T[] & { length: N }>): void {
    this.out = out;
    this.ins._add(this);
  }

  _stop(): void {
    this.ins._remove(this);
    this.out = null as any;
    this.buf = [];
  }

  _n(t: T) {
    const u = this.out;
    if (!u) return;

    this.buf.push(t);

    if (this.buf.length >= this.n) {
      u._n(this.buf as T[] & { length: N });
      this.buf = this.buf.slice(1, this.n);
    }
  }

  _e(err: any) {
    const u = this.out;
    if (!u) return;
    u._e(err);
  }

  _c() {
    const u = this.out;
    if (!u) return;
    u._c();
  }
}

function tuplewise<N extends number, T>(n: N): ($: Stream<T>) => Stream<T[] & { length: N }> {
  return function ($: Stream<T>): Stream<T[] & { length: N }> {
    if (n === 0) {
      return $.map((_) => [] as any).startWith([] as any);
    }

    return new Stream(new TuplewiseOperator<N, T>(n, $));
  };
}

export { tuplewise };
