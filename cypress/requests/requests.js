const URL = Cypress.env('URL')

function createNewDeck(jokers_enabled, deck_count = 1){
    return cy.request({
        method: 'GET',
        url: URL+`new/`,
        qs: {
            jokers_enabled: jokers_enabled,
            deck_count: deck_count
        },
    })}

function createNewDeckShuffled(jokers_enabled, deck_count = 1){
    return cy.request({
        method: 'GET',
        url: URL+`new/shuffle/`,
        qs: {
            jokers_enabled: jokers_enabled,
            deck_count: deck_count
        },
    })}

function drawCardsFromDeck(deckId, numberOfCards){
    return cy.request({
        method: 'GET',
        url: URL+`${deckId}/draw/?count=${numberOfCards}`,
    })}

function shuffleDeck(deckId) {
    return cy.request({
        method: 'GET',
        url: URL + `${deckId}/shuffle/`,
    })
}
function createPile(deckId, player, arr){
    return cy.request({
        method: 'GET',
        url: URL+`${deckId}/pile/${player}/add/`,
        qs:{
            cards: `${arr[0]},${arr[1]},${arr[2]}`
        },
    })
}

function listPile(deckId, player) {
    return cy.request({
        method: 'GET',
        url: URL + `${deckId}/pile/${player}/list/`,
    })
}

function drawCardsPile(deckId, player, draw){
    return cy.request({
        method: 'GET',
        url: URL+`${deckId}/pile/${player}/draw/?count=${draw}`,
    })
}

export {createNewDeck, createNewDeckShuffled, drawCardsFromDeck, shuffleDeck, createPile, listPile, drawCardsPile}