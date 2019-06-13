import { Component, OnInit } from '@angular/core';
import { SocketService } from '../Services/socket.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private _socketService: SocketService) { }

  ngOnInit() {
  }

}
