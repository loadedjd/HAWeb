import { Component, OnInit, Input } from '@angular/core';
import { ConnectedClient } from '../../../../models/connectedClient';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  @Input() client: ConnectedClient;
  constructor() { }

  ngOnInit() {
  }

}
