
//time variables//
var minutes;
var secs;
let paused = false;
var x;
// Home variables//
let home_scores = document.querySelector("#home_scores");
let home_fouls = document.querySelector("#home_fouls");
let home_time_out = document.querySelector("#home_time_out");
let home_record = [];
// Away variables//
let away_scores = document.querySelector("#away_scores");
let away_fouls = document.querySelector("#away_fouls");
let away_time_out = document.querySelector("#away_time_out");
let away_record = [];

// Time //
let period = document.querySelector("#period");
let mins = document.querySelector("#mins");
let seconds = document.querySelector("#seconds");

let second2s = document.querySelector("#second2s");
// let away_time_out = document.querySelector("#away_time_out");

// Reset the scoreboard //
function resetAll() {

clearInterval(x);
    //All Home Resets//
    home_scores.innerHTML = "00";
    home_fouls.innerHTML = "0";
    home_time_out.innerHTML = "0";

    // All Away Resets //
    away_scores.innerHTML = "00";
    away_fouls.innerHTML = "0";
    away_time_out.innerHTML = "0";

    // All Timer Resets //
    mins.innerHTML = "00";
    seconds.innerHTML = "00";
    second2s.innerHTML = "00";

    period.innerHTML = "0";


}

// Reset each score and clock //
function resetEachScore_Clock(element) {
    element.innerHTML = "00";
}

// Reset each of Other //
function resetEachOthers(element) {
    element.innerHTML = "0";
}

// Reset time //
function resetTimer() {
    mins.innerHTML = "00";
    seconds.innerHTML = "00";
}





/////
////////
// Scores //
////////
/////
function setScoresAdd(element, number) {
    element.innerHTML = checkZores(parseInt(element.innerHTML) + number);
}

function setScoresSubtract(element, number) {
    element.innerHTML = checkZores(parseInt(element.innerHTML) - number);
}


/////
////////
// Others //
////////
/////
function setOthersAdd(element, number) {
    element.innerHTML = parseInt(element.innerHTML) + number;
}

function setOthersReduce(element, number) {
    element.innerHTML = parseInt(element.innerHTML) - number;
}

/////
////////
// Start time  //
////////
/////
function setTimer(element, number) {
    element.innerHTML = parseInt(element.innerHTML) + number;
}



document.addEventListener('keypress', logKey);

function logKey(e) {
    if (e.keyCode == 32) {
        paused = !paused;
        if (!paused) {
            timer(addTime(parseInt(minutes),parseInt(secs)));
        }
    }
    // setScoresAdd(home_scores, 3);
}



// window.onload = function (e) {
//     // resetEachScore(home_scores);
//    timer(addTime(30,0));
// }













function addTime(minutes, seconds, date = new Date()) {
    date.setSeconds(date.getSeconds() + seconds + 1);
    return new Date(date.getTime() + minutes * 60000);
}





function timer(countDownDate) {

     x = setInterval(function () {

        if (paused==false) {
            var now = new Date().getTime();
            var distance = countDownDate - now;


            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            secs = Math.floor((distance % (1000 * 60)) / 1000);


            seconds.innerHTML = checkZores(secs);
            mins.innerHTML = checkZores(minutes);
            second2s.innerHTML = checkZores(secs);

            if (distance < 0) {

                clearInterval(x);
                resetTimer;

            }
        } else {
            clearInterval(x);
        }
    }, 1000);



} function checkZores(i) {
    if (i < 10) { i = "0" + i };
    return i;
}



/////
////////
// web socket  //
////////
/////
const socket = new ReconnectingWebSocket("ws://localhost:4041");

socket.onopen = (event) => {
    console.log("Connection Establish");
    socket.send(JSON.stringify({ "type": "display", "message": "connected" }));
};

socket.onmessage = (event) => {
    let objData = JSON.parse(event.data);
    if (objData.message == "home_add3") {
        add3Points('home');
    }
    if (objData.message == "away_add3") {
        add3Points('away');
    }
    if (objData.message == "home_add2") {
        add2Points('home'); 
    }
    if (objData.message == "away_add2") {
        add2Points('away');
    }
    if (objData.message == "home_add1") {
        add1Points('home');
    }
    if (objData.message == "away_add1") {
        add1Points('away');
    }
    if (objData.message == "home_undo") {
        undoPoints('home');
    }
    if (objData.message == "away_undo") {
        undoPoints('away');
    }
    if (objData.message == "resetScores") {
        resetScores();
    }
    if (objData.message == "resetPeriod") {
        resetPeriod();
    }
    if (objData.message == "resetFouls") {
        resetFouls();
    }
    if (objData.message == "addPeriods") {
        addPeriods();
    }
    if (objData.message == "reducePeriods") {
        reducePeriods();
    }
    if (objData.message == "addFoulsHome") {
        addFouls('home');
    }
    if (objData.message == "addFoulsAway") {
        addFouls('away');
    }
    if (objData.message == "reduceFoulsHome") {
        reduceFouls('home');
    }
    if (objData.message == "reduceFoulsAway") {
        reduceFouls('away');
    }
    if (objData.message == "addTimeOutHome") {
        addTimeOuts('home');
    }
    if (objData.message == "addTimeOutAway") {
        addTimeOuts('away');
    }
    if (objData.message == "reduceTimeOutHome") {
        reduceTimeOuts('home') ; 
    }
    if (objData.message == "reduceTimeOutAway") {
        reduceTimeOuts('away') ; 
    }
    if (objData.message == "timerReset") {
        timerReset();
    }
    if (objData.message == "timerSet") {
        timerSet(objData.m,objData.s);
    }
    if (objData.message == "timerPause") {
        timerPause();
    }
    if (objData.message == "timerResume") {
        timerResume();
    }
    if (objData.message == "resetAll") {
        resetAll()
    }

}


socket.onclose = (event) => {
    console.log("Connection closed");
}


socket.onerror = (event) => {
    console.log("Connection error");
    // socket.send("Here's some text that the server is urgently awaiting!");
};


function add3Points(team) {
    if (team == "home") {
        setScoresAdd(home_scores, 3);
        home_record.appe;
    }
    if (team == "away") {
        setScoresAdd(away_scores, 3)
    }
}

function add2Points(team) {
    if (team == "home") {
        setScoresAdd(home_scores, 2)
    }
    if (team == "away") {
        setScoresAdd(away_scores, 2)
    }
}

function add1Points(team) {
    if (team == "home") {
        setScoresAdd(home_scores, 1)
    }
    if (team == "away") {
        setScoresAdd(away_scores, 1)
    }
}

function undoPoints(team) {
    if (team == "home") {
        setScoresAdd(home_scores, 1)
    }
    if (team == "away") {
        setScoresAdd(away_scores, 1)
    }
}

function resetScores()
{
    home_record=[];
    away_record=[];
    resetEachScore_Clock(home_scores);
    resetEachScore_Clock(away_scores);
}
function resetPeriod(){
resetEachOthers(period);
}

function resetFouls()
{
resetEachOthers(away_fouls);
resetEachOthers(home_fouls);
} 


function addPeriods()
{
   
        setOthersAdd(period, 1)

}
function reducePeriods()
{
    setOthersReduce(period,1);
}

function addFouls(team)
{
    if (team == "home") {
        setOthersAdd(home_fouls, 1)
    }
    if (team == "away") {
        setOthersAdd(away_fouls, 1)
    }
}
function reduceFouls(team)
{
    if (team == "home") {
      setOthersReduce(home_fouls,1);
    }
    if (team == "away") {
      setOthersReduce(away_fouls,1);
    }
}


function addTimeOuts(team)
{ if (team == "home") {
    setOthersAdd(home_time_out, 1)
}
if (team == "away") {
    setOthersAdd(away_time_out, 1)
}

}
function reduceTimeOuts(team)
{  if (team == "home") {
    setOthersReduce(home_time_out,1);
  }
  if (team == "away") {
    setOthersReduce(away_time_out,1);
  }

}

function timerReset()
{
paused = true;

// timer(addTime(0,0));
resetEachScore_Clock(mins);
resetEachScore_Clock(seconds);
}
function timerSet(m,s)
{
    timerReset();
    
if(m!="" && s!="")
 {
    if(paused==true){
        paused = false;
    }
    timer(addTime(parseInt(m),parseInt(s)));
 }
}

function timerPause()
{
    paused = true;
}
function timerResume()
{
    paused = false;
    timer(addTime(parseInt(minutes),parseInt(secs)));
}

