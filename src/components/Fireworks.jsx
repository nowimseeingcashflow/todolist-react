import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import _ from 'lodash';
import { TimelineMax } from 'gsap/all';

const Fireworks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
      antialias: true,
      view: canvasRef.current,
    });
    // Initialize PIXI renderer
    // const width = window.innerWidth;
    // const height = window.innerHeight;
    // const renderer = PIXI.autoDetectRenderer(width, height, {
    //   backgroundColor: 0xffffff,
    //   antialias: true,
    //   view: canvasRef.current,
    // });
    
    const stage = app.stage;
    stage.filterArea = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight);

    const shock = new PIXI.Filter();
    shock.params = { x: 10.5, y: 0.4, z: 0.1 };
    shock.center = { x: 0.5, y: 0.5 };
    shock.time = 0;
    stage.filters = [shock];

    const colors = [
      [(255, 99, 71), (238, 130, 238), (255, 165, 0)],
      [(255, 0, 0), (120, 120, 120)],
      // Add more color palettes as needed
    ];

    const stars = [];
    const total = 350;
    const createStars = (color) => {
        const particles = new PIXI.ParticleContainer(1000, {
          position: true,
          rotation: true,
          alpha: true,
          scale: true,
          uvs: true,
        });
    colors.forEach(createStars);

    let queue = null;
    let active = null;
    let index = 0;

    const queueAnimation = () => {
      active = stars[index++ % colors.length];
      createExplosion(active);

      if (queue) clearTimeout(queue);

      queue = setTimeout(() => {
        active.particles.visible = true;
      }, 250);
    };

    // Automatically queue animations every 3 seconds
    setInterval(queueAnimation, 3000);

    const createExplosion = (boom) => {
      const tl = new TimelineMax({ onComplete: () => (boom.particles.visible = false) });

      boom.sprites.reduce((tl, star, i) => {
        resetStar(star);

        const angle = _.random(360);
        const delay = _.random(0.1) + 0.25;
        const time = _.random(0.5, 2.75);

        const scaleX1 = _.random(0.25, 0.75);
        const scaleY1 = _.random(0.25, 0.75);
        const scaleX2 = _.random(0.25, 0.75);
        const scaleY2 = _.random(0.25, 0.75);

        const gravity = _.random(300, 800);
        const velocity = _.random(100, 700);
        const rotation = _.random(-720, 720) * (Math.PI / 180);

        const physics2D = { angle, velocity, gravity };

        tl.set(star, { alpha: 1 }, delay)
          .to(star.scale, time / 2, { x: scaleX1, y: scaleY1 }, delay)
          .to(star.scale, time / 2, { x: scaleX2, y: scaleY2 }, delay + time / 2)
          .to(star, time, { physics2D, rotation, alpha: 0 }, delay);

        return tl;
      }, tl);
    };

    const starTexture = (width, height, radius, color) => {
      // Generate star texture
    };

    

      const { texture, frames } = starTexture(32, 16, 5, color);
      const sprites = [];

      _.times(total, () => {
        const frame = _.sample(frames);
        const sprite = new PIXI.Sprite(frame);
        sprites.push(sprite);
        particles.addParticle(sprite);
      });

      particles.visible = false;
      stage.addChild(particles);
      stars.push({ particles, sprites });
    };

    const resetStar = (star) => {
      star.position.set(app.renderer.width / 2, app.renderer.height / 2);
      star.scale.set(1);
      star.anchor.set(0.5);
      star.pivot.set(0.5);
    };

    const resize = () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
      stage.filterArea = new PIXI.Rectangle(0, 0, app.renderer.width, app.renderer.height);
    };

    const render = () => {
      app.render();
    };
    
    window.addEventListener('resize', resize);
    // Use app.ticker instead of PIXI.Ticker.shared

    return () => {
      window.removeEventListener('resize', resize);
      render();
    };
  }, []);

  return (
    <div className="fireworks-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Fireworks;