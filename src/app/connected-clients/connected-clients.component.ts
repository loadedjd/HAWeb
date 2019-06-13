import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../Services/socket.service';
import { ConnectedClient } from '../../../../models/connectedClient';
import { DatabaseService } from '../Services/DatabaseService';
import { Subscription } from 'rxjs';
import { CommonService } from '../Services/common.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-connected-clients',
  templateUrl: './connected-clients.component.html',
  styleUrls: ['./connected-clients.component.css']
})
export class ConnectedClientsComponent implements OnInit, OnDestroy {
  public connectedClients: Array<ConnectedClient> = new Array<ConnectedClient>();
  public dataSize = 0.0;
  public selectedClient: string;
  public selectedCommand: string;

  constructor(private _databaseService: DatabaseService, private _commonService: CommonService, private _httpClient: HttpClientModule) {
    setInterval(() => {
      this._databaseService.connectedClients.subscribe(clients => {
        if (!this._commonService.clientArraysAreTheSame(clients, this.connectedClients)) {
          this.connectedClients = clients;
          console.log(this.connectedClients);
        }
      });

      this._databaseService.dataLength.subscribe(length => this.dataSize = length);
    }, 1000);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {}

  public selectCommand() {
    this._databaseService.sendCommandToClient(this.selectedClient, this.selectedCommand);
  }
}
