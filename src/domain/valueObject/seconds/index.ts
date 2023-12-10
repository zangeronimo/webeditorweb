export class Seconds {
  constructor(readonly value: number) {}

  formatToHours(): string {
    const hours = Math.floor(this.value / 3600)
    const minutes = Math.floor((this.value - hours * 3600) / 60)
    const seconds = this.value - hours * 3600 - minutes * 60
    return `${hours}:${minutes}:${seconds}`
  }
}
