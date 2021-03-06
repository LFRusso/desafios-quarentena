const MIN_ASTEROID_SIZE = 20;
const MAX_ASTEROID_SIZE = 50;

const MIN_ASTEROID_LIFE = 1;
const MAX_ASTEROID_LIFE = 3;

const MAX_ASTEROID_ROTATION_SPEED = 1;

/**
* This is a class declaration
* This class is responsible for defining the Asteroids's behavior.
* this class extends the MovableEntity class, which is responsible for defining physics behavior
* If you'd like to know more about class inheritance in javascript, see this link
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
*/
class Asteroid extends MovableEntity {
	constructor (
		containerElement,
		mapInstance,
		initialPosition, 
		child = 0
	) {
		// Check if is a child of another asteroid of Type 3
		if (child === 1) {
			var size = MIN_ASTEROID_SIZE;
			var rand_x = 50*Math.random() - 25;
			var rand_y = 50*Math.random() - 25;
			var rand_vec = new Vector(rand_x, rand_y);
			initialPosition = initialPosition.add(rand_vec);
		} else {
			var size = Asteroid.getRandomSize();
		}

		const direction = Asteroid.getRandomDirection();

		// The `super` function will call the constructor of the parent class.
		// If you'd like to know more about class inheritance in javascript, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
		super(containerElement, size, initialPosition, initialPosition.scale(-0.001), direction);

		this.mapInstance = mapInstance;
		this.rotationSpeed = Asteroid.getRandomRotationSpeed();

		// This is so the map can execute the player's physics (see the `frame` function
		// in the `map.js` file
		mapInstance.addEntity(this);

		// initializes the asteroid's life to it's maximum.
		this.life = this.calculateMaxLife();
		this.type = this.life == 3 ? 5 : this.getAsteroidType();

		// Asteroid Type 1: faster
		if(this.type == 1) {
			this.velocity = this.velocity.scale(5);
			this.rootElement.style.filter = "invert(90%)";
		}

		// Finds a random image to assign to the asteroid's element
		const asteroidImageIndex = Math.floor(Math.random() * 3) + 1;
		this.rootElement.style.backgroundImage = `url('assets/asteroid-${asteroidImageIndex}.svg')`;
		this.rootElement.style.backgroundSize = size + 'px';
	}

	getAsteroidType() {
		var type = Math.floor(Math.random() *4 + 1);
		return type;
	}

	/**
	* Creates a random size for an asteroid
	*
	* Also, this is a static method, which means it does not belong to an object, but to the class itself.
	* if you'd like to know more abou static methods, see this link:
	* https://medium.com/@yyang0903/static-objects-static-methods-in-es6-1c026dbb8bb1
	* @returns { number }
	*/
	static getRandomSize () {
		return Math.floor(Math.random() * (MAX_ASTEROID_SIZE - MIN_ASTEROID_SIZE) + MIN_ASTEROID_SIZE);
	}

	/**
	* Creates a random direction for an asteroid
	* @returns { Vector }
	*/
	static getRandomDirection () {
		return new Vector(Math.random(), Math.random());
	}

	/**
	* Creates a random rotation speed to an asteroid
	* @returns { number }
	*/
	static getRandomRotationSpeed () {
		return (Math.random() - 0.5) * 2 * MAX_ASTEROID_ROTATION_SPEED;
	}

	/**
	* Calculates the max life of the asteroid based on it's size. The larger the asteroid,
	* the larger it's life.
	* @returns { number }
	*/
	calculateMaxLife () {
		const sizePercentage = (this.size - MIN_ASTEROID_SIZE) / (MAX_ASTEROID_SIZE - MIN_ASTEROID_SIZE);
		var life = Math.round(sizePercentage * (MAX_ASTEROID_LIFE - MIN_ASTEROID_LIFE) + MIN_ASTEROID_LIFE);
		// Variar o tamanho e cor do asteroide aqui
		return life;
	}

	/**
	* Uppon collision with a bullet, reduces the asteroid's life. If the asteroid
	* has zero life, destroy it.
	* @argument { MovableObject } object
	*/
	collided (object) {
		// the instanceof operator will check if an object was created by a class, or one of it's children.
		// If you'd like to know more about the instanceof operator, see this link:
		// https://www.geeksforgeeks.org/instanceof-operator-in-javascript/
		if (!(object instanceof Bullet)) return;

		this.life --;
		if (this.life === 0) {
			// Play sound
			var sound = document.createElement("audio");
			sound.type="audio/wav"
			sound.src = "./assets/sound/sfx_exp_short_hard2.wav";
			sound.play();

			// Shake screen
			document.getElementById("root").style = "animation: shake 0.5s;";
			setTimeout(()=>{
				document.getElementById("root").style = "";
			}, 500);

			// Asteroids of type 5 spawn other smaller asteroids when destroyed
			if (this.type == 5){
				new Asteroid(this.mapInstance.containerElement, this.mapInstance, this.position, 1);
				new Asteroid(this.mapInstance.containerElement, this.mapInstance, this.position, 1);
				new Asteroid(this.mapInstance.containerElement, this.mapInstance, this.position, 1);
			}

			this.mapInstance.increaseScore();
			this.mapInstance.removeEntity(this);
			this.delete();
		}
	}

	/*
	* This function should be called every game frame. It will not only update the
	* asteroid's physics, but also rotate it based on it's rotation speed.
	*/
	frame () {
		super.frame();
		this.setDirection(this.direction.rotate(this.rotationSpeed));
	}
}