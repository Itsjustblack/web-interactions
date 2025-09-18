import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SlowMo } from "gsap/EasePack";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(SlowMo);
gsap.registerPlugin(useGSAP);

type Point = { x: number; y: number };

function generateEllipsePoints(
	cx: number,
	cy: number,
	rx: number,
	ry: number,
	n: number,
	rotation: number = 0,
	offsetAmplitude: number = 10
): Point[] {
	const points: Point[] = [];

	for (let i = 0; i < n; i++) {
		// NEGATIVE theta → anticlockwise
		const theta = -(2 * Math.PI * i) / n;

		let x = rx * Math.cos(theta);
		let y = ry * Math.sin(theta);

		// Apply ellipse rotation
		const xr = x * Math.cos(rotation) - y * Math.sin(rotation);
		const yr = x * Math.sin(rotation) + y * Math.cos(rotation);

		// Symmetric sinusoidal offsets (mirrored per opposite points)
		const offsetX = offsetAmplitude * Math.sin(theta);
		const offsetY = offsetAmplitude * Math.cos(theta);

		// Translate to ellipse center
		const px = cx + xr + offsetX;
		const py = cy + yr + offsetY;

		points.push({ x: px, y: py });
	}

	points.push({ x: cx, y: cy }); // include center if needed

	return points;
}

const images = [
	{ src: "cabin-8.jpg", className: "bg-[center_70%]" },
	{ src: "cabin-3.jpg", className: "bg-[center_60%]" },
	{ src: "cabin-1.jpg", className: "bg-[center_82%]" },
	{ src: "cabin-4.jpg", className: "bg-[center_55%]" },
	{ src: "cabin-5.jpg", className: "bg-[center_18%]" },
	{ src: "cabin-6.jpg", className: "bg-[center_27%]" },
	{ src: "cabin-2.jpg", className: "bg-[center_50%]" },
	{ src: "cabin-9.jpg", className: "bg-[center_40%] xl:bg-[center_58%]" },
];

const TOTAL_CARDS = 7;

const OVERALL_DELAY = 1;

const ORLALandingPage = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);
	const [startSplit, setStartSplit] = useState(false);

	const [imagesLoaded, setImagesLoaded] = useState(false);

	useEffect(() => {
		let loaded = 0;
		images.forEach((img) => {
			const preload = new Image();
			preload.src = `/assets/${img.src}`;
			preload.onload = () => {
				loaded++;
				if (loaded === images.length) {
					setImagesLoaded(true);
				}
			};
		});
	}, []);

	const ellipsePoints = useMemo(
		() =>
			generateEllipsePoints(
				0,
				0,
				window.innerWidth * 0.25,
				window.innerHeight * 0.25,
				TOTAL_CARDS,
				0,
				35
			),
		[]
	);

	useGSAP(
		() => {
			if (!imagesLoaded) return;

			const selector = gsap.utils.selector(containerRef);

			const allCards = gsap.utils.toArray<HTMLDivElement>(".card");
			const centerCard = allCards[allCards.length - 1];
			const nonCenterCards = allCards.filter(
				(_, i) => i !== allCards.length - 1
			);

			// Start with all hidden
			gsap.set(centerCard, { zIndex: 20 });
			gsap.set(selector("#sub-title"), { opacity: 0 });
			gsap.set(selector("#nav"), { y: -100 });

			// Create timeline
			const tl = gsap.timeline();

			// Fade in all cards
			tl.to(allCards, {
				opacity: 1,
				delay: 0.5 + OVERALL_DELAY,
				duration: 0.2,
				ease: "linear",
				stagger: 0.2,
			});

			// Fade out non-center cards after 0.5s delay
			tl.to(
				nonCenterCards,
				{
					opacity: 0,
					duration: 0.9,
					ease: "power2.out",
					stagger: {
						each: 0.3,
						from: "end",
					},
				},
				"+=0.6"
			);

			// Scale center card
			tl.to(centerCard, {
				width: "100%",
				height: "100%",
				duration: 1.15,
				ease: "circ.out",
				onComplete: () => {
					setTimeout(() => {
						setStartSplit(true);
					}, 280);
				},
			});

			tl.fromTo(
				"#sub-title",
				{
					opacity: 0,
				},
				{ opacity: 1, duration: 1.3, ease: "power1.out", delay: 1.35 }
			);

			tl.fromTo(
				"#nav",
				{
					y: -70,
				},
				{ y: 0, duration: 0.9, ease: "power1.out" },
				"-=0.8"
			);

			// Progress bar independent
			gsap.to(selector("#loader"), {
				width: "100%",
				duration: 4.8,
				ease: "power1.out",
				delay: OVERALL_DELAY,
				onUpdate() {
					setProgress(this.progress());
				},
			});
		},
		{ dependencies: [imagesLoaded] }
	);

	return (
		<section
			ref={containerRef}
			className="w-full min-h-screen relative flex items-center justify-center overflow-auto"
		>
			{ellipsePoints.map((point, i) => {
				const currentImage = images[i % images.length];
				return (
					<div
						key={i}
						className={cn(
							`w-[34%] h-auto aspect-[16_/_9.6] card text-xl font-bold absolute bg-cover bg-no-repeat opacity-0`,
							currentImage.className
						)}
						style={{
							backgroundImage: `url('/assets/${currentImage.src}')`,
							transform: `translate(${point.x}px, ${point.y}px)`,
							zIndex: 10 - i,
						}}
					/>
				);
			})}

			<nav
				id="nav"
				className="fixed top-3 left-1/2 -translate-x-1/2 z-30 px-6 py-2 bg-gray-800/10 backdrop-blur-xs rounded-md text-white text-nowrap"
			>
				<div className="flex text-sm font-space-mono justify-center gap-x-7 items-center">
					<span className="font-inter text-xl z-50">ORLA</span>
					<p className="flex items-center gap-x-1">
						RESIDENCES <ChevronDown size={15} />
					</p>
					<p>GALLERY</p>
					<p>ABOUT</p>
					<p>MARKETING GALLERY</p>
					<button className="bg-white px-4 text-black rounded-xs h-full py-2">
						Contact Us
					</button>
				</div>
			</nav>

			<div className="relative z-50 w-full max-w-7xl">
				<div
					style={{ justifyContent: startSplit ? "space-around" : "center" }}
					className="flex w-full justify-center items-center text-[7.5rem] xl:text-[10rem] text-white"
				>
					{"ORLA".split("").map((letter) => (
						<motion.p
							key={letter}
							layout
							transition={{ duration: 1.5, ease: "circOut" }}
							className="font-inter text-center letter"
						>
							{letter}
						</motion.p>
					))}
				</div>

				<div
					id="sub-title"
					className="grid grid-cols-[repeat(20,_minmax(0,_1fr))] w-full text-center text-white absolute top-1/2 left-0 items-center -translate-y-1/2 font-space-mono"
				>
					<div className="text-lg xl:text-xl tracking-tight col-start-5 text-nowrap">
						OWN YOUR SPACE
					</div>
					<div className="text-lg xl:text-xl tracking-tight col-start-10 pl-4 text-nowrap">
						REST FULLY
					</div>
					<div className="text-lg xl:text-xl tracking-tight col-start-14 text-nowrap">
						LIVE FREELY ALWAYS
					</div>
				</div>
			</div>

			<div
				id="loader"
				className="border-b-6 border-black w-0 absolute left-0 bottom-0 flex z-[15]"
			>
				<p className="font-space-mono text-3xl pb-6 ml-auto text-nowrap">
					{`${Math.round(progress * 100)}%`}
				</p>
			</div>
		</section>
	);
};

export default ORLALandingPage;
