var minNumber = 13;
var maxNumber = 55

//var miNumbe = 1;
//var maNumbr = 9;

var targetNumber = randomNumberFromRange(minNumber, maxNumber);

function randomNumberFromRange(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}  

//var A = randomNumberRange(miNumbe, maNumbe);
//var B = randomNumberRange(miNumbe, maNumbe);
//var C = randomNumberRange(miNumbe, maNumbe);
//var D = randomNumberRange(miNumbe, maNumbe);

//function randomNumberRange(min,max)
//{
//    return Math.floor(Math.random()*(max-min+1)+min);
//}  



var winT = 0;

var loseT = 0;

$("#number-to-guess").text(targetNumber);

var crystals = $("#crystals");

var counter = 0;






// We begin by expanding our array to include four options. NEED TO MAKE RANDOM BEFORE FINALIZING
var numberOptions = [2, 3, 5, 8];

// Next we create a for loop to create crystals for every numberOption.
for (var i = 0; i < numberOptions.length; i++) {

// For each iteration, we will create an imageCrystal
var imageCrystal = $("<img>");

// First each crystal will be given the class ".crystal-image".
// This will allow the CSS to take effect.
imageCrystal.addClass("crystal-image");

// Each imageCrystal will be given a src link to the crystal image
imageCrystal.attr("src", "./assets/images/image" + i + ".jpg" );  //"https://mattfiske.files.wordpress.com/2014/02/moldavite.jpg"
 


// Each imageCrystal will be given a data attribute called data-crystalValue.
// This data attribute will be set equal to the array value.
imageCrystal.attr("data-crystalvalue", numberOptions[i]);

// Lastly, each crystal image (with all it classes and attributes) will get added to the page.
crystals.append(imageCrystal);
}

// This time, our click event applies to every single crystal on the page. Not just one.
crystals.on("click", ".crystal-image", function() {

// Determining the crystal's value requires us to extract the value from the data attribute.
// Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
// Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
// Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

var crystalValue = ($(this).attr("data-crystalvalue"));
crystalValue = parseInt(crystalValue);
// We then add the crystalValue to the user's "counter" which is a global variable.
// Every click, from every crystal adds to the global counter.
counter += crystalValue;

// All of the same game win-lose logic applies. So the rest remains unchanged.
$("#totalScore").text(+ counter);
//alert("New score: " + counter);

if (counter === targetNumber) {
    winT++;
    $("#messageWL").text("You Win");
    
    $("#winTotal").text(+ winT);
    
    setTimeout(function(){resetGame()}, 3000);
    
}

else if (counter >= targetNumber) {
    loseT++;
    $("#messageWL").text("You Lose");
    
    $("#loseTotal").text(+ loseT);
    
    setTimeout(function(){resetGame()}, 3000);
   
}

});

function resetGame() {

//gameStarted = false;

targetNumber = randomNumberFromRange(minNumber, maxNumber);
A = randomNumberRange(miNumbe, maNumbe);
B = randomNumberRange(miNumbe, maNumbe);
C = randomNumberRange(miNumbe, maNumbe);
D = randomNumberRange(miNumbe, maNumbe);

counter = 0;

updateDisplay();
};


function updateDisplay() {

$("#totalScore").text(+ counter);
$("#messageWL").text("");
$("#number-to-guess").text(targetNumber);
}




