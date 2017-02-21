var assert = require('assert')
var repository = require('./repository')

describe('addWord', function() {
  it('handles CRUD create Word', function() {
    var result = repository.addWord(({chars:"Bob",lang:"OE",english:"rob"}))
    assert.equal(isNaN(result.id), false, 'addWord("Bob") has :id')
  })
  it('handles CRUD create Word(zero arg)', function() {
    var result = repository.addWord(({chars:0,lang:"OE",english:"rob"}))
    assert.equal(isNaN(result.id), false, 'addWord(0) has :id')
  })
  it('handles CRUD create Word(empty string arg)', function() {
    var result = repository.addWord(({chars:"",lang:"OE",english:"rob"}))
    assert.equal(isNaN(result.id), false, 'addWord("") has :id')
  })
  it('handles CRUD create Word(null json arg) - DESTRUCTIVE', function() {
    var result = repository.addWord(({chars:"Bob"}))
    assert.equal(isNaN(result.id), true, 'addWord(null) has no :id')
  })
})


describe('findWord', function() {
  it('handles CRUD read person', function() {
    var word = repository.addWord(({chars:"Bob",lang:"OE",english:"rob"}))
    var result = repository.findWord(({word_id: word.id }))
    assert.equal(isNaN(result.id), false, 'getWord(..) result has :id')
  })
  it('handles CRUD read Word(missing arg)', function() {
    var result = repository.findWord(({id: "wrong-name" }))
    assert.equal(isNaN(result.id), true, 'findWord(missing arg) result has no :id')
    assert.equal(result.error, "Word lookup requires valid :word_id", 'getWord(missing arg) result has no :id')
  })
})

describe('addPassage', function() {
  it('handles CRUD create Place', function() {
    var result = repository.addPassage(({chars:"Bob",lang:"OE",source:"book",english:"rob"}))
    assert.equal(isNaN(result.id), false, 'addPassage(..) result has :id')
  })
  it('handles CRUD create Place(numeric zero arg)', function() {
    var result = repository.addPassage(({chars:"0",lang:"OE",source:"book",english:"rob"}))
    assert.equal(isNaN(result.id), false, 'addPassage(..) result has :id')
  })
  // Potential internal BUG, if route.js "id" passed in accidentally
  it('accidentally handles CRUD create no-chars Passage(missing arg BUG with "id")', function() {
    var result = repository.addPassage(({id:"1",lang:"OE",source:"book",english:"rob"}))
    // i.e. saves without chars
    assert.equal(isNaN(result.id), false, `addPassage(..) result has :id (${result.id})`)
  })
  it('handles CRUD create Passage(missing arg)', function() {
    var result = repository.addPassage(({lang:"OE",source:"book",english:"rob"}))
    assert.equal(isNaN(result.id), true, `addPassage(..) result has no :id`)
  })
})

describe('findPassage', function() {
  it('handles CRUD read Passage', function() {
    var passage = repository.addPassage(({chars:"Bob",lang:"OE",source:"book",english:"rob"}))
    var result = repository.findPassage(({passage_id: passage.id }))
    assert.equal(isNaN(result.id), false, 'findPassage(..) result has no :id')
  })
  it('handles CRUD read Passage(missing arg)', function() {
    var passage = repository.addPassage(({name:"Bob",lang:"OE",source:"book",english:"rob"}))
    var result = repository.findPassage(({passage_id: passage.id }))
    assert.equal(isNaN(result.id), true, 'getPassage(missing arg) result has no :id')
    assert.equal(result.error, "Passage lookup requires valid :passage_id")
  })
})

describe('addWordPassage', function() {
  it('handles CRUD create Word associated Passage', function() {
    var word = repository.addWord(({chars:"Bob",lang:"OE",english:"rob"}))
    var passage = repository.addPassage(({chars:"Hello Bob",lang:"OE",source:"book",english:"ahoy rob"}))
    var result = repository.addWordPassage(({word_id : word.id, passage_id : passage.id}))
    assert.equal(isNaN(result.word_id), false, 'addWordPassage(..) result has no :word_id')
    assert.equal(isNaN(result.passage_id), false, 'addWordPassage(..) result has no :message_id')
  })
})
