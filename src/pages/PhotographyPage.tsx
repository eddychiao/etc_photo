import { Nav } from '../components/Nav';
import type { Collection } from '../types';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&family=Noto+Serif+SC:wght@300;400&display=swap';

interface PhotographyPageProps {
  page?: string;
  collections: Collection[];
}

export function PhotographyPage({ page, collections }: PhotographyPageProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Photography — Eddy Chiao</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={FONTS} rel="stylesheet" />
        <link rel="stylesheet" href="/css/base.css" />
        <link rel="stylesheet" href="/css/nav.css" />
        <link rel="stylesheet" href="/css/photography.css" />
        <link rel="icon" type="image/svg+xml" href="/photos/public/favicon_dark.svg" />
      </head>
      <body className="inner-body">
        <Nav page={page} />

        <main className="photography-main">
          <div className="photography-header">
            <span className="section-cn">照片</span>
            <h1>Photography</h1>
            <div className="photography-header-rule" />
          </div>

          <div className="collection-grid">
            {collections.map(col => (
              <a key={col.slug} href={`/photography/${col.slug}`} className="collection-panel">
                <div className="collection-cover">
                  <img
                    src={`/photos/collections/${col.slug}/${col.cover}`}
                    alt={col.title}
                    loading="lazy"
                  />
                </div>
                <div className="collection-label">
                  <span className="collection-title">{col.title}</span>
                </div>
              </a>
            ))}
          </div>
        </main>

        <script src="/js/transitions.js" />
      </body>
    </html>
  );
}
