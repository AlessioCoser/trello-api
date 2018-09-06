exports.TrelloConfig = (environment = process.env) => {
  const fromEnv = (key) => environment['npm_package_config_' + key]

  return {
    host: 'https://api.trello.com',
    username: fromEnv('USERNAME'),
    apiToken: fromEnv('API_TOKEN'),
    apiKey: fromEnv('API_KEY'),
    boardId: fromEnv('BOARD_ID')
  }
}
