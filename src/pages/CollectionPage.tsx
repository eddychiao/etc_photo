import { Nav } from '../components/Nav';
import type { Collection } from '../types';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&family=Noto+Serif+SC:wght@300;400&display=swap';

interface CollectionPageProps {
  page?: string;
  collection: Collection;
}

export function CollectionPage({ page, collection }: CollectionPageProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{collection.title} — Eddy Chiao</title>
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
            <a href="/photography" className="collection-back">← Photography</a>
            <h1>{collection.title}</h1>
            <div className="photography-header-rule" />
          </div>

          {/* Photos: add filenames to the collection's photos array in src/server.ts */}
          {collection.photos.length > 0 ? (
            <div className="photography-grid">
              {collection.photos.map(filename => (
                <div key={filename} className="photography-item">
                  <div className="photography-img-wrap">
                    <img
                      src={`/photos/collections/${collection.slug}/${filename}`}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="collection-empty">Photos coming soon.</p>
          )}
        </main>

        <script src="/js/transitions.js" />
      </body>
    </html>
  );
}
