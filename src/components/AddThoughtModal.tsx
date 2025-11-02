import React from 'react';
import { X } from 'lucide-react';
import type { NewThought } from '../types';

interface AddThoughtModalProps {
  showModal: boolean;
  newThought: NewThought;
  setNewThought: (thought: NewThought) => void;
  onAddThought: () => void;
  onClose: () => void;
}

export const AddThoughtModal: React.FC<AddThoughtModalProps> = ({
  showModal,
  newThought,
  setNewThought,
  onAddThought,
  onClose
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="border border-[#ffe0d6] bg-background text-card-foreground shadow rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light text-gray-800">New Thought</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <textarea
          value={newThought.text}
          onChange={(e) => setNewThought({ ...newThought, text: e.target.value })}
          placeholder="What's on your mind?"
          className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:outline-none resize-none mb-4"
        />
        <input
          value={newThought.tags}
          onChange={(e) => setNewThought({ ...newThought, tags: e.target.value })}
          placeholder="self-care, productivity, ideas (comma separated)"
          className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:outline-none mb-6"
        />
        <button
          onClick={onAddThought}
          className="w-full bg-primary text-primary-foreground py-3 rounded-2xl hover:shadow-lg hover:bg-primary/80 transition-all duration-300"
        >
          Add to Mindflow
        </button>
      </div>
    </div>
  );
};