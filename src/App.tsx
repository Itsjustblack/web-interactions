import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import CardsDemo from "./demos/CardsDemo";
import Layout from "./components/Layout";
import FormIntro from "./demos/FormIntro";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Layout />}
				>
					<Route
						index
						element={
							<Navigate
								to="/shuffling-cards"
								replace
							/>
						}
					/>

					<Route
						path="shuffling-cards"
						element={<CardsDemo />}
					/>

					<Route
						path="form-intro"
						element={<FormIntro />}
					/>

					<Route
						path="*"
						element={
							<Navigate
								to="/shuffling-cards"
								replace
							/>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
