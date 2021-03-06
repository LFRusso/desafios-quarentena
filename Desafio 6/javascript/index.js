process.env.NTBA_FIX_319 = true; // Silences an annoying error message.
const TelegramBot = require('node-telegram-bot-api');
const jokempo = require('./jokempo');
const help = require('./help');
const randomPhrases = require('./random-phrases');
const date = require('./date.js');
const quiz = require('./quiz.js');


// Desafio Bonus 1
// Getting bot token
const token = require('./token.js').token;


if (token === 'YOUR ACCESS TOKEN HERE') {
	console.log('You forgot to replate the access token!!! Properly read the README before continuing >:(');
	process.exit(-1);
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
	const chatMessage = msg.text.trim().toLowerCase();
	const chatId = msg.chat.id;
	if (chatMessage.startsWith('ola') || chatMessage.startsWith('oi')) {
		bot.sendMessage(chatId, 'Olá! Como vai o seu dia?');
	} else if (jokempo.main(bot, chatId, chatMessage)) {
		return;
	} else if (help.main(bot, chatId, chatMessage)) {
		// Desafio 1
		return;
	} else if (chatMessage.startsWith('que dia é hoje')) {
		// Desafio Bonus 2
		date.main(bot, chatId);
	} else if (quiz.main(bot, chatId, chatMessage)) {
		// Desafio Bonus 3
		return;
	} else {
		randomPhrases.writeRandomPhrase(bot, chatId);
	}
});

console.log('Fetching data...');
bot.getMe().then(me => {
	console.log(`I'm ready to serve! Talk to me on @${me.username}`);
	console.log(`or visit this link: https://t.me/${me.username}`);
});