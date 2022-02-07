import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Spreadsheet from "x-data-spreadsheet";
import { GitsheetService } from '../gitsheet.service';

const cs: any[] = ["ff8000", "994d00", "fff2e6", "ffb366", "0066b3", "003d6b", "e6f4ff", "66beff", "990099", "5c005c", "ffe6ff", "ff66ff", "ccff00", "7a9900", "faffe6", "e0ff66"]

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  spreadsheet: Spreadsheet;
  conn: WebSocket;
  currentCell:{}
  filename: string;
  chat: any[] = [];
  ttext = '';
  connecteds = [];

  constructor(
    private gs: GitsheetService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit(): void{

    const id = this.ar.snapshot.params.id
    
    this.gs.message.subscribe(data=>{
      console.log(data);
      if (data.op === 'edit') {
        const sh = <any>this.spreadsheet.cellText(data.row, data.col, data.value);
        sh.reRender();
      } else if (data.op === 'select') {
      } else if (data.op === 'chat') {
        this.chat.push(data);
      }
    });
    
    this.gs.open(id).subscribe((data:any) => {
      this.filename = data.filename;
    });

    this.spreadsheet = new Spreadsheet("#x-spreadsheet-demo", {
      showToolbar: false,
      showBottomBar: false,
      view: {
        height: () => document.documentElement.clientHeight - 145,
        width: () => document.documentElement.clientWidth,
      },
    });
    this.spreadsheet
    .loadData({}) // load data
    .change(data =>{
      console.log(data);
    });
    this.spreadsheet.on('cell-selected', (cell, ri, ci) => {
      this.gs.select(ri, ci);
    });
    this.spreadsheet.on('cell-edited',  (text, ri, ci) => {
      this.gs.edit(text, ri, ci);
    });

  }

  getData(){
    console.log(this.spreadsheet.getData());
  }

  input(ex){
    if(ex.code === 'Enter' && this.ttext.length > 0){
      this.gs.chat(this.ttext);
      this.ttext = '';
    }
  }

}
