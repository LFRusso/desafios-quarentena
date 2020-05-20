const PLAYER_SIZE = 20;

const sound = document.createElement("audio");
const WEAPONS = [
	{
		attack: (object, direction) => {
			object.velocity = direction.scale(-0.1);
			new Bullet (object.containerElement, object.mapInstance, direction, object.position);
			// Play shooting sound
			sound.type="audio/wav"
			sound.src = "./assets/sound/sfx_wpn_laser2.wav";
			sound.play();
		},	
	},

	{
		attack: (object, direction) => {
			object.velocity = direction.scale(-0.1);
			new Bullet (object.containerElement, object.mapInstance, direction, object.position);
			new Bullet (object.containerElement, object.mapInstance, direction.rotate(7), object.position);
			new Bullet (object.containerElement, object.mapInstance, direction.rotate(-7), object.position);
			// Play shooting sound
			sound.type="audio/wav"
			sound.src = "./assets/sound/sfx_wpn_laser5.wav";
			sound.play();
		},	
	},

	{
		attack: (object, direction) => {
			sound.type="audio/wav"
			sound.src = "./assets/sound/sfx_wpn_laser9.wav";
			object.velocity = direction.scale(-0.1);
			new Bullet (object.containerElement, object.mapInstance, direction, object.position);
			sound.play();
			setTimeout(()=>{
				new Bullet (object.containerElement, object.mapInstance, direction, object.position);
				sound.pause();
				sound.currentTime = 0;
				sound.play();
				setTimeout(()=>{
					new Bullet (object.containerElement, object.mapInstance, direction, object.position);
					sound.pause();
					sound.currentTime = 0;
					sound.play();
				}, 50);
			}, 50);
		},	
	},
]

/**
* This is a class declaration
* This class is responsible for defining the player behavior
* There should be only one player in the game, so this is a Singleton class.
* If you'd like to know more about the singleton pattern, see this link:
* https://en.wikipedia.org/wiki/Singleton_pattern
*
* this class extends the MovableEntity class, which is responsible for defining physics behavior
* If you'd like to know more about class inheritance in javascript, see this link
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
*/
class Player extends MovableEntity {

	/**
	* @argument { HTMLDivElement } containerElement The HTML element in which the player
	* should be created. This will allow us to have more control over the player's styles
	* @argument { Map } mapInstance A reference to the game's map. It will be used
	* to instantiate Bullet objects (see the `shoot` function below).
	* @argument { Function } gameOverFunction A function to be called in case the
	* player is hit by an asteroid (so, gameover).
	*/
	constructor (
		containerElement,
		mapInstance,
		gameOverFunction,
	) {

		// The `super` function will call the constructor of the parent class.
		// If you'd like to know more about class inheritance in javascript, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
		super(containerElement, PLAYER_SIZE);

		this.mapInstance = mapInstance;
		this.containerElement = containerElement;
		this.gameOverFunction = gameOverFunction;

		// This is so the map can execute the player's physics (see the `frame` function
		// in the `map.js` file
		mapInstance.addEntity(this);

		// Assigns the player's image to it's element
		this.rootElement.style.backgroundImage = "url('assets/player.svg')";
		this.rootElement.style.backgroundSize = this.size + 'px';
		// Set initial weapon
		this.weapon = 0;
	}

	/**
	* Will rotate the player's model
	* @argument { number } degrees
	*/
	turn (degrees) {
		this.setDirection(this.direction.rotate(degrees));
	}

	move () {
		this.position = this.position.add(this.direction);
		this.velocity = this.direction.scale(0.3);
	}

	/**
	* Instantiates a bullet in front of the player.
	*/
	shoot (direction = this.direction) {
		WEAPONS[this.weapon].attack(this, direction);
	}


	collided (object) {
		if(object instanceof Bonus) {
			this.weapon = object.type;
			return;
		}

		if (!(object instanceof Asteroid)) return;

		this.gameOverFunction();
	}

	frame () {
		this.position = this.position.add(this.velocity);

		// Updates the object element's position
		this.rootElement.style.left = this.position.x + 'px';
		this.rootElement.style.top = this.position.y + 'px';
	
		// Border conditions for player
		if(this.distanceFromCenter() > 290){
			this.position = this.position.scale(-1)
		}
	}
	
}