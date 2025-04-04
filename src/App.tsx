import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import CaseStudy from './pages/CaseStudy';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app">
        <Navigation />
        <main className="main">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/case-study/:id" element={<CaseStudy />} />
          </Routes>
        </main>
        <footer className="footer content-container">          
          <p>
            Built on{' '}
            <a
              href="https://github.com/danielreeves/whisperwork"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhisperWork
            </a>
            , my open-source portfolio platform.{' '}
            <a
              href="https://github.com/danielreeves/Portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribute on GitHub
            </a>
            .
          </p>          
        </footer>
      </div>
    </Router>
  );
};

export default App;
