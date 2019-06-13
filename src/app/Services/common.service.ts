import { Injectable } from '@angular/core';
import { ConnectedClient } from '../../../../models/connectedClient';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public compareTime(obj1, obj2): number {
    if (obj1['time'] > obj2['time'])
      return -1;
    else if (obj1['time'] < obj2['time'])
      return 1;
    else
      return 0;
  }

  public clientArraysAreTheSame(c1: ConnectedClient[], c2: ConnectedClient[]): boolean {
    if (c1 && c2) {
      const client1 = c1.sort(this.compareTime);
      const client2 = c2.sort(this.compareTime);

      const hash1 = client1.map(c => c.id).join('');
      const hash2 = client2.map(c => c.id).join('');
      return (hash1 === hash2) && c1.length === c2.length;
    } else
        return false;
  }
}
