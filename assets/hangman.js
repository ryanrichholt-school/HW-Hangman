//hangman.js
$(document).ready(function(){
	var game = null;

	var words = [
		"Amy Wong",
		"Bender",
		"Zapp Brannigan",
		"Dr Zoidberg",
		"Hermes",
		"Kif Kroker",
		"Phillip J Fry",
		"Professor Farnsworth",
		"Scruffy",
		"Turanga Leela"
	]

	function Game(){
		this.active = true;
		this.guesses = [];
		this.remaining_guesses = 8;
		this.word = word();
		
		for(var i in this.word){
			var $letter = $("<span>", {
				"class": "letter", 
				"data-value": this.word[i],
				"data-solved": "false"
			});
			$letter.text('_ ')
			$('.game-board').append($letter);

		}

		this.update = function(){
			$('.guessed').text(this.guesses.join(' '));
			$('.remaining_guesses').text(this.remaining_guesses);
			
			// Check if theyre all solved
			var unsolved = 0;
			$('.game-board').children().each(function(){
				var solved = $(this).data('solved')
				if(!solved){
					unsolved ++;
				}
			})
			
			if(unsolved <= 0){
				this.active = false;
				alert('You Win!');
			}
			else if(this.remaining_guesses <= 0){
				this.active = false;
				alert('Game Over!');
				revealAll();
			}
		}
	}

	var revealAll = function(){
		$('.game-board').children().each(function(){
			var letter = $(this);
			var val = letter.data('value');
			if(val === ' '){
				letter.text('-');
				letter.data('solved', 'true');
			}
			else {
				letter.text(val);
				letter.data('solved', 'true');
			}
		})

	}


	var word = function(){
		return words[Math.floor(Math.random()*words.length)]
	}


	var guess = function(key){
		// Do nothing if they key has already been guessed
		var success = 0;
		console.log(key + ' pressed')

		if(game.guesses.indexOf(key.toLowerCase()) !== -1){
			console.log('already guessed!')
			return
		}

		if(key === ' '){
			console.log('space guessed!')
			success++;
		}
		
		// Check every letter on the board for the key
		$('.game-board').children().each(function(){
			var letter = $(this);
			var val = letter.data('value');
			if(val === ' '){
				letter.text('-');
				letter.data('solved', 'true');
			}
			else if(val.toLowerCase() == key.toLowerCase()){
				console.log('Successful guesss!');
				letter.text(val);
				letter.data('solved', 'true');
				success ++;
			}
		})

		// If none were found, subtract a guess
		console.log('Number of succeses ' + success)
		if(success == 0){
			game.remaining_guesses -= 1
		}

		// Add to guessed already
		game.guesses.push(key.toLowerCase())
		game.update()	
		console.log(game)
	}


	// Attach button events
	$(document).on('keypress', function(event){
		if (game && game.active){
			guess(event.key)
		}
	})

	$('#new').click(function(){
		$('.game-board').empty();
		game = new Game();
		guess(' ')
	})

}) //end ready
