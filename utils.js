const fs = require('fs')
const path = require('path')

module.exports = {
  getStoryData,
  updateStoryData
}

//callback
function getStoryData (cb) {
  //get the filepath
  const filepath = path.join(__dirname, 'story.txt')
  //read the file
  fs.readFile(filepath, 'utf8', (err, storyData) => {
    if (err){
      //console error
      console.error('Read Error: Unable to find Stories data')
      return
    }
    try{
    cb(null, storyData)
    } catch (parseErr){
      console.error("Catch Error: Something went wrong reading the Stories data")
    } 
  })
}

function updateStoryData(pupId, newStoryData) {
  console.log(newStoryData)
  //write the updated puppy data
  try {
    const filepath = path.join(__dirname, 'story.txt')
    fs.writeFile(filepath, newStoryData, "utf8", (err) =>{
      if(err){
        console.error('Write error: Story could not be changed')
        return
      }
    })
  } catch {
    console.error('Catch Error: Story update problem')
  } 
}