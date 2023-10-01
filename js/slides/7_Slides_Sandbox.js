SLIDES.push({

	id: "sandbox",
	onstart: function(self){

		// The tournament simulation
		Tournament.resetGlobalVariables();
		self.add({id:"tournament", type:"Tournament", x:-20, y:-20});

		// Screw it, just ALL of the Sandbox UI
		self.add({id:"sandbox", type:"SandboxUI"});

		// Label & Button for next...
		self.add({
			id:"label_next", type:"TextBox",
			x:55, y:481, width:535, align:"right",
			text_id: "sandbox_end"
		});
		self.add({
			id:"button_next", type:"Button",
			x:605, y:485, size:"long",
			text_id:"sandbox_end_btn",
			message: "slideshow/scratch"
		});
		
	},
	onend: function(self){
		self.clear();
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