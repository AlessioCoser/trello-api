const {closedByWeeks, countClosedByWeeks} = require('./closedByWeeks')
const {listsMovesActions} = require('./listsMovesActions')

const printTitle = (title) => {
  console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  console.log(`~~~ ${title} ~~~`)
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n')
}

const runAll = (rules) => {
  return (response) => {
    return Promise.all(rules.map((rule) => Promise.resolve(response).then(rule)))
  }
}

exports.runAllRules = runAll([listsMovesActions, closedByWeeks, countClosedByWeeks])

exports.printAllRules = ([listsMovesActions, closedByWeeks, countClosedByWeeks]) => {
  printTitle('List Moves Actions')
  console.log(listsMovesActions)
  printTitle('Closed By Weeks Items')
  console.log(closedByWeeks)
  printTitle('Closed By Weeks Count')
  console.log(countClosedByWeeks)
  console.log('\n\n~ END ~\n')
}
