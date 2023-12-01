'use client';
import '../../../styles/filters/filterPrice.css';

import React, { useState, useEffect, useRef } from 'react';

const PriceRange = () => {
	const sliderOneRef = useRef(null);
	const sliderTwoRef = useRef(null);
	const sliderTrackRef = useRef(null);

	const [sliderOne, setSliderOne] = useState(30);
	const [sliderTwo, setSliderTwo] = useState(70);
	const minGap = 1;
	const sliderMaxValue = 100;

	useEffect(() => {
		slideOne();
		slideTwo();
	}, [sliderOne, sliderTwo]);

	const slideOne = () => {
		if (sliderTwo - sliderOne <= minGap) {
			setSliderOne(sliderTwo - minGap);
		}
		fillColor();
	};

	const slideTwo = () => {
		if (sliderTwo - sliderOne <= minGap) {
			setSliderTwo(sliderOne + minGap);
		}
		fillColor();
	};

	const fillColor = () => {
		const percent1 = (sliderOne / sliderMaxValue) * 100;
		const percent2 = (sliderTwo / sliderMaxValue) * 100;
		sliderTrackRef.current.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , 
            #000 ${percent1}% , #000 ${percent2}%, #dadae5 ${percent2}%)`;
	};

	return (
		<div className="price-range-main-container">
			<div className="wrapper">
				<div className="price-range-container">
					<div ref={sliderTrackRef} className="slider-track"></div>
					<input
						type="range"
						min="0"
						max="100"
						value={sliderOne}
						ref={sliderOneRef}
						onChange={(e) => setSliderOne(e.target.value)}
					/>
					<input
						type="range"
						min="0"
						max="100"
						value={sliderTwo}
						ref={sliderTwoRef}
						onChange={(e) => setSliderTwo(e.target.value)}
					/>
				</div>
				<div className="values">
					<span>{sliderOne}</span>
					<span>{sliderTwo}</span>
				</div>
			</div>
		</div>
	);
};

export default PriceRange;
