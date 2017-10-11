import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ShellService } from '../../common/shell/shell.service';

@Component({
  selector: 'tzf-use',
  templateUrl: './use.component.html',
  styleUrls: ['./use.component.scss']
})
export class UseComponent implements OnInit {
  docAvailable: boolean;
  styleguideAvailable: boolean;

  constructor (
    private http: Http,
    public shellService: ShellService,
  ) {
  }

  ngOnInit () {
    this.http.get('styleguide/index.html').subscribe(
      () => this.styleguideAvailable = true,
      () => this.styleguideAvailable = false
    );

    this.http.get('documentation/index.html').subscribe(
      () => this.docAvailable = true,
      () => this.docAvailable = false
    );
  }

  onPageChange (page) {
    console.log('Page change: ' + page);
  }
}
