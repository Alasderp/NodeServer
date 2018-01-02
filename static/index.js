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

function addDog(){

    let id = $("#idInput").val();
    let name = $("#nameInput").val();
    let age = $("#ageInput").val();
    let breed = $("#breedInput").val();

    let payload = {
        "id":id,
        "name":name,
        "age":age,
        "species":breed
    };

    let url = baseURL + "api/dog/add";

    $.post(url,payload,function(){});

}


function getDog(){
    let id = $("#idInput").val();

    $.getJSON((baseURL + "api/dog/" + id), 
        function(jsonData){
            dog = jsonData;
            $("#body").append("Name:" + dog.name + "<br>");
            $("#body").append("Age:" + dog.age + "<br>");
            $("#body").append("Breed:" + dog.species + "<br>");
        }
    );
    
}

function deleteDog(){
    let id = $("#idInput").val();

    var url=baseURL + "api/dog/delete/" + id
	var settings={type:"DELETE"};

	$.ajax(url,settings);

}


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

function allDogs(){
    let url = baseURL + "api/dog"


    $.getJSON(url, 
        function(jsonData){
            for(let x in jsonData){
                dog = jsonData[x];
                $("#body").append("Name:" + dog.name + "<br>");
                $("#body").append("Age:" + dog.age + "<br>");
                $("#body").append("Breed:" + dog.species + "<br>");
            }
        }
    );

}
