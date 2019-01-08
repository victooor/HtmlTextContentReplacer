import { Component, OnInit } from '@angular/core';
import { IHash } from '../shared/model';
import { Annotation } from './Annotation';
import { ReplacementData } from './ReplacementData';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  displayedColumns: string[] = ['search', 'replace'];
  dataSource: Annotation[] =  [];
  urlToBeApplied: string;
  nrOfElementsAdded: number = 0;
  

  constructor() { }

  ngOnInit() {
    
    getReplacementValues().then(replacementData => {
      console.log("Value is " + replacementData);
      if(replacementData != null) {
        this.dataSource =  [];
        Object.keys(replacementData.replacements).forEach((key) => {
          var an = new Annotation(key, replacementData.replacements[key]);
          this.dataSource.push(an);
          console.log("Value is (chrome get in options hashset) " + replacementData.replacements[key]);
        });
        this.urlToBeApplied = replacementData.urlToBeApplied;
      }
    });
  }

  addNewRow() {
    console.log("new row button clicked");
    this.nrOfElementsAdded++;
    this.dataSource.forEach(d => console.log("search " + d.search + "; Replace " + d.replace));
    this.dataSource = this.dataSource.concat(new Annotation("", ""));
    console.log("after adding");
    this.dataSource.forEach(d => console.log("search " + d.search + "; Replace " + d.replace));
    
  }

  remove(an: Annotation) {
    console.log("remove clicked" + ". Search" + an.search + ", replace " + an.replace);

    const index = this.dataSource.indexOf(an, 0);

    console.log("Index " + index)
    
    if (index > -1) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }

  }


  save() {
    console.log("save clicked");
    console.log("url" + this.urlToBeApplied);
    
    this.dataSource.forEach(d => console.log("search " + d.search + "; Replace " + d.replace));
    let x: IHash = {};
    this.dataSource.forEach(d => {
      x[d.search] = d.replace;
    });

    var rData: ReplacementData = new ReplacementData(x, this.urlToBeApplied);

    chrome.storage.sync.set({
      replacementData: rData
      }
      , function() {
          console.log("values saved");
      });
  }
}

function getReplacementValues() : Promise<ReplacementData> {
  
  return new Promise ((resolve) => {
    var replacementData: ReplacementData;
    chrome.storage.sync.get(
    ['replacementData']
    ,
    function(data) {
      if(data.replacementData != null) {
        console.log("List elements chrome get in options " + data.replacementData);
        
        replacementData = data.replacementData;

        resolve(replacementData);
      }
    }
    );
  });

}
