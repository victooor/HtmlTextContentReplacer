import { IHash } from '../shared/model';
export class ReplacementData {
  replacements: IHash = {};
  urlToBeApplied: string;
  constructor(r: IHash, u: string) {
    this.replacements = r;
    this.urlToBeApplied = u;
  }
}
