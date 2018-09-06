const { fetchJson } = require('../utils/fetch')
const { TrelloConfig } = require('./config')

exports.TrelloApi = (config = TrelloConfig()) => {
  const toBoard = (board) => ({id: board.id, name: board.name})
  const toBoards = (boards) => boards.map(toBoard)

  return {
    myBoards: () => fetchJson(`${config.host}/1/members/${config.username}/boards?key=${config.apiKey}&token=${config.apiToken}`).then(toBoards)
  }
}
