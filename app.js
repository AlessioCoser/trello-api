const {TrelloApi} = require('./lib/trello/api')

let trelloApi = TrelloApi()

trelloApi.myBoards()
.then((boards) => boards.forEach((board) => console.log(board)))
