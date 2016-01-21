module.exports = {
	/**
	 * Returns with the default value if the specified object is not available.
	 *
	 * @param {*} object           Object to check if it is defined.
	 * @param {*} defaultObject    Default object.
	 *
	 * @returns {*}
	 */
	defaultValue : function(object, defaultObject) {
		if (this.isDefined(object)) {
			return object;
		}
		return defaultObject;
	},

	/**
	 * Returns true if the specified object is undefined.
	 *
	 * @param {*} object
	 *
	 * @returns {boolean}
	 */
	isUndefined : function(object) {
		return typeof object === 'undefined';
	},

	/**
	 * Returns true if the specified object is defined.
	 *
	 * @param {*} object
	 *
	 * @returns {boolean}
	 */
	isDefined : function(object) {
		return !this.isUndefined(object);
	},

	/**
	 * Returns with the low nibble of the given byte.
	 *
	 * @param {number} byte
	 *
	 * @returns {number}
	 */
	getLowNibble : function(byte) {
		return byte & 0x0F;
	},


	/**
	 * Returns with the high nibble of the given byte.
	 *
	 * @param {number} byte
	 *
	 * @returns {number}
	 */
	getHighNibble : function(byte) {
		return (byte >> 4) & 0x0f;
	}
};
