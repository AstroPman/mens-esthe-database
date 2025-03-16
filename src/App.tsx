import React from 'react';
import { Home } from './pages/Home';
import { TherapistList } from './pages/TherapistList';
import { Database } from 'lucide-react';

// Mock navigation - in a real app, use React Router
const PAGES = {
  HOME: 'HOME',
  THERAPIST_LIST: 'THERAPIST_LIST',
} as const;

function App() {
  const [currentPage, setCurrentPage] = React.useState(PAGES.HOME);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <nav className="bg-black/30 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setCurrentPage(PAGES.HOME)}
              className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors"
            >
              <Database className="h-6 w-6" />
              <span className="font-bold text-lg">Men's Esthe DB</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {currentPage === PAGES.HOME && <Home onExplore={() => setCurrentPage(PAGES.THERAPIST_LIST)} />}
        {currentPage === PAGES.THERAPIST_LIST && <TherapistList />}
      </main>
    </div>
  );
}

export default App