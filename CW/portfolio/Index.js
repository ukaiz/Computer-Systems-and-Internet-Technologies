// Import specific functions from the anime.js library
import { animate, stagger, splitText, createAnimatable, utils} from 'https://esm.sh/animejs';

// Split the text inside <h2> element into individual characters
const { chars } = splitText('h2', { words: false, chars: true });

animate(chars, {
  // Vertical movement: two-step animation per letter
  y: [
    { to: '-2.75rem', ease: 'outExpo', duration: 600 },
    { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
  ],
  // Rotate each letter a full turn fordward into its normal position
  rotate: {
    from: '-1turn',
    delay: 0
  },
  delay: stagger(50), //creating a wave effect, one start after another 50ms
  // Pause 1 second between loops, and repeat the animation forever
  loopDelay: 1000,
  loop: true
});

// for following object
const $demo = document.querySelector('.content'); //boudaring for moving object
let bounds = $demo.getBoundingClientRect(); // the bound 
const refreshBounds = () => bounds = $demo.getBoundingClientRect(); // refresh bounds function

const animatableSquare = createAnimatable('.square', {
  x: 1000, // takes 1000ms (1 second) to reach the target x position
  y: 1000, // takes 1000ms (1 second) to reach the target y position
  ease: 'out(2)', // lower number = softer/slower deceleration curve
});

//this run everytime the mouse moves
const onMouseMove = e => {  
  const { width, height, left, top } = bounds; // get width, height, left, top of boundaring
  const hw = width / 2;
  const hh = (height / 2) - 20;
  const x = utils.clamp(e.clientX - left - hw, -hw, hw);
  const y = utils.clamp(e.clientY - top - hh, -hh, hh);
  animatableSquare.x(x); // tell the square move according to x, y 
  animatableSquare.y(y);
}

window.addEventListener('resize', refreshBounds); // recalled refreshBounds if the page changes size
window.addEventListener('scroll', refreshBounds); //  recalled refreshBounds if the the page scrolled
window.addEventListener('mousemove', onMouseMove); // recalled onMouseMove if the user mouse moves