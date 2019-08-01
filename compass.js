if ('ondeviceorientationabsolute' in window) {
  window.addEventListener('deviceorientationabsolute', handleOrientation.bind(this, 'abs'));
} else if ('ondeviceorientation' in window) {
  window.addEventListener('deviceorientation', handleOrientation.bind(this, 'rel'));
}

function getOrientation(event) {
  if (event.absolute) {
    return event.alpha;
  } else if (event.hasOwnProperty('webkitCompassHeading')) {
    // get absolute orientation for Safari/iOS
    return 360 - event.webkitCompassHeading; // conversion taken from a comment on Google Documentation, not tested
  }
}

function handleOrientation(type, event) {
  alert('type: ' + type + ', abs: ' + (event.absolute ? 'oui' : 'non' ) + ', alpha: ' + Math.round(event.alpha) + ', ' + Object.keys(event).join(', '));

  const orientation = getOrientation(event);
  if (typeof orientation !== 'undefined') {
    rotatePlayer(orientation);
  }
  
  alert('Could not retrieve absolute orientation');
}

const vision = document.querySelector('.c-player-marker__vision');
const log = document.querySelector('.log');

function rotatePlayer(orientation) {
  vision.style.transform = `rotate(${315 - orientation}deg)`;
  log.innerHTML = orientation + ' deg ';
};

rotatePlayer(0);
