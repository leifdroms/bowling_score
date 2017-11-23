const bowling_score = require("../bowling_score.js");
const chai = require('chai');
const assert = chai.assert;

describe('Normal Game - All Strikes', function() {
	it('should give a score of 300 for all strikes, game type as "Complete Game", and last frame as 10. Input: \'X X X X X X X X X X X X\'', function() {
    let rolls = 'X X X X X X X X X X X X'
    let score = bowling_score(rolls)
    assert.equal(score.gameType, 'Complete Game');
    assert.equal(score.lastFrame, 10);
    assert.equal(score.score, 300);
  });

});

describe('Normal Game - All Spares', function() {
	it('should give a score of 150 for all spares and last roll as 5, game type as "Complete Game", and last frame as 10. Input: \'5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5\'', function() {
    let rolls = '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5'
    let score = bowling_score(rolls)
    assert.equal(score.gameType, 'Complete Game');
    assert.equal(score.lastFrame, 10);
    assert.equal(score.score, 150);
  });

});

describe('Normal Game - All 9\'s and gutterball', function() {
	it('should give a score of 90 for all 9\'s game type as "Complete Game", and last frame as 10. Input: \'9- 9- 9- 9- 9- 9- 9- 9- 9- 9-\'', function() {
    let rolls = '9- 9- 9- 9- 9- 9- 9- 9- 9- 9-'
    let score = bowling_score(rolls)
    assert.equal(score.gameType, 'Complete Game');
    assert.equal(score.lastFrame, 10);
    assert.equal(score.score, 90);
  });

});

describe('Normal Game - Mixture of Strikes, Spares, and Regular rolls. Input: \'9- 9/ X X 4 3 2- 3 5 8/ X 6/ 5\'', function() {
	it('should give a score of 142, game type as "Complete Game", and last frame as 10', function() {
    let rolls = '9- 9/ X X 4 3 2- 3 5 8/ X 6/ 5'
    let score = bowling_score(rolls)
    assert.equal(score.gameType, 'Complete Game');
    assert.equal(score.lastFrame, 10);
    assert.equal(score.score, 142);
  });

});

describe('Partial Game - Mixture of Strikes, Spares, and Regular rolls', function() {
	it('should give a score of 76, game type as "Partial Game", and last frame as 6. Input: \'X 5/ 7- X 4 3 6 2\'', function() {
    let rolls = 'X 5/ 7- X 4 3 6 2'
    let score = bowling_score(rolls)
    assert.equal(score.gameType, 'Partial Game');
    assert.equal(score.lastFrame, 6);
    assert.equal(score.score, 76);
  });

});

describe('Invalid Game - Too many rolls. Input: \'X 8 1 3 4 5 4 X 9- -6 8- 7/ X 8- X\'', function() {
	it('should give a score of 142, game type as "Invalid Game", and last frame as 11', function() {
    let rolls = 'X 8 1 3 4 5 4 X 9- -6 8- 7/ X 8- X'
    let score = bowling_score(rolls)
    assert.equal(score.gameType, 'Invalid Game');
    assert.equal(score.lastFrame, 11);
    assert.equal(score.score, 142);
  });

});

describe('Invalid Game - Too many pins in certain frames. Input: \'X X 8 8 5/ 4 2 5 1 X 5/ 4 8 5/ 1\'', function() {
	it('should give a score of 153, game type as "Invalid Game", and last frame as 10', function() {
    let rolls = 'X X 8 8 5/ 4 2 5 1 X 5/ 4 8 5/ 1'
    let score = bowling_score(rolls)
    assert.equal(score.gameType, 'Invalid Game');
    assert.equal(score.lastFrame, 10);
    assert.equal(score.score, 153);
  });

});

