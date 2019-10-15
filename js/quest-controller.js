'use strict';

var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    $(".game-start").hide();
    var headerImg = $('.img-fluid')
    headerImg.addClass('w-25')
    headerImg.removeClass('w-75')
    renderQuest();
    $(".quest").show('slow');
}

function renderQuest() {
    var currQuest = getCurrQuest()
    var $elCurrQuest = $(".quest h1")
    $elCurrQuest.html(currQuest.txt)
}

function onUserResponse(res) {
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
                showWinModal()
        } else {
            showLoseModal()
            $('.quest').hide()
            $('.new-quest').show()
        }
    } else {
        gLastRes = res
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    var $elNewGuess = $('#newGuess')
    var $elNewQuest = $('#newQuest')
    var newGuessTxt = $elNewGuess.val()
    var newQuestTxt = $elNewQuest.val()

    addGuess(newGuessTxt, newQuestTxt, gLastRes)
    onRestartGame();
}

function onRestartGame() {
    var headerImg = $('.img-fluid')
    $('.quest').hide();
    $('.new-quest').hide();
    $('.game-start').show();
    headerImg.removeClass('w-25')
    headerImg.addClass('w-75')
    gLastRes = null;
    restartQuests()
    renderQuest();
}

function showWinModal() {
    $('#exampleModal').modal('show')
}
function showLoseModal() {
    $('#my-modal').modal('show')
}

