import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import CaseStudy from './pages/CaseStudy';
import { usePersonalData } from './hooks/usePersonalData';
import './styles/main.scss';

const App: React.FC = () => {
  const { personal } = usePersonalData();

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app">
        <Navigation />
        <main className="main">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-study/:id" element={<CaseStudy />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer-content">
            <p>
              Contact: <b><a href={`mailto:${personal?.contacts?.email}`} target="_blank" rel="noopener noreferrer">{personal?.contacts?.email}</a></b>
              {' // '}
            <b><a href={personal?.["secondary contact"]?.url} target="_blank" rel="noopener noreferrer">{personal?.["secondary contact"]?.text}</a></b>
          </p>
          <p>
            Built on{' '}
            <b><a
              href="https://github.com/danielreeves/whisperwork"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhisperWork
            </a></b>
              , an open-source portfolio.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
