const host = 'https://api.trello.com'
const apiToken = process.env.API_TOKEN
const apiKey = process.env.API_KEY

exports.listsFromBoard = (id) => `${host}/1/boards/${id}/lists?key=${apiKey}&token=${apiToken}`
exports.cardsFromBoard = (id) => `${host}/1/boards/${id}/cards?key=${apiKey}&token=${apiToken}`
exports.actionsFromCard = (id) => `${host}/1/cards/${id}/actions?filter=updateCard:idList&key=${apiKey}&token=${apiToken}`