// Renders React page components to static HTML and copies public assets → dist/
import fs from "fs";
import path from "path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Collection } from "../src/types";
import { HomePage } from "../src/pages/HomePage";
import { AboutPage } from "../src/pages/AboutPage";
import { PhotographyPage } from "../src/pages/PhotographyPage";
import { CollectionPage } from "../src/pages/CollectionPage";

const OUT = path.join(__dirname, "..", "dist");
const PUBLIC = path.join(__dirname, "..", "public");
const BASE = process.env.BASE_PATH || "";

// Mirror of collections in src/server.ts
const collections: Collection[] = [
	{ slug: "street", title: "Street", cover: "cover.jpg", photos: [] },
	{ slug: "portraits", title: "Portraits", cover: "cover.jpg", photos: [] },
	{ slug: "travel", title: "Travel", cover: "cover.jpg", photos: [] },
	{
		slug: "film",
		title: "Film",
		cover: "arista_1.jpg",
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
	{ slug: "tbd", title: "Coming Soon", cover: "cover.jpg", photos: [] },
];

function mkdirp(dir: string): void {
	fs.mkdirSync(dir, { recursive: true });
}

function render(element: React.ReactElement): string {
	return "<!DOCTYPE html>" + renderToStaticMarkup(element);
}

// Rewrite absolute asset paths to include the base path prefix
function rebase(html: string): string {
	if (!BASE) return html;
	return html
		.replace(/href="\//g, `href="${BASE}/`)
		.replace(/src="\//g, `src="${BASE}/`);
}

function writePage(html: string, outPath: string): void {
	mkdirp(path.dirname(outPath));
	fs.writeFileSync(outPath, rebase(html), "utf8");
	console.log("  wrote", path.relative(process.cwd(), outPath));
}

function copyDir(src: string, dest: string): void {
	mkdirp(dest);
	for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
		const s = path.join(src, entry.name);
		const d = path.join(dest, entry.name);
		if (entry.isDirectory()) copyDir(s, d);
		else fs.copyFileSync(s, d);
	}
}

function main(): void {
	if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
	mkdirp(OUT);

	console.log("Rendering pages...");

	writePage(
		render(React.createElement(HomePage, { basePath: BASE })),
		path.join(OUT, "index.html"),
	);

	writePage(
		render(React.createElement(AboutPage, { page: "about" })),
		path.join(OUT, "about", "index.html"),
	);

	writePage(
		render(
			React.createElement(PhotographyPage, {
				page: "photography",
				collections,
			}),
		),
		path.join(OUT, "photography", "index.html"),
	);

	for (const col of collections) {
		writePage(
			render(
				React.createElement(CollectionPage, {
					page: "photography",
					collection: col,
				}),
			),
			path.join(OUT, "photography", col.slug, "index.html"),
		);
	}

	console.log("Copying public assets...");
	copyDir(PUBLIC, OUT);

	// Required for GitHub Pages to serve files that start with _
	fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

	// 404.html: GitHub Pages serves this for any URL that doesn't match a file.
	// Redirects to the site root so refreshing a bad or deep URL doesn't show a blank page.
	const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Page Not Found</title>
  <script>window.location.replace("${BASE || '/'}");</script>
</head>
<body></body>
</html>`;
	fs.writeFileSync(path.join(OUT, "404.html"), notFoundHtml);

	console.log(`\nExport complete → dist/  (BASE_PATH="${BASE}")`);
}

main();
