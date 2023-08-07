import { Interval } from 'antlr4ts/misc';
import { CharStream, IntStream } from 'antlr4ts';

const READ_BUFFER_SIZE = 1024;
const INITIAL_BUFFER_SIZE = 1024;

/**
 * Vacuum all input from a {@link Reader}/{@link InputStream} and then treat it
 * like a `char[]` buffer. Can also pass in a {@link String} or
 * `char[]` to use.
 *
 * If you need encoding, pass in stream/reader with correct encoding.
 */
export class TekkenInputStream implements CharStream {
    /** The data being scanned */
    protected data: string;

    /** How many characters are actually in the buffer */
    protected n: number;

    /** 0..n-1 index into string of next char */
    protected p = 0;

    /** What is name or source of this char stream? */
    public name?: string;

    /** Copy data in string to a local char array */
    constructor(input: string) {
        this.data = input;
        this.n = input.length;
    }

    /** Reset the stream so that it's in the same state it was
     *  when the object was created *except* the data array is not
     *  touched.
     */
    public reset(): void {
        this.p = 0;
    }

    public consume(): void {
        if (this.p >= this.n) {
            throw new Error('cannot consume EOF');
        }

        if (this.p < this.n) {
            this.p++;
        }
    }

    public LA(i: number): number {
        if (i === 0) {
            return 0; // undefined
        }
        if (i < 0) {
            i++; // e.g., translate LA(-1) to use offset i=0; then data[p+0-1]
            if (this.p + i - 1 < 0) {
                return IntStream.EOF; // invalid; no char before first char
            }
        }

        if (this.p + i - 1 >= this.n) {
            return IntStream.EOF;
        }
        return this.data.charCodeAt(this.p + i - 1);
    }

    public LT(i: number): number {
        return this.LA(i);
    }

    /** Return the current input symbol index 0..n where n indicates the
     *  last symbol has been read.  The index is the index of char to
     *  be returned from LA(1).
     */
    get index(): number {
        return this.p;
    }

    get size(): number {
        return this.n;
    }

    /** mark/release do nothing; we have entire buffer */
    public mark(): number {
        return -1;
    }

    public release(marker: number): void {
        // No default implementation since this stream buffers the entire input
    }

    /** consume() ahead until p==index; can't just set p=index as we must
     *  update line and charPositionInLine. If we seek backwards, just set p
     */
    public seek(index: number): void {
        if (index <= this.p) {
            this.p = index; // just jump; don't update stream state (line, ...)
            return;
        }
        // seek forward, consume until p hits index or n (whichever comes first)
        index = Math.min(index, this.n);
        while (this.p < index) {
            this.consume();
        }
    }

    public getText(interval: Interval): string {
        const start: number = interval.a;
        let stop: number = interval.b;

        if (stop >= this.n) {
            stop = this.n - 1;
        }

        const count: number = stop - start + 1;

        if (start >= this.n) {
            return '';
        }

        return this.data.substr(start, count);
    }

    get sourceName(): string {
        if (!this.name) {
            return IntStream.UNKNOWN_SOURCE_NAME;
        }
        return this.name;
    }

    public toString() {
        return this.data;
    }
}
