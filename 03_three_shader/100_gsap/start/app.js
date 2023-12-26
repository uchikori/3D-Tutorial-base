/**
 * GSAP
 * https://greensock.com/
 *
 * GSAP Eases
 * https://greensock.com/docs/v3/Eases
 */
import { gsap } from "gsap";

init();
async function init() {
  gsap.to(".box", {
    y: 200,
    borderRadius: "50%",
    background: "#ff0000",
    scale: 2,
    rotate: 360,
    duration: 2,
    ease: "power3.inOut",
    delay: 1,
    repeat: -1,
    yoyo: true,
  });

  const obj = { value: 0 };
  gsap.to(obj, {
    value: 1,
    duration: 2,
    delay: 1,
    onUpdate: () => {
      console.log(obj);
    },
  });
}
