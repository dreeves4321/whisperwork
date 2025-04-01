import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="contact page-container">
      <h1>Contact</h1>
      <div className="contact__content">
        <section className="contact__info">
          <h2>Let's Connect</h2>
          <p>
            I'm always interested in discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </section>

        <section className="contact__methods">
          <div className="contact__method">
            <h3>Email</h3>
            <a href="mailto:daniel@example.com">daniel@example.com</a>
          </div>

          <div className="contact__method">
            <h3>Social</h3>
            <div className="contact__social-links">
              <a
                href="https://github.com/danielreeves"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/danielreeves"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/danielreeves"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          </div>

          <div className="contact__method">
            <h3>Location</h3>
            <p>Boston, MA</p>
          </div>
        </section>

        <section className="contact__availability">
          <h2>Current Availability</h2>
          <p>
            I'm currently available for freelance work and consulting projects.
            If you have a project that you'd like to discuss, please get in touch.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact; 