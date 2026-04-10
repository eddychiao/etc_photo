import express from "express";
import path from "path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Collection } from "./types";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { PhotographyPage } from "./pages/PhotographyPage";
import { CollectionPage } from "./pages/CollectionPage";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

// Collections — add a folder per collection under public/photos/collections/<slug>/
// Set cover to the filename of the cover image inside that folder.
// Add individual photo filenames to the photos array for each collection.
const collections: Collection[] = [
	{
		slug: "street",
		title: "Street",
		cover: "cover.jpg",
		photos: [],
	},
	{
		slug: "portraits",
		title: "Portraits",
		cover: "cover.jpg",
		photos: [],
	},
	{
		slug: "travel",
		title: "Travel",
		cover: "cover.jpg",
		photos: [],
	},
	{
		slug: "film",
		title: "Film",
		cover: "kodak400_5.jpg",
		photos: [
			"arista_1.jpg",
			"arista_2.jpg",
			"arista_3.jpg",
			"arista_4.jpg",
			"arista_5.jpg",
			"arista_6.jpg",
			"kodak200_1.jpg",
			"kodak200_2.jpg",
			"kodak200_3.jpg",
			"kodak200_4.jpg",
			"kodak200_5.jpg",
			"kodak200_6.jpg",
			"kodak200_7.jpg",
			"kodak200_8.jpg",
			"kodak200_9.jpg",
			"kodak400_1.jpg",
			"kodak400_2.jpg",
			"kodak400_3.jpg",
			"kodak400_4.jpg",
			"kodak400_5.jpg",
			"kodak400_6.jpg",
		],
	},
	{
		slug: "tbd",
		title: "Coming Soon",
		cover: "cover.jpg",
		photos: [],
	},
];

function render(element: React.ReactElement): string {
	return "<!DOCTYPE html>" + renderToStaticMarkup(element);
}

function safeSend(res: express.Response, element: React.ReactElement): void {
	try {
		res.send(render(element));
	} catch (err) {
		console.error("[render error]", err);
		res.status(500).send("<h1>500 — Server Error</h1>");
	}
}

app.get("/", (_req, res) => {
	safeSend(res, React.createElement(HomePage, {}));
});

app.get("/about", (_req, res) => {
	safeSend(res, React.createElement(AboutPage, { page: "about" }));
});

app.get("/photography", (_req, res) => {
	safeSend(res, React.createElement(PhotographyPage, { page: "photography", collections }));
});

app.get("/photography/:slug", (req, res) => {
	const collection = collections.find((c) => c.slug === req.params.slug);
	if (!collection) {
		res.status(404).send("<h1>404 — Collection not found</h1>");
		return;
	}
	safeSend(res, React.createElement(CollectionPage, { page: "photography", collection }));
});

// Catch-all 404
app.use((_req, res) => {
	res.status(404).send("<h1>404 — Not Found</h1>");
});

// Express error handler (catches errors passed via next(err))
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
	console.error("[express error]", err);
	res.status(500).send("<h1>500 — Server Error</h1>");
});

app.listen(PORT, () => {
	console.log(`Photography site running at http://localhost:${PORT}`);
});
