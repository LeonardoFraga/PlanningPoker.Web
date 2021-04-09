import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokerTableService } from '../services/poker-table.service';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrls: ['./poker-table.component.css']
})
export class PokerTableComponent implements OnInit {

  cards: any;
  pokerTableId: string;

  constructor(route: ActivatedRoute, private pokerService: PokerTableService) {
    this.pokerTableId = route.snapshot.params.id;
  }

  ngOnInit(): void {
      this.pokerService.getById(this.pokerTableId).subscribe(pokerTable => {
      this.cards = pokerTable.cards;
    });
  }
}
