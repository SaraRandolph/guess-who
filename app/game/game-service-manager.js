app.service('GameManager', function(CharactersService){
	
	var _computerChoice;
	var _game = {
		characters: CharactersService.getCharacters(),
		propertyList: CharactersService.getPropertyList(),
	};
    var totalGuesses = 15;
    var traitCost = 1;
    _game.guesses = 0    
	
	this.newGame = function(){
		setRandomChoice();
		reset();
        for (var i = 0; i < _game.characters.length; i++){
            _game.characters[i].possible = true
        }        
		return _game;
        
	}
	
	this.checkGuess = function (character) {
        //THIS ALLOWS YOU TO CHECK EACH CHARACTER INDIVIDUALLY
        //NO MODIFICATION NEEDED HERE
        
		if(character === _computerChoice){
            debugger
			_game.victory = true;
		}else{
			character.possible = false;
		}
		_game.guesses++;
		if(gameOver()){ return }
	}
	
	this.checkProperty = function(prop){
		if(gameOver()){ return }
        
		var hasProp = false;
		var found = false;
                
        if(traitCost >= totalGuesses - _game.guesses){
           alert("Dummy! You don't enough points for that");
           return;
        }
        
        _game.guesses += traitCost;
        traitCost++;
            
        for(var i = 0; i < _computerChoice.traits.length; i++){
            var currentTrait = _computerChoice.traits[i];
            if (currentTrait == prop.name){
                 hasProp = true
            } 
        }   
       
        
        /**  CAN GUESS
         * Check if the traitCost is greater than remaning guesses
         * totalGuesses = 10; guesses starts at 0 and should be for each guess
         * the traitCost starts at 2 and goes up by one for each propertyCheck
        //  * Dont forget to add the traitCost to the _game.guesses
         * setting _game.message will provide the user with feedback
         * 
         */
        
        /**  _COMPUTERCHOICE has TRAIT
         * _computerChocie.traits === [String, String]
         * check if _computerChoice.traits has the selected prop.name if so set hasProp = true;
         * also set prop.used = true to disable the same trait check
         */
        
 
        
        _game.characters.forEach(function(character){
            found = false;
            character.traits.forEach(function(trait){
                if (prop.name == trait){
                    found = true;
                }
            })  
            if (hasProp && !found || !hasProp && found){
               character.possible = false
            }                  
        
        })
            
        
     
        
        
        
        /** EACH CHARACTER HAS TRAIT
         * now check each _game.characters individually
         * if the character.traits has prop.name set 
         * found = true
         * after checking the traits
         *  
         * if hasProp && !found 
         * character.possible = false
         * 
         * What else would cause a character.possible to === false?
         * 
         */
	}
	
	function reset(){
        
        _game.victory = false;
        _game.guesses = 0;
        _game.traitsCost = 2;
        _game.victory = false;
        _game.computerChoice = '';
        _game.gameOver = false;
        
       
        _game.characters.forEach(function (character) {
            character.possible = true;
        })
        
        
        //  var out = ''
//     for (var key in obj){
//         out += obj[key];
//         out.toString(out);
         
//     }
//     return out
        
        for(var trait in _game.propertyList){
            _game.propertyList[trait].used = false;                     
        }
        
        // _game.victory = false;
        
        /**
         * Reset all of the values on _game
         * each character on _game.characters should set to 
         * character.possible = true
         * 
         * all of the traits in  _game.propertyList <--- its an {}
         * should be set to 
         * _game.propertyList[trait].used = false
         */
	}
	
	function gameOver() {
        
        if(_game.guesses >= 15){
            alert('LOSER!!! I WINNNNN!')
            _game.victory = false
            return true
        } 
        
        if(_game.victory){
            _game.computerChoice = _computerChoice          
            alert('You got lucky. You won this time')
            return true
        }
		/**
         * make sure the guesses are less than 10 
         * return true if the game should be over
         * if the game.victory 
         * set _game.computerChoice = _computerChoice
         * return true
         */
	}
	
	function setRandomChoice(){
        var randI = Math.floor(Math.random()* _game.characters.length)
        _computerChoice = _game.characters[randI]
        console.log('Computer Choice', _game.characters[randI])
	}
    
	
})