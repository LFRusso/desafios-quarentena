const fs = require('fs'); 

// Getting image folders
const path = 'assets/img/';
const folders = fs.readdirSync(path);

let isPlayingQuiz = false;
let quiz = null;
let photo = null;

/**
* Just a simple sleep function. It will return a promisse that will resolve itself
* in `time` milisseconds.
* @argument { number } time The time in Milisseconds the function will wait.
* @returns { Promise<void> }
*/
function sleep (time) {
	return new Promise(resolve => {
		setTimeout(() => resolve(), time);
	});
}

/**
* Selects a random image from the files and returns its path and label
**/
function getRandomImg() {
    // Selecting a folder from the folders list
    var folder = folders[Math.floor(Math.random() * folders.length)];
    var imgspath = path + folder + '/';
    var files = fs.readdirSync(imgspath);

    // Selecting a random picture from the given folder
    var img = files[Math.floor(Math.random() * files.length)];

    var img_data = {'path': fs.readFileSync(imgspath + img), 'label': folder};
    return img_data;
}

/**
* Generates a random list of labels for the player to choose from
**/
function getRandomLabels(truelabel) {
    var label_list = [truelabel];
    // Adding elements to the possible labels list
    while( label_list.length < 4) {
        var random_label = folders[Math.floor(Math.random() * folders.length)];
        // Checks if element is already a part of the list & appends it if not
        if(!label_list.includes(random_label)) {
            label_list.push(random_label);
        }
    }
    label_list.sort();

    return label_list;
}

/**
* Checks if player chose the right label
* @returns { 1 | 0 }
**/
function didPlayerWon(message, truelabel){
    if(message.startsWith(truelabel)) {
        return 1; 
    } else {
        return 0;
    }
}

/** 
* Function called when the user sent a message after already starting to play quiz
* 
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
**/
function readUserResponse (bot, chatId, message) {
	const winner = didPlayerWon(message, photo.label);
	const response = [
		'Errou! A resposta correta é ' + photo.label.toUpperCase(),
		'Correto!'
    ][winner];
	bot.sendMessage(chatId, response);
	isPlayingQuiz = false;
    photo = null;
    quiz = null;
}

/** 
* This function will initiate the quiz.
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
**/
async function startQuiz(bot, chatId){
    // Getting the photo and random labels for the quiz
    photo = getRandomImg();
    quiz = getRandomLabels(photo.label);

    await bot.sendPhoto(chatId, photo.path);
    await bot.sendMessage(chatId, "De onde é essa foto?");
    await sleep(1000);
    await quiz.map((option) => {
        bot.sendMessage(chatId, option.toUpperCase());
    });
    isPlayingQuiz = true;
}


/**
* Decides whether the user message is relevant to the game or not. If it is relevant,
* return a true boolean flag to prevent other functions to catch a response.
*
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @returns { boolean } A flag to indicate whether the message was used or not.
*/  
function main(bot, chatId, message) {
    if (message.startsWith("/quiz")) {
        startQuiz(bot, chatId)
        return true;
    } else if(isPlayingQuiz) {
        // If it was already playing, then this must be an user response
        readUserResponse(bot, chatId, message);    
        return true;
    }

    return false;
}


module.exports = {
	main
}