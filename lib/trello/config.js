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
