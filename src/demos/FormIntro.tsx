import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FormCard from "../components/FormCard";
import { ChevronsRight } from "lucide-react";

const FormIntro = () => {
	useGSAP(() => {
		const tl = gsap.timeline({
			delay: 0.8,
		});

		const cards = gsap.utils.toArray(".form-card");

		tl.fromTo(
			cards,
			{
				y: (index) => (cards.length - index) * 100,
				x: (index) => {
					if (index < 2) return -80;
					if (index === 2) return 0;
					return 80;
				},
				rotate: (index) => {
					if (index < 2) return -8;
					if (index === 2) return 0;
					return 8;
				},
				opacity: 0,
			},
			{
				y: 0,
				x: 0,
				rotate: 0,
				opacity: 1,
				duration: 1,
				ease: "expo.out",
			}
		);

		tl.addLabel("showText");

		tl.to(
			cards,
			{
				x: (index) => {
					const distance = Math.abs(index - 2);
					const factor = distance === 0 ? 0 : 10 - distance * 20;
					return index < 2 ? -1 * factor : factor;
				},
				y: (index) => {
					const distance = Math.abs(index - 2);
					if (distance === 0) return -40;
					return -(15 - distance * 5);
				},
				scale: (index) => {
					const distance = Math.abs(index - 2);
					return 1.1 - distance * 0.15;
				},
				rotate: (index) => {
					const distance = Math.abs(index - 2);
					const factor = distance * 1.8;
					return index < 2 ? -1 * factor : factor;
				},
				ease: "expo.out",
				duration: 1,
			},
			"showText"
		)
			.fromTo(
				"#form-card-3 .card-bg",
				{
					"--color1": "#ffffff",
					"--color2": "#ffffff",
					"--color3": "#ffffff",
				},
				{
					"--color1": "#AC6FE7",
					"--color2": "#BB88EB",
					"--color3": "#E9DBF7",
					duration: 1.5,
					ease: "expo.out",
				},
				"showText"
			)
			.to(
				"#form-card-3 svg",
				{
					fill: "#fff",
					duration: 1.5,
					ease: "expo.out",
				},
				"showText"
			);

		tl.fromTo(
			[".form-title", ".form-subtitle", ".form-disclaimer"],
			{
				y: 30,
				scale: 0.85,
				opacity: 0,
			},
			{
				y: 0,
				scale: 1,
				opacity: 1,
				duration: 1,
				ease: "expo.out",
			},
			"showText"
		)
			.fromTo(
				".form-button",
				{
					y: 10,
					scale: 0.9,
					opacity: 0,
				},
				{
					y: 0,
					scale: 1,
					opacity: 1,
					duration: 1,
					ease: "expo.out",
				},
				"showText"
			)
			.fromTo(
				".glow-bg",
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 1,
					ease: "expo.out",
				},
				"showText"
			);
	});

	return (
		<section className="bg-[#ECECEC] overflow-hidden h-screen">
			<div className="relative h-full w-full flex flex-col items-center justify-center">
				<div className="flex gap-x-10 items-end pt-20">
					{[1, 2, 3, 4, 5].map((num) => (
						<FormCard
							key={num}
							id={`form-card-${num}`}
						/>
					))}
				</div>
				<div className="relative z-5 mt-12 text-center flex items-center flex-col font-lora">
					<h1 className="text-[32px] font-semibold text-[#2D2D2D] form-title">
						Choose your persona
					</h1>
					<p className="mt-2 text-[#2D2D2D] form-subtitle text-base">
						Select a persona that best represents you. Customize your experience
						<br />
						to match your style and preferences
					</p>
					<button className="bg-linear-to-b from-[#2D2B2F] to-[#2D2B2F] flex items-center justify-center gap-x-3 rounded-xl px-5 h-[45px] my-3 form-button">
						<span className="text-white text-bold text-base font-lora">
							Let's Go
						</span>
						<ChevronsRight
							stroke="#B7B7B7"
							className="size-5"
						/>
					</button>
					<span className="text-xs text-[#2D2D2D] form-disclaimer">
						takes ∼4 minutes
					</span>
				</div>
				<div className="absolute w-full h-[40vh] shrink-0 inset-x-0 -bottom-[20%] xl:-bottom-[25%] rounded-t-full z-0 bg-[radial-gradient(circle_at_center_bottom,#b277e5_15%,#c18ae9_30%,#dbc5ed_50%,#eadff5_80%,transparent_100%)] blur-3xl glow-bg"></div>
			</div>
		</section>
	);
};

export default FormIntro;
