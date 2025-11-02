import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Thought, NewThought } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AddThoughtModal } from './components/AddThoughtModal';
import { ViewThoughtModal } from './components/ViewThoughtModal';
import { BubbleCanvas } from './components/BubbleCanvas';

const MindflowJournal: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedThought, setSelectedThought] = useState<Thought | null>(null);
  const [newThought, setNewThought] = useState<NewThought>({ text: '', tags: '' });

  const { thoughts, addThought, deleteThought } = useLocalStorage();

  const handleAddThought = (): void => {
    if (!newThought.text.trim()) return;

    const thought: Thought = {
      id: Date.now().toString(),
      text: newThought.text,
      tags: newThought.tags.split(',').map(t => t.trim()).filter(t => t),
      createdAt: new Date().toISOString(),
      count: 1
    };

    addThought(thought);
    setNewThought({ text: '', tags: '' });
    setShowModal(false);
  };

  const handleDeleteThought = (id: string): void => {
    deleteThought(id);
    setSelectedThought(null);
  };

  const handleBubbleClick = (thought: Thought): void => {
    setSelectedThought(thought);
  };

  return (
    <div className="h-screen w-full bg-background overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <h1 className="text-4xl font-bold text-foreground text-center">
          Mindflow
          <span className="block text-sm text-foreground/80 mt-1">Visual Journal of Thoughts</span>
        </h1>
      </div>

      {/* Canvas */}
      <BubbleCanvas 
        thoughts={thoughts} 
        onBubbleClick={handleBubbleClick} 
      />

      {/* Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
      >
        <Plus className="w-8 h-8 text-primary-foreground" />
      </button>

      {/* Add Thought Modal */}
      <AddThoughtModal
        showModal={showModal}
        newThought={newThought}
        setNewThought={setNewThought}
        onAddThought={handleAddThought}
        onClose={() => setShowModal(false)}
      />

      {/* View/Edit Thought Modal */}
      <ViewThoughtModal
        selectedThought={selectedThought}
        onClose={() => setSelectedThought(null)}
        onDeleteThought={handleDeleteThought}
      />

      {/* Instructions */}
      {thoughts.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-foreground/80">
            <p className="text-lg">Click the + button to add your first thought</p>
            <p className="text-sm mt-2">Watch your ideas grow and flow together</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindflowJournal;