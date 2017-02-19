
class sequence {
  constructor() { this.id = 1 } // Number.MIN_SAFE_INTEGER
  next() { return this.id++ }
}

const words = new Map()
const passages = new Map()
const wordPassageIDs = new Map()
const wordID = new sequence()
const passageID = new sequence()

module.exports.addWord = (word) => {
  word.id = wordID.next()
  words.set(word.id, word)
  wordPassageIDs.set(word.id, new Set())
  return word
}

module.exports.addPassage = (passage) => {
  passage.id = passageID.next()
  passages.set(passage.id, passage)
  return passage
}

module.exports.getWord = (wordID) => words.get(wordID)

module.exports.getPassage = (passageID) => passages.get(passageID)

module.exports.addWordPassageID = (wordID, passageID) => {
   const placeIDs = wordPassageIDs.get(wordID)
   placeIDs.add(passageID)
   return passageID
}

module.exports.getWordPassageIDs = (wordID) => wordPassageIDs.get(wordID)
