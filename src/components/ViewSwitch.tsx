import { useLocation, useNavigate } from "react-router";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export enum AnimationType {
	FormIntro = "Form Intro",
	ShufflingCards = "Shuffling Cards",
	ORLA = "ORLA Landing Page",
}

const pathToAnimation: Record<string, AnimationType> = {
	"/form-intro": AnimationType.FormIntro,
	"/shuffling-cards": AnimationType.ShufflingCards,
	"/orla-landing-page": AnimationType.ORLA,
};

const animationToPath: Record<AnimationType, string> = {
	[AnimationType.FormIntro]: "/form-intro",
	[AnimationType.ShufflingCards]: "/shuffling-cards",
	[AnimationType.ORLA]: "/orla-landing-page",
};

const ViewSwitch = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const currentPath = location.pathname;
	const currentAnimation =
		pathToAnimation[currentPath] ?? AnimationType.ShufflingCards;

	return (
		<div className="fixed bottom-0 left-0 p-5 z-50">
			<Select
				value={currentAnimation}
				onValueChange={(value: AnimationType) => {
					navigate(animationToPath[value]);
				}}
			>
				<SelectTrigger className="w-[180px] bg-white focus:!ring-0 font-semibold">
					<SelectValue placeholder="Animation" />
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
