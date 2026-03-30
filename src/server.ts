import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

// Collections — add a folder per collection under public/photos/collections/<slug>/
// Set cover to the filename of the cover image inside that folder.
// Add individual photo filenames to the photos array for each collection.
const collections = [
  {
    slug: 'street',
    title: 'Street',
    cover: 'cover.jpg',
    photos: [
      // Add filenames here, e.g. '001.jpg'
    ],
  },
  {
    slug: 'portraits',
    title: 'Portraits',
    cover: 'cover.jpg',
    photos: [],
  },
  {
    slug: 'travel',
    title: 'Travel',
    cover: 'cover.jpg',
    photos: [],
  },
  {
    slug: 'tbd',
    title: 'Coming Soon',
    cover: 'cover.jpg',
    photos: [],
  },
];

app.get('/', (_req, res) => {
  res.render('index');
});

app.get('/about', (_req, res) => {
  res.render('about', { page: 'about' });
});

app.get('/photography', (_req, res) => {
  res.render('photography', { page: 'photography', collections });
});

app.get('/photography/:slug', (req, res) => {
  const collection = collections.find(c => c.slug === req.params.slug);
  if (!collection) return res.status(404).send('Not found');
  res.render('collection', { page: 'photography', collection });
});

app.listen(PORT, () => {
  console.log(`Photography site running at http://localhost:${PORT}`);
});
