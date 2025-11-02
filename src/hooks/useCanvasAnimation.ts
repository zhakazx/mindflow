import { useEffect, useRef, useState } from 'react';
import type { Thought, Bubble } from '../types';
import { 
  createBubble, 
  updateBubblePosition, 
  drawBubble, 
  getBubbleAtPosition 
} from '../utils/bubbleUtils';

export const useCanvasAnimation = (
  thoughts: Thought[],
  onBubbleClick: (thought: Thought) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const [hoveredBubble, setHoveredBubble] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize or update bubbles with physics
    if (bubblesRef.current.length !== thoughts.length) {
      bubblesRef.current = thoughts.map((thought, i) =>
        createBubble(thought, canvas.width, canvas.height, thoughts, i)
      );
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble, index) => {
        updateBubblePosition(bubble, canvas.width, canvas.height);
        drawBubble(ctx, bubble, hoveredBubble === index);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [thoughts, hoveredBubble]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = getBubbleAtPosition(bubblesRef.current, x, y);

    if (clicked !== -1) {
      onBubbleClick(bubblesRef.current[clicked].thought);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const hovered = getBubbleAtPosition(bubblesRef.current, x, y);

    setHoveredBubble(hovered !== -1 ? hovered : null);
    canvas.style.cursor = hovered !== -1 ? 'pointer' : 'default';
  };

  const addBubble = (thought: Thought): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const newBubble = createBubble(
      thought, 
      canvas.width, 
      canvas.height, 
      thoughts, 
      thoughts.length
    );
    
    bubblesRef.current.push(newBubble);
  };

  const removeBubble = (thoughtId: string): void => {
    bubblesRef.current = bubblesRef.current.filter(b => b.thought.id !== thoughtId);
  };

  const updateBubble = (thoughtId: string, updatedThought: Thought): void => {
    const bubbleIndex = bubblesRef.current.findIndex(b => b.thought.id === thoughtId);
    if (bubbleIndex !== -1) {
      bubblesRef.current[bubbleIndex].thought = updatedThought;
    }
  };

  return {
    canvasRef,
    hoveredBubble,
    handleCanvasClick,
    handleCanvasMouseMove,
    addBubble,
    removeBubble,
    updateBubble
  };
};