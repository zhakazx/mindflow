import { useState, useEffect } from 'react';
import type { Thought } from '../types';

const STORAGE_KEY = 'mindflow-thoughts';

export const useLocalStorage = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedThoughts = JSON.parse(saved) as Thought[];
        setThoughts(parsedThoughts);
      }
    } catch (error) {
      console.error('Error loading thoughts from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      if (thoughts.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(thoughts));
      }
    } catch (error) {
      console.error('Error saving thoughts to localStorage:', error);
    }
  }, [thoughts]);

  const addThought = (thought: Thought) => {
    setThoughts(prev => [...prev, thought]);
  };

  const deleteThought = (id: string) => {
    setThoughts(prev => prev.filter(t => t.id !== id));
  };

  const editThought = (id: string, updatedText: string, updatedTags: string[]) => {
    setThoughts(prev => prev.map(t => 
      t.id === id 
        ? { ...t, text: updatedText, tags: updatedTags }
        : t
    ));
  };

  return {
    thoughts,
    addThought,
    deleteThought,
    editThought
  };
};