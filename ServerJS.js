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


app.listen(3001, function(){console.log("App listening on port 3001")});

//Using array in memory to represent database
let dogs = [
    {
        id:1,
        name:"Koshi",
        age:"12 ½",
        species:"Collie-Poodle"
    },
    {
          id:2,
          name:"Rosha",
          age:14,
          species:"Golden Retriever"          
    }
];

//Get all dogs
router.get("/api/dog", (req, res) => {
    //Send dogs array of json objects in the response
    res.json(dogs);
});

//Add a dog
router.post("/api/dog/add", (req,res) => {
    //Push the json object in the request to the dogs array
    dogs.push(req.body);
    res.sendStatus(201);
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

    res.sendStatus(200);
    
});

//Delete Dog
router.delete("/api/dog/delete/:id", (req,res) =>{

    let dogID = req.params.id;

    for(let i in dogs){
        if(dogs[i].id == dogID){
            found = true;
            dogs.splice(i,1);
            break;
        }
    }

    res.sendStatus(200);

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

    res.sendStatus(200);

});

//Go to homepage
app.get('/',function(req,res){
       
     res.sendFile(path.join(__dirname + '/static/index.html'));

});

//Redirect any unecognised url
app.all('*', (req,res) => {
    res.redirect('/');
});