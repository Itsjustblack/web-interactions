import { Monitor } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
	children: React.ReactNode;
}

const ViewOnlyOnDesktop = ({ children }: Props) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Check if screen is mobile sized
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		// Initial check
		checkScreenSize();

		// Add event listener for window resize
		window.addEventListener("resize", checkScreenSize);

		// Cleanup
		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	if (isMobile)
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center font-helvetica">
				<Monitor className="w-24 h-24 text-gray-800 mb-6" />
				<h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
					Please view on a larger screen
				</h1>
				<p className="text-gray-600 max-w-md mx-auto">
					This experience is optimized for desktop viewing. Please switch to a
					larger device for the best experience.
				</p>
			</div>
		);

	return <>{children}</>;
};

export default ViewOnlyOnDesktop;
