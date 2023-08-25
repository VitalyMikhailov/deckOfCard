import * as requests from '../requests/requests'
import testCases from '../fixtures/testCases.json'

describe('Creating Decks of cards', () => {

  testCases.forEach((testCase) => {
    const description = `Creating a Deck ${testCase.joker ? 'with' : 'without'} Joker and ${testCase.count} count`;
    const shuffledDescription = `${description} (shuffled)`;

    it(description, () => {
      requests.createNewDeck(testCase.joker, testCase.count).should((response) => {
        expect(response.status).to.eq(200);
        if (response.body.error) {
          expect(response.body.error).to.eq(testCase.error);
        }
        else {
          expect(response.body.success).to.eq(testCase.success);
          expect(response.body.shuffled).to.eq(testCase.shuffled);
          expect(response.body.remaining).to.eq(testCase.remaining);
        }
      });
    });

    it(shuffledDescription, () => {
      requests.createNewDeckShuffled(testCase.joker, testCase.count).should((response) => {
        if (response.body.error) {
          expect(response.body.error).to.eq(testCase.error);
        }
        else {
          expect(response.body.success).to.eq(testCase.success);
          expect(response.body.shuffled).to.eq(testCase.shuffled !== true);
          expect(response.body.remaining).to.eq(testCase.remaining);
        }
      });
    });
  });
})



describe('Creating, shuffling a Deck. Drawing cards from the Deck', () => {
  let deckId;

  it('Creating the Deck with Jocker', () => {
    requests.createNewDeck(true).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true)
      expect(response.body.shuffled).to.eq(false)
      deckId = response.body.deck_id
    })
  });

  it('Shuffle Cards from the Deck', () => {
    requests.shuffleDeck(deckId).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true)
      expect(response.body.remaining).to.eq(54)
    })
  });

  it('Draw 5 cards from the Deck', () => {
    requests.drawCardsFromDeck(deckId, 5).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true);
      expect(response.body.remaining).to.eq(49);
      expect(response.body.cards).to.have.lengthOf(5)

    })
  });
});
