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

}

let turnCounter = 1;
let scoreX = 0;
let scoreO = 0;
let lastWin = 0;
let roundCounter = 0;
let fieldCounter = 0;

function charPick(){
    $(".play").hide();
    $(".start").hide();
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

    if(clickCounter.fieldA+clickCounter.fieldB+clickCounter.fieldC === 3 || clickCounter.fieldA+clickCounter.fieldD+clickCounter.fieldG === 3|| clickCounter.fieldA+clickCounter.fieldE+clickCounter.fieldI === 3 || clickCounter.fieldB+clickCounter.fieldE+clickCounter.fieldH === 3 || clickCounter.fielfieldC+clickCounter.fieldF+clickCounter.fieldI === 3 || clickCounter.fieldD+clickCounter.fieldE+clickCounter.fieldF === 3 || clickCounter.fieldG+clickCounter.fieldH+clickCounter.fieldI === 3 || clickCounter.fieldG+clickCounter.fieldG+clickCounter.fieldC=== 3){

        $("#XWins").slideDown();
        scoreX++;
        roundCounter++;
        turnCounter = 0; //Ends game
        lastWin = 1;
        $(".playAgain").fadeIn(1000);
        $("#bonesScore").text(`${scoreX}`)

    }
   
    if(clickCounter.fieldA+clickCounter.fieldB+clickCounter.fieldC === -3 || clickCounter.fieldA+clickCounter.fieldD+clickCounter.fieldG === -3|| clickCounter.fieldA+clickCounter.fieldE+clickCounter.fieldI === -3 || clickCounter.fieldB+clickCounter.fieldE+clickCounter.fieldH === -3 || clickCounter.fielfieldC+clickCounter.fieldF+clickCounter.fieldI === -3 || clickCounter.fieldD+clickCounter.fieldE+clickCounter.fieldF === -3 || clickCounter.fieldG+clickCounter.fieldH+clickCounter.fieldI === -3 || clickCounter.fieldG+clickCounter.fieldG+clickCounter.fieldC=== -3){

        $("#OWins").slideDown();
        scoreO++;
        roundCounter++;
        turnCounter = 0; //Ends game
        lastWin = -1;
        $(".playAgain").fadeIn(1000);
        $("#skullScore").text(`${scoreO}`)

    }

    if(fieldCounter == 9){
        $("#winning").text("CAT'S GAME!").show(500);
        roundCounter++;
        turnCounter = 0; //Ends game
       $(".playAgain").fadeIn(1000);
    }

    if((scoreX == 2) || (roundCounter == 3 && scoreX > scoreO)){
        $("#winning").text("TEAM BONES WINS!").show(500);
        turnCounter = 0; //Ends game
        $(".playAgain").hide();
    }
    
    if((scoreO == 2) || (roundCounter == 3 && scoreX < scoreO)){
        $("#winning").text("TEAM SKULLS WINS!").show(500);
        turnCounter = 0; //Ends game
        $(".playAgain").hide();
    }

    if (roundCounter == 3 && scoreX == scoreO){
        $("#winning").text(`OH NO! Is it a draw? Is it a tie? NAH... IT IS "CAT'S GAME!"`).show(500);
        $(".playAgain").hide();
    }

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

}

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

}

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


    });

    $(".field").click(function(){

        if ($(this).text() == ""){

            if (turnCounter === 1){ 
                
                $(this).text($('#XPick').text()).hide().slideDown(700);

                let fieldX = this.id
                for(key in clickCounter){
                    if(key === fieldX){
                        clickCounter[key]+=1;
                    }
                }
            
                turnCounter = turnCounter*(-1);
                fieldCounter++;
                scoreCheck();
            }

            else if (turnCounter === -1){ 
                
                $(this).text($('#OPick').text()).hide().slideDown(700);

                let fieldX = this.id
                for(key in clickCounter){
                    if(key === fieldX){
                        clickCounter[key]-=1;
                    }
                }

                turnCounter = turnCounter*(-1);
                fieldCounter++;
                scoreCheck();
            }

        }

    turn();

    });

    $( ".playAgain" ).click(function() {

        $( ".field" ).text("");

        for (key in clickCounter){
            clickCounter[key] = 0;
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

        lastWin = 0;
        fieldCounter = 0;

        turn();
        roundDisplay();

    });

    $( ".restart" ).click(function() {

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

    });
});
