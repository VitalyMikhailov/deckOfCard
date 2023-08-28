import * as requests from '../requests/requests'
import cardsValue from '../fixtures/cardsValue.json'

let piles = {
    player1: "Bob",
    player2: "Bill"
}
let cardsPlayer1
let cardsPlayer2
let player1Score = 0
let player2Score = 0
let drawnCards = []
let cards = []

describe('Creating new Deck, shuffle it, draw 3 cards for each player, check result', () => {
    let deckId;

    it('Creating the Deck', () => {
        requests.createNewDeck(true, 1).then((response) => {
            deckId = response.body.deck_id
            expect(response.status).to.eq(200);
            expect(response.body.success).to.eq(true)
            expect(response.body.shuffled).to.eq(false)
            expect(response.body.remaining).to.eq(54)

        })
    });

    it('Shuffle the Deck', () => {
        requests.shuffleDeck(deckId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.eq(true)
            expect(response.body.remaining).to.eq(54)
        })
    });

    it('Draw 6 cards from the Deck', () => {
        requests.drawCardsFromDeck(deckId, 6).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.eq(true);
            expect(response.body.remaining).to.eq(48);
            expect(response.body.cards).to.have.lengthOf(6)
            for(let i = 0; i < 6; i++){
                drawnCards[i] = response.body.cards[i].code
            }
        })
    });

    it('Creating first pile', () => {
        cy.log(JSON.stringify(drawnCards))
        cards = [drawnCards[0],drawnCards[1],drawnCards[2]]
        requests.createPile(deckId, piles.player1, cards).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.eq(true)
        })
    });


    it('Creating second pile', () => {
        cards = [drawnCards[3],drawnCards[4],drawnCards[5]]
        requests.createPile(deckId, piles.player2, cards).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.eq(true)
        })
    });

    it('Listing cards from the first pile', () => {
        requests.listPile(deckId, piles.player1).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.eq(true)
            expect(response.body.piles).to.have.property(`${piles.player1}`)
            cardsPlayer1 = response.body.piles[piles.player1].cards
            cardsPlayer1.forEach((el)=>{
                player1Score += cardsValue[el.code]
             })
            cy.log(player1Score)
        })
    });

    it('Listing cards from the second pile', () => {
        requests.listPile(deckId, piles.player2).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.success).to.eq(true)
            expect(response.body.piles).to.have.property(`${piles.player2}`)
            cardsPlayer2 = response.body.piles[piles.player2].cards
            cardsPlayer2.forEach((el)=>{
                player2Score += cardsValue[el.code]
            })
            cy.log(player2Score)
        })
    });

})