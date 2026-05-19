'use client';

import { useEffect, useRef } from 'react';

export default function RainEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let drops = [];
    let ripplePool = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Drop {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = 2 + Math.random() * 4;
        this.length = 8 + Math.random() * 12;
        this.opacity = 0.15 + Math.random() * 0.25;
        this.width = 0.5 + Math.random() * 0.8;
        this.wind = -0.3 + Math.random() * 0.2;
      }
      update() {
        this.y += this.speed;
        this.x += this.wind;
        if (this.y > canvas.height + 20) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.wind * this.length * 0.3, this.y - this.length);
        ctx.strokeStyle = `rgba(180, 200, 255, ${this.opacity})`;
        ctx.lineWidth = this.width;
        ctx.stroke();
      }
    }

    class Ripple {
      constructor(x, y) { this.x = x; this.y = y; this.r = 0; this.maxR = 10 + Math.random() * 15; this.opacity = 0.3; }
      update() {
        this.r += 0.3 + this.r * 0.02;
        this.opacity *= 0.98;
        return this.opacity > 0.01 && this.r < this.maxR;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(180, 200, 255, ${this.opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    for (let i = 0; i < 120; i++) {
      const d = new Drop();
      d.y = Math.random() * canvas.height;
      drops.push(d);
    }

    let frame = 0;

    const drawFog = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.2, 0,
        canvas.width * 0.3, canvas.height * 0.2, canvas.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(42, 46, 61, 0.15)');
      gradient.addColorStop(0.5, 'rgba(28, 30, 36, 0.1)');
      gradient.addColorStop(1, 'rgba(18, 19, 22, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawRefraction = (x, y, r) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
      grad.addColorStop(0.5, 'rgba(0, 210, 255, 0.02)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawFog();

      frame++;
      if (frame % 3 === 0) {
        const spawnCount = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < spawnCount; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          refractionPoints.push({ x, y, r: 20 + Math.random() * 40, life: 1 });
        }
      }

      drops.forEach(d => {
        d.update();
        d.draw();
        if (d.y > canvas.height - 10 && Math.random() < 0.01) {
          ripplePool.push(new Ripple(d.x, canvas.height - 5));
        }
      });

      ripplePool = ripplePool.filter(r => r.update());
      ripplePool.forEach(r => r.draw());

      refractionPoints = refractionPoints.filter(p => {
        p.life -= 0.003;
        if (p.life <= 0) return false;
        drawRefraction(p.x, p.y, p.r * p.life);
        return true;
      });

      animId = requestAnimationFrame(animate);
    };

    let refractionPoints = [];

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
