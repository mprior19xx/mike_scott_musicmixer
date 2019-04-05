(() => {
	// Variables
	let instrumentClass = null,
		instrumentSound  = null,
		micAudio = null,
		guitarAudio = null,
		bassAudio = null,
		drumAudio = null;

	// Constants
	const 	instruments = Array.from(document.querySelectorAll('img')),
			iconHolder = document.querySelector('#iconHolder'),
			dropZone = document.querySelector('#stageArea'),
			instructionsButton = document.querySelector('#instructionsButton'),
			resetButton = document.querySelector('#resetButton'),
			lightBox = document.querySelector('.lightbox'),
			closeLB = document.querySelector('.lightboxClose'),
			allAudio = [micAudio, guitarAudio, bassAudio, drumAudio],
			audioLabels = ["mic", "guitar", "bass", "drum"];
	
	// Drag and drop functionality goes here
	function initDrag() {
		iconHolder.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {
				e.dataTransfer.setData("text/plain", this.id)
				instrumentClass = this.className;
				instrumentSound = this.dataset.sound;
				console.log(instrumentSound);
			});
		});
	}

	// Handle dragover and drop
	function dAndD(zone) {
		// Determines when the drop zone is dragged over
		zone.addEventListener("dragover", function(e) {
		e.preventDefault();
		});

		// Adds an outline to the dropzone when something is dragged over it
		zone.addEventListener("dragenter", function(e) {
		e.preventDefault();
		dropZone.classList.toggle("outline");
		});

		// Removes outline if dragged item leaves the drop zone
		zone.addEventListener("dragleave", function(e) {
		e.preventDefault();
		dropZone.classList.toggle("outline");
		});

		// Removes outline if dragged item is dropped on the drop zone
		zone.addEventListener("drop", function(e) {
			e.preventDefault();
			dropZone.classList.toggle("outline");

			console.log(zone);

			// Adds item to the drop zone
			let instrument = e.dataTransfer.getData("text/plain");
			for (i = 0; i < zone.children.length; i++) {
				if (zone.children[i].className == instrumentClass) {
					return;
				};
			};
			zone.appendChild(document.querySelector(`#${instrument}`));
		});
	}

	// Prepares the audio
	function prepSound(){

		//Listens for drop to stage
		window.addEventListener("drop", function(e) {
			// Sets according audio variable to the sound of the selected instrument and calls playSound to play the audio
			for (i = 0; i < audioLabels.length; i++) {
				if (instrumentClass == audioLabels[i]) {
					allAudio[i] = document.querySelector(`audio[data-sound="${instrumentSound}"]`);
					playSound(allAudio[i]);
				};
			};
		});
	};

	// Plays the audio
	function playSound(audio){
		if (!audio){return;}
		audio.currentTime = 0;
		audio.load();
		audio.play();
	}

	// Removes instruments from stage when clicked
	function removeInstrument() {
		// Listens for mouse down within stage area
		dropZone.addEventListener("mousedown", function(e) {
			// Selects all images
			document.querySelectorAll('img').forEach(img => {
				// If the image is on the stage, listen for a click event. If an image is clicked, move it back to the button area.
				if(dropZone.contains(img)) {
					img.addEventListener("click", function(e) {
						let box = document.querySelector(`#${img.id}Box`);
						box.appendChild(img);

						// Stops whatever instrument was removed from stage
						for (i = 0; i < audioLabels.length; i++) {
							if (this.className == audioLabels[i]) {
								allAudio[i].pause();
							};
						};
					});
				};
			});
		});
	}

	// Shows instructions lightbox
	function showLightbox() {
		// Shows lightbox
		lightBox.classList.add("showLightbox");

		// Fades lightbox in
		TweenMax.from(lightBox, 0.25, {opacity: 0});
	}

	// Fades out the instructions lightbox
	function fadeOutLightbox() {
		// Fades lightbox out
		TweenMax.to(lightBox, 0.25, {opacity: 0, onComplete: hideLightbox});
	}

	// Hides the instructions lightbox
	function hideLightbox() {
		// Restores lightbox opacity
		TweenMax.to(lightBox, 0, {opacity: 1});

		// Hides lightbox
		lightBox.classList.remove("showLightbox");
	}

	// Resets the stage
	function reset() {
		console.log("!!!");
		// Selects all images
		document.querySelectorAll('img').forEach(img => {
			// If the image is on the stage, move it back to the button area.
			if(dropZone.contains(img)) {
				let box = document.querySelector(`#${img.id}Box`);
				console.log(img);
				box.appendChild(img);
				
				// Stops all audio
				for (i = 0; i < audioLabels.length; i++) {
					if (allAudio[i] != null) {
						allAudio[i].pause();
					};
				};
			};
		});
	}

	// Invoke the functions
	initDrag();
	dAndD(dropZone);
	removeInstrument();
	prepSound();

	// Shows instructions if button is pressed
	instructionsButton.addEventListener("click", showLightbox);

	// Hides lightbox if close button is pressed
	closeLB.addEventListener("click", fadeOutLightbox);

	// Resets stage when reset button is pressed
	resetButton.addEventListener("click", reset);

})();
