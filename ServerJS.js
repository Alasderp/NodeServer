const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use(cors({ origin: "*" }));

const router = express.Router();
app.use("/", router);


app.listen(3000, function(){console.log("App listening on port 3000")});

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
    res.json(dogs);
});

router.post("/api/dog/add", (req,res) => {
    console.log(req.body);
    dogs.push(req.body);
    res.sendStatus(204);
});

//Get individual Dog
router.get("/api/dog/:id", (req,res) => {
    let dogID = req.params.id;
    
    for(let x in dogs){
        if(dogs[x].id == dogID){
            res.json(dogs[x]);
        }
    }

});

app.get('/',function(req,res){
       
     res.sendFile(path.join(__dirname + '/static/index.html'));

});

app.all('*', (req,res) => {
    res.redirect('/');
});