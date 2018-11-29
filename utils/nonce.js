const padStart = (string, targetLength, padString) => {
  const stringLength = string.length
  if (stringLength == targetLength)
    return string

  const stringDiffLength = targetLength - stringLength
  let newString = ''
  for (let i = 1; i <= stringDiffLength; i++) {
    newString += padString
  }

  return newString + string
}

module.exports = (length) => {
  if (length == undefined || length < 1)
    length = 15
  const maxValue = parseInt(padStart('', length, '9'))
  let repeat = 0,
    last
  return () => {
    let nonce = Math.floor(Math.random() * maxValue)
    /* istanbul ignore if */
    if (nonce == last) {
      repeat++
    } else {
      repeat = 0
      last = nonce
    }
    nonce += repeat
    return padStart(`${nonce}`, length, '0')
  }
}
