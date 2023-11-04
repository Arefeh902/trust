SLIDES.push({
	id: "noise3",

	onstart: function(self){

		var o = self.objects;
		_.misc = {};


        // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

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


		// SHOW PLAYER
		_fadeIn(o.playButton,1); o.playButton.activate();
		_fadeIn(o.stepButton,1); o.stepButton.activate();
		_fadeIn(o.resetButton,1); o.resetButton.activate();
		o.playButton.setText("label_start");



        // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


		// Words
		o.text.setTextID("noise_evo_5");
		_hide(o.text); _fadeIn(o.text, 100);

		// Tournament
		o.tournament.reset();

		// Slider!
		var x = 510;
		var y = 200;
		self.add({
			id:"noiseLabel", type:"TextBox",
			x:x, y:y, width:450, noSelect:true
		});
		self.add({
			id:"noiseSlider", type:"Slider",
			x:x, y:y+55, width:450,
			min:0.00, max:0.50, step:0.01,
			message: "rules/noise"
		});
		var _updateLabel = function(value){
			value = Math.round(value*100);
			var words = Words.get("sandbox_rules_3");
			words = words.replace(/\[N\]/g, value+""); // replace [N] with the number value
			o.noiseLabel.setText("<i>"+words+"</i>");
		};
		listen(_.misc, "rules/noise", function(value){
			_updateLabel(value);
			o.tournament.reset();
		});
		o.noiseSlider.setValue(0.05);
		_updateLabel(0.05);
		_hide(o.noiseLabel); _fadeIn(o.noiseLabel, 300);
		_hide(o.noiseSlider); _fadeIn(o.noiseSlider, 300);

		// Continue whenever you want to...
		listen(_.misc, "tournament/autoplay/start",function(){
			if(_showContinue) _showContinue();
		});
		var _showContinue = function(){
			_showContinue = null;
			self.add({
				id:"continueLabel", type:"TextBox",
				x:565, y:405, width:400,
				align:"right", color:"#aaa", size:17,
				text_id:"noise_evo_5_continue"
			});
			self.add({
				id:"continueButton", type:"Button",
				x:855, y:440, size:"short",
				text_id:"label_continue",
				message: "slideshow/next"
			});
			_hide(o.continueLabel); _fadeIn(o.continueLabel, 100);
			_hide(o.continueButton); _fadeIn(o.continueButton, 100);
		};

	},
	onend: function(self){
		unlisten(_.misc);
		self.remove("noiseLabel");
		self.remove("noiseSlider");
		var o = self.objects;
		if(o.continueLabel) self.remove("continueLabel");
		if(o.continueButton) self.remove("continueButton");
		self.remove("text");
	}
});

SLIDES.push({
	onstart: function(self){

		var o = self.objects;

		// Words
		self.add({
			id:"text", type:"TextBox",
			x:510, y:10, width:450, height:500,
			text_id:"noise_evo_6"
		});
		_hide(o.text); _fadeIn(o.text, 100);

		// Next button
		self.add({
			id:"button", type:"Button", x:510, y:466, 
			text_id:"noise_evo_6_btn", size:"long",
			message:"slideshow/scratch"
		});
		_hide(o.button); _fadeIn(o.button, 500);

	},
	onend: function(self){
		self.clear();
		unlisten(self);
		unlisten(_);
		unlisten(_.misc);
	}
}, {
	onstart: function(self){

		var o = self.objects;
		
		self.add({
			id:"btmWords", type:"TextBox", text_id:"oneoff_last_question_v2",
			x:130, y:300, width:700, height:100, align:"center"
		});

		_hide(o.btmWords), _fadeIn(o.btmWords, 150+10);

	},

	onend: function(self){
		self.clear();
	}
});
