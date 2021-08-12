const fs = require('fs')
const path = require('path')
const express = require('express');
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