import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GitsheetService } from '../gitsheet.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit {

  branches: any[];

  constructor(
    private ar: ActivatedRoute,
    private gs: GitsheetService
  ) { }

  ngOnInit(): void {
    const iid = this.ar.snapshot.params.iid;
    const rid = this.ar.snapshot.params.rid;
    this.gs.getRepo(iid, rid).subscribe((data: any) => {
      this.branches = data;
    })
  }

}
