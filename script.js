function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
let game_started = false
let user_answer = new Array;
let answer = new Array;
let nbRepete = 1
let seekAnswer = 0;
let score = 0
let audio1 = new Audio('sound/a5.mp3');
let audio2 = new Audio('sound/c-5.mp3');
let audio3 = new Audio('sound/e5.mp3');
let audio4 = new Audio('sound/g-5.mp3');


function start() {
    game_started = true;
    show_score()
    add_color(1)
    document.getElementById('start_btn').style.display = "none";
    display_color(answer);
    return answer;
}

function add_color(nbRepete) {
    for (i = 0; i < nbRepete; i++) {
        let newNumber = Math.round(getRandomArbitrary(1, 4));
        answer.push(newNumber);
    }
    nbRepete++;
    return nbRepete
}

function display_color(array) {
    game_started = false;
    var interval = 1500;
    var promise = Promise.resolve();
    array.forEach(function (el) {
        promise = promise.then(function () {
            var selectColor = document.getElementById(el)
            if (el == 1) {
                audio1.play();
            }
            if (el == 2) {
                audio2.play();
            }
            if (el == 3) {
                audio3.play();
            }
            if (el == 4) {
                audio3.play();
            }
            selectColor.classList.add("panel-actif");
            window.setTimeout(
                function () {
                    selectColor.classList.remove("panel-actif");
                }, 1000);
            return new Promise(function (resolve) {
                setTimeout(resolve, interval);
            });
        });
    });
    promise.then(function () {
        console.log("end loop");
        game_started = true;
    });
}

function record_user_answer(number) {
    if (game_started) {
        document.getElementById("error_game").innerHTML = ""
        if (number == 1) {
            audio1.play();
        }
        if (number == 2) {
            audio2.play();
        }
        if (number == 3) {
            audio3.play();
        }
        if (number == 4) {
            audio3.play();
        }
        user_answer.push(number)
        check_last_user_answer(user_answer, answer)
        return user_answer
    } else {
        document.getElementById("error_game").innerHTML = "Vous ne pouvez pas jouer maintenant"
    }
}

function empty_user_answer() {
    return user_answer.length = 0;
}

function check_last_user_answer(user_answer, answer) {
    if (user_answer[user_answer.length - 1] == answer[seekAnswer]) {
        seekAnswer++
        if (arrayEquals(user_answer, answer)) {
            score++
            show_score()
            window.setTimeout(
                function () {
                    console.log("new color");
                    seekAnswer = 0;

                    empty_user_answer();
                    add_color(nbRepete)
                    display_color(answer);
                }, 1000);
        }
    } else {
        alert("c'est perdu")
    }
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function show_score() {
    document.getElementById("score").innerHTML = "Score: " + score

}