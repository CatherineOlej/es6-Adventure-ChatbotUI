/**
 * Catherine Olejarczyk
 * Assignment 3 - Chat UI
 * Choose your own adventure Halloween themed
 * A chatbot written in es6 and vs6 for twilio and testing on the web
 * this is the Adventure.js - GAME
 */


const GameState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    BACKTRACK: Symbol("backtrack"),
    DINNER: Symbol("dinner"),
    STRANGER: Symbol("stranger"),
    BREAKIN: Symbol("break in"),
    SHADOW: Symbol("shadow"),
    FOLLOW: Symbol("follow"),
    CABIN: Symbol("cabin"),
    SAVE: Symbol("save"),
    HELP: Symbol("help"),
    GAMEOVER: Symbol("yes"),
    WALKIMG: Symbol("walking"),
    SCREAM: Symbol("scream")
});

export default class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING;
    }
    
    makeAMove(sInput)
    {
        let sReply = "";
        switch(this.stateCur){
            case GameState.WELCOMING:
                sReply = "You and your friend decided to go for a walk into the woods. You end up getting lost with no means of communication. You find a cabin in the woods. Do you BACKTRACK your way home or knock on the spooky cabin's door?";
                this.stateCur = GameState.BACKTRACK;
                break;
            case GameState.BACKTRACK:
                if(sInput.toLowerCase().match("backtrack")){
                    sReply = "Its getting dark and you're both still lost. Should you go back to the cabin or keep walking?";
                    this.stateCur = GameState.WALKING;
                }else{
                    sReply ="Your friend knocks on the cabin's door, but no one answers. Do you try to BREAK IN or start walking back?";
                    this.stateCur = GameState.CABIN;
                }
                break;
            case GameState.WALKING:
                    if(sInput.toLowerCase().match("walking")){
                        sReply = "Its dark and as you keep walking you both see a stranger. Your friend wants to approch them and ask for directions, but you have a bad feeling about this. Do you approch the STRANGER or keep walking?";
                        this.stateCur = GameState.STRANGER;
                    }else{
                        sReply = "Its dark now and you're both still lost. Should you go back to the cabin or continue walking through the woods?";
                    this.stateCur = GameState.BACKTRACK;
                    }
                    break;
            case GameState.CABIN:
                if(sInput.toLowerCase().match("break in")){
                    sReply = "You break in and find a telephone. You pick up the phone and hear static, but you also start to hear a creaking noise. Do you and your friend run or CONFRONT the noise?";
                    this.stateCur = GameState.BREAKIN;
                }else{
                    sReply = "Its dark now and you're both still lost. Should you go back to the cabin or continue walking through the woods?";
                    this.stateCur = GameState.WALKING;
                }
                break;
            case GameState.BREAKIN:
                if(sInput.toLowerCase().match("confront")){
                    sReply = "You go towards the direction of the noise, then you hear the door shut and your friend starts screaming. You turn around a see a shadow behind your friend. Do you run out into the dark woods or HELP her?"
                    this.stateCur = GameState.HELP;
                }else{
                    sReply = "Its dark now and you're both still lost. Should you go back to the cabin or continue walking through the woods?";
                    this.stateCur = GameState.WALKING;

                }
                break;
            case GameState.STRANGER:
                    if(sInput.toLowerCase().match("stranger")){
                        sReply = "The stranger is willing to help, but you have to follow them home because they have a map. Do you FOLLOW them or keep walking?";
                        this.stateCur = GameState.FOLLOW;
    
                    }else{
                        sReply = "Its dark and you're both still lost. Should you go back to the cabin or continue walking through the woods?";
                        this.stateCur = GameState.WALKING;
        
                    }
                    break;    
            case GameState.FOLLOW:
                    if(sInput.toLowerCase().match("follow")){
                        sReply = "You end up following the stranger back to the cabin. The stranger agrees to help you under one circumstance; you must have dinner with them. Do you have DINNER or leave immediately?";
                        this.stateCur = GameState.DINNER;
    
                    }else{
                        sReply = "Its dark and you're both still lost. Should you go back to the cabin or continue walking through the woods?";
                        this.stateCur = GameState.WALKING;
        
                    }
                    break;    
            case GameState.HELP:
                if(sInput.toLowerCase().match("help")){
                    sReply = "You throw the phone at the shadow, grab your friend and together make a run for it into the woods and never look back.";
                    this.stateCur = GameState.GAMEOVER;
                }else{
                    sReply = "You run out of the cabin and then the screaming stops. You look back and the shadow is waving back at you. Do you want to SAVE your friend still or keep walking?";
                    this.stateCur = GameState.SAVE;
    
                }
                break;
            case GameState.SAVE:
                if(sInput.toLowerCase().match("save")){
                    sReply = "You return to the cabin, but only to find your friend missing. You hear laughter, so you follow it outside. Its your friend, but not anymore. You are trapped. Want to play again? (Yes or No)";
                    this.stateCur = GameState.GAMEOVER;

                }else{
                    sReply = "You're all alone in the dark woods now. You keep running and fall into a ditch, so you cry for help. You hear someone coming. You look up and see a shadow. SCREAM or surrender?";
                    this.stateCur = GameState.SCREAM;
    
                }
                break;
            case GameState.SCREAM:
                    if(sInput.toLowerCase().match("scream")){
                        sReply = "You pissed it off. He came back for you. Want to play again? (Yes or No)";
                        this.stateCur = GameState.GAMEOVER;
    
                    }else{
                        sReply = "Now that you surrendered the shadow has taken a liking to you and decided to let you live.";
                        this.stateCur = GameState.WELCOMING;
        
                    }
                    break;
            case GameState.DINNER:
                    if(sInput.toLowerCase().match("dinner")){
                        sReply = "You stay for dinner. The stranger is acting suspicious. You see them reach into the drawer thinking they will pull out a weapon. Instead, they take out the map. You and your friend make it back into the woods and find your way home. Want to play again? (Yes or No)";
                        this.stateCur = GameState.GAMEOVER;
    
                    }else{
                        sReply = "You both run for your lives, but then you trip and fall into a ditch. As you both cry for help you hear footsteps coming your way. Its the stranger. Want to play again? (Yes or No)";
                        this.stateCur = GameState.GAMEOVER;
        
                    }
                    break;
            case GameState.GAMEOVER:
                    if(sInput.toLowerCase().match("yes")){
                        sReply = "Congrats! Either you saved your friend or failed. Let's try again? (Yes or no)";
                        this.stateCur = GameState.WELCOMING;
    
                    }else{
                        sReply = "Thanks for playing!";
                    }
                    break;
        }
        return([sReply]);
    }
}