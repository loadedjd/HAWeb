import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { ConnectedClient } from '../../../../models/connectedClient';
import { BehaviorSubject } from 'rxjs';
import { Data } from '../../../../models/data';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private _connection = io.connect('http://localhost:1944');
  private _connectedClientsCount = 0;
  public _connectedClients = new Array<ConnectedClient>();
  public onNewData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() {
    this._connection.on('newClientRegistered', (clientData) => {
      if (clientData as ConnectedClient) {
        const connectedClient = clientData as ConnectedClient;
        this._connectedClients.push(connectedClient);
        console.log(clientData as ConnectedClient);
      }
    });

    this._connection.on('newClientData', (data) => {
      if (this._connectedClients.findIndex(x => x.id === data.client) !== -1) {
        const client = this._connectedClients.find(x => x.id === data.client);
        client.data.push(data.data);
        if (data as Data) {
          this.onNewData.next(data as Data);
        }
      }
    });

    this._connection.on('clientDisconnected', (id) => {
      this._connectedClients = this._connectedClients.filter(x => x.id !== id);
    });
  }
}
