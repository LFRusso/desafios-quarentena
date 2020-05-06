class GameState{
    constructor(player, enemy){

        this.turnText = document.getElementById('text');
        this.isTurnHappeninig = false;

        this.Player = player;
        this.Enemy = enemy;
        this.playerTurn = true;

        this.round = 1;
    }

    gameLoop(){
            if(this.playerTurn){
                this.handleInput();
            } else {
                this.enemyAttack();
            }
    }
        
    handleInput() {
        // Set buttons click interaction
        document.getElementById('button1').addEventListener('click', () => {
            this.attackAction(this.Player.attacks[0], this.Enemy, this.Player)});

        document.getElementById('button2').addEventListener('click', () => {
            this.attackAction(this.Player.attacks[1], this.Enemy, this.Player)});

        document.getElementById('button3').addEventListener('click', () => {
            this.attackAction(this.Player.attacks[2], this.Enemy, this.Player)});

        document.getElementById('button4').addEventListener('click', () => {
            this.attackAction(this.Player.attacks[3], this.Enemy, this.Player)});
    };

    enemyAttack(){

        const atk = this.Enemy.attacks[Math.floor(Math.random() * this.Enemy.attacks.length)];

        // Prevents enemy from using special attack before round 2
        if(this.round == 1 && atk.name == "Road Roller"){
            this.attackAction(this.Enemy.attacks[1], this.Player, this.Enemy);
        } else {
            this.attackAction(atk, this.Player, this.Enemy);
        }
    }

    attackAction(attack, character, attacker) { 
        if(this.isTurnHappeninig){
            return;
        }
        this.isTurnHappeninig = true;

        let effectInterrupts = this.manageEffects(attacker);
        
        // If an interrupt effect is up, ignore attacker's attack
        if(!effectInterrupts){
            let willAttackMiss = Math.floor(Math.random() * 100) > attack.accuracy;

            this.turnText.innerText = attacker.name + " uses " + attack.name;
                if(willAttackMiss){
                    this.turnText.innerText += ", but misses!";
                } else {
                    // Attack animation
                    this.playAttackAnimation(attack, attacker);

                    // Attack's special effect
                    let effectChance = Math.random();
                    if(effectChance < attack.effect.chance){
                        attack.effect.time = attack.effect.totalTime;
                        console.log(attack.effect.time)
                        character.effects.push(attack.effect);
                        setTimeout(()=>{
                            this.turnText.innerText = character.name + " is now under " + attack.effect.name;
                        }, 500)
                    }
                    
                    // Check if victim is weak to the attack type
                    if(attack.type == character.weakness){
                        character.updateHp(1.5*attack.power);
                        setTimeout(()=>{
                            this.turnText.innerText = "It's super effective!";
                        }, 500)
                    } else {
                        character.updateHp(attack.power);
                    }
                }
        } else {
            this.turnText.innerText = "Paralized!";
        }

        setTimeout(() => {
            this.playerTurn = !this.playerTurn;
            this.isTurnHappeninig = false;

            this.turnText.innerText = "Choose one attack!"

            if(character.Hp === 0){
                this.gameOver(attacker.name);
                return;
                }; 

            this.gameLoop();
        }, 2000);
        
        
    }

    manageEffects(attacker){
        if(attacker.effects.length == 0){
            return;
        } else {
            let interruptedTurn = false;

            for(let i=0; i<attacker.effects.length; i++){
                let interrupts = attacker.effects[i].onTrigger();

                attacker.effects[i].time--;

                if(attacker.effects[i].time <= 0){
                    attacker.effects.splice(i, 1);
                }

                if(interrupts){
                    interruptedTurn = true;
                }
            }

            return interruptedTurn;
        }
    }


    // Setting up for round 2
    nextRound(){
        // Update player hp
        this.Player.totalHp += 100;
        this.Player.Hp = this.Player.totalHp;
        this.Player.updateHp(0);

        // Update enemy hp
        this.Enemy.totalHp += 250;
        this.Enemy.Hp = this.Enemy.totalHp;
        this.Enemy.updateHp(0);

        // Update enemy imgs
        this.Enemy.sprite = "assets/DIO2.gif";
        this.Enemy.animation = "assets/dio-pose.png";
        this.Enemy.attackAnimation();

        // Unlock new player attack
        document.getElementById("button1").style="visibility: show"
        this.turnText.innerText = "Star Platinum learns: THE WORLD!"
 
        document.getElementById("stand").style= "visibility: show";
        document.getElementById("dio").style= "visibility: show";

        this.playerTurn = false;
        this.round += 1;

        setTimeout(()=>{
            this.gameLoop();
        }, 1500)
    }

    // Update HTML text with the winner / unlocks round 2
    gameOver(winner){
            if(winner == 'Jotaro'){
                document.getElementById("jotaro-text").innerText ="Yare yare daze";
                document.getElementById("jotaro-dialog").style="visibility: show";
                document.getElementById("stand").style= "visibility: hidden";
                document.getElementById("dio").style= "visibility: hidden";
                document.getElementById("text").style= "visibility: hidden";

                if(this.round == 1){
                    document.getElementById("dialog-btn-2").innerText = "Continue";
                    document.getElementById("dialog-btn-2").addEventListener("click", () =>{
                        // Next round
                        this.nextRound();
                    }) 
                } else {
                    document.getElementById("dialog-btn-2").innerText = "Restart";
                    document.getElementById("dialog-btn-2").addEventListener("click", () =>{
                        // Restart
                        window.location.reload();
                    }) 
                }
            } 

            // Game over
            if (winner == 'DIO') {
                // Game over effects
                document.getElementById('arena').style = "filter: grayscale(90%)"; 
                document.getElementById("stand").style= "visibility: hidden";
                document.getElementById("text").style= "visibility: hidden";
                document.getElementById("options").style= "visibility: hidden";

                // Game over music
                document.getElementById('player').src= "assets/roundabout.mp3";
                document.getElementById('player').volume= "0.25";

                // Show restart img and button
                document.getElementById("restart").style= "display: inline";
                document.getElementById("restart-btn").addEventListener("click", () =>{
                    // Reload the game
                    window.location.reload();
                }) 

                // Resumes playing music
                document.getElementById('player').play();
            }

    }

    playAttackAnimation(attack, attacker){
        attacker.attackAnimation();
        attack.animation();
    }
}


// Introduction dialog
function gameIntro(){
    document.getElementById("options").style= "visibility: hidden";
    document.getElementById("stand").style= "visibility: hidden";
    document.getElementById("text").style= "visibility: hidden";

    document.getElementById("jotaro-dialog").style= "visibility: hidden";
    
    
    document.getElementById('dialog-btn-1').addEventListener("click", () => {
        document.getElementById("jotaro-dialog").style= "visibility: show";
        document.getElementById("dio-dialog").style= "visibility: hidden";
    });

    document.getElementById('dialog-btn-2').addEventListener("click", () => {
        document.getElementById("jotaro-dialog").style= "visibility: hidden";
        document.getElementById("options").style= "visibility: show";
        document.getElementById("stand").style= "visibility: show";
        document.getElementById("text").style= "visibility: show";
        document.getElementById('player').play();
    })

}

// ==================================================================== //

// Player Info
player_atks = [attacks.theWorld, attacks.quickAttack, attacks.starFinger, attacks.oraOra];
var player = new Player(400, player_atks, "Jotaro", "ranged");


// Enemy info
enemy_atks = [attacks.theWorld, attacks.mudaMuda, attacks.knifeThrow, attacks.roadRoller];
var enemy = new Character(500, enemy_atks, "DIO", "physical");

gameIntro();

Game = new GameState(player, enemy);
Game.gameLoop();
