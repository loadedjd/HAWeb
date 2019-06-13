import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../Services/socket.service';
import { Data } from '../../../../models/data';
import { DatabaseService } from '../Services/DatabaseService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-incoming-data',
  templateUrl: './incoming-data.component.html',
  styleUrls: ['./incoming-data.component.css']
})
export class IncomingDataComponent implements OnInit {

  public data: Object[];
  public displayedColumns = ['clientid', 'value', 'title', 'time'];

  constructor( private _databaseService: DatabaseService, private _commonService: CommonService) {
    this._databaseService.clientData.pipe(map(clientData => clientData.sort(this._commonService.compareTime))).subscribe(data => this.data = data);
  }
  ngOnInit() { }
}
