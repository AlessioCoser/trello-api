const { fetchJson } = require('../utils/fetch')
const { TrelloConfig } = require('./config')

exports.TrelloApi = (config = TrelloConfig()) => {
  const toBoard = (board) => ({id: board.id, name: board.name})
  const toBoards = (boards) => boards.map(toBoard)

  const toCard = (card) => ({id: card.id, name: card.name, actions: card.actions})
  const toCards = (cards) => cards.map(toCard)

  return {
    myBoards: () => fetchJson(`${config.host}/1/members/${config.username}/boards?key=${config.apiKey}&token=${config.apiToken}`).then(toBoards),
    cardsOf: (boardId) => fetchJson(`${config.host}/1/boards/${boardId}/cards?key=${config.apiKey}&token=${config.apiToken}`).then(toCards)
  }
}
