const { cardsFor } = require('./lib/trello')
const { configuration } = require('./lib/trello/configuration')

const boardId = configuration().boardId

cardsFor(boardId)
.then((cards) => console.log(cards))
