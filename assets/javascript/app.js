$.fn.trivia = function() {
    var _t = this;
    _t.userPick = null;
    _t.answers = {
        correct: 0,
        incorrect: 0
    };
    _t.images = null;
    _t.count = 30;
    _t.current = 0;
    _t.questions = [{
        question: "When you’re capernoited, what are you?",
        choices: ["Slightly Afraid", "Slightly drunk", "Slightly embarrassed", "Slightly out of tune"],
        images: ["../images/PH.gif"],
        correct: 1
    }, {
        question: "Cleromancy is divination involving what?",
        choices: ["Dice", "Glass", "Twigs", "Ink"],
        correct: 0

    }, {
        question: "What does a nuxodeltiologist prefer postcard scenes of?",
        choices: ["The road", "The trees", "The ocean", "The night"],
        correct: 3

    }, {
        question: "What do you have when you’re sciapodous?",
        choices: ["Huge Nose", "Huge chin", "Huge feet", "Huge ears"],
        correct: 2

    }, {
        question: "What are you full of when you’re gambrinous?",
        choices: ["Beer", "Joy", "Chicken", "Sweat"],
        correct: 0

    }, {
        question: "Tropoclastics is actually the science of?",
        choices: ["House keeping", "Ancient writing", "Breaking habits", "Eavesdropping"],
        correct: 2

    }, {
        question: "What do you most fear in hormephobia?",
        choices: ["Salivia", "Shock", "Static", "Silence"],
        correct: 1

    }, {
        question: "Iatrapistia is the lack of faith in what?",
        choices: ["The medical system", "The judical system", "The educational system", "The fear of overworking"],
        correct: 3
    }];
    _t.ask = function() {
        if (_t.questions[_t.current]) {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
            $("#questionArea").html(_t.questions[_t.current].question);
            var choicesArr = _t.questions[_t.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choicesArea').append(button);
            }
            window.triviaCounter = setInterval(_t.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    _t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
                class: 'result'
            }));
            $('#startB').text('Restart').appendTo('body').show();
        }
    };
    _t.timer = function() {
        _t.count--;
        if (_t.count <= 0) {
            setTimeout(function() {
                _t.nextQ();
            });

        } else {  //do I need this else?
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
        }
    };
    _t.nextQ = function() {
        _t.current++;
        clearInterval(window.triviaCounter);
        _t.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            _t.cleanUp();
            _t.ask();
        }, 2500)
    };
    _t.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + _t.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
    };
    _t.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        _t.answers[string]++;
        $('.' + string).html(string + ' answers: ' + _t.answers[string]);
    };
    return _t;
};
var Trivia;

$("#startB").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choicesArea').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        _t = Trivia || $(window).trivia(),
        temp = _t.questions[_t.current].correct,
        correct = _t.questions[_t.current].choices[temp];

    if (userPick !== temp) {
        $('#choicesArea').text("Wrong Answer! The correct answer was: " + correct);
        _t.answer(false);
    } else {
        $('#choicesArea').text("Correct!!! The correct answer was: " + correct);
        _t.answer(true);
    }
    _t.nextQ();
});

