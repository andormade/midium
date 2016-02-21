'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultChannel = setDefaultChannel;

var _midiumCore = require('midium-core');

var _midiumCore2 = _interopRequireDefault(_midiumCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Setter function for the default channel.
 *
 * @param {number} channel    MIDI channel 1-16.
 *
 * @returns {object}
 */
function setDefaultChannel(channel) {
  this.defaultChannel = channel;
  return this;
};