import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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

  public message: EventEmitter<any> = new EventEmitter<any>();

  private c: WebSocket;
  constructor(
    private h: HttpClient
  ) { }

  open(id, file=null){
    this.openObject = {id: id, filename: file};
    this.connect();
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

  chat(text){
    this.c.send(JSON.stringify({
      op: 'chat',
      u: this.user,
      text: text
    }))
    return {
      op: 'chat',
      u: this.user,
      text: text
    }
  }

  connect(): void{
    this.c = new WebSocket("ws"+this.SERVER+'/objects/'+this.openObject.id+'/ws?user='+this.user);
    this.c.onmessage = (data) =>{
      const d = JSON.parse(data.data);
      this.message.emit(d);
    }
  }


}
