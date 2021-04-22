
const fs = require("fs");
const path = require("path");

function filterByQuery(query, animalsArray){
    let personalityTraitsArray = [];
    let filteredResults = animalsArray
    if(query.personalityTraits){
        if(typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits]
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(animal =>
                animal.personalityTraits.indexOf(trait) !== -1
            )
        })
    }
    if(query.diet){
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
    }
    if(query.species){
        filteredResults = filteredResults.filter(animal => animal.species === query.species)
    }
    if(query.name){
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }
    return filteredResults
}
function findById(id, animalsArray){
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result
}
function createNewAnimal(body, animalsArray) {
    console.log(body, '36')
    const animal = body;
    animalsArray.push(animal)
    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify({animals: animalsArray}, null, 2)
    );
    return animal;
}
function validateAnimal(animal) {
    console.log(animal)
    if(!animal.name || typeof animal.name !== 'string') {
        console.log('name error') 
         return false
     }
    if(!animal.species || typeof animal.species !== 'string') {
        console.log('species error')
         return false
     }
    if(!animal.diet || typeof animal.diet !== 'string') {
        console.log('diet error')
        return false
    }
    if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        console.log('traits error')
        return false
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
  };