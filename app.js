const request = require('request')
const apiToken = process.env.API_TOKEN
const apiKey = process.env.API_KEY
const boardId = process.env.BOARD_ID

const listsFromBoard = (id) => {
  return `https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${apiToken}`
}

const cardsFromBoard = (id) => {
  return `https://api.trello.com/1/boards/${id}/cards?key=${apiKey}&token=${apiToken}`
}

const actionsFromCard = (id) => {
  return `https://api.trello.com/1/card/${id}/actions?key=${apiKey}&token=${apiToken}`
}

const toJson = (response) => {
  return JSON.parse(response.body)
}

const filterByName = (name) => {
  return (lists) => {
    return lists.filter((list) => list.name === name)
  }
}

const get = (uri) => {
  return new Promise((resolve, reject) => {
    return request(uri, (error, response, body) => {
      if (error) { reject(error) }
      resolve(response)
    })
  })
}

get(cardsFromBoard(boardId))
.then(toJson)
.then(filterByName('Board Unica'))
.then((cards) => {
  console.log(cards)
})

// get(listsFromBoard(boardId))
// .then(toJson)
// .then(filterByName('DONE'))
// .then(list => {
//   console.log(list)
// })
// .catch((error) => {
//   console.log(error)
// })
