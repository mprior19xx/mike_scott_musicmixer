(() => {
	// Set up instruments and stage
	let buttonHolder = document.querySelector("#buttonHolder");
	let dropZone = document.querySelector("#stageArea");
	let instrumentClass = null;
	let instrumentSound  = null;
	let audio = null;
	const instruments = Array.from(document.querySelectorAll('img'));
	
	// Drag and drop functionality goes here
	function initDrag() {
		buttonHolder.querySelectorAll('img').forEach(img => {
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

	// Playing Intrument Audio when icon is placed
	function playSound(){

		//listens for drop to stage
		window.addEventListener("drop", function(e) {
			audio = document.querySelector(`audio[data-sound="${instrumentSound}"]`);
			if (!audio){return;}
			audio.currentTime = 0;
			audio.load();
			audio.play();
		});
	};

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
						console.log(img);
						box.appendChild(img);
						audio.pause();
					});
				};
			});
		});
	}

	// Invoke the functions
	initDrag();
	dAndD(dropZone);
	removeInstrument();
	playSound();
})();
