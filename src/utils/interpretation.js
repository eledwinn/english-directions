const verbs = ['turn', 'go']
const directions = ['right', 'left', 'back', 'straight']
const numbers = [
  { key: 'one', value: 1 },
  { key: 'two', value: 2 },
  { key: 'three', value: 3 },
  { key: 'four', value: 4 },
  { key: 'five', value: 5 },
  { key: 'six', value: 6 },
  { key: 'seven', value: 7 },
  { key: 'eight', value: 8 },
  { key: 'nine', value: 9 },
  { key: 'ten', value: 10 },
  { key: '1', value: 1 },
  { key: '2', value: 2 },
  { key: '3', value: 3 },
  { key: '4', value: 4 },
  { key: '5', value: 5 },
  { key: '6', value: 6 },
  { key: '7', value: 7 },
  { key: '8', value: 8 },
  { key: '9', value: 9 },
  { key: '10', value: 10 }
]

function validate(text) {
  const words = text.split(' ')
  const verb = getVerb(words)
  if (!verb) {
    throw 'No verbs found'
  }

  const direction = getDirection(words)
  if (!direction) {
    throw 'No direction found'
  }

  const number = getNumber(words)
  if (!number) {
    throw 'No number found'
  }

  return {
    direction,
    number
  }
}

function getVerb(words) {
  return words.find(word => verbs.indexOf(word) >= 0)
}

function getDirection(words) {
  return words.find(word => directions.indexOf(word) >= 0)
}

function getNumber(words) {
  return numbers.find(number => words.find(word => number.key === word))
}

export default {
  validate
}