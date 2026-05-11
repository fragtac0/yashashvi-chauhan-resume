'use client';

import { useEffect, useRef, useState } from 'react';

type Experience = {
  number: string;
  title: string;
  role: string;
  dates: string;
  imageClass: string;
  imageSrc?: string;
  alt?: string;
  label: string;
  description: string[];
  portfolioHref?: string;
};

type Card = {
  title: string;
  tag: string;
  period: string;
  imageClass: string;
  imageSrc?: string;
  alt?: string;
  text: string[];
  action?: 'social';
};

const experiences: Experience[] = [
  {
    number: '1',
    title: 'Us Moment',
    role: 'Creative Manager',
    dates: "Sep '25 – Present",
    imageClass: 'thumb-1',
    imageSrc: '/the-four-seasons.jpg',
    alt: 'The Four Seasons',
    label: 'The Four Seasons',
    portfolioHref: '#',
    description: [
      'Executed an extended social media campaign for Uber Bike for customer outreach.',
      "Managing content strategy for Bar Bank and The Bar Stock Exchange's Instagram.",
      'Spearheaded organic Instagram content for The Croffle Guys.'
    ]
  },
  {
    number: '2',
    title: 'Filter Copy',
    role: 'Rapid Content Creator',
    dates: "Mar '24 – Sep '25",
    imageClass: 'thumb-2',
    imageSrc: '/hacks.jpg',
    alt: 'Hacks',
    label: 'Hacks',
    portfolioHref: '#',
    description: [
      'Worked on brand briefs to short-form content for campaigns with Peter England, IKEA, and more.',
      'Managed YouTube uploads, SEO, and show marketing for Saregama talent.',
      "Created and oversaw FilterCopy's Instagram content, including directing and assisting on reels."
    ]
  },
  {
    number: '3',
    title: 'The Voice Authority',
    role: 'Production & Marketing Intern',
    dates: "Sep '23 – Dec '23",
    imageClass: 'thumb-3',
    imageSrc: '/a-star-is-born.jpg',
    alt: 'A Star Is Born',
    label: 'A Star Is Born',
    description: [
      "Contributed to Flipkart's #Paisokibaarish campaign for Big Billion Days 2023.",
      'Production & AD - Unbox Electronics by Bajaj: camera assistant, writing scripts, making thumbnails.',
      'Discovered and engaged influencers for Virgio and Pepe Jeans for influencer marketing.'
    ]
  },
  {
    number: '4',
    title: 'Cutting Fillum Entertainment',
    role: 'Biz. Dev. & Social Media Intern',
    dates: "Jun '23 – Aug '23",
    imageClass: 'thumb-4',
    imageSrc: '/brooklyn-99.jpg',
    alt: 'Brooklyn Nine-Nine',
    label: 'Brooklyn Nine-Nine',
    description: [
      "Driving CFE's growth through lead generation, networking, and successful client pitches.",
      "Strengthening CFE's online presence through impactful content on Instagram, driving engagement.",
      "Crafting captivating SEO-rich captions for climate influencer Aalekh Kapoor's social media."
    ]
  },
  {
    number: '5',
    title: 'Radio Mirchi',
    role: 'Campus RJ',
    dates: "Jul '21 – Sep '21",
    imageClass: 'thumb-5',
    imageSrc: '/gossip-girl.jpg',
    alt: 'Gossip Girl',
    label: 'Gossip Girl',
    description: [
      'Hosting the show "Mirchi Campus" on Gaana.',
      'Recording 20-25 radio pegs for in between the show.',
      'Making content for their social media and YouTube.'
    ]
  }
];

const cards: Card[] = [
  {
    title: "The Queen's Gambit",
    tag: 'Co-Curricular Courses',
    period: '2021 - Present',
    imageClass: 'ci-1',
    imageSrc: '/queens-gambit.jpg',
    alt: '',
    text: [
      'Film Appreciation Course - Whistling Woods International',
      'Integrated Marketing Communications - Coursera · IE Business School'
    ]
  },
  {
    title: 'Stranger Things',
    tag: 'Skills and Abilities',
    period: '2016 - Present',
    imageClass: 'ci-2',
    imageSrc: '/stranger-things.png',
    alt: '',
    text: ['Canva - Designing', 'Google Sheets / Excel', 'Organisation Skills', 'Creative Writing', 'Group Leadership and Communication']
  },
  {
    title: 'Keeping Up with the Kardashians',
    tag: 'What are you waiting for?',
    period: "Let's connect!",
    imageClass: 'ci-3',
    imageSrc: '/kardashians.jpg',
    alt: '',
    text: [],
    action: 'social'
  }
];

export default function Page() {
  const workRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const hasStartedAudioRef = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const experienceStartDate = new Date(2021, 6, 21); // July 21, 2021
  const getYearsSince = (startDate: Date) => {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    const monthDiff = now.getMonth() - startDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < startDate.getDate())) {
      years -= 1;
    }
    return Math.max(0, years);
  };
  const yearsExperience = 3; // getYearsSince(experienceStartDate);

  const fadeAudio = (targetVolume: number, durationMs: number, onComplete?: () => void) => {
    const audio = audioRef.current;

    if (!(audio instanceof HTMLAudioElement)) {
      onComplete?.();
      return;
    }

    if (fadeFrameRef.current !== null) {
      cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }

    const startVolume = audio.volume;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const nextVolume = startVolume + (targetVolume - startVolume) * progress;
      audio.volume = Math.max(0, Math.min(1, nextVolume));

      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(step);
        return;
      }

      fadeFrameRef.current = null;
      onComplete?.();
    };

    fadeFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!(audio instanceof HTMLAudioElement)) {
      return;
    }

    const targetVolume = 0.25;
    audio.loop = true;
    audio.preload = 'auto';

    if (isMuted) {
      audio.muted = true;
      fadeAudio(0, 450, () => {
        audio.pause();
      });
      return;
    }

    audio.volume = 0;
    audio.muted = true;

    void audio.play()
      .then(() => {
        hasStartedAudioRef.current = true;
        audio.muted = false;
        fadeAudio(targetVolume, 450);
      })
      .catch(() => {
        audio.pause();
      });

    return () => {
      if (fadeFrameRef.current !== null) {
        cancelAnimationFrame(fadeFrameRef.current);
        fadeFrameRef.current = null;
      }
    };
  }, [isMuted]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -28px 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [isExpanded]);

  const scrollToWork = () => {
    workRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      <audio ref={audioRef} src="/bg-music.mp3" aria-hidden="true" autoPlay playsInline />
      <section className="hero">
        <div className="hero-bg" />

        <div className="hero-inner">
          <div className="hero-content-wrap">
            <div className="hero-left">
              <h1 className="hero-name">yashashvi chauhan</h1>
              <div className="progress-track" aria-hidden="true">
                <div className="progress-fill" />
              </div>
              <div className="hero-btns">
                <button className="btn-play" type="button" onClick={scrollToWork} aria-label="Scroll to work experience">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Résumé
                </button>
                <button className="btn-round" type="button" aria-label="Add to My List">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <button className="btn-round" type="button" aria-label="Rate">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
                    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="hero-right">
              <p className="hero-quote">&quot;Great ideas are just part of<br />what I bring to the table.&quot;</p>
            </div>
          </div>
        </div>

        <button className="vol-btn" type="button" title="Toggle sound" aria-pressed={isMuted} onClick={() => setIsMuted((value) => !value)}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: isMuted ? 0.45 : 1 }}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            {isMuted ? (
              <>
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            ) : (
              <>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </>
            )}
          </svg>
        </button>
      </section>

      <div className="page-wrap">
        <section className="edu-section" data-reveal>
          <div className="tag-strip">
            <span className="tag">Education</span>
            <span className="tag">Wilson College '23&nbsp;&nbsp;🎓</span>
          </div>
          <div className="edu-grid">
            <div>
              <div className="edu-block">
                <p className="edu-school">Wilson College - University of Mumbai</p>
                <ul className="edu-bullets">
                  <li>Hosted the annual college fest &quot;OLÉ&quot; in my first year</li>
                  <li>Hosted a flagship event conducted in collaboration with &apos;Under 25&apos;</li>
                </ul>
              </div>
              <div className="edu-block">
                <p className="edu-school">Sandra Shroff Gnyan Dham School - Junior College</p>
                <ul className="edu-bullets">
                  <li>Third Place in an Inter-College Extempore Competition</li>
                  <li>Directed a &apos;mime&apos; play based on Partition of India</li>
                </ul>
              </div>
            </div>
            <div>
              <p className="meta-label">BAMMC</p>
              <p className="meta-val">Major in Advertising &nbsp;·&nbsp; CGPA 10/10</p>
              <p className="meta-label">CBSE 12th</p>
              <p className="meta-val">Humanities - Arts &nbsp;·&nbsp; 92%</p>
              <div className="pills-row">
                <span className="lbl">This resume is:</span>
                <span className="pill">Confident</span>
                <span className="pill">Ambitious</span>
                <span className="pill">Skillful</span>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="work-section" ref={workRef} data-reveal>
          <div className="section-hd">
            <h2>Work Experience</h2>
            <div
              className="season-pill"
              role="note"
              aria-label={`${yearsExperience} ${yearsExperience === 1 ? 'year' : 'years'} experience`}
              title={`${yearsExperience} ${yearsExperience === 1 ? 'Year' : 'Years'} experience`}
            >
              <span className="season-pill-num">{yearsExperience}</span>
              <span className="season-pill-text">{yearsExperience === 1 ? 'Year' : 'Years'}</span>
            </div>
          </div>

          <div className="ep-list" id="work-experience-list">
            {experiences.map((experience, index) => {
              const isHidden = index >= 3 && !isExpanded;

              return (
              <div
                className={`ep-row reveal expand-row ${isHidden ? 'is-collapsed' : 'is-expanded'}`}
                data-reveal
                aria-hidden={isHidden}
                key={experience.number}
              >
                <div className="ep-num">{experience.number}</div>
                <div className="ep-body">
                  <div className={`ep-thumb ${experience.imageClass} ${experience.portfolioHref ? 'has-portfolio' : ''}`}>
                    {experience.imageSrc ? (
                      <img
                        src={experience.imageSrc}
                        alt={experience.alt ?? experience.label}
                        className="ep-thumb-img"
                        onError={(event) => {
                          const img = event.currentTarget as HTMLImageElement;
                          if ((img.dataset as any).triedFallback) {
                            img.style.display = 'none';
                            console.warn('Image not found, hiding:', img.src);
                            return;
                          }
                          const src = img.src;
                          const tryAlt = src.match(/\.jpg$/i) ? src.replace(/\.jpg$/i, '.png') : src.replace(/\.png$/i, '.jpg');
                          (img.dataset as any).triedFallback = '1';
                          img.src = tryAlt;
                          console.warn('Attempting alternate image extension for', src, '->', tryAlt);
                        }}
                      />
                    ) : null}
                    <span className="thumb-label">{experience.label}</span>
                    {experience.portfolioHref ? (
                      <div className="portfolio-hover">
                        <p>Work Portfolio</p>
                        <a href={experience.portfolioHref} className="port-btn">
                          View Work
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      </div>
                    ) : null}
                  </div>
                  <div className="ep-info">
                    <div className="ep-topline">
                      <p className="ep-company">
                        {experience.title} <span className="role">| {experience.role}</span>
                      </p>
                      <span className="ep-date">{experience.dates}</span>
                    </div>
                    <div className="ep-desc">
                      {experience.description.map((line) => (
                        <p key={line}>
                          {line.split(/(Uber Bike|Bar Bank|The Bar Stock Exchange's|The Croffle Guys|Peter England|IKEA|Saregama|FilterCopy's Instagram|Flipkart's|Unbox Electronics by Bajaj|Virgio|Pepe Jeans|CFE's|Aalekh Kapoor's|Mirchi Campus|Gaana)/).map((part) =>
                            /(Uber Bike|Bar Bank|The Bar Stock Exchange's|The Croffle Guys|Peter England|IKEA|Saregama|FilterCopy's Instagram|Flipkart's|Unbox Electronics by Bajaj|Virgio|Pepe Jeans|CFE's|Aalekh Kapoor's|Mirchi Campus|Gaana)/.test(part) ? (
                              <strong key={part}>{part}</strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {experiences.length > 3 && (
            <button
              className="expand-btn"
              type="button"
              onClick={() => setIsExpanded((value) => !value)}
              aria-expanded={isExpanded}
              aria-controls="work-experience-list"
              aria-label={isExpanded ? 'Collapse work experience list' : 'Expand work experience list'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={isExpanded ? 'expand-icon open' : 'expand-icon'}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}

          
        </section>

        <div className="section-divider" />

        <section className="mlt-section" data-reveal>
          <div className="section-hd">
            <h2>More Like This</h2>
          </div>
          <div className="cards-grid">
            {cards.map((card) => (
              <article className="mlt-card reveal" data-reveal key={card.title}>
                <div className={`card-img ${card.imageClass}`}>
                  {card.imageSrc ? (
                    <img
                      src={card.imageSrc}
                      alt={card.alt}
                      className="card-img-real"
                      onError={(event) => {
                        const img = event.currentTarget as HTMLImageElement;
                        if ((img.dataset as any).triedFallback) {
                          img.style.display = 'none';
                          console.warn('Card image not found, hiding:', img.src);
                          return;
                        }
                        const src = img.src;
                        const tryAlt = src.match(/\.jpg$/i) ? src.replace(/\.jpg$/i, '.png') : src.replace(/\.png$/i, '.jpg');
                        (img.dataset as any).triedFallback = '1';
                        img.src = tryAlt;
                        console.warn('Attempting alternate card image extension for', src, '->', tryAlt);
                      }}
                    />
                  ) : null}
                  <div className="card-img-bg">
                    <span className="card-show-name">{card.title}</span>
                  </div>
                </div>

                <div className="card-body">
                  <span className="card-tag">{card.tag}</span>
                  <p className={card.action === 'social' ? 'card-period social-period' : 'card-period'}>{card.period}</p>
                  {card.action === 'social' ? (
                    <div className="social-strip">
                      <a href="mailto:yashashvichauhan26@gmail.com" className="soc-link" title="Email" aria-label="Email">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </a>
                      <a href="https://www.instagram.com/yashashvi.26/" target="_blank" rel="noopener noreferrer" className="soc-link" title="Instagram" aria-label="Instagram">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="5" />
                          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/in/yashashvi-chauhan-b6295515a/" target="_blank" rel="noopener noreferrer" className="soc-link" title="LinkedIn" aria-label="LinkedIn">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                    </div>
                  ) : (
                    <div className="card-text">
                      <ul>
                        {card.text.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="bottom-bar" data-reveal>
          <div className="bottom-inner">
            <a href="/resume.pdf" download className="act-btn red">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Résumé
            </a>
          </div>
        </div>
      </div>

      <div className={`overlay ${isModalOpen ? 'show' : ''}`} role="presentation" onClick={(event) => event.target === event.currentTarget && setIsModalOpen(false)}>
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <div className="modal-hd">
            <h2 id="contact-title">Contact Information</h2>
            <button className="modal-close" type="button" aria-label="Close contact information" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
          </div>
          <div className="modal-row">
            <label>Email</label>
            <p>
              <a href="mailto:yashashvichauhan26@gmail.com">yashashvichauhan26@gmail.com</a>
            </p>
          </div>
          <div className="modal-row">
            <label>Phone</label>
            <p>+91 9321031635</p>
          </div>
          <div className="modal-row">
            <label>Instagram</label>
            <p>
              <a href="https://www.instagram.com/yashashvi.26/" target="_blank" rel="noopener noreferrer">
                @yashashvi.26
              </a>
            </p>
          </div>
          <div className="modal-row">
            <label>LinkedIn</label>
            <p>
              <a href="https://www.linkedin.com/in/yashashvi-chauhan-b6295515a/" target="_blank" rel="noopener noreferrer">
                yashashvi-chauhan
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}