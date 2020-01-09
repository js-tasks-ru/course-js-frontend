import {ErrorNotification} from '../notification/index.js';

export default function(message, source, lineno, colno, error) {
  new ErrorNotification(message);
}
