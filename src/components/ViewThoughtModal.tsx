import React from 'react';
import { X, Trash2 } from 'lucide-react';
import type { Thought } from '../types';

interface ViewThoughtModalProps {
  selectedThought: Thought | null;
  onClose: () => void;
  onDeleteThought: (id: string) => void;
}

export const ViewThoughtModal: React.FC<ViewThoughtModalProps> = ({
  selectedThought,
  onClose,
  onDeleteThought
}) => {
  if (!selectedThought) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-light text-gray-800">Thought</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 mb-4 leading-relaxed">{selectedThought.text}</p>
          {selectedThought.tags && selectedThought.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedThought.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-[#ffe0d6] text-[#ff7e5f] rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-400">
            {new Date(selectedThought.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onDeleteThought(selectedThought.id)}
            className="flex-1 bg-red-100 text-red-600 py-3 rounded-2xl hover:bg-red-200 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};