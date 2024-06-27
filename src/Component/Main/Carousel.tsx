import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../services/apiservices";
import AliceCarousel from "react-alice-carousel";

const Carousel = () => {
	const [trending, seTrending] = useState([
		{
			image: "",
			name: "",
			symbol: "",
			market_cap_change_percentage_24h: 0,
		},
	]);
	const fetchtrendingcoins = async () => {
		//destructuring the response
		try {
			const { data } = await TrendingCoins("inr");
			seTrending(data);
			console.log(data);
		} catch (err) {
			console.log(err + "at Carousel");
		}
	};

	console.log(trending);
	useEffect(() => {
		fetchtrendingcoins();
	}, []);

	const responsive = {
		0: {
			items: 2,
		},
		520: {
			items: 4,
		},
	};

	const items = trending.map((coins) => {
		let profit = coins.market_cap_change_percentage_24h >= 0;
		return (
			<>
				<img
					src={coins.image}
					alt={coins.name}
					height="80"
					style={{ marginBottom: 10 }}
				/>
				<span
					style={{
						fontSize: "17px",
						textTransform: "uppercase",
						fontWeight: 600,
						color: "blue",
					}}
				>
					{coins.symbol}
				</span>
				<span>
					{profit ? "+" : ""}
					{coins.market_cap_change_percentage_24h}%
				</span>
			</>
		);
	});

	return (
		<div className="carousel" style={{ margin: "20px 0 20px" }}>
			<AliceCarousel
				mouseTracking
				infinite
				autoPlay
				animationDuration={1500}
				autoPlayInterval={1000}
				disableButtonsControls
				disableDotsControls
				// how many items to show according to screen size
				responsive={responsive}
				items={items}
			/>
		</div>
	);
};
export default Carousel;
