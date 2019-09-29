let clickCounter = {

    fieldA: 0,
    fieldB: 0,
    fieldC: 0,
    fieldD: 0,
    fieldE: 0,
    fieldF: 0,
    fieldG: 0,
    fieldH: 0,
    fieldI: 0

} // Every playing field has a initial value of zero, once it is played the value may change to 1 or -1, depending on the players turn.
//If a possible win sum is equal to 3, team X wins, if it is -3, team O wins.

let turnCounter = 1; //This acts as a switch, if it is set to be 1 it is team X turns, -1 for O team turn, else for no turn.
let scoreX = 0; 
let scoreO = 0; 
let lastWin = 0;
let roundCounter = 0; 
let fieldCounter = 0;
let isMatchWon = false;

function charPick(){
    $(".play, .start").hide();
    $(".charPick").fadeIn();

    function showStart(){

        if($("#OPick").text() !== "" && $("#XPick").text() !== ""){
            $(".start").fadeIn();
        }

    }

    $(".pickX").click(function(){
        $('#XPick').text($(this).text());
        showStart();
    });

    $(".pickO").click(function(){
        $('#OPick').text($(this).text());
        showStart();
    });

}

function scoreCheck(){
        
    if(clickCounter.fieldA+clickCounter.fieldB+clickCounter.fieldC === 3 || clickCounter.fieldA+clickCounter.fieldD+clickCounter.fieldG === 3|| clickCounter.fieldA+clickCounter.fieldE+clickCounter.fieldI === 3 || clickCounter.fieldB+clickCounter.fieldE+clickCounter.fieldH === 3 || clickCounter.fieldC+clickCounter.fieldF+clickCounter.fieldI === 3 || clickCounter.fieldD+clickCounter.fieldE+clickCounter.fieldF === 3 || clickCounter.fieldG+clickCounter.fieldH+clickCounter.fieldI === 3 || clickCounter.fieldG+clickCounter.fieldE+clickCounter.fieldC=== 3){

        $("#XWins").slideDown();
        scoreX++; 
        roundCounter++; 
        turnCounter = 0;
        lastWin = 1;
        isMatchWon = true;
        $(".playAgain").fadeIn(1000);
        $("#bonesScore").text(`${scoreX}`)

    }
    
    if(clickCounter.fieldA+clickCounter.fieldB+clickCounter.fieldC === -3 || clickCounter.fieldA+clickCounter.fieldD+clickCounter.fieldG === -3|| clickCounter.fieldA+clickCounter.fieldE+clickCounter.fieldI === -3 || clickCounter.fieldB+clickCounter.fieldE+clickCounter.fieldH === -3 || clickCounter.fieldC+clickCounter.fieldF+clickCounter.fieldI === -3 || clickCounter.fieldD+clickCounter.fieldE+clickCounter.fieldF === -3 || clickCounter.fieldG+clickCounter.fieldH+clickCounter.fieldI === -3 || clickCounter.fieldG+clickCounter.fieldE+clickCounter.fieldC=== -3){

        $("#OWins").slideDown();
        scoreO++;
        roundCounter++;
        turnCounter = 0;
        lastWin = -1;
        isMatchWon = true;
        $(".playAgain").fadeIn(1000);
        $("#skullScore").text(`${scoreO}`)

    }

    else if(fieldCounter == 9 && isMatchWon === false){
        $("#winning").text("CAT'S GAME! - ROUND DRAWN").show(500);
        roundCounter++;
        turnCounter = 0;
        $(".playAgain").fadeIn(1000);
    }

    if((scoreX == 2) || (roundCounter == 3 && scoreX > scoreO)){
        $("#winning").text("TEAM BONES WINS!").show(500);
        turnCounter = 0;
        $(".playAgain").hide();
    }
    
    if((scoreO == 2) || (roundCounter == 3 && scoreX < scoreO)){
        $("#winning").text("TEAM SKULLS WINS!").show(500);
        turnCounter = 0;
        $(".playAgain").hide();
    }

    if (roundCounter == 3 && scoreX == scoreO){
        $("#winning").text(`IT IS A "CAT'S GAME!" - MATCH DRAWN`).show(500);
        $(".playAgain").hide();
    }
  
}

function roundDisplay(){

    let roundMessages = ['1st Round', '2nd round', '3rd round']

    for (message in roundMessages){
        if( message == roundCounter){
            $("#round").text(roundMessages[message]).fadeIn();
        };
    }

}//Based on the round counter, a message is displayed on screen as a round counter.

function turn(){

    if(turnCounter === -1){
        $("#skullTurn").show(500);
        $("#bonesTurn, #noTurn").hide(500);
    }

    if(turnCounter === 1){
        $("#bonesTurn").show(500);
        $("#skullTurn, #noTurn").hide(500);
    }

    if(turnCounter === 0){
        $("#noTurn").show(500);
        $("#bonesTurn, #skullTurn").hide(500);
    }

}//Displays wich player is the turn based on the turnCounter that switchs according to last winner or draw. 
//Also controls the animation effects times with jquery.

$(document).ready(function() { 

    $("#XWins, #OWins, #skullTurn, #bonesTurn, #noTurn, .playAgain").hide();
    $("html, body").animate({scrollTop: 0}, 1000);

    turn();
    roundDisplay();
    charPick();

    $(".start").click(function(){//Displays the gamimg area and hides the icon selection screen.
 
        $(".play").show(500);
        $(".charPick").hide(500);
        event.preventDefault();
        $("html, body").animate({scrollTop: 115}, 1000);

    });

    $(".field").click(function(){

        if ($(this).text() == ""){

            if (turnCounter === 1){ 
                
                $(this).text($('#XPick').text()).hide().slideDown(700);
                UpdateClickCounter(this.id, +1);
            }

            else if (turnCounter === -1){ 
                
                $(this).text($('#OPick').text()).hide().slideDown(700);
                UpdateClickCounter(this.id, -1);

            }

        }

    turn();

    });

    $( ".playAgain" ).click(function() { //Calls up to action the NEXT ROUND button, case there is a next round.

        $( ".field" ).text(""); 

        for (key in clickCounter){
            clickCounter[key] = 0;
        }

        $("html, body").animate({scrollTop: 115}, 1000);
        $("#XWins, #OWins").slideUp();
        $(".playAgain, #winning").fadeOut(1000);

        if(lastWin === 1 || lastWin === -1){
            turnCounter = lastWin*(-1);
        }

        if(lastWin === 0){
            turnCounter = -1;
        }

        lastWin = 0;
        fieldCounter = 0; 
        isMatchWon = false;

        turn();
        roundDisplay();

    });

    $( ".restart" ).click(function() { //Reset all game and variables to starting values. Also hides gaming area and call back up the icon selection screen.

        $( ".field, #XPick, #OPick" ).text("");

        for (key in clickCounter){
            clickCounter[key] = 0;
        }

        $("#XWins, #OWins").slideUp();
        $(".playAgain, #winning").fadeOut(1000);
    
        turnCounter = 1;
        scoreX = 0;
        scoreO = 0;
        lastWin = 0;
        fieldCounter = 0;
        roundCounter = 0;
        bonesToken = "";
        skullsToken = "";
        isMatchWon = false;

        $("#bonesScore, #skullScore").text(`${scoreX}`)
    
        turn();
        roundDisplay();
        charPick();
        $("html, body").animate({scrollTop: 0}, 1000);

    });
});


function UpdateClickCounter(id, amount) {

    for(key in clickCounter){ // Iterates our object that keep track of the users points.
        if(key === id){ 
            clickCounter[key]+=amount;
        }
    }

    turnCounter = turnCounter*(-1);
    fieldCounter++; 
    scoreCheck(); 

}

/*Thank you!
Writen by: Paulo Henrique F. do Amaral
General Assembly Software Engineering Student
Sydney, NSW, Australia
Sep, 2019.

Special thanks to the instructors:

Aaron Cox,
Yianni Moustakas,
Fede Lopez.

For all your help and patience 

Cheers.*/