import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ScanPage } from './components/ScanPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'scan'>('landing');

  return (
    <div className="min-h-screen">
      {currentPage === 'landing' ? (
        <LandingPage onNavigateToScan={() => setCurrentPage('scan')} />
      ) : (
        <ScanPage onNavigateBack={() => setCurrentPage('landing')} />
      )}
    </div>
  );
}
