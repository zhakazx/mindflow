import type { Thought, Bubble } from '../types';

export const pastelColors = [
  '#b35340', '#b35340', '#b35340', '#b35340',
  '#b35340', '#b35340', '#b35340', '#b35340'
];

export const calculateKeywordFrequency = (tags: string[], allThoughts: Thought[]): number => {
  if (!tags || tags.length === 0) return 1;
  
  let count = 0;
  allThoughts.forEach(t => {
    tags.forEach(tag => {
      if (t.tags && t.tags.includes(tag)) {
        count++;
      }
    });
  });
  return count;
};

export const createBubble = (
  thought: Thought, 
  canvasWidth: number, 
  canvasHeight: number, 
  allThoughts: Thought[],
  index: number
): Bubble => {
  const keywordFrequency = calculateKeywordFrequency(thought.tags, allThoughts);
  const baseSize = 40;
  const size = baseSize + (keywordFrequency * 15);
  
  return {
    x: Math.random() * (canvasWidth - size * 2) + size,
    y: Math.random() * (canvasHeight - size * 2) + size,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: size,
    color: pastelColors[index % pastelColors.length],
    thought
  };
};

export const updateBubblePosition = (bubble: Bubble, canvasWidth: number, canvasHeight: number): void => {
  // Update position
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  // Bounce off walls
  if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvasWidth) {
    bubble.vx *= -1;
    bubble.x = Math.max(bubble.radius, Math.min(canvasWidth - bubble.radius, bubble.x));
  }
  if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvasHeight) {
    bubble.vy *= -1;
    bubble.y = Math.max(bubble.radius, Math.min(canvasHeight - bubble.radius, bubble.y));
  }
};

export const drawBubble = (
  ctx: CanvasRenderingContext2D, 
  bubble: Bubble, 
  isHovered: boolean
): void => {
  // Draw bubble with glow effect
  const gradient = ctx.createRadialGradient(
    bubble.x - bubble.radius * 0.3,
    bubble.y - bubble.radius * 0.3,
    bubble.radius * 0.1,
    bubble.x,
    bubble.y,
    bubble.radius
  );
  gradient.addColorStop(0, bubble.color + 'EE');
  gradient.addColorStop(1, bubble.color + '88');

  ctx.beginPath();
  ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffedea";
  ctx.fill();

  // Outer glow
  if (isHovered) {
    ctx.strokeStyle = bubble.color;
    ctx.lineWidth = 3;
    ctx.stroke();
  } else {
    ctx.strokeStyle = '#ffffff88';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Draw text preview
  ctx.fillStyle = '#b35340';
  ctx.font = 'bold 14px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const preview = bubble.thought.text.substring(0, 15) + '...';
  ctx.fillText(preview, bubble.x, bubble.y);
};

export const getBubbleAtPosition = (
  bubbles: Bubble[], 
  x: number, 
  y: number
): number => {
  return bubbles.findIndex(bubble => {
    const distance = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);
    return distance < bubble.radius;
  });
};