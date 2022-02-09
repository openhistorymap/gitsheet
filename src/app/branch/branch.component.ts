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
  constructor(
    private ar: ActivatedRoute,
    private gs: GitsheetService
    ) { }

  ngOnInit(): void {
    const iid = this.ar.snapshot.params.iid;
    const rid = this.ar.snapshot.params.rid;
    const bid = this.ar.snapshot.params.bid;
    this.gs.getFiles(iid, rid, bid).subscribe((data: any) => {
      this.files = data;
    })
  }

}
