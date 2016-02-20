import Midinette from 'midinette';
import Midium from 'midium-core';
import assignIn from 'lodash.assignin';
import eventListeners from './eventListeners';
import eventEmitters from './eventEmitters';
import channel from './channel';

assignIn(Midium, Midinette);
assignIn(Midium.prototype, eventListeners, eventEmitters, channel);

global.Midium = Midium;
export default Midium;
