import { AnimationType } from "@/App";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Props {
	currentComponent: AnimationType;
	setCurrentComponent: React.Dispatch<React.SetStateAction<AnimationType>>;
}

const ViewSwitch = ({ currentComponent, setCurrentComponent }: Props) => {
	return (
		<div className="fixed bottom-0 right-0 p-5 z-50">
			<Select
				value={currentComponent}
				onValueChange={(value: AnimationType) => setCurrentComponent(value)}
			>
				<SelectTrigger className="w-[180px] bg-white focus:!ring-0 font-semibold">
					<SelectValue placeholder="Theme" />
				</SelectTrigger>
				<SelectContent>
					{Object.values(AnimationType).map((type) => (
						<SelectItem
							key={type}
							value={type}
						>
							{type}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default ViewSwitch;
