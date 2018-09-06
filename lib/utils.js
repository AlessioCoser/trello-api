const host = 'https://api.trello.com'
const Config = (key) => process.env['npm_package_config_' + key]
const boardId = Config('BOARD_ID')
const apiToken = Config('API_TOKEN')
const apiKey = Config('API_KEY')

const oneMonthBefore = () => {
  let date = new Date()
  date.setDate(date.getDate() - 35)
  return date.toISOString()
}

exports.listsUrl = `${host}/1/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`
exports.cardsUrl = `${host}/1/boards/${boardId}/cards?key=${apiKey}&token=${apiToken}`
exports.actionsFromCardUrl = (id, actionsSince = oneMonthBefore()) => `${host}/1/cards/${id}/actions?filter=updateCard:idList&action_since=${actionsSince}&key=${apiKey}&token=${apiToken}`
