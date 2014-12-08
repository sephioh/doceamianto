/**@
 * #Twoway
 * @category Input
 * Move an entity left or right using the arrow keys or `D` and `A` and jump using up arrow or `W`.
 *
 * When direction changes a NewDirection event is triggered with an object detailing the new direction: {x: x_movement, y: y_movement}. This is consistent with Fourway and Multiway components.
 * When entity has moved on x-axis a Moved event is triggered with an object specifying the old position {x: old_x, y: old_y}
 */
Crafty.c("Twoway", {
    _speed: 3,
    _up: false,

    init: function () {
        this.requires("Fourway, Keyboard, Gravity");
    },

    /**@
     * #.twoway
     * @comp Twoway
     * @sign public this .twoway(Number speed[, Number jump])
     * @param speed - Amount of pixels to move left or right
     * @param jump - Vertical jump speed
     *
     * Constructor to initialize the speed and power of jump. Component will
     * listen for key events and move the entity appropriately. This includes
     * ~~~
     * `Up Arrow`, `Right Arrow`, `Left Arrow` as well as W, A, D. Used with the
     * `gravity` component to simulate jumping.
     * ~~~
     *
     * The key presses will move the entity in that direction by the speed passed in
     * the argument. Pressing the `Up Arrow` or `W` will cause the entity to jump.
     *
     * @see Gravity, Fourway
     */
    twoway: function (speed, jump) {

        this.multiway(speed, {
            RIGHT_ARROW: 0,
            LEFT_ARROW: 180,
            D: 0,
            A: 180,
            Q: 180
        });

        if (speed) this._speed = speed;
        if (arguments.length < 2){
          this._jumpSpeed = this._speed * 2;
        } else{
          this._jumpSpeed = jump;
        }

        this.bind("EnterFrame", function () {
            if (this.disableControls) return;
            if (this._up) {
                this.y -= this._jumpSpeed;
                this._falling = true;
		this.trigger('Moved', { x: this._x, y: this._y + this._jumpSpeed });
            }
        }).bind("KeyDown", function (e) {
            if (e.key === Crafty.keys.UP_ARROW || e.key === Crafty.keys.W || e.key === Crafty.keys.Z)
                this._up = true;
        });

        return this;
    }
});