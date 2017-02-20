const assert = require('assert')
const memstore = require('./memstore')

describe('addWord', function() {
  it('handles Word persistence', function() {
    const bobA = ({id:null,name:"BobA"})
    const result1 = memstore.addWord(bobA)
    assert.equal(isNaN(result1.id), false, 'addWord("BobA") has :id')
    assert.equal(bobA.id, result1.id, 'original "BobA" object has :id')
    const result2 = memstore.addWord(({id:null,name:"BobB"}))
    assert.equal(isNaN(result2.id), false, 'addWord("BobB") has :id')
    assert.equal(result2.id > result1.id, true, '"BobA" and "BobB" have different IDs')
  })
})

describe('addPassage', function() {
  it('handles Passage persistence', function() {
    const g1 = ({id:null,chars:"Greenwich",lang:"49.9",english:"-0"})
    const g2 = ({id:null,chars:"Greenwich",lang:"42.3",english:"73.5"})
    var result1 = memstore.addPassage(g1)
    var result2 = memstore.addPassage(g2)
    assert.equal(isNaN(result1.id), false, 'addPassage("Greenwich" .. ) has :id')
    assert.equal(isNaN(result2.id), false, 'addPassage("Greenwich" .. ) has :id')
    assert.equal(result2.id > result1.id, true, '"Greenwich"-a and "Greenwich"-b have different IDs')
  })
})

describe('addWordPassage', function() {
  it('handles Word-Passage association persistence', function() {
    const bobA = ({id:null,name:"BobA"})
    const result1 = memstore.addWord(bobA)
    assert.equal(isNaN(result1.id), false, 'addWord("BobA") has :id')

    var result2 = memstore.addWordPassageID(result1.id, "-999")
    assert.equal(result2, "-999", 'addWordPassage("BobA") has 1st :message_id')
    var result3 = memstore.addWordPassageID(result1.id, "999")
    assert.equal(result3, "999", 'addWordPassage("BobA") has 1st :message_id')

    var result4 = memstore.getWordPassageIDs(result1.id)
    assert.equal(result4.has("999") && result4.has("-999"), true, '"BobA" has two different placeIDs')
  })
})
