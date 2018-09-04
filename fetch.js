const {request} = require('https')
const {parse} = require('url')

exports.parseJson = (res, {parse} = JSON, {concat} = Buffer) => {
  return new Promise((resolve, reject) => {
    const buffer = []
    res.on('data', data => buffer.push(data))
    res.on('end', end => {
      try {
        resolve(parse(concat(buffer)))
      } catch (err) {
        reject(err)
      }
    })
  })
}

exports.fetch = (url, {method, body} = {method: 'GET', body: ''}, {fetch} = exports) => {
  return new Promise((resolve, reject) => {
    const options = parse(url)
    if (method) {
      options.method = method
      options.headers = { 'Content-Type': 'application/json' }
    }
    const req = request(options, (res) => {
      resolve(res.headers.location ? fetch(res.headers.location, {method, body}) : res)
    }).on('error', reject)
    if (body) {
      req.write(body)
    }
    req.end()
  })
}

exports.fetchJson = (url, {method, body} = {method: 'GET', body: ''}, {fetch, parseJson} = exports) => {
  return fetch(url, {method, body}).then(parseJson)
}
