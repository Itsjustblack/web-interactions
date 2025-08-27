interface FormCardProps {
	id: string;
}

const FormCard = ({ id }: FormCardProps) => {
	return (
		<div
			id={id}
			className="form-card relative w-[160px] xl:w-[200px] aspect-[0.824] rounded-lg shadow-md overflow-hidden origin-[bottom_center] flex flex-1 flex-col"
		>
			<div className="card-bg pt-7">
				<svg
					width="109"
					height="127"
					viewBox="0 0 109 127"
					fill="#E3E5E7"
					xmlns="http://www.w3.org/2000/svg"
					className="mx-auto"
				>
					<g>
						<path d="M52.0894 1.3265C53.5904 0.500563 55.4096 0.500563 56.9106 1.3265L78.4106 15.6195C80.0078 16.4984 81 18.1769 81 20L82.5894 44.1195C82.5894 45.9425 81.5972 47.6211 80 48.5L56.9106 59.6735C55.4096 60.4994 53.5904 60.4994 52.0894 59.6735L28.5 48.5C26.9028 47.6211 25.9106 45.9425 25.9106 44.1194L28.4106 19.8805C28.4106 18.0575 29.4028 16.3789 31 15.5L52.0894 1.3265Z" />
						<path d="M109 127C109 119.383 107.59 111.841 104.851 104.804C102.113 97.7675 98.0981 91.3736 93.0373 85.9878C87.9765 80.602 81.9685 76.3298 75.3562 73.415C68.744 70.5002 61.657 69 54.5 69C47.343 69 40.256 70.5002 33.6437 73.415C27.0315 76.3298 21.0235 80.602 15.9627 85.9878C10.9019 91.3736 6.88744 97.7675 4.14856 104.804C1.40968 111.841 -6.25688e-07 119.383 0 127H109Z" />
					</g>
				</svg>
			</div>
			<div className="p-2 xl:p-3 border-t bg-white border-[#F4F4F4] flex flex-col gap-y-2 h-full">
				<div className="w-full bg-[#E4E6E7] max-h-5 flex-1 rounded-lg"></div>
				<div className="w-1/2 bg-[#EFF1F3] max-h-5 flex-1 rounded-lg"></div>
			</div>
		</div>
	);
};

export default FormCard;
