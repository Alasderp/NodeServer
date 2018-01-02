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

    let url = "http://localhost:3000/api/dog/add";

    $.post(url,payload,function(){});

}


function getDog(){
    let id = $("#idInput").val();

    $.getJSON(("http://localhost:3000/api/dog/" + id), 
        function(jsonData){
            dog = jsonData;
            $("#body").append("Name:" + dog.name + "<br>");
            $("#body").append("Age:" + dog.age + "<br>");
            $("#body").append("Breed:" + dog.species + "<br>");
        }
    );
    
}

function updateDog(){

    let id = $("#idInput").val();



}
