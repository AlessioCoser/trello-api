const { cardsFor } = require('./lib/trello')
const { configuration } = require('./lib/trello/configuration')
const { closedByWeek } = require('./lib/rules/closedByWeek')

const boardId = configuration().boardId

cardsFor(boardId)
.then((cards) => console.log(closedByWeek(cards)))
