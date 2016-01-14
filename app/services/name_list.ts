export class NameList {
  names = ['Dijkstra', 'Knuth', 'Turing', 'Hopper', 'van \'t Ende'];

  get(): string[] {
    return this.names;
  }
  add(value: string): void {
    this.names.push(value);
  }
}
