// Steams: Processing small chunks of data i/o
import { Readable } from 'node:stream';
class OneToHundredStream extends Readable {
  idx = 1;
  _read() {
    const i = this.idx++
    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000)

  }
}
new OneToHundredStream().pipe(process.stdout)