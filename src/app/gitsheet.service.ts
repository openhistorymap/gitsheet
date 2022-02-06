import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class GitsheetService {
  private SERVER = "s://api.gitsign.com";

  private me: string
  private openObject: {id:string, filename: string};

  private user = 'sirmmo@gmail.com'

  private c: WebSocket;
  constructor(
    private h: HttpClient
  ) { }

  open(id, file=null){
    this.openObject = {id: id, filename: file};
    return of(this.openObject);
  }

  select(row, col) {
    this.c.send(JSON.stringify({
      op: 'select',
      u: this.user,
      row, col
    }));
  }

  edit(value, row, col){
    this.c.send(JSON.stringify({
      op: 'edit',
      u: this.user,
      row, col, value
    }));
  }

  connect(): WebSocket{
    this.c = new WebSocket("ws"+this.SERVER+'/objects/'+this.openObject.id+'/ws?user='+this.user);
    return this.c
  }
}
