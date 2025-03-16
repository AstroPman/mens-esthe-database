import React from 'react';
import { Search } from 'lucide-react';

interface HomeProps {
  onExplore: () => void;
}

export function Home({ onExplore }: HomeProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          Men's Esthe Database
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Discover and explore professional estheticians. Find detailed information, 
          reviews, and services to match your preferences.
        </p>
        <button
          onClick={onExplore}
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        >
          <Search className="w-5 h-5 mr-2" />
          Explore Therapists
        </button>
      </div>
    </div>
  );
}