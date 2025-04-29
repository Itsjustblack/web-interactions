import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ShufflingCard from "../components/ShufflingCard";

gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies

const cards = [
	{ titleP1: "Own", titleP2: "the glow" },
	{ titleP1: "Wear", titleP2: "the future" },
	{ titleP1: "Redefine", titleP2: "bold" },
	{ titleP1: "Dare to", titleP2: "be seen" },
];

function CardsDemo() {
	useGSAP(() => {
		const cards = gsap.utils.toArray<HTMLDivElement>(".card");

		const tl = gsap.timeline({
			delay: 1,
		});

		const yPositions = [60, 30, -5, -30];

		tl.fromTo(
			".card-1",
			{ scale: 1.7 },
			{ duration: 0.6, scale: 1, ease: "expo.out", delay: 1 }
		)
			.add(() => {
				gsap.to(cards, {
					x: (i) => [-70, -35, 5, 35][i],
					y: (i) => yPositions[i],
					duration: 0.3,
					ease: "expo.out",
				});
			})

			.to(
				cards,
				{
					keyframes: [
						{
							y: (i) => yPositions[i] - 130,
							duration: 0.3,
							ease: "power3.inOut",
						},
						{ y: (i) => yPositions[i], duration: 0.4, ease: "power3.out" },
					],
					stagger: 0.3,
				},
				"+=0.3"
			)

			.to(cards, { x: 0, ease: "expo.out", duration: 0.5 })

			.to(
				cards,
				{
					x: (index) => (index > 1 ? -240 : 240),
					ease: "expo.inOut",
					duration: 0.6,
				},
				"+=0.1"
			)

			.to(
				cards,
				{
					y: (i) => ((i + 1) % 2 === 0 ? "-=135" : "+=135"),
					ease: "expo.inOut",
					duration: 0.6,
				},
				"+=0.1"
			)

			.to(
				cards,
				{
					x: 0,
					y: 0,
					ease: "expo.inOut",
					duration: 0.6,
				},
				"+=0.1"
			);

		tl.to(".card-1", { duration: 0.6, scale: 1.7, ease: "expo.out" });
	});

	return (
		<section className="h-screen bg-gray-200 flex items-center justify-center stage">
			{cards.map(({ titleP1, titleP2 }, num) => (
				<ShufflingCard
					key={num + 1}
					className={`card card-${num + 1}`}
					zIndex={4 - num}
					image={`/assets/pic-${num + 1}.jpg`}
					titleP1={titleP1}
					titleP2={titleP2}
				/>
			))}
		</section>
	);
}

export default CardsDemo;
