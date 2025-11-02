import React from 'react';
import type { Thought } from '../types';
import { useCanvasAnimation } from '../hooks/useCanvasAnimation';

interface BubbleCanvasProps {
  thoughts: Thought[];
  onBubbleClick: (thought: Thought) => void;
}

export const BubbleCanvas: React.FC<BubbleCanvasProps> = ({
  thoughts,
  onBubbleClick
}) => {
  const {
    canvasRef,
    handleCanvasClick,
    handleCanvasMouseMove
  } = useCanvasAnimation(thoughts, onBubbleClick);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
      className="w-full h-full"
    />
  );
};