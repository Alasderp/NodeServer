var baseURL = "http://localhost:3000/";

try	{
	$(function()
	{
		init();
	}
);} 
catch (e)
{
	alert("*** jQuery not loaded. ***");
}

//Find buttons on page and add click handlers
function init(){
    
    $("#addDog").click(function()
    {
        addDog();
    }   
    );

    
    $("#getDog").click(function()
    {
        getDog();
    }
    );

    $("#updateDog").click(function()
    {
        updateDog();
    }
    );

    $("#deleteDog").click(function()
    {
        deleteDog();
    }
    );

    $("#allDogs").click(function()
    {
        allDogs();
    }
    );
    

}

//Create and add dog
function addDog(){

    //Get values from text boxes
    let id = $("#idInput").val();
    let name = $("#nameInput").val();
    let age = $("#ageInput").val();
    let breed = $("#breedInput").val();

    //Create json object from values
    let payload = {
        "id":id,
        "name":name,
        "age":age,
        "species":breed
    };

    let url = baseURL + "api/dog/add";

    $.post(url,payload,function(){});

}

//Get individual dog by id
function getDog(){
    let id = $("#idInput").val();

    $.getJSON((baseURL + "api/dog/" + id), 
    //Success function
    function(jsonData){
            dog = jsonData;
            $("#body").append("Name:" + dog.name + "<br>");
            $("#body").append("Age:" + dog.age + "<br>");
            $("#body").append("Breed:" + dog.species + "<br>");
        }
    );
    
}

//Remove a dog by id
function deleteDog(){
    let id = $("#idInput").val();

    var url=baseURL + "api/dog/delete/" + id
	var settings={type:"DELETE"};

	$.ajax(url,settings);

}

//Update a dog
function updateDog(){

    let id = $("#idInput").val();
    let url = baseURL + "api/updateDog/" + id;

    let name = $("#nameInput").val();
    let age = $("#ageInput").val();
    let breed = $("#breedInput").val();

    let payload = {
        "name":name,
        "age":age,
        "species":breed
    };

    $.ajax({
        url: url,
        type: 'PUT',
        data: payload,
        success: function() {}
});

    
}

//Retrieve all dogs
function allDogs(){
    let url = baseURL + "api/dog"

    $.getJSON(url,   
        
        function(jsonData){
            //Loop through json data returned by server

            for(let x in jsonData){
                dog = jsonData[x];
                $("#dogContainer").append("Name:" + dog.name + "<br>");
                $("#dogContainer").append("Age:" + dog.age + "<br>");
                $("#dogContainer").append("Breed:" + dog.species + "<br>");
                $("#dogContainer").append("<br>");
            }

        }
    );

}
