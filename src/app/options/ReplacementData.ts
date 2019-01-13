import { Replacement } from '../shared/model';
export class ReplacementData {
  replacements: Replacement[] = [];
  urlToBeApplied: string;
  constructor(r: Replacement[], u: string) {
    this.replacements = r;
    this.urlToBeApplied = u;
  }
}
