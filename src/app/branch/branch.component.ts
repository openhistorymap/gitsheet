import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitsheetService } from '../gitsheet.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  files: any[];
  repo: any;
  installation: any;
  iid: string;
  rid: string;
  bid: string;
  constructor(
    private ar: ActivatedRoute,
    private gs: GitsheetService
    ) { }

  ngOnInit(): void {
    this.iid = this.ar.snapshot.params.iid;
    this.rid = this.ar.snapshot.params.rid;
    this.bid = this.ar.snapshot.params.bid;
    this.gs.getOrganization(this.iid).subscribe((ddata: any) => {
      this.installation = ddata;
    })
    this.gs.getRepoInfo(this.iid, this.rid).subscribe((data: any) => {
      this.repo = data;
    })
    this.gs.getFiles(this.iid, this.rid, this.bid).subscribe((data: any) => {
      this.files = data;
    })
  }

}
