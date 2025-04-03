import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, useNavigate } from 'react-router-dom';
import { CaseStudy as CaseStudyType } from '../types';

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseStudy, setCaseStudy] = useState<CaseStudyType | null>(null);

  useEffect(() => {
    const loadCaseStudy = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/caseStudy_${id}.json`);
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
      <img src={`${process.env.PUBLIC_URL}/images/${caseStudy.heroImage}`} alt={caseStudy.title} className="case-study__hero-image" />
      <div className="content-container">
        <div className="case-study__title-container">
          <h1>{caseStudy.title}</h1>
          <p className="case-study__client">for {caseStudy.client}</p>
        </div>

        <section className="case-study__topmatter">
          <h3>Problem</h3>
          <p>{caseStudy.problem}</p>
        </section>

        <section className="case-study__topmatter">
          <h3>Solution</h3>
          <p>{caseStudy.solution}</p>
        </section>

        <section className="case-study__topmatter">
          <h3>Results</h3>
          <p>{caseStudy.results}</p>
        </section>

        <section className="case-study__topmatter">
          <h3>Commitment</h3>
          <p>{caseStudy.commitment}</p>
        </section>

        {caseStudy.contentBlocks && caseStudy.contentBlocks.map((block, index) => {
          switch (block.type) {
            case 'section':
              return (
                <>
                  <hr className="case-study__divider" />
                  <h2 key={index} className="case-study__section-title">
                    {block.text}
                  </h2>
                </>
              );
            case 'body':
              return (
                <section key={index} className="case-study__text-block">
                  <ReactMarkdown>{block.text}</ReactMarkdown>
                </section>
              );
            case 'image':
              return (
                <section key={index} className="case-study__image-block">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/${block.src}`}
                    alt={block.alt || ''}
                    className="case-study__image"
                  />
                  {block.text && (
                    <p className="case-study__caption">{block.text}</p>
                  )}
                </section>
              );
            case 'quote':
              return (
                <blockquote key={index} className="case-study__quote-block">
                  {block.text}
                </blockquote>
              );
            case 'button':
              return (
                <a key={index} className="button__secondary" href={block.url} target="_blank" rel="noopener noreferrer">
                  {block.text}
                </a>
              );            
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default CaseStudy; 