export class PokerTable {
    pokerTableId: string;
    cards: string;

    constructor(pokerTableId: string, cards: string)
    {
        this.pokerTableId = pokerTableId;
        this.cards = cards;
    }
}