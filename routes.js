const fs = require('fs');
const path = require('path');
const express = require('express');
const checkWord = require('check-word');
const words = checkWord('en');
const { getStoryData, updateStoryData} = require('./utils')
const router = express.Router();
module.exports = router;

// GET /puppies/id
router.get('/', (req, res) => {
  const template = 'home'
  getStoryData((err, storyData) => {
    if (err) {
      res.status(500).send(err.message)
      return
    }
    let storyDataObj = {}
    storyDataObj.NeverEndingStory = `${storyData}`
    const viewData = {
      storyData: storyDataObj.NeverEndingStory
    }
    res.render(template,viewData)
  })
})

router.post('/', (req, res) => {
  //Create an object of the updated story data from the request body
  const newWord = req.body
  // Read in the JSON file and locate the puppy we are going to update
  if (words.check(newWord.name) == true) {
      getStoryData((err, storyData) => {
      if (err) {
        res.status(500).send(err.message)
        return
      }
      //Update the story with the new word
      let storyDataObj = {}
      storyDataObj.NeverEndingStory = `${storyData}`
      const newStoryData = `${storyData} ${newWord.name}`;
      //Write the entire story back to the file
      updateStoryData(newStoryData)
      
    })
  } else{
    console.log("not a word")
  } 
  res.redirect(`${req.baseUrl}`)
})
