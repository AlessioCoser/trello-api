const apiToken = process.env.API_TOKEN
const apiKey = process.env.API_KEY

exports.listsFromBoard = (id) => {
  return `https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${apiToken}`
}

exports.cardsFromBoard = (id) => {
  return `https://api.trello.com/1/boards/${id}/cards?key=${apiKey}&token=${apiToken}`
}

exports.actionsFromCard = (id) => {
  return `https://api.trello.com/1/cards/${id}/actions?filter=updateCard:idList&key=${apiKey}&token=${apiToken}`
}
