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
let scoreX = 0; // count wins of team X.
let scoreO = 0; // count wins of team O.
let lastWin = 0; //after a winning match, the adversary team will start playing. In case of a draw, team O starts the next game.
let roundCounter = 0; //every match is made out of three rounds, if there has been no winners or if there's a draw, it is considered 'cat's game'.
let fieldCounter = 0;// if theres has been no winning combination and all fields have been clicked, it is a 'cat's game'.

function charPick(){
    $(".play").hide();
    $(".start").hide();
    $(".charPick").fadeIn();

    function showStart(){

        if($("#OPick").text() !== "" && $("#XPick").text() !== ""){
            $(".start").fadeIn();
        }

    }// shows start button once players have chosen their playing icons.

    $(".pickX").click(function(){
        $('#XPick').text($(this).text());
        showStart();
    });// gets player X icon selection.

    $(".pickO").click(function(){
        $('#OPick').text($(this).text());
        showStart();
    });// gets player O icon selection.

} // asks users to select their players icons.

function scoreCheck(){

    function win(){
        if(clickCounter.fieldA+clickCounter.fieldB+clickCounter.fieldC === 3 || clickCounter.fieldA+clickCounter.fieldD+clickCounter.fieldG === 3|| clickCounter.fieldA+clickCounter.fieldE+clickCounter.fieldI === 3 || clickCounter.fieldB+clickCounter.fieldE+clickCounter.fieldH === 3 || clickCounter.fieldC+clickCounter.fieldF+clickCounter.fieldI === 3 || clickCounter.fieldD+clickCounter.fieldE+clickCounter.fieldF === 3 || clickCounter.fieldG+clickCounter.fieldH+clickCounter.fieldI === 3 || clickCounter.fieldG+clickCounter.fieldE+clickCounter.fieldC=== 3){

            $("#XWins").slideDown();
            scoreX++; //adds to X score.
            roundCounter++; //turns round display to next round.
            turnCounter = 0; //Ends game (no field click is possible if turnCounter is not 1 or -1).
            lastWin = 1;
            $(".playAgain").fadeIn(1000);
            $("#bonesScore").text(`${scoreX}`)

        }//check for possible winnings combinations for X team after every play.
    
        if(clickCounter.fieldA+clickCounter.fieldB+clickCounter.fieldC === -3 || clickCounter.fieldA+clickCounter.fieldD+clickCounter.fieldG === -3|| clickCounter.fieldA+clickCounter.fieldE+clickCounter.fieldI === -3 || clickCounter.fieldB+clickCounter.fieldE+clickCounter.fieldH === -3 || clickCounter.fieldC+clickCounter.fieldF+clickCounter.fieldI === -3 || clickCounter.fieldD+clickCounter.fieldE+clickCounter.fieldF === -3 || clickCounter.fieldG+clickCounter.fieldH+clickCounter.fieldI === -3 || clickCounter.fieldG+clickCounter.fieldE+clickCounter.fieldC=== -3){

            $("#OWins").slideDown();
            scoreO++;//adds to O score.
            roundCounter++;//turns round display to next round.
            turnCounter = 0; //Ends game (no field click is possible if turnCounter is not 1 or -1).
            lastWin = -1;
            $(".playAgain").fadeIn(1000);
            $("#skullScore").text(`${scoreO}`)

        }//check for possible winnings combinations for O team after every play.

        else if(fieldCounter == 9){
            $("#winning").text("CAT'S GAME!").show(500);
            roundCounter++;
            turnCounter = 0; //Ends game (no field click is possible if turnCounter is not 1 or -1).
            $(".playAgain").fadeIn(1000);
        }

    }
    
    win();

    if((scoreX == 2) || (roundCounter == 3 && scoreX > scoreO)){
        $("#winning").text("TEAM BONES WINS!").show(500);
        turnCounter = 0; //Ends game (no field click is possible if turnCounter is not 1 or -1).
        $(".playAgain").hide();
    }
    
    if((scoreO == 2) || (roundCounter == 3 && scoreX < scoreO)){
        $("#winning").text("TEAM SKULLS WINS!").show(500);
        turnCounter = 0; //Ends game (no field click is possible if turnCounter is not 1 or -1)..
        $(".playAgain").hide();
    }

    if (roundCounter == 3 && scoreX == scoreO){
        $("#winning").text(`OH NO! Is it a draw? Is it a tie? NAH... IT IS "CAT'S GAME!"`).show(500);
        $(".playAgain").hide();
    }// If it comes to end of third round and there is no winner or scores are tight, it is 'cat's game'.
    
}

function roundDisplay(){

    let round = roundCounter;

    if(round == 0){
        $("#round").text('First Round').fadeIn();
    }

    if(round == 1){
        $("#round").text("Second Round").fadeIn();
    }

    if(round == 2){
        $("#round").text("Third Round").fadeIn();
    }

    if(round > 2){
        $("#round").text("ERROR").fadeIn();
    }//SHOULD NOT HAPPEN!! EVER

}//Based on the round counter, a message is displayed on screen as a round counter.

function turn(){

    if(turnCounter === -1){
        $("#skullTurn").show(500);
        $("#bonesTurn").hide(500);
        $("#noTurn").hide(500);
    }

    if(turnCounter === 1){
        $("#bonesTurn").show(500);
        $("#skullTurn").hide(500);
        $("#noTurn").hide(500);
    }

    if(turnCounter === 0){
        $("#noTurn").show(500);
        $("#bonesTurn").hide(500);
        $("#skullTurn").hide(500);
    }

}//Displays wich player is the turn based on the turnCounter that switchs according to last winner or draw. 
//Also controls the animation effects times with jquery.

$(document).ready(function() { 

    $("#XWins").hide();
    $("#OWins").hide();
    $("#skullTurn").hide();
    $("#bonesTurn").hide();
    $("#noTurn").hide();
    $(".playAgain").hide();

    turn();
    roundDisplay();
    charPick();

    $(".start").click(function(){
 
        $(".play").show(500);
        $(".charPick").hide(500);
        event.preventDefault();
        // Getting the height of the document
        var n = $(document).height();
      //  $('html, body').animate({ scrollTop: n }, 50);
        $("html, body").animate({scrollTop: 115}, 1000);


    });//Displays the gamimg area and hides the icon selection screen.

    $(".field").click(function(){

        if ($(this).text() == ""){

            if (turnCounter === 1){ //If it is team X turn:
                
                $(this).text($('#XPick').text()).hide().slideDown(700); //Inserts icon on clicked field.

                let fieldX = this.id
                for(key in clickCounter){ // Iterates our object that keep track of the users points.
                    if(key === fieldX){ // Finds the object key that corresponds to the clicked field.
                        clickCounter[key]+=1; // Add 1 to the field, as it is team X point.
                    }
                }
            
                turnCounter = turnCounter*(-1); //turn switch to the next team's play.
                fieldCounter++; 
                scoreCheck(); //check for possible win.
            }

            else if (turnCounter === -1){ //If it is team O turn:
                
                $(this).text($('#OPick').text()).hide().slideDown(700);//Inserts icon on clicked field.

                let fieldX = this.id
                for(key in clickCounter){ // Iterates our object that keep track of the users points.
                    if(key === fieldX){ //Finds the object key that corresponds to the clicked field.
                        clickCounter[key]-=1; //Subtract 1 to the field, as it is team O point.
                    }
                }

                turnCounter = turnCounter*(-1); //turn switch to the next team's play.
                fieldCounter++;
                scoreCheck(); //check for possible win.
            }

        }

    turn();

    });

    $( ".playAgain" ).click(function() { //Calls up to action the NEXT ROUND button, case there is a next round.

        $( ".field" ).text(""); // Clear all playing fields text.

        for (key in clickCounter){
            clickCounter[key] = 0; // Reset all fields points to 0.
        }

        $("#XWins").slideUp();
        $("#OWins").slideUp();
        $(".playAgain").fadeOut(1000);
        $("#winning").fadeOut(1000);

        if(lastWin === 1){
            turnCounter = -1;
        }
        if(lastWin === -1){
            turnCounter = 1;
        }
        if(lastWin === 0){
            turnCounter = -1;
        }

        lastWin = 0; //Based on the last win, it is determined here wich team will start the next round. If X wins, O starts. If O wins, X starts. If it is a drw, O starts.
        fieldCounter = 0; //Reset clicked fields counter.

        turn();
        roundDisplay();

    });

    $( ".restart" ).click(function() { //Reset all game and variables to starting values. Also hides gaming area and call back up the icon selection screen.

        $( ".field" ).text("");
        $('#XPick').text("");
        $('#OPick').text("");

        for (key in clickCounter){
            clickCounter[key] = 0;
        }

        $("#XWins").slideUp();
        $("#OWins").slideUp();
        $(".playAgain").fadeOut(1000);
        $("#winning").fadeOut(1000);
    
        turnCounter = 1;
        scoreX = 0;
        scoreO = 0;
        lastWin = 0;
        fieldCounter = 0;
        roundCounter = 0;
        bonesToken = "";
        skullsToken = "";

        $("#bonesScore").text(`${scoreX}`)
        $("#skullScore").text(`${scoreX}`)

    
        turn();
        roundDisplay();
        charPick();
        $("html, body").animate({scrollTop: 0}, 1000);

    });
});

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
