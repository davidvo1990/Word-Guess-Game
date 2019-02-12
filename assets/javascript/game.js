var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"
    , "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var words = ["spider man", "venom", "green goblin", "lizard", "electro", "doctor octopus", "sandman",
    "mysterio", "vulture", "iron man", "captain america", "hulk", "thor", "black panther", "shuri", "okoye",
    "ant man", "wasp", "hulkbuster", "dr strange", "winter soldier", "hawkeye", "falcon", "vision",
    "war machine", "nick fury", "ultron", "loki", "red skull", "star lord", "rocket raccoon", "groot",
    "gamora", "drax", "mantis", "ronan", "collector", "captain marvel", "deathpool", "scarlet witch"
];


var currentWord;
var live = 10;
var used = [];
var correct = [];
var wrong = [];
var letter;
var showarray = [];
var isUsed;
var corr;
var wordJoin;
///////////////////////////////////////////////////////
/*When click play!
get a word randomly
assign it to current word
go through the current word and check for the letter press match up
if it match show letter in correct index
else decrease live by one
if live === 0 then game over!
*/
///////////////////////////////////////////////////////////////////////////////////////////
// get word on click button function and assign to currentWord 
function getWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    currentWord = currentWord.toUpperCase();
    //console.log(currentWord);
    //document.getElementById("play").innerHTML= currentWord;
    //console.log(currentWord);
    document.getElementById("play").innerHTML = "Game start!";



    //create empty string space when click
    showarray.length = currentWord.length;
    for (var i = 0; i < showarray.length; i++) {
        showarray[i] = "_";
        if (currentWord.charAt(i) === " ") {
            showarray[i] = "-";
            currentWord.length--;
        }
    }
    wordJoin = showarray.join(" ");
//starting new game 
    live = 10;
    used = [];
    correct = [];
    wrong = [];

    document.getElementById("usedword").innerHTML = used;
    document.getElementById("correctword").innerHTML = correct;
    document.getElementById("wrongword").innerHTML = wrong;
    document.getElementById("lives").innerHTML = live;
    document.getElementById("showbox").innerHTML = wordJoin;
    document.getElementById("warning").innerHTML = "";
    pic.setAttribute("src", "assets/images/marvel.png");
    document.getElementById("showme").innerHTML = "";
    keypress();
    //console.log(wordJoin);
    //create space to fill in word when click button
    /*
    var unorder = document.createElement("ul");
    unorder.setAttribute("id","myguess");
    unorder.setAttribute("style", "list-style-type: none");
	
    for (var i = 0 ; i<currentWord.length; i++){
        var list = document.createElement("li");
        list.setAttribute("id","alphabet"+i);
        list.setAttribute("style", "float:left");
        unorder.appendChild(list);
	
        //list.innerHTML = "_ ";
        var t = document.createTextNode("_" +"\xa0");
        list.appendChild(t);
        document.body.appendChild(unorder);
    }
    */
};

function reset() {
    currentWord = [];
    showarray = [];
    live = 10;
    used = [];
    correct = [];
    wrong = [];
    wordJoin = " ";
    document.getElementById("play").innerHTML = "";
    document.getElementById("showbox").innerHTML = wordJoin;
    document.getElementById("usedword").innerHTML = used;
    document.getElementById("correctword").innerHTML = correct;
    document.getElementById("wrongword").innerHTML = wrong;
    document.getElementById("lives").innerHTML = live;
    document.getElementById("warning").innerHTML = "";
    pic.setAttribute("src", "assets/images/marvel.png");
    document.getElementById("showme").innerHTML = "";
};
////////////////////////////////////////////////////
//object for all the function HARD MODE
var func = {
    isCorrect : function(x, str){
        for (var i = 0; i < str.length; i++) {
            if (x === str.charAt(i)) {
                return true;
            }
        }
    },

    isLetterUsed : function(x, arr) {
        return arr.includes(x);
    },

    showWord : function(x, str, arr) {
        arr.length = str.length;
        for (var i = 0; i < str.length; i++) {
            if (x === str.charAt(i)) {
                arr[i] = x;
            }
        }
    },

    wordHadUsed: function(x, arr, id1, id2) {
        if (arr.length === 0 || isLetterUsed(x, arr) === false) {
            arr.push(x);
            document.getElementById(id1).innerHTML = arr.toString();
            //console.log(arr);
        } else {
            document.getElementById(id2).innerHTML = "You already use this word!";
        }
    },

    ifWin: function(showarray) {
        var count = showarray.length;
        for (var i = 0; i < showarray.length; i++) {
            if (showarray[i] != "_") {
                count--;
            }
        }
        if (count === 0) {
            document.getElementById("warning").innerHTML = "YOU WIN!!!";
            //add picture of the win
            document.getElementById("showme").innerHTML = currentWord;
            pic.setAttribute("src", "assets/images/" + currentWord + ".jpg");
            document.onkeyup = function () { };
            //alert("YOU WIN!!!")
        }
    },

     ifLose:function (live) {
        if (live === 0) {
            //reset();
            document.getElementById("warning").innerHTML = "Game Over!";
            document.getElementById("showme").innerHTML = currentWord;
            //add piture if lost
            pic.setAttribute("src", "assets/images/" + currentWord + ".jpg");
            document.onkeyup = function () { };
            //alert("Game Over!");
        }
    }

};
//end of object
////////////////////////////////////////////
//isCorrect function, check if letter is in the string
function isCorrect(x, str) {
    for (var i = 0; i < str.length; i++) {
        if (x === str.charAt(i)) {
            return true;
        }
    }
};

//isLetterUsed function, return boolean check if letter is in array
function isLetterUsed(x, arr) {
    return arr.includes(x);
};

//showWord function, create an array that push correct letter into the position of of index  
//showWord(letter, currentWord, showarray);
function showWord(x, str, arr) {
    arr.length = str.length;
    for (var i = 0; i < str.length; i++) {
        if (x === str.charAt(i)) {
            arr[i] = x;
        }
    }

};

//wordHadUsed(letter, used, "usedword", "warning");
//check for empty and used, if not push the letter into the array
function wordHadUsed(x, arr, id1, id2) {
    if (arr.length === 0 || isLetterUsed(x, arr) === false) {
        arr.push(x);
        document.getElementById(id1).innerHTML = arr.toString();
        //console.log(arr);
    } else {
        document.getElementById(id2).innerHTML = "You already use this word!";
    }
};

//check for condition to Win, stop the game
function ifWin(showarray) {
    var count = showarray.length;
    for (var i = 0; i < showarray.length; i++) {
        if (showarray[i] != "_") {
            count--;
        }
    }
    if (count === 0) {
        document.getElementById("warning").innerHTML = "YOU WIN!!!";
        //add picture of the win
        document.getElementById("showme").innerHTML = currentWord;
        pic.setAttribute("src", "assets/images/" + currentWord + ".jpg");
        document.onkeyup = function () { };
        //alert("YOU WIN!!!")
    }
};


// game over if you have 0 lives, stop the game
function ifLose(live) {
    if (live === 0) {
        //reset();
        document.getElementById("warning").innerHTML = "Game Over!";
        document.getElementById("showme").innerHTML = currentWord;
        //add piture if lost
        pic.setAttribute("src", "assets/images/" + currentWord + ".jpg");
        document.onkeyup = function () { };
        //alert("Game Over!");
    }
};

/////////////////////////////////////////////////////////////////////////////////////////
//function to do thing when key press
function keypress() {
    document.onkeyup = function (event) {
        //condition for validate
        for (var i = 0; i < alphabet.length; i++) {
            if (event.key.toUpperCase() === alphabet[i].toUpperCase()) {
                letter = event.key.toUpperCase();

            }
        }
        //erase the warning of duplicated word if there
        document.getElementById("warning").innerHTML = "";

        //check if letter had been used?????????
        // isUsed = isLetterUsed(letter, used);
        isUsed = func.isLetterUsed(letter, used);
        //console.log(isUsed);

        //push the letter into the array
        // wordHadUsed(letter, used, "usedword", "warning");
        func.wordHadUsed(letter, used, "usedword", "warning");

        //check if letter correct or wrong????????
        // corr = isCorrect(letter, currentWord);
        corr = func.isCorrect(letter, currentWord);
        //console.log(corr);

        //push if letter is wrong to wrong array
        //pushWrong(letter, currentWord, used, wrong, "wrongword");
        if (corr != true && isUsed === false) {
            wrong.push(letter);
            document.getElementById("wrongword").innerHTML = wrong.toString();
            //live you have left, decrease if you press wrong
            live--;
            document.getElementById("lives").innerHTML = live;
        }

        //push if letter is correct to correct array
        //pushCorrect(letter, currentWord, used, correct, "correctword");
        if (corr === true && isUsed === false) {
            correct.push(letter);
            document.getElementById("correctword").innerHTML = correct.toString();
        }

        //create an array that have as many indexof the current word
        //show index and word you had press correctly
        // showWord(letter, currentWord, showarray);
        func.showWord(letter, currentWord, showarray);
        document.getElementById("showbox").innerHTML = showarray.join(" ");
        //console.log(showarray);

        //check for condition to Win, show message if you win
        // ifWin(showarray);
        func.ifWin(showarray);
        // game over if you have 0 lives
        // ifLose(live);
        func.ifLose(live);
    }

    //end of onkeyup
};