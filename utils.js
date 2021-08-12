const fs = require('fs')
const path = require('path')

module.exports = {
  getStoryData
}

//callback
function getStoryData (cb) {
  //get the filepath
  const filepath = path.join(__dirname, 'story.txt')
  //read the file
  fs.readFile(filepath, 'utf8', (err, storyData) => {
    if (err){
      //console error
      console.error('Unable to find Stories data')
      return
    }
    try{
      //
      const realData = storyData
    cb(null, realData)
    } catch (parseErr){
      console.error("I couldn\'t understand Stories data")
    } 
  })
}