import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GitsheetService {
  private SERVER = "s://api.gitsign.com";

  private me: string
  private openObject: any;

  private user = 'sirmmo@gmail.com'

  public message: EventEmitter<any> = new EventEmitter<any>();
  public connected: EventEmitter<any> = new EventEmitter<any>();

  private c: WebSocket;
  constructor(
    private h: HttpClient
  ) { }

  getOrganization(id){
    return this.h.get('http'+this.SERVER+'/installation/'+id+'/info');
  }
  getRepos(id){
    return this.h.get('http'+this.SERVER+'/installation/'+id);
  }
  
  getRepo(id, rid){
    return this.h.get('http'+this.SERVER+'/installation/'+id+'/'+rid);
  }
  getRepoInfo(id, rid){
    return this.h.get('http'+this.SERVER+'/installation/'+id+'/'+rid+'/info');
  }
  getFiles(id, rid, bid){
    return this.h.get('http'+this.SERVER+'/installation/'+id+'/'+rid+'/'+bid);
  }

  open(id, rid, bid, file){
    return this.h.get('http'+this.SERVER+'/installation/'+id+'/'+rid+'/'+bid+'/'+file).pipe(tap(data => {
      this.openObject = data;  
      this.connect();
    }));
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
    this.c = new WebSocket("ws"+this.SERVER+'/objects/'+this.openObject.socket+'/ws?user='+this.user);
    this.c.onmessage = (data) =>{
      const d = JSON.parse(data.data);
      this.message.emit(d);
    }
    this.c.onopen = () => {
      this.connected.emit();
    }
  }

  join(){
    this.c.send(JSON.stringify({
      op: 'join',
      u: this.user
    }));
  }
}
