const {TrelloApi} = require('./lib/trello/api')
const {TrelloConfig} = require('./lib/trello/config')

const boardId = TrelloConfig().boardId

let trelloApi = TrelloApi()

trelloApi.cardsOf(boardId)
.then((cards) => console.log(cards))
