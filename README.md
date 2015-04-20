PTT-BOT
=====================

## Overview

**Ptt-bot** 是一個開放原始碼的專案，它的目標在於提供開發者在開發批踢踢機器人所需要的底層架構與函式和上層應用程式，解決需要開發時會遇到的各種底層惱人的問題。**Ptt-bot** 由 **JavaScript**[1] 編寫，並需要在 [**node.JS**][package1] 的環境下運行。**Ptt-bot** 使用 **node.JS** 原生的 [**Net**][package2] 套件進行 **Telnet**[2] 的連線，並利用 [**iconv-lite**][package3] 和 [**String.js**][package4] 套件分別解決 **Big5編碼**[3] 與字串解析的問題。

Ptt-bot is an open source node.js project for crawling data from **PTT**[4].

關鍵字:　批踢踢機器人、自動化、PTT Crawler

## How to use it?


	
		var bot = this;
	
		bot.toBoard(boardName,function(){
		
			console.log('已進入'+boardName+'板，接著收集文章!');
		
		});
	
		_indexForArticle = startIndex; //global
	
		for( var _=0;_<totalAmount;_++ ){
		
			bot.toArticle(_+_indexForArticle,function(){ 
			
				console.log('進入'+_indexForArticle+'文章中');
			
			});
	
			bot.loadArticle(function(){
		
				fs.writeFile(targetDic+'/'+boardName+_indexForArticle+'_withoutANSI.txt', iconv.encode( escapeANSI( bot.getArticle() ),'big5' ), function (err) {
				
					if (err) throw err;
					console.log(boardName+_indexForArticle+' 已經被儲存囉!');
					_indexForArticle++;
				
				});
			
			});
		
		}


## Development


第一次可以先執行此指令, 以安裝所有套件。 或自行個別安裝(參閱 **Require**)。

		npm i LiveScript
		./package.ls
		npm i

Require
----------
#### string.js ####
 
 
		npm install --save string 
	

#### iconv-lite ####
 
 
		npm install iconv-lite 
	


[1]: http://zh.wikipedia.org/wiki/JavaScript
[2]: http://courses.ywdeng.idv.tw/cust/2011/np/PPT/CH08-telnet.ppt
[3]: http://zh.wikipedia.org/zh-tw/%E5%A4%A7%E4%BA%94%E7%A2%BC
[4]: http://en.wikipedia.org/wiki/PTT_Bulletin_Board_System

[package1]: http://nodejs.org/
[package2]: http://nodejs.org/api/net.html
[package3]: https://github.com/ashtuchkin/iconv-lite
[package4]: http://stringjs.com/


Base-method
----------
 * login(id, ps, callback) 
 
 執行登入ptt-sever的功能，登入完後會停留在【主功能表】的頁面。開發者需要自行輸入機器人的帳號及密碼，並且回傳已連上ptt:23的connection物件。connection物件擁有write()等功能，connection物件詳細內容需參考Net原生套件[b1]。
 		
		var conn = myBot.login('yourID','yourPassword',function(){	
		
			/* callback: 登入後執行的回呼涵數 */
			console.log( myBot.getScreen() );//取得【主功能表】的頁面
		
		});
		
 * sendPressAnyKey(callback)
 
 當頁面要求"按任意鍵繼續"時，可以執行此函數。
 
 * sendCtrlL(callback)
 
 當頁面出現漏字時，可以執行此函數，要求重新傳送完整當頁頁面。
 
 * sendPageUp(callback)
 
 在【看板列表】和【文章列表】下皆可執行此函數，類似在批踢踢瀏覽時的往上翻頁的動作。
 
 * sendPageDown(callback)
 
 在【看板列表】和【文章列表】下皆可執行此函數，類似在批踢踢瀏覽時的往下翻頁的動作。
 
 * sendLeft(callback)
 
 類似在批踢踢瀏覽時按左鍵的功能。
 
 * sendRight(callback)
 
 類似在批踢踢瀏覽時按右鍵的功能。
 
 * getScreen() 
 
 取得目前頁面含色碼的資料，一般放在某指令的回呼函數，以取得執行完該函數的頁面內容。
 
 * getArticle() 
 
 當進入某篇文章時，若希望下載該篇文章完整內容，須先執行loadArticle()，並在loadArticle()的回呼函數執行getArticle()取得完整內容。
 			
		/* 在某篇文章內 */	
		bot.loadArticle(function(){
			
			/* 取得去除色碼的完整內容 */
			console.log( escapeANSI( bot.getArticle() ) );

		});
 
 * escapeANSI(str)
 
 去除頁面的所有色碼及位移碼。
	
 * toMain(callback)
 
 在任何頁面下，皆可以執行此函數回到【主功能表】。
 
 * toBoard(BoardName,callback)
 
 在任何頁面下，皆可以執行此函數到某版的【文章列表】，請輸入正確版看板名稱。
 
 * toArticle(NumStr,callback)

 僅能在某版的【文章列表】下使用，進入某篇文章編號為NumStr的文章內。
 
 * loadArticle(callback)
 
 下載文章，僅能在【文章內】，通常和getArticle()連同使用，詳細舉例可以參考getArticle()內容。
 
 * execFuntion(func)
 
 執行函數的內容。因為Ptt-bot的後端為先紀錄開發者為機器人下的所有指令，紀錄完後才開始執行連線，因此若在指令間放置其他函數會造成問題
		
		/* 不行的寫法 */
		sendPageUp();
		console.log('hi');//這個函數會先被執行 
		sendPageUp();
  
		/* 可以的寫法 */
		sendPageUp();
		execFuntion(function(){
			console.log('hi');//會依序在翻第一次翻上頁後，才執行
		});
		sendPageUp();
 
[b1]: https://nodejs.org/api/net.html
 
Applied-method
----------
 * collectArticleFromBoard(boardName,startIndex,totalAmount,targetDic)

 * collectArticleFromBoardWithoutANSI(boardName,startIndex,totalAmount,targetDic)
  

References
---------

* [**實作 Telnet Client 理論**][R1]
* [**利用純 JavaScript 寫 PCman火狐外掛 的原始碼**][R2]
* [**node.js 參考教學: node入門**][R3]
* [**ptt-bot in Ruby**][R4]
* [**Learning Advanced JavaScript by John Resig**][R5]
* [**Telnet 協定簡易介紹 Powerpoint**][R6]
* [**Telnet Keyboard Equivalents**][R7]
* [**Discussion in leaking problem of received data**][R8]

[R1]: http://dspace.lib.fcu.edu.tw/handle/2377/4110 
[R2]: https://code.google.com/p/pcmanfx/
[R3]: http://www.nodebeginner.org/index-zh-tw.html
[R4]: https://github.com/chenchenbox/backup-dog-ptt
[R5]: http://ejohn.org/apps/learn/#1 
[R6]: http://courses.ywdeng.idv.tw/cust/2011/np/PPT/CH08-telnet.ppt
[R7]: http://www.novell.com/documentation/extend52/Docs/help/Composer/books/TelnetAppendixB.html
[R8]: https://www.ptt.cc/bbs/Soft_Job/M.1388674793.A.B82.html 

Contribute to ptt-bot
----------
