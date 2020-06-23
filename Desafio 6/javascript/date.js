const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezebro'];
const week_days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

/*
*   Function returning current date
*/ 

function main(bot, chatId) {
    var date = new Date();
    var day = date.getDate();
    var week_day = week_days[date.getDay()];
    var month = months[date.getMonth()];

    bot.sendMessage(chatId, "Hoje é " + week_day + ", dia " + day + " de " + month);
}

module.exports = {
	main
}