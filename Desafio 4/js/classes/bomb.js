const BOMB_SIZE = 30;

/**
* This is a class declaration
* This class is responsible for defining the bombs behavior
*
* This class extends the Entity class, which is responsible for binding the element's
* positons and directions. If you'd like to know more about class inheritance in javascript, see this link
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
*/
class Bomb extends Entity {
	/**
	* Store all existing isntances of bombs, for easier tracking
	* @type { Bomb[] }
	*/
	static allBombElements = [];

	/**
	* @argument { HTMLDivElement } containerElement The HTML element in which the bomb should be created.
	* @argument { Vector } initialPosition The initial position of the bomb
	*/
	constructor (
		containerElement,
		initialPosition,
	) {
		const size = BOMB_SIZE;
		const direction = Vector.up;

		// The `super` function will call the constructor of the parent class.
		// If you'd like to know more about class inheritance in javascript, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
		super(containerElement, new Vector(1, 1).scale(size), initialPosition, direction);

		// Assigns the hook's image to it's element
		this.rootElement.style.backgroundImage = "url('assets/bomb.png')";

		// Add element to bombs list, for easier tracking.
		Bomb.allBombElements.push(this);
	}

	/**
	* When this object is hooked, it should slow the hook down. This function will
	* tell the hook how much should it slow down.
	* @returns { number } A speed multiplier
	*/
	calculateHookSpeedMultiplier () {
		const size = Math.max(this.size.x, this.size.y);
		const speedMultiplier = size/BOMB_SIZE;
		return speedMultiplier;
	}

	/**
	* This method removes the Entity's element from the DOM, and the entities list
	* Note that this methods overrides the parent class's delete method. This is to
	* allow for behavior extension.
	*/
	delete () {
		// This is to call the parent class's delete method
		super.delete();

		// Here, we will find the index of the entity, and use it to remove the element from the
		// movableEntities array.
		// If you don't know how the splice method works, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
		// If you dont't know how the findIndex method works, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
		const index = Bomb.allBombElements.findIndex(e => e === this);
		if (index !== -1) Bomb.allBombElements.splice(index, 1);
	}
}