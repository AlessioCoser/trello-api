const { fetchJson } = require('../utils/fetch')
const { TrelloConfig } = require('./config')

exports.myBoards = (config = TrelloConfig()) => {
  const boardsUrl = `${config.host}/1/members/${config.username}/boards?key=${config.apiKey}&token=${config.apiToken}`

  const toBoard = (board) => ({id: board.id, name: board.name})
  const toBoards = (boards) => boards.map(toBoard)

  return fetchJson(boardsUrl).then(toBoards)
}
