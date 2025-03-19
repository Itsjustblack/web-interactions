import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FormCard from "../components/FormCard";
import { ChevronsRight } from "lucide-react";

const FormIntro = () => {
	useGSAP(() => {
		const tl = gsap.timeline({
			delay: 1,
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
					return -(20 - distance * 5);
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
				duration: 0.5,
			},
			"start"
		)
			// .to(
			// 	"#form-card-3 .card-bg",
			// 	{
			// 		background:
			// 			"linear-gradient(to bottom left, #AC6FE7, #BB88EB, #E9DBF7)",
			// 		duration: 0.5,
			// 		ease: "expo.out",
			// 	},
			// 	"start"
			// )
			// .to(
			// 	"#form-card-3 svg",
			// 	{
			// 		fill: "#fff",
			// 		duration: 0.5,
			// 	},
			// 	"start"
			// )
			.fromTo(
				".form-title",
				{
					y: 10,
					scale: 0.9,
					opacity: 0,
				},
				{
					y: 0,
					scale: 1,
					opacity: 1,
					duration: 0.5,
					ease: "expo.out",
				},
				"start"
			)
			.fromTo(
				".form-subtitle",
				{
					y: 20,
					scale: 0.9,
					opacity: 0,
				},
				{
					y: 0,
					scale: 1,
					opacity: 1,
					duration: 0.5,
					ease: "power1.in",
				},
				"start"
			)
			.fromTo(
				".form-button",
				{
					y: 20,
					scale: 0.9,
					opacity: 0,
				},
				{
					y: 0,
					scale: 1,
					opacity: 1,
					duration: 0.5,
					ease: "power1.in",
				},
				"start"
			);
	});

	return (
		<div className="bg-[#ECECEC] h-screen w-full flex flex-col items-center justify-center overflow-hidden">
			<div className="flex gap-x-10 items-end">
				{[1, 2, 3, 4, 5].map((num) => (
					<FormCard
						key={num}
						id={`form-card-${num}`}
					/>
				))}
			</div>
			<div className="mt-20 text-center flex items-center flex-col">
				<h1 className="text-3xl font-medium font-playfair text-[#2D2D2D] form-title">
					Choose your persona
				</h1>
				<p className="mt-2 text-[#686273] form-subtitle font-lora text-base">
					Select a persona that best represents you. Customize your experience
					<br />
					to match your style and preferences
				</p>
				<button className="bg-linear-to-b from-[#2D2B2F] to-[#2D2B2F] flex items-center justify-center gap-x-3 rounded-xl px-5 h-[50px] mt-3 form-button">
					<span className="text-white text-semibold font-lora text-base">
						Let's Go
					</span>
					<ChevronsRight
						stroke="#B7B7B7"
						className="size-5"
					/>
				</button>
			</div>
			{/* <div className="absolute w-full h-full z-0 -bottom-1/2 bg-[radial-gradient(circle_at_center_bottom,#c4a0e0,#dbc5ed,#eadff5,transparent_85%)]" /> */}
		</div>
	);
};

export default FormIntro;
