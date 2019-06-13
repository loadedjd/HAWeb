import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConnectedClient } from '../../../../models/connectedClient';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class DatabaseService {

    private _api = 'http://localhost:1944/api';
    public connectedClients: Subject<ConnectedClient[]> = new Subject<ConnectedClient[]>();
    public dataLength: Subject<number> = new Subject();
    public clientData: Subject<Object[]> = new Subject();

    constructor(private _httpClient: HttpClient) {
        setInterval(() => {
            this._httpClient.get<ConnectedClient[]>(`${this._api}/clients`).subscribe(c => {
                const clients = c as ConnectedClient[];
                clients.forEach(client => {
                    this._httpClient.get(`${this._api}/command/${client.id}`).subscribe(coms => {
                        const commands = coms as Array<object>;
                        client.commands = commands.map(x => x['name']);
                    });
                });

                this.connectedClients.next(clients);
            });
            this._httpClient.get<number>(`${this._api}/datalength`).subscribe(length => this.dataLength.next(length));
            this._httpClient.get<Object[]>(`${this._api}/data`).subscribe(data => this.clientData.next(data));
        }, 1000);
    }

    public getAllConnectedClients(): Observable<ConnectedClient[]> {
        return this._httpClient.get<ConnectedClient[]>(`${this._api}/clients`);
    }

    public getAllClientData(): Observable<Object[]> {
        return this._httpClient.get<Object[]>(`${this._api}/data`);
    }

    public  getclientDataLength(): Observable<number> {
        return this._httpClient.get<number>(`${this._api}/datalength`);
    }

    public getClientDataById(id: string): Observable<Object[]> {
        return this._httpClient.get<Object[]>(`${this._api}/data/${id}`);
    }

    public sendCommandToClient(client: Object, command: string) {
        const body = {
            client: client['id'],
            command: command
        };

        this._httpClient.post(`${this._api}/command`, body).subscribe();
    }
}
