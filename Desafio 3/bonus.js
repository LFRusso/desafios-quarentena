class Bonus extends MovableEntity {
	constructor (
		containerElement,
		mapInstance,
		initialPosition, 
	) {
        const size = 30;
		const direction = Asteroid.getRandomDirection();

		super(containerElement, size, initialPosition, initialPosition.scale(-0.001), direction);

		this.mapInstance = mapInstance;

		// This is so the map can execute the player's physics (see the `frame` function
		// in the `map.js` file
		mapInstance.addEntity(this);

        // Bonus type 
        this.type = Math.floor(Math.random() *2 + 1);
        
		// Finds a random image to assign to the asteroid's element
		this.rootElement.style.backgroundImage = `url('assets/bonus${this.type}.png')`;
		this.rootElement.style.backgroundSize = size + 'px';
	}

	/**
	* Creates a random direction
	* @returns { Vector }
	*/
	static getRandomDirection () {
		return new Vector(Math.random(), Math.random());
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
		if (!(object instanceof Player)) return;

        // Play sound
        var sound = document.createElement("audio");
        sound.type="audio/wav"
        sound.src = "./assets/sound/sfx_sounds_interaction12.wav";
        sound.play();

        
        this.mapInstance.removeEntity(this);
        this.delete();
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