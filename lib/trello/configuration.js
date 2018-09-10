exports.configuration = (env = process.env) => {
  const fromEnv = (key) => env['npm_package_config_' + key]

  return {
    host: 'https://api.trello.com',
    username: fromEnv('USERNAME'),
    apiToken: fromEnv('API_TOKEN'),
    apiKey: fromEnv('API_KEY'),
    boardId: fromEnv('BOARD_ID'),
    lists: {
      doing: fromEnv('DOING_LIST'),
      done: fromEnv('DONE_LIST')
    }
  }
}
