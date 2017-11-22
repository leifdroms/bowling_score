// assumes input is as space separate list of rolls,
// except when there's a spare or gutter ball
let bowling_score = function(rolls) {
const rollArr = rolls.replace(/\s/g, '').split('');

let i = 0;
let frame = 0;
let frames = [];
let endFrame = 9;
let validGame = true;

let hashMap = {
'-': scoreToInt,
'/': spareBonus,
'X': scoreToInt,
'1': scoreToInt,
'2': scoreToInt,
'3': scoreToInt,
'4': scoreToInt,
'5': scoreToInt,
'6': scoreToInt,
'7': scoreToInt,
'8': scoreToInt,
'9': scoreToInt,
'10': scoreToInt,
'undefined': scoreToInt,
};


/**
 * Calculate score for strike and push to frames array
 */
function strikeScore() {
frames.push( [rollArr[i], rollArr[i+1], rollArr[i+2]] );
i++;
frame++;
}

/**
 * Calculate score for spare and push to frames array
 */
function spareScore() {
frames.push([rollArr[i], rollArr[i+1], rollArr[i+2]]);
i+=2;
frame++;
}

/**
 * Calculate bonus for spare and update frames array
 * @param {string} roll The value of the roll
 * @param {number} index The index of the roll
 * @param {array} frame The frame of the frames array
 * @return {number} returns bonus
 */
function spareBonus(roll, index, frame) {
let previousRoll = frame[index-1];
let bonus = 10-previousRoll;
return bonus;
}

/**
 * Converts roll as "string" to Int
 * @param {string} roll The value of the roll
 * @return {string} returns bonus
 */
function scoreToInt(roll) {
if (roll == '-') {
return 0;
}
if (roll == 'X') {
return 10;
}
if (roll == undefined) {
return 0;
} else {
return parseInt(roll);
}
}

/**
 * Pushes non-strike, non-spare pins to frames array
 */
function normalScore() {
if(rollArr[i]) {
frames.push([rollArr[i], rollArr[i+1]])
};
i+=2;
frame++;
}

/**
 * Pushes non-strike, non-spare pins to frames array
 * @param {array} frames frames array
 * @return {int} calculated game score
 */
function calculateScore(frames) {
let score = 0;

frames = frames.map((frame) => {
return frame.map((roll, index, frame) =>{
score += roll;
});
});

return score;
}

// handle all frames up to frame 10
while (frame < endFrame && validGame) {
// break out of terminal loop if partial game
if (!rollArr[i]) {
endFrame = frame;
}

// detect invalid frame.
if ((parseInt(rollArr[i]) + parseInt(rollArr[i+1])) > 9) {
validGame = false;
}

// assign score
rollArr[i] == 'X' ? strikeScore() :
rollArr[i+1] == '/' ? spareScore() : normalScore();
}

// handle last frame
let startEndFrameIndex = frame;
if (rollArr[i]) {
frames.push([]);
}

while (i < rollArr.length && validGame) {
// detect invalid last frame
if ((parseInt(rollArr[i]) + parseInt(rollArr[i+1])) > 9) {
validGame = false;
}

rollArr[i] == 'X' ? frames[startEndFrameIndex].push('10') :
rollArr[i] == '/' ?
frames[startEndFrameIndex].push((10-parseInt(rollArr[i-1])).toString()) :
frames[startEndFrameIndex].push(rollArr[i]);
i++;
}

// Convert frames array from type string to number
frames = frames.map((frame) => {
return frame.map((roll, index, frame) => {
return hashMap[roll](roll, index, frame);
});
});

// check if frames > 10 and no extra rolls in last frame;
if (frames.length > 10 || frames[frames.length-1].length > 3) {
validGame = false;
}
let score = {
'gameType': null,
'lastFrame': frames.length,
'score': calculateScore(frames),

};
// check for invalid game (more than 10 frames or contains an invalid frame)
if (validGame == false) {
score.gameType = 'Invalid Game';
} else if (frames.length < 10) {
score.gameType = 'Partial Game';
} else {
score.gameType = 'Complete Game';
}
let outcome = `Game Type: ${score.gameType} 
Last Frame: ${score.lastFrame} 
Score: ${score.score}`;
return score;
/** Notes
1. I tried to reduce the amount of conditional logic
using a hashmap for score values
**/
}
module.exports = bowling_score;
