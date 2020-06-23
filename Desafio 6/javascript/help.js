const commands = [
    {'command': '/help', 'message': 'mostra todos os comandos'},
    {'command': '/jokempo', 'message': 'joga uma partida de jokempo com o bot'},
];

// /help command, prints all the commands and their messages
function main(bot, chatId, message) {
    if(message === '/help') {
        commands.map((command) => {
            bot.sendMessage(chatId, command.command +' '+ command.message);
        });
        return true;
    }
    return false;
}

module.exports = {
	main
}