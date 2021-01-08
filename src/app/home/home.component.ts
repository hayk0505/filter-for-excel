import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

var remote = window.require('electron').remote;
var xlsx = remote.require('node-xlsx');
var electronFs = remote.require('fs');
var dialog = remote.dialog;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles' | 'createDirectory' | 'promptToCreate' | 'noResolveAliases' | 'treatPackageAsDirectory' | 'dontAddToRecent'>;
  // getedFile: any;
  // createdObject = {
  //   'ACCOUNT': '',
  //   'MOB_NUM': '',
  //   'CONTACT_NUMBER': '',
  //   'Contact_Number2': ''
  // }
  // createdArray = [];
  // regEx = /^\d+$/;
  // goodArray = [];
  // badArray = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
   }
  
}




// X = require('xlsx');
//     let workbook = XLSX.readFile('test1.xlsx');
//     let sheetName = workbook.SheetNames[0];
//     console.log(sheetName+'    sheetName')
//     let worksheet = workbook.Sheets[sheetName];
//     console.log(worksheet['A2']+'    worksheet a2')
//     console.log(JSON.stringify(worksheet['A2']))
//        worksheet['A2'].value = 'test';
//       var cell = worksheet.getCell('A2');
//       //cell.value = 'test';
//       sheetName.getCell("A2").value = "test"
