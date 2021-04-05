const express = require('express');
const app = express();
const { animals } = require('./data/animals');







function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Save animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated Array
        // If pT is a string, place into new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop thru each trait in pT array:
        personalityTraitsArray.forEach(trait => {
            // Check trait against each animal in filteredResults array
            // It is initially a copy of the animalsArray,
            // but here we're updating it for each trait in .forEach() loop
            // For each trait targeted by the filter, the filteredResults array
            // will then contain only the entries that contain the trait
            // so at the end we'll have an array of animals that have every one
            // of the traits when the .forEach() loop is finished
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
        }
   
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
  }


  app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });
app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});