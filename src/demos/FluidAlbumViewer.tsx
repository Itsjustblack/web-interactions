import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../lib/utils";

const panels = [
	{
		id: 1,
		image:
			"https://framerusercontent.com/images/LoV9BSvvjJosyi5ofeYweCCDrw.jpeg?scale-down-to=1024",
	},
	{
		id: 2,
		image:
			"https://framerusercontent.com/images/GmqgOktAqpyfE7FLhX77YciUAM.png",
	},
	{
		id: 3,
		image:
			"https://framerusercontent.com/images/EsvSKWhD5qDRVtGpypT0NzwVjs.png",
	},
	{
		id: 4,
		image:
			"https://framerusercontent.com/images/ihN46Zr147HztFQAw31QGKZLns.png",
	},
];

const FluidAlbumViewer = () => {
	const [mainImage, setMainImage] = useState(panels[0]); // Main display
	const [currentView, setCurrentView] = useState<"grid" | "flex">("grid");

	const handleSwap = (clickedImage: { id: number; image: string }) => {
		if (clickedImage.id === mainImage.id) {
			setCurrentView((prev) => (prev === "flex" ? "grid" : "flex"));
		} else if (currentView === "flex") {
			setMainImage(clickedImage);
		} else {
			setMainImage(clickedImage);
			setCurrentView((prev) => (prev === "flex" ? "grid" : "flex"));
		}
	};

	return (
		<section className="flex bg-black h-screen justify-center w-full gap-6 items-center overflow-hidden relative">
			<motion.div
				className={cn("gap-4", {
					"flex flex-col ml-[900px]": currentView === "flex",
					"grid grid-cols-3 grid-rows-2 w-[700px] h-[500px]":
						currentView === "grid",
				})}
			>
				{panels.map((panel, index) => (
					<motion.div
						key={`panel-${panel.id}`}
						layoutId={`panel-${panel.id}`}
						onClick={() => handleSwap(panel)}
						style={{ zIndex: index + 1 }}
						className={cn(
							"cursor-pointer relative origin-top rounded-lg overflow-hidden",
							{
								"col-span-2": index === 0 || index === 3,
							},
							{
								"size-[100px]": currentView === "flex",
							},
							{
								"absolute inset-0 left-1/2 -translate-1/2 top-1/2 w-[700px] h-[500px]":
									currentView === "flex" && mainImage.id === panel.id,
							}
						)}
						transition={{
							duration: 0.2,
							properties: ["width", "height", "left", "top"],
						}}
					>
						<div className="absolute top-0 left-0 right-0 bottom-0">
							<img
								className="object-cover object-center w-full h-full border-inherit block"
								draggable="false"
								sizes="630.5px"
								src={panel.image}
								alt="Thumbnail"
							/>
						</div>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
};

export default FluidAlbumViewer;
