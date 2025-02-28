'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { personal } from '@/data/personal';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseColor: string;
  currentColor: string;
  isSpecial: boolean;

  constructor(x: number, y: number, isSpecial = false) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.isSpecial = isSpecial;
    
    if (isSpecial) {
      this.radius = Math.random() * 1.5 + 1.5; // Slightly larger than regular (1.5-3px)
      const hue = Math.floor(Math.random() * 30) + 200; // Closer to regular blue
      this.baseColor = `rgba(66, 153, 225, ${0.4 + (this.radius - 1.5) * 0.1})`; // Similar to regular particles
    } else {
      this.radius = Math.random() * 2 + 1; // Regular particles (1-3px)
      this.baseColor = `rgba(66, 153, 225, ${0.3 + (this.radius - 1) * 0.1})`;
    }
    this.currentColor = this.baseColor;
  }

  update(width: number, height: number, mouseX: number, mouseY: number) {
    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Boundary check
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Mouse interaction
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.hypot(dx, dy);

    if (distance < 50) {
      const intensity = 1 - distance / 50;
      if (this.isSpecial) {
        // Special particles now turn slightly more purple instead of pink
        this.currentColor = `rgba(100, 100, 255, ${0.3 + intensity * 0.3})`;
      } else {
        this.currentColor = `rgba(255, 50, 50, ${0.3 + intensity * 0.3})`;
      }
      
      // Simplified repulsion
      const angle = Math.atan2(dy, dx);
      this.vx += Math.cos(angle) * 0.2;
      this.vy += Math.sin(angle) * 0.2;
    } else {
      this.currentColor = this.baseColor;
    }

    // Speed limit
    const speed = Math.hypot(this.vx, this.vy);
    if (speed > 2) {
      this.vx *= 0.95;
      this.vy *= 0.95;
    }
  }
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  const spawnSpecialParticles = (x: number, y: number) => {
    const numParticles = 2; // Reduced to just 2 particles per click
    const newParticles = Array.from({ length: numParticles }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 5 + 2; // Reduced spread (2-7px)
      return new Particle(
        x + Math.cos(angle) * radius,
        y + Math.sin(angle) * radius,
        true
      );
    });
    particlesRef.current = [...particlesRef.current, ...newParticles];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize particles on resize
      particlesRef.current = Array.from({ length: 80 }, () => (
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      ));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      // Remove particles that exceed the maximum count
      if (particles.length > 120) {
        particles.splice(0, particles.length - 120);
      }

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.update(canvas.width, canvas.height, mouseRef.current.x, mouseRef.current.y);

        // Draw particle
        ctx.fillStyle = particle.currentColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 100) {
            ctx.beginPath();
            if (particle.isSpecial && other.isSpecial) {
              // Special connection for special particles
              ctx.strokeStyle = `hsla(200, 70%, 60%, ${0.3 * (1 - distance / 100)})`;
              ctx.lineWidth = 1.5;
            } else {
              ctx.strokeStyle = `rgba(66, 153, 225, ${0.2 * (1 - distance / 100)})`;
              ctx.lineWidth = 1;
            }
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnSpecialParticles(x, y);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen" id="hero">
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0"
          style={{ background: 'transparent' }}
        />
        <div className="relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-6 mb-6">
            <Logo />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold"
            >
              Hi, I'm {personal.name.split(' ')[0]}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
          >
            {personal.title}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-500 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 