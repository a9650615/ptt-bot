var myBot = require('./PTT-BOT/ptt-bot');
var fs = require('fs');
var iconv = require('iconv-lite'); 

//create the connection object for robot.
myBot.login('chengrobot','ps2014',function(){
	console.log('hi, chenchen chang, how are you?');
	//console.log(myBot.getScreen());
	/*
	fs.writeFile('screen_data/cursormove.txt', iconv.encode(myBot.getScreen(),'big5'), function (err) {
		if (err) throw err;
		console.log('cursormove is saved!');
	});
	*/
});

myBot.sendRight(function(){
	console.log(myBot.getScreen());
});

/*
myBot.toBoard('gossiping',function(){
	console.log('myBot.toBoard()');
	//console.log(myBot.getScreen());
	
	fs.writeFile('screen_data/screen1.txt', iconv.encode(myBot.getScreen(),'big5'), function (err) {
		if (err) throw err;
		console.log('It\'s saved!');
	});
	
});

myBot.sendCtrlL(function(){
	console.log('myBot.pressAnyKey()');
	console.log(myBot.getScreen());
	
	fs.writeFile('screen_data/screen2.txt', iconv.encode(myBot.getScreen(),'big5'), function (err) {
		if (err) throw err;
		console.log('It\'s saved!');
	});
	
});

myBot.pressAnyKey(function(){
	console.log('myBot.pressAnyKey()');
	console.log(myBot.getScreen());
	

});

myBot.pressAnyKey(function(){
	console.log('myBot.pressAnyKey()');
	//console.log(myBot.getScreen());

});

myBot.sendCtrlL(function(){
	console.log('myBot.pressAnyKey()');
	console.log(myBot.getScreen());
	
	fs.writeFile('screen_data/screen3.txt', iconv.encode(myBot.getScreen(),'big5'), function (err) {
		if (err) throw err;
		console.log('It\'s saved!');
	});
	
});

*/