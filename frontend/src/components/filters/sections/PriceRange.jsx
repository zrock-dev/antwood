'use client';
import '../../../styles/filters/filterPrice.css';

import React, { useState, useEffect, useRef } from 'react';

const PriceRange = () => {
	const sliderOneRef = useRef(null);
	const sliderTwoRef = useRef(null);
	const displayValOneRef = useRef(null);
	const displayValTwoRef = useRef(null);
	const sliderTrackRef = useRef(null);

	const [sliderOne, setSliderOne] = useState(30);
	const [sliderTwo, setSliderTwo] = useState(70);
	const minGap = 0;
	const sliderMaxValue = 100;

	useEffect(() => {
		slideOne();
		slideTwo();
	}, [sliderOne, sliderTwo]);

	const slideOne = () => {
		if (parseInt(sliderTwo) - parseInt(sliderOne) <= minGap) {
			setSliderOne(parseInt(sliderTwo) - minGap);
		}
		displayValOneRef.current.textContent = sliderOne;
		fillColor();
	};

	const slideTwo = () => {
		if (parseInt(sliderTwo) - parseInt(sliderOne) <= minGap) {
			setSliderTwo(parseInt(sliderOne) + minGap);
		}
		displayValTwoRef.current.textContent = sliderTwo;
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
						onChange={() => setSliderOne(parseInt(sliderOneRef.current.value))}
					/>
					<input
						type="range"
						min="0"
						max="100"
						value={sliderTwo}
						ref={sliderTwoRef}
						onChange={() => setSliderTwo(parseInt(sliderTwoRef.current.value))}
					/>
				</div>
				<div className="values">
					<span ref={displayValOneRef}>0</span>
					<span ref={displayValTwoRef}>100</span>
				</div>
			</div>
		</div>
	);
};

export default PriceRange;
