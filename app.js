const { cardsFor, myBoards } = require('./lib/trello')
const { configuration } = require('./lib/trello/configuration')
const { closedByWeek } = require('./lib/rules/closedByWeek')

const boardId = configuration().boardId

if (boardId) {
  cardsFor(boardId)
  .then(closedByWeek)
  .then(console.log)
} else {
  console.log('Please choose one of these boards:\n\n')
  myBoards().then(console.log)
}


