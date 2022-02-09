import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitsheetService } from '../gitsheet.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  repos: any[];
  installation: any;
  
  constructor(
    private ar: ActivatedRoute,
    private gs: GitsheetService
  ) { }

  ngOnInit(): void {
    this.gs.getOrganization(this.ar.snapshot.params.iid).subscribe((data: any) => {
      this.installation = data;
    })
    this.gs.getRepos(this.ar.snapshot.params.iid).subscribe((data:any)=>{
      this.repos = data
    })
  }

}
