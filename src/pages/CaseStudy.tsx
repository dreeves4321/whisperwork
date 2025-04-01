import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CaseStudy as CaseStudyType } from '../types';

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudyType | null>(null);

  useEffect(() => {
    const loadCaseStudy = async () => {
      try {
        const response = await fetch(`/data/caseStudy_${id}.json`);
        if (!response.ok) {
          throw new Error('Case study not found');
        }
        const data = await response.json();
        setCaseStudy(data);
      } catch (error) {
        console.error('Error loading case study:', error);
        navigate('/');
      }
    };

    loadCaseStudy();
  }, [id, navigate]);

  if (!caseStudy) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="case-study page-container">
      <h1>{caseStudy.title}</h1>
      <p className="case-study__client">for {caseStudy.client}</p>

      <section className="case-study__section">
        <h2>Problem</h2>
        <p>{caseStudy.problem}</p>
      </section>

      <section className="case-study__section">
        <h2>Solution</h2>
        <p>{caseStudy.solution}</p>
      </section>

      <section className="case-study__section">
        <h2>Results</h2>
        <p>{caseStudy.results}</p>
      </section>

      <section className="case-study__section">
        <h2>Commitment</h2>
        <p>{caseStudy.commitment}</p>
      </section>

      {caseStudy.contentBlocks.map((block, index) => {
        switch (block.type) {
          case 'text':
            return (
              <section key={index} className="case-study__content-block">
                <p>{block.content}</p>
              </section>
            );
          case 'image':
            return (
              <section key={index} className="case-study__content-block">
                <img
                  src={`/images/${block.content}`}
                  alt={block.caption || ''}
                  className="case-study__image"
                />
                {block.caption && (
                  <p className="case-study__caption">{block.caption}</p>
                )}
              </section>
            );
          case 'quote':
            return (
              <blockquote key={index} className="case-study__quote">
                {block.content}
              </blockquote>
            );
          case 'list':
            return (
              <ul key={index} className="case-study__list">
                {Array.isArray(block.content) &&
                  block.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default CaseStudy; 