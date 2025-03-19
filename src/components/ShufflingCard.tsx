import { MoveUpRight } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
	className?: string;
	titleP1: string;
	titleP2: string;
	image: string;
	zIndex: number;
}

const ShufflingCard = ({
	className,
	titleP1,
	titleP2,
	image,
	zIndex,
}: Props) => {
	return (
		<div
			className={cn(
				"font-helvetica bg-white p-6 rounded-xl flex justify-between w-[460px] h-[270px] gap-x-16 absolute border will-change-transform",
				className
			)}
			style={{ zIndex }}
		>
			<div className="flex flex-col">
				<span className="text-5xl tracking-tighter">
					{titleP1} <br /> {titleP2}
				</span>
				<div className="p-[8px] bg-black w-fit mt-auto rounded-xl">
					<MoveUpRight
						stroke="#fff"
						strokeWidth={1.5}
					/>
				</div>
			</div>

			<div className="aspect-[0.73] flex-1">
				<img
					className="w-full h-full object-center object-cover rounded-lg"
					src={image}
				/>
			</div>
		</div>
	);
};

export default ShufflingCard;
