Loader.addToManifest(Loader.manifest,{
	// SFX
	fart: "assets/sounds/fart.mp3"
});


// (Yup, even w Grudgers & Detectives)
SLIDES.push({
	onstart: function(self){

		var o = self.objects;
		
		// SCRATCH IN TOURNAMENT
        Tournament.resetGlobalVariables();
		Tournament.INITIAL_AGENTS = [
            {strategy:"all_c", count:5},
            {strategy:"all_d", count:5},
            {strategy:"tft", count:5},
            {strategy:"grudge", count:5},
            {strategy:"prober", count:6}
		];
		self.add({id:"tournament", type:"Tournament", x:-20, y:20});


    	// Words to the side
		self.add({
			id:"text", type:"TextBox",
			x:510, y:30, width:450, height:500,
			text_id:"evo_10"
		});

		_hide(o.text); _fadeIn(o.text, 1000);

		// Button: start/stop
		var isPlaying = false;
		self.add({
			id:"autoplay", type:"Button", x:510, y:100, 
			text_id:"evo_autoplay", size:"long",
			onclick: function(){
				if(!isPlaying){
					o.autoplay.setText("evo_autoplay_stop");
					publish("tournament/autoplay/start");
					isPlaying = true;
				}else{
					o.autoplay.setText("evo_autoplay");
					publish("tournament/autoplay/stop");
					isPlaying = false;
				}
			}
		});
		_hide(o.autoplay); _fadeIn(o.autoplay, 1200);

		// Listen...
		var step = 0;
		listen(_, "tournament/step/completed", function(aahhhh){
			step++;
			if(step==13){
				_goOn();
			}
		});

		var _goOn = function(){

			// Text followup (hidden)
			self.add({
				id:"text2", type:"TextBox",
				x:510, y:180, width:450, height:500,
				text_id:"evo_10_followup"
			});
			_hide(o.text2); _fadeIn(o.text2, 400);

		};

	},
	onend: function(self){
		unlisten(_);
		self.remove("autoplay");
		self.remove("text2");
	}
});


