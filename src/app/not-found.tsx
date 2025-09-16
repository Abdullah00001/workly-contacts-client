'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(Draggable);

export default function NotFound() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const firstFourRef = useRef<HTMLSpanElement>(null);
  const zeroRef = useRef<HTMLSpanElement>(null);
  const secondFourRef = useRef<HTMLSpanElement>(null);

  const numbersMoved = useRef(false);
  const floatingTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set(
        [
          numberRef.current,
          titleRef.current,
          descriptionRef.current,
          buttonsRef.current,
        ],
        {
          opacity: 0,
          y: 50,
        }
      );

      // Create timeline for entrance animations
      const tl = gsap.timeline();

      // Animate 404 number with glitch effect
      tl.to(numberRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }).to(
        numberRef.current,
        {
          textShadow: '2px 2px 0px #ff0080, -2px -2px 0px #00ff80',
          duration: 0.1,
          repeat: 3,
          yoyo: true,
        },
        '-=0.5'
      );

      // Animate title
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // Animate description
      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      // Animate buttons
      tl.to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      tl.call(() => {
        // Make each number draggable
        if (firstFourRef.current) {
          Draggable.create(firstFourRef.current, {
            type: 'x,y',
            inertia: true,
            allowContextMenu: true,
            allowEventDefault: false,
            onDragStart: () => {
              if (!numbersMoved.current) {
                numbersMoved.current = true;
                if (floatingTween.current) {
                  floatingTween.current.kill();
                }
              }
            },
          });
        }

        if (zeroRef.current) {
          Draggable.create(zeroRef.current, {
            type: 'x,y',
            inertia: true,
            allowContextMenu: true,
            allowEventDefault: false,
            onDragStart: () => {
              if (!numbersMoved.current) {
                numbersMoved.current = true;
                if (floatingTween.current) {
                  floatingTween.current.kill();
                }
              }
            },
          });
        }

        if (secondFourRef.current) {
          Draggable.create(secondFourRef.current, {
            type: 'x,y',
            inertia: true,
            allowContextMenu: true,
            allowEventDefault: false,
            onDragStart: () => {
              if (!numbersMoved.current) {
                numbersMoved.current = true;
                if (floatingTween.current) {
                  floatingTween.current.kill();
                }
              }
            },
          });
        }
      });

      const startFloatingAnimation = () => {
        floatingTween.current = gsap.to(numberRef.current, {
          y: -10,
          duration: 2,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.5,
        });
      };

      startFloatingAnimation();

      // Create floating particles
      const createParticles = () => {
        if (!particlesRef.current) return;

        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute w-1 h-1 bg-primary/20 rounded-full';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particlesRef.current.appendChild(particle);

          gsap.to(particle, {
            y: -100,
            opacity: 0,
            duration: Math.random() * 3 + 2,
            ease: 'power1.out',
            repeat: -1,
            delay: Math.random() * 2,
          });
        }
      };

      createParticles();

      // Glitch effect on hover
      const glitchElement = glitchRef.current;
      if (glitchElement) {
        glitchElement.addEventListener('mouseenter', () => {
          gsap.to(numberRef.current, {
            x: Math.random() * 10 - 5,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            ease: 'power2.inOut',
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []); // Removed numbersMoved from dependency array to prevent re-renders

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4 overflow-hidden relative"
    >
      {/* Background particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="text-center space-y-8 max-w-2xl mx-auto relative z-10">
        {/* 404 Number with glitch effect and individual draggable numbers */}
        <div ref={glitchRef} className="relative cursor-pointer">
          <div
            ref={numberRef}
            className="text-8xl md:text-9xl font-black text-primary relative select-none"
            style={{ fontFamily: 'monospace' }}
          >
            <span
              ref={firstFourRef}
              className="inline-block cursor-grab active:cursor-grabbing draggable-number"
            >
              4
            </span>
            <span
              ref={zeroRef}
              className="inline-block cursor-grab active:cursor-grabbing draggable-number"
            >
              0
            </span>
            <span
              ref={secondFourRef}
              className="inline-block cursor-grab active:cursor-grabbing draggable-number"
            >
              4
            </span>

            {/* Glitch layers */}
            <div
              className="absolute inset-0 text-8xl md:text-9xl font-black opacity-70 text-red-500 animate-pulse pointer-events-none"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                transform: 'translate(-2px, -2px)',
              }}
            >
              404
            </div>
            <div
              className="absolute inset-0 text-8xl md:text-9xl font-black opacity-70 text-blue-500 animate-pulse pointer-events-none"
              style={{
                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                transform: 'translate(2px, 2px)',
              }}
            >
              404
            </div>
          </div>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Oops! Page Not Found
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed"
        >
          The page you're looking for seems to have vanished into the digital
          void. Don't worry, even the best explorers sometimes take a wrong
          turn.
        </p>

        {/* Action buttons */}
        <div
          ref={buttonsRef}
          className="flex  gap-4 justify-center items-center pt-4"
        >
          <Button asChild size="lg" className="group relative overflow-hidden">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
              Go Home
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group bg-transparent cursor-pointer enhanced-back-button"
            
          >
            <div onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 mr-2 transition-all duration-300 group-hover:-translate-x-2 group-hover:scale-110" />
              <span className="transition-all duration-300 group-hover:tracking-wide">
                Go Back
              </span>
            </div>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-20 -left-20 w-32 h-32 bg-secondary/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        {/* Lightning bolt decoration */}
        <div className="absolute top-1/4 right-1/4 opacity-10">
          <Zap
            className="w-8 h-8 text-primary animate-bounce"
            style={{ animationDelay: '2s' }}
          />
        </div>
      </div>
    </div>
  );
}
