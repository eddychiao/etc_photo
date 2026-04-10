const FONTS =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&family=Noto+Serif+SC:wght@300;400&display=swap';

const HERO_IMAGE = '/photos/hero/bw_bike.jpg';

interface HomePageProps {
  basePath?: string;
}

export function HomePage({ basePath = '' }: HomePageProps) {
  const heroSrc = `${basePath}${HERO_IMAGE}`;
  const bgScript = `
    var bg = document.getElementById("landingBg");
    var img = new Image();
    img.onload = function() { bg.classList.add("loaded"); };
    img.src = "${heroSrc}";
    bg.style.backgroundImage = "url('${heroSrc}')";
  `.trim();

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Eddy Chiao — Photography</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={FONTS} rel="stylesheet" />
        <link rel="stylesheet" href="/css/base.css" />
        <link rel="stylesheet" href="/css/nav.css" />
        <link rel="stylesheet" href="/css/home.css" />
        <link rel="icon" type="image/svg+xml" href="/photos/public/favicon_dark.svg" />
      </head>
      <body className="landing-body">
        <div className="landing-bg" id="landingBg" />
        <div className="landing-overlay" />

        <nav className="nav-landing">
          <a href="/" className="nav-logo-link">
            <img src="/images/logo.svg" alt="etc." className="nav-logo-img" />
          </a>
          <div className="nav-links">
            <a href="/about">About</a>
            <a href="/photography">Photography</a>
          </div>
        </nav>

        <main className="landing-content">
          <span className="landing-cn">乔廷义</span>
          <h1 className="landing-name">Eddy Chiao</h1>
        </main>

        <div className="landing-socials">
          <a
            href="https://www.instagram.com/chiao.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Instagram"
            data-label="@chiao.jpg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/edward-chiao"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn"
            data-label="connect on linkedin"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="3" />
              <line x1="8" y1="11" x2="8" y2="16" />
              <line x1="8" y1="8" x2="8" y2="8.5" />
              <line x1="12" y1="16" x2="12" y2="13" />
              <path d="M12 11a3 3 0 0 1 6 0v5h-3v-5" />
            </svg>
          </a>
          <a
            href="mailto:eddychiao@gmail.com"
            className="social-link"
            aria-label="Email"
            data-label="shoot me an email!"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="2,4 12,13 22,4" />
            </svg>
          </a>
        </div>

        <script src="/js/transitions.js" />
        <script dangerouslySetInnerHTML={{ __html: bgScript }} />
      </body>
    </html>
  );
}
