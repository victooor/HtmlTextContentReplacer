import { Component, OnInit } from '@angular/core';
import { Replacement } from '../shared/model';
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
          var an = new Annotation(replacementData.replacements[key].search, replacementData.replacements[key].replace);
          this.dataSource.push(an);
        });
        this.urlToBeApplied = replacementData.urlToBeApplied;
        
        if(this.dataSource.length == 0)
          this.addNewRow();
      }
    });
  }

  addNewRow() {
    this.nrOfElementsAdded++;
    this.dataSource = this.dataSource.concat(new Annotation("", ""));
    console.log("after adding");
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
    console.log("url" + this.urlToBeApplied);
    
    this.dataSource.forEach(d => console.log("search " + d.search + "; Replace " + d.replace));
    let x: Replacement[] = [];
    this.dataSource.forEach(d => {
      x.push(new Replacement(d.search, d.replace));
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

        replacementData = data.replacementData;

        resolve(replacementData);
      }
    }
    );
  });

}
