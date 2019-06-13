import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../Services/DatabaseService';
import { ConnectedClient } from '../../../../models/connectedClient';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})
export class HistoricalComponent implements OnInit {
  public clients: ConnectedClient[] = new Array<ConnectedClient>();
  public clientData: Object[] = new Array<Object>();
  public selectedClientId = '';
  public selectedData: Object[] = new Array<Object>();

  constructor(private _dbService: DatabaseService, private _commonService: CommonService) {
    this._dbService.connectedClients.subscribe(clients => {
      if (!this._commonService.clientArraysAreTheSame(clients, this.clients)) {
        this.clientData = new Array<Object>();
        this.clients = clients;
        this.clients.forEach(client => {
          this._dbService.getClientDataById(client.id).subscribe(data => {
            this.clientData = this.clientData.concat(data);
          });
        });
      }
    });
  }

  ngOnInit() {
  }

  public updateSelectedData() {
    this.selectedData = this.clientData.filter(data => data['client'] === this.selectedClientId);
    console.log(this.selectedData);
  }
}
