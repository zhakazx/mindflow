export interface Thought {
  id: string;
  text: string;
  tags: string[];
  createdAt: string;
  count: number;
}

export interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  thought: Thought;
}

export interface NewThought {
  text: string;
  tags: string;
}