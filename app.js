const { api } = require('./lib/trello')
const {TrelloConfig} = require('./lib/trello/config')

const boardId = TrelloConfig().boardId

api.cardsOf(boardId)
.then((cards) => console.log(cards))
