import React from 'react';
import ReactMarkdown from 'react-markdown';
import { usePersonalData } from '../hooks/usePersonalData';

const About: React.FC = () => {
  const { personal, error } = usePersonalData();

  if (!personal) {
    return (
      <div className="about page-container">
        {/*<h2>Loading...</h2>*/}
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
      <div className="content-container">
        <h1>About Me</h1>
        <div className="about__section about__header">
          <div className="about__header-image">
            <img src={personal.headshot} alt="Headshot" />
          </div>
          <div className="about__content">
            <section className="about__intro">
              <p>{personal.bio}</p>
            </section>

            <section className="about__contact">
              <h4>Connect with me</h4>
              <div className="about__contact-links">
                <p><a href={`mailto:${personal.contacts.email}`}>{personal.contacts.email}</a></p>
                <p>{personal.contacts.phone}</p>
                <p><a href={personal.contacts.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                <p><a href={personal.contacts.resume} target="_blank" rel="noopener noreferrer">Resume</a></p>                 
              </div>
            </section>          
          </div>
        </div>
        
        {personal["as a sections"].map((section, index) => (
          <section key={index} className="about__section">
            <h2><tspan className="smaller">as a </tspan>{section.title}</h2>
            {section.text && <ReactMarkdown>{section.text}</ReactMarkdown>}
            {section.images && section.images.length > 0 && (
              <div className="about__image-grid">
                {section.images.map((image, imageIndex) => (
                  <div key={imageIndex} className="about__image">
                    <img src={image.src} alt={image.alt} />
                    {image.caption && <p className="about__image-caption">{image.caption}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
        {personal["additional sections"].map((section,index) => (
          <section key={index} className="about__section">
            <h2>{section.title}</h2>
            {section.text && <ReactMarkdown>{section.text}</ReactMarkdown>}
            {section.images && section.images.length > 0 && (
              <div className="about__image-grid">
                {section.images.map((image, imageIndex) => (
                  <div key={imageIndex} className="about__image">
                    <img src={image.src} alt={image.alt} />
                    {image.caption && <p className="about__image-caption">{image.caption}</p>}
                  </div>
                ))} 
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default About; 