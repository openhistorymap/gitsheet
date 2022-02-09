import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Spreadsheet from "x-data-spreadsheet";
import { GitsheetService } from '../gitsheet.service';

import { Papa } from 'ngx-papaparse';

const cs: any[] = ["ff8000", "994d00", "fff2e6", "ffb366", "0066b3", "003d6b", "e6f4ff", "66beff", "990099", "5c005c", "ffe6ff", "ff66ff", "ccff00", "7a9900", "faffe6", "e0ff66"]

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  iid: string;
  rid: string;
  bid: string;
  id: string;

  spreadsheet: Spreadsheet;
  conn: WebSocket;
  currentCell:{}
  filename: string;
  chat: any[] = [];
  ttext = '';
  connecteds = [];

  constructor(
    private gs: GitsheetService,
    private ar: ActivatedRoute,
    private papa: Papa
  ) { }

  ngOnInit(): void{

    this.iid = this.ar.snapshot.params.iid;
    this.rid = this.ar.snapshot.params.rid;
    this.bid = this.ar.snapshot.params.bid;
    this.id = this.ar.snapshot.params.id
    
    this.gs.message.subscribe(data=>{
      console.log(data);
      if (data.op === 'edit') {
        const sh = <any>this.spreadsheet.cellText(data.row, data.col, data.value);
        sh.reRender();
      } else if (data.op === 'select') {
      } else if (data.op === 'accepted') {
        this.connecteds = data.users;
        this.papa.parse(data.data, {
          complete: (result) => {
            console.log(result.data);
            for(let [i, ival] of result.data.entries()){
              for(let [j, jval] of result.data[i].entries()){
                this.spreadsheet.cellText(i,j,result.data[i][j]);
              }
            };
            (<any>(this.spreadsheet)).reRender()
          }
        });
        
      } else if (data.op === 'chat') {
        this.chat.push(data);
      } else if (data.op === 'joined') {
        this.connecteds.push(data);
      }
    });
    
    this.gs.open(this.iid, this.rid, this.bid, this.id).subscribe((data:any) => {
      this.filename = data.filename;
    });
    this.gs.connected.subscribe(() => {
      this.gs.join();
    })

    this.spreadsheet = new Spreadsheet("#x-spreadsheet-demo", {
      showToolbar: false,
      showBottomBar: false,
      view: {
        height: () => document.documentElement.clientHeight - 145,
        width: () => document.documentElement.clientWidth,
      },
    });
    this.spreadsheet
    .change(data =>{
      console.log('change', data);
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
