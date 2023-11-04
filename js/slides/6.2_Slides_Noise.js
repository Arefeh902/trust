// Tournament: simpleton wins
SLIDES.push({
	
	//id:"noise",// [FOR DEBUGGING]
	id: "noise2",
	
	onstart: function(self){

		var o = self.objects;

		// Tournament
		Tournament.resetGlobalVariables();
		Tournament.INITIAL_AGENTS = [
			{strategy:"tf2t", count:3},
			{strategy:"pavlov", count:3},
			{strategy:"random", count:3},
			{strategy:"tft", count:3},
			{strategy:"all_c", count:13}
		];
		PD.NOISE = 0.05;
		self.add({id:"tournament", type:"Tournament", x:-20, y:20});

		// Words to the side
		self.add({
			id:"text", type:"TextBox",
			x:510, y:30, width:450, height:500,
			text_id:"noise_evo_1"
		});

		// BETS
		var _addButton = function(character, x, y){
			(function(character, x, y){
				self.add({
					id:"bet_"+character, type:"Button", x:x, y:y, 
					text_id: "icon_"+character,
					tooltip: "who_"+character,
					onclick:function(){
						_.answer = character;
						publish("slideshow/next");
					}
				});
			})(character, x, y);
		};
		var x = 510;
		var y = 295;
		var dx = 200;
		var dy = 70;
		_addButton("tf2t", x, y); _addButton("pavlov", x+dx, y);
		_addButton("random", x, y+dy); _addButton("tft", x+dx, y+dy);
		_addButton("all_c", x, y+dy*2);

		// WHO'S WHO?
		self.add({
			id:"forgot", type:"TextBox",
			x:715, y:435, width:190, height:50,
			align:"center", color:"#aaa", size:15,
			text_id:"forgot_whos_who"
		});

	},
	onend: function(self){
		self.remove("bet_all_c");
		self.remove("bet_tft");
		self.remove("bet_tf2t");
		self.remove("bet_pavlov");
		self.remove("bet_random");
		self.remove("forgot");
	}
});

SLIDES.push({
	onstart: function(self){

		var o = self.objects;

		// Words
		var words = Words.get("noise_evo_2").replace(/\[CHAR\]/g, "<span class='"+_.answer+"'>"+Words.get("label_"+_.answer)+"</span>");
		o.text.setText(words);
		_hide(o.text); _fadeIn(o.text, 100);

		/////////////////////////////////////////
		// BUTTONS for playing //////////////////
		/////////////////////////////////////////

		var x = 172;
		var y = 175;
		var dy = 70;
		self.add({
			id:"playButton", type:"Button", size:"short",
			x:x, y:y, text_id:"label_start",
			onclick: function(){
				if(o.tournament.isAutoPlaying){
					publish("tournament/autoplay/stop");
				}else{
					publish("tournament/autoplay/start");
				}
			}
		});
		listen(_, "tournament/autoplay/stop",function(){
			o.playButton.setText("label_start");
		});
		listen(_, "tournament/autoplay/start",function(){
			o.playButton.setText("label_stop");
		});
		self.add({
			id:"stepButton", type:"Button",  size:"short",
			x:x, y:y+dy, text_id:"label_step", message:"tournament/step"
		});
		self.add({
			id:"resetButton", type:"Button", size:"short",
			x:x, y:y+dy*2, text_id:"label_reset", message:"tournament/reset"
		});

		/////////////////////////////////////////
		// SHOW THE NEXT WORDS, and a NEXT

		// NEXT
		var reproduceSteps = 0;
		_.misc = {};
		listen(_.misc, "tournament/step/completed", function(step){
			if(step=="reproduce"){
				reproduceSteps++;
				if(reproduceSteps==6){
					
					// WORDS
					var words = (_.answer=="pavlov") ? Words.get("noise_evo_2_2_correct") : Words.get("noise_evo_2_2_incorrect");
					words += " ";
					words += Words.get("noise_evo_2_2");
					self.add({
						id:"text_next", type:"TextBox",
						x:510, y:160, width:450,
						text: words
					});
					_hide(o.text_next); _fadeIn(o.text_next, 100);

					// BUTTON
					self.add({
						id:"btn_next", type:"Button", x:510, y:366, 
						text_id:"noise_evo_2_2_btn", size:"long",
						message:"slideshow/next"
					});
					_hide(o.btn_next); _fadeIn(o.btn_next, 300);


				}
			}
		});

	},
	onend: function(self){
		self.remove("text_next");
		self.remove("btn_next");
		unlisten(_.misc);
	}
});

SLIDES.push({
	onstart: function(self){

		var o = self.objects;

		// Words
		o.text.setTextID("noise_evo_3");
		_hide(o.text); _fadeIn(o.text, 100);

		// Tournament
		Tournament.resetGlobalVariables();
		Tournament.INITIAL_AGENTS = [
			{strategy:"tf2t", count:3},
			{strategy:"pavlov", count:3},
			{strategy:"random", count:3},
			{strategy:"tft", count:3},
			{strategy:"all_d", count:13}
		];
		PD.NOISE = 0.05;
		o.tournament.reset();

		// HIDE PLAYER
		_hide(o.playButton); o.playButton.deactivate();
		_hide(o.stepButton); o.stepButton.deactivate();
		_hide(o.resetButton); o.resetButton.deactivate();

		// BETS
		var _addButton = function(character, x, y){
			(function(character, x, y){
				self.add({
					id:"bet_"+character, type:"Button", x:x, y:y, 
					text_id: "icon_"+character,
					tooltip: "who_"+character,
					onclick:function(){
						_.answer = character;
						publish("slideshow/next");
					}
				});
			})(character, x, y);
		};
		var x = 510;
		var y = 295;
		var dx = 200;
		var dy = 70;
		_addButton("tf2t", x, y); _addButton("pavlov", x+dx, y);
		_addButton("random", x, y+dy); _addButton("tft", x+dx, y+dy);
		_addButton("all_d", x, y+dy*2);

		// WHO'S WHO?
		self.add({
			id:"forgot", type:"TextBox",
			x:715, y:435, width:190, height:50,
			align:"center", color:"#aaa", size:15,
			text_id:"forgot_whos_who"
		});

	},
	onend: function(self){
		self.remove("bet_all_d");
		self.remove("bet_tft");
		self.remove("bet_tf2t");
		self.remove("bet_pavlov");
		self.remove("bet_random");
		self.remove("forgot");
	}
});

SLIDES.push({
	onstart: function(self){

		var o = self.objects;

		// SHOW PLAYER
		_fadeIn(o.playButton,1); o.playButton.activate();
		_fadeIn(o.stepButton,1); o.stepButton.activate();
		_fadeIn(o.resetButton,1); o.resetButton.activate();
		o.playButton.setText("label_start");

		// Words
		var words = Words.get("noise_evo_4").replace(/\[CHAR\]/g, "<span class='"+_.answer+"'>"+Words.get("label_"+_.answer)+"</span>");
		o.text.setText(words);
		_hide(o.text); _fadeIn(o.text, 100);

		/////////////////////////////////////////
		// SHOW THE NEXT WORDS, and a NEXT

		// NEXT
		var reproduceSteps = 0;
		_.misc = {};
		listen(_.misc, "tournament/step/completed", function(step){
			if(step=="reproduce"){
				reproduceSteps++;
				if(reproduceSteps==8){

					// WORDS
					var words = (_.answer=="tf2t") ? Words.get("noise_evo_4_2_correct") : Words.get("noise_evo_4_2_incorrect");
					words += " ";
					words += Words.get("noise_evo_4_2");
					self.add({
						id:"text_next", type:"TextBox",
						x:510, y:116, width:450,
						text: words
					});
					_hide(o.text_next); _fadeIn(o.text_next, 100);

					// BUTTON
					self.add({
						id:"btn_next", type:"Button", x:510, y:446, 
						text_id:"noise_evo_4_2_btn", size:"long",
						message:"slideshow/next"
					});
					_hide(o.btn_next); _fadeIn(o.btn_next, 300);

				}
			}
		});

	},
	onend: function(self){
		self.remove("text_next");
		self.remove("btn_next");
		unlisten(_.misc);
        self.clear();
	}
}, {
	onstart: function(self){

		var o = self.objects;
		
		self.add({
			id:"btmWords", type:"TextBox", text_id:"oneoff_last_question",
			x:130, y:300, width:700, height:100, align:"center"
		});

		_hide(o.btmWords), _fadeIn(o.btmWords, 150+10);

	},

	onend: function(self){
		self.clear();
	}
});
