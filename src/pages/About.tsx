import React from 'react';
import { usePersonalData } from '../hooks/usePersonalData';

const About: React.FC = () => {
  const { personal, error } = usePersonalData();

  if (!personal) {
    return (
      <div className="about page-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="about page-container">
        <h2>Error loading data</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="about page-container">
      <h1>About Me</h1>
      <div className="about__content">
        <section className="about__intro">
          <h2>{personal.descriptors.join(' · ')}</h2>
          <p>{personal.bio}</p>
        </section>

        <section className="about__contact">
          <h2>Contact Information</h2>
          <p>Email: <a href={`mailto:${personal.email}`}>{personal.email}</a></p>
          <p>Phone: {personal.phone}</p>
          <p>Location: {personal.location}</p>
        </section>

        <section className="about__social">
          <h2>Connect With Me</h2>
          <div className="about__social-links">
            <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={personal.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 