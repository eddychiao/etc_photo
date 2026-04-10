import { Nav } from "../components/Nav";

const FONTS =
	"https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&family=Noto+Serif+SC:wght@300;400&display=swap";

interface AboutPageProps {
	page?: string;
}

export function AboutPage({ page }: AboutPageProps) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>About — Eddy Chiao</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link href={FONTS} rel="stylesheet" />
				<link rel="stylesheet" href="/css/base.css" />
				<link rel="stylesheet" href="/css/nav.css" />
				<link rel="stylesheet" href="/css/about.css" />
				<link
					rel="icon"
					type="image/svg+xml"
					href="/photos/public/favicon_dark.svg"
				/>
			</head>
			<body className="inner-body">
				<Nav page={page} />

				<main className="about-main">
					<div className="about-container">
						<div className="about-photo-wrap">
							<img
								src="/photos/about/portrait.jpg"
								alt="Portrait of Eddy Chiao"
								className="about-photo"
							/>
						</div>

						<div className="about-text">
							<span className="section-cn">关于我</span>
							<h1>About Me</h1>
							<div className="about-divider" />
							<p>Nice to meet you, I&rsquo;m Eddy!</p>
							<p>
								I&rsquo;m a software engineer currently based in New York City,
								who also happens to love taking photos. This hobby started a
								long time ago when I was a kid, taking photos with my
								dad&rsquo;s old camera and using up all the film. In 2023, my
								passion was reignited when I bought my own camera — now I can
								finally snap film to my heart&rsquo;s content.
							</p>
							<p>
								To me, photography is a powerful art form: being able to capture
								a person, place, event at a precise moment in time. Photos can
								tell simple or sophisticated stories, either answer questions,
								or leave the viewer with hundreds more. As someone who struggles
								with drawing, I let the camera do the work of creating the
								canvas for me.
							</p>
							<p>
								I enjoy capturing a wide range of photos, from diverse scenes to
								working with different people. I&rsquo;d love the opportunity to
								collaborate with you — feel free to contact me at{" "}
								<a href="mailto:eddychiao@gmail.com" className="contact-link">
									eddychiao@gmail.com
								</a>
								.
							</p>
						</div>
					</div>
				</main>

				<script src="/js/transitions.js" />
			</body>
		</html>
	);
}
