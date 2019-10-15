'use strict';

const QUESTS_KEY = 'quests'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest;


function createQuestsTree() {
     gQuestsTree = loadQuestsFromStorage()
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        saveQuestsToStorage()
    } 
    gCurrQuest = gQuestsTree;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = (res === 'yes') ? gCurrQuest.yes : gCurrQuest.no
}

function addGuess(newGuessTxt, newQuestTxt, lastRes) {
    var newQuest = createQuest(newQuestTxt)
    gPrevQuest[lastRes] = newQuest
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest
    saveQuestsToStorage()

}

function getCurrQuest() {
    return gCurrQuest
}

function restartQuests() {
    gCurrQuest = gQuestsTree
}

function saveQuestsToStorage() {
    saveToStorage(QUESTS_KEY, gQuestsTree)
}

function loadQuestsFromStorage() {
    return loadFromStorage(QUESTS_KEY)
}