const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use(cors({ origin: "*" }));

const router = express.Router();
app.use("/", router);


app.listen(3000, function(){console.log("App listening on port 3000")});

//Using array in memory to represent database
let dogs = [
    {
        id:1,
        name:"Koshi",
        age:14,
        species:"Collie-Poodle"
    }
];

//Get all dogs
router.get("/api/dog", (req, res) => {
    //Send dogs array of json objects in the response
    res.json(dogs);
});

//Add a dog
router.post("/api/dog/add", (req,res) => {
    console.log(req.body);
    //Push the json object in the request to the dogs array
    dogs.push(req.body);
    res.sendStatus(204);
});

//Get individual Dog
router.get("/api/dog/:id", (req,res) => {
    //Store the id paramter from the url in a variable
    let dogID = req.params.id;
    
    //Loop through dogs array until correct dog is found
    for(let x in dogs){
        if(dogs[x].id == dogID){
            res.json(dogs[x]);
        }
    }

});

//Delete Dog
router.delete("/api/dog/delete/:id", (req,res) =>{

    let dogID = req.params.id;

    for(let i in dogs){
        if(dogs[i].id == dogID){
            dogs.splice(i,1);
            break;
        }
    }

});

//Update a dog
router.put("/api/updateDog/:id", (req,res) => {

    let dogID = req.params.id;

        for(let i in dogs){
            if(dogs[i].id == dogID){

                //Access individual fields in json object sent by the request
                dogs[i].name = req.body.name;
                dogs[i].age = req.body.age;
                dogs[i].species = req.body.species;
                break;
            }
        }

});

//Go to homepage
app.get('/',function(req,res){
       
     res.sendFile(path.join(__dirname + '/static/index.html'));

});

//Redirect any unecognised url
app.all('*', (req,res) => {
    res.redirect('/');
});