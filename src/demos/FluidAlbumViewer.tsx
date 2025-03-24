import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../lib/utils";

const panels = [
	{ id: 1, image: "/assets/gallery/pic-1.jpeg" },
	{ id: 2, image: "/assets/gallery/pic-2.webp" },
	{ id: 3, image: "/assets/gallery/pic-3.webp" },
	{ id: 4, image: "/assets/gallery/pic-4.webp" },
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
							"rounded-lg overflow-hidden cursor-pointer relative will-change-",
							{
								"col-span-2": index === 0 || index === 3,
							},
							{
								"size-[100px]": currentView === "flex",
							},
							// {
							// 	"scale-x-60 scale-y-60": currentView === "grid",
							// },
							{
								"absolute inset-0 left-1/2 -translate-1/2 top-1/2 w-[700px] h-[500px]":
									currentView === "flex" && mainImage.id === panel.id,
							}
						)}
						transition={{ duration: 0.6, type: "spring" }}
					>
						<motion.div
							// layoutId={`image-${panel.id}`}
							className="absolute top-0 left-0 right-0 bottom-0 border-inherit"
						>
							<img
								className="object-cover object-center w-full h-full border-inherit block"
								src={panel.image}
								alt="Thumbnail"
							/>
						</motion.div>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
};

export default FluidAlbumViewer;
