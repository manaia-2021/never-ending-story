const fs = require('fs');
const path = require('path');
const express = require('express');
const checkWord = require('check-word');
const { getStoryData } = require('./utils');

const words = checkWord('en');
const { getStoryData, updateStoryData} = require('./utils')

const router = express.Router();
module.exports = router;

// GET /puppies/id
router.get('/', (req, res) => {
  const template = 'details'
  getStoryData((err, storyData) => {
    if (err) {
      res.status(500).send(err.message)
      return
    }
    //res.render(template, storyData)
    res.send (`<h1>${storyData}</h1>`)
  })
})

router.post('/', (req, res) => {
  // Create an object of the updated story data from the request body
  const newWord = req.body;
  // Check if word is in english dictionary.
  if (words.check(newWord) === true) {
    // Read in the JSON file and locate the puppy we are going to update
    getStoryData((err, storyData) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      // Update the story with the new word
      const newStoryData = `${storyData} ${newWord}`;
      // Write the entire story back to the file
      try {
        const filepath = path.join(__dirname, 'story.txt');
        // write back to the file
        fs.writeFile(filepath, newStoryData, 'utf8', (err) => {
          if (err) {
            console.error('Story could not be changed');
          }
        });
      } catch {
        console.error('Something went wrong with the Story');
      }
    });
    res.redirect(`${req.baseUrl}`);
  }
});

// router.get('/', (req, res) => {
//   res.render('home');
// });
  //Create an object of the updated story data from the request body
  const newWord = req.body
  // Read in the JSON file and locate the puppy we are going to update
  getStoryData((err, storyData) => {
    if (err) {
      res.status(500).send(err.message)
      return
    }
    //Update the story with the new word
    let newStoryData = storyData + ' ' + newWord
    //Write the entire story back to the file
    updateStoryData(newStoryData)
    res.redirect(`${req.baseUrl}`)
  })
})
