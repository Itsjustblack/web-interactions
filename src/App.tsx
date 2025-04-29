import { useState } from "react";
import ViewOnlyOnDesktop from "./components/ViewOnlyOnDesktop";
import ViewSwitch from "./components/ViewSwitch";
import CardsDemo from "./demos/CardsDemo";
import FormIntro from "./demos/FormIntro";

// eslint-disable-next-line react-refresh/only-export-components
export enum AnimationType {
	FormIntro = "Form Intro",
	ShufflingCards = "Shuffling Cards",
}

const renderComponent = (item: AnimationType) => {
	switch (item) {
		case AnimationType.ShufflingCards:
			return <CardsDemo />;
		case AnimationType.FormIntro:
			return <FormIntro />;
		default:
			return null;
	}
};

function App() {
	const [currentComponent, setCurrentComponent] = useState<AnimationType>(
		AnimationType.FormIntro
	);
	return (
		<ViewOnlyOnDesktop>
			{renderComponent(currentComponent)}
			<ViewSwitch
				currentComponent={currentComponent}
				setCurrentComponent={setCurrentComponent}
			/>
		</ViewOnlyOnDesktop>
	);
}

export default App;
