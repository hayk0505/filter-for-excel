import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

var remote = window.require('electron').remote;
var xlsx = remote.require('node-xlsx');
var electronFs = remote.require('fs');
var dialog = remote.dialog;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles' | 'createDirectory' | 'promptToCreate' | 'noResolveAliases' | 'treatPackageAsDirectory' | 'dontAddToRecent'>;
  getedFile: any;
  createdObject = {
    'ACCOUNT': '',
    'MOB_NUM': '',
    'CONTACT_NUMBER': '',
    'Contact_Number2': ''
  }
  createdArray = [];
  regEx = /^\d+$/;
  goodArray = [];
  badArray = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
   
   }
  
  uploadFile(): void {
    dialog.showOpenDialog(null ,{
      title:'Upload exel file',
      filters: [{ name: 'File', extensions: ['xlsx', 'xlsm', 'xls', 'xml'] },]
    }).then(result => {
          if (!result.canceled) {
            let paths = result.filePaths;
            if (paths && paths.length > 0) {
              let obj = xlsx.parse(paths[0]);
              obj = xlsx.parse(electronFs.readFileSync(paths[0]));
              this.getedFile = Array.from(obj[0].data);
              this.getedFile.shift();
              this.getedFile.forEach(element => {
                this.createdArray.push({
                  'ACCOUNT': element[0],
                  'MOB_NUM': element[1],
                  'CONTACT_NUMBER': element[2],
                  'Contact_Number2': element[3]
                })
              });
              console.log(this.createdArray);
              this.createdArray.forEach(item => {
                // console.log(item);
                if (item.CONTACT_NUMBER) {
                  // const a = item.CONTACT_NUMBER.match(/^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi);
                }
                if (item.Contact_Number2) {
                  console.log(item);
                  this.checkIsNumber(item);
                  
                  if (!item.Contact_Number2.toString().startsWith(0)) {
                    const code = this.matchCode(item.Contact_Number2);
                    if (code) {
                      this.goodArray.push(item);
                    }
                  } else if (item.Contact_Number2.toString().startsWith(0)) {
                    this.matchCode(item.Contact_Number2.toString().substring(1));
                  }
                } else if (!item.Contact_Number2) {

                }
              });
            }
          }
        }
    );
  }

  checkIsNumber(item): any {
    if (typeof(item.Contact_Number2) === 'number') {
      return item;
    } else {
      Number(item.Contact_Number2);
      return item;
    }
  }

  matchCode(code): boolean {
    let bool;
    const arrayOfCode = [33,41,43,44,55,77,91,93,94,95,96,97,98,99]
    const getCodeFirst = Number(code.toString().substring(0, 2))
    const index = arrayOfCode.indexOf(getCodeFirst)
    if (index > -1) {
      bool = true
    } else {
      bool = false
    }
    return bool;
  }
}
