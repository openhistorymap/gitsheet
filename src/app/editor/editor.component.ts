import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Spreadsheet from "x-data-spreadsheet";
import { GitsheetService } from '../gitsheet.service';

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

  constructor(
    private gs: GitsheetService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit(): void{

    const id = this.ar.snapshot.params.id
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

    this.conn = this.gs.connect();
    this.conn.onmessage = (msg) =>{
      const data = JSON.parse(msg.data);
      console.log(data);
      if (data.op === 'edit') {
        const sh = <any>this.spreadsheet.cellText(data.row, data.col, data.value);
        sh.reRender();
      } else if (data.op === 'select') {
      }
    }
  }

  getData(){
    console.log(this.spreadsheet.getData());
  }

}
