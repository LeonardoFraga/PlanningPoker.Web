import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokerTable } from '../models/poker-table';

@Injectable({
  providedIn: 'root'
})
export class PokerTableService {

  url = 'https://localhost:5001/PokerTable'; // Put it into a configuration file

  constructor(private httpClient: HttpClient) { }

  getById(pokerTableId: string) {
    return this.httpClient.get<PokerTable>(this.url + '?pokerTableId=' + pokerTableId)
  }

  savePokerTableCards(pokerTable: PokerTable) {
    this.httpClient.post(this.url, pokerTable).subscribe(res => {
        console.log(res);
      })
  }
}
