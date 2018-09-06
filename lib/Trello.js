const {fetchJson} = require('./fetch')

exports.TrelloApi = (config) => {
  const toBoard = (board) => ({id: board.id, name: board.name})
  const toBoards = (boards) => boards.map(toBoard)

  return {
    myBoards: () => fetchJson(`${config.host}/1/members/${config.username}/boards?key=${config.apiKey}&token=${config.apiToken}`).then(toBoards)
  }
}

exports.TrelloConfig = (environment = process.env) => {
  const fromEnv = (key) => environment['npm_package_config_' + key]

  return {
    host: 'https://api.trello.com',
    username: fromEnv('USERNAME'),
    boardId: fromEnv('BOARD_ID'),
    apiToken: fromEnv('API_TOKEN'),
    apiKey: fromEnv('API_KEY')
  }
}
