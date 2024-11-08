import React, { useRef, useEffect } from "react";
import * as PIXI from "pixi.js";
import _ from "underscore";
import gsap from "gsap";

export const FireworksOfStars = () => {
  //console.log(physics2D);
  //gsap.registerPlugin(physics2D);
  const blowup = useRef(null);
  const canvas = useRef(null);
  useEffect(() => {
    var rad = Math.PI / 180;

    var width = window.innerWidth;
    var height = window.innerHeight;

    // var blowup = $("#explode");
    // var canvas = $("#stage");
    
    var renderer = PIXI.autoDetectRenderer(width, height, {
      backgroundColor: 0xffffff,
      antialias: true,
      view: canvas.current
    });

    var colors = [
      [0xb8d000, 0x2175d9, 0xed1b24, 0x35b4d6, 0xff9900, 0xe30074],
      [0x99eeff, 0x3399cc, 0x5bb4cc, 0x2175d9, 0x00aedb, 0xa200ff],
      [0xbf0000, 0xed1b24, 0xff3232, 0xe30074, 0xbf0060, 0xf47835],
      [0x22c41a, 0x17e88d, 0xb6ff26, 0x8eff21, 0x4dd712, 0x0f884a],
      [0xb51bff, 0x8b0c99, 0xff1cea, 0xff1488, 0xc210e8, 0xff1996]
    ];

    var x = width / 2;
    var y = height / 2;

    //var shock = new PIXI.filters.ShockwaveFilter();
    var stage = new PIXI.Container();

    //console.log(stage);

    // shock.params = { x: 10.5, y: 0.4, z: 0.1 };
    // shock.center = { x: 0.5, y: 0.5 };
    // shock.time = 0;

    stage.width = width;
    stage.height = height;
    //stage.filters = [shock];

    stage.filterArea = new PIXI.Rectangle(0, 0, width, height);

    var queue = null;
    var active = null;
    var stars = [];
    var total = 350;
    var index = 0;

    colors.forEach(createStars);

    window.addEventListener("resize", resize);
    blowup.current.addEventListener("click", _.throttle(queueAnimation, 750));
    //gsap.ticker.addEventListener("tick", render);
    gsap.ticker.add(render);

    queueAnimation();

    //
    // QUEUE ANIMATION
    // ===========================================================================
    function queueAnimation() {
      active = stars[index++ % colors.length];
      console.log(active);
      createExplosion(active);

      if (queue) clearTimeout(queue);

      queue = setTimeout(() => {
        active.particles.visible = true;
      }, 250);
    }

    //
    // CREATE EXPLOSION
    // ===========================================================================
    function createExplosion(boom) {
      var tl = gsap.timeline({
        onComplete: () => (boom.particles.visible = false)
      });
      // console.log(boom);
      // console.log(tl);

      boom.sprites.reduce((tl, star, i) => {
        resetStar(star);

        var angle = _.random(360);
        var delay = _.random(0.1) + 0.25;
        var time = _.random(0.5, 2.75);

        var scaleX1 = _.random(0.25, 0.75);
        var scaleY1 = _.random(0.25, 0.75);
        var scaleX2 = _.random(0.25, 0.75);
        var scaleY2 = _.random(0.25, 0.75);

        var gravity = _.random(300, 800);
        var velocity = _.random(100, 700);
        var rotation = _.random(-720, 720) * rad;

        var physics2D = { angle, velocity, gravity };

        tl.set(star, { alpha: 1 }, delay)
          .to(star.scale, time / 2, { x: scaleX1, y: scaleY1 }, delay)
          .to(
            star.scale,
            time / 2,
            { x: scaleX2, y: scaleY2 },
            delay + time / 2
          )
          .to(star, time, { physics2D, rotation, alpha: 0 }, delay);

        return tl;
      }, tl);
    }

    //
    // STAR TEXTURE
    // ===========================================================================
    function starTexture(r1, r2, points, colors) {
      var count = colors.length;
      var size = r1 * 2 + 2;
      var width = size * count;

      var frames = [];
      var coords = [];

      var graphics = new PIXI.Graphics();

      _.forEach(colors, (color, index) => {
        var cy = size / 2;
        var cx = size * index + cy;

        for (let i = 0; i < points * 2; i++) {
          var radius = i % 2 ? r2 : r1;
          var x = cx + radius * Math.sin((i * Math.PI) / points);
          var y = cy - radius * Math.cos((i * Math.PI) / points);
          coords[i] = new PIXI.Point(x, y);
        }

        graphics.beginFill(color);
        graphics.drawPolygon(coords);
        graphics.endFill();
      });

      graphics.lineStyle(1, 0xff00bb, 0);
      graphics.drawRect(0, 0, width, size);
      //console.log(graphics);

      //new PIXI.BaseTexture(graphics)
      let texture = PIXI.RenderTexture.create({ width: 1, height: 1 });
      //console.log(texture);
      // var texture = graphics.generateTexture(1, 1);

      for (let i = 0; i < texture.width - size; i += size) {
        var rect = new PIXI.Rectangle(i, 0, size, size);
        var frame = new PIXI.Texture(texture.baseTexture, rect);
        frames.push(frame);
      }

      return { texture, frames };
    }

    //
    // CREATE STARS
    // ===========================================================================
    function createStars(color) {
      var particles = new PIXI.ParticleContainer(1000, {
        position: true,
        rotation: true,
        alpha: true,
        scale: true,
        uvs: true
      });

      var texture = starTexture(32, 16, 5, color);
      var frames = texture.frames;
      var sprites = [];

      _.times(total, (i) => {
        var frame = _.sample(frames);
        var sprite = new PIXI.Sprite(frame);

        sprites.push(sprite);
        particles.addParticle(sprite);
      });

      particles.visible = false;
      stage.addChild(particles);
      stars.push({ particles, sprites });
    }

    //
    // RESET STAR
    // ===========================================================================
    function resetStar(star) {
      star.position.set(x, y);
      star.scale.set(1);
      star.anchor.set(0.5);
      star.pivot.set(0.5);
    }

    //
    // RESIZE
    // ===========================================================================
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      x = width / 2;
      y = height / 2;

      stage.filterArea = new PIXI.Rectangle(0, 0, width, height);
      renderer.resize(width, height);
    }

    //
    // RENDER
    // ===========================================================================
    function render() {
      renderer.render(stage);
    }

    //
    // CHANCE
    // ===========================================================================
    //   function chance(prop = 50) {
    //     return prop > 0 && Math.random() * 100 <= prop;
    //   }
  }, []);

  //var $ = (query, context = document) => context.querySelector(query);

  return (
    <>
      <canvas id="canvas" ref={canvas}></canvas>
      <div className="controls">
        <button id="explode" ref={blowup}>
          BOOM!
        </button>
      </div>
    </>
  );
};
