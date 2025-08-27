import { Outlet } from "react-router";
import ViewOnlyOnDesktop from "./ViewOnlyOnDesktop";
import ViewSwitch from "./ViewSwitch";

const Layout = () => {
	return (
		<ViewOnlyOnDesktop>
			<Outlet />
			<ViewSwitch />
		</ViewOnlyOnDesktop>
	);
};

export default Layout;
