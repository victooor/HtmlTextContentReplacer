export class Annotation {
  search: string;
  replace: string;
  constructor(s: string, r: string) {
    this.search = s;
    this.replace = r;
  }
}
