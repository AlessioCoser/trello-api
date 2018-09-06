const {TrelloApi, TrelloConfig} = require('./lib/Trello')

let trelloApi = TrelloApi(TrelloConfig())

trelloApi.myBoards()
.then((boards) => boards.forEach((board) => console.log(board)))
