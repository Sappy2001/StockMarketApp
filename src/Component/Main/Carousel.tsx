import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../services/apiservices";
import AliceCarousel from "react-alice-carousel";

const Carousel = () => {
	let stocks: any = true;
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
			// console.log(data);
		} catch (err) {
			console.log(err + "at Carousel");
		}
	};

	// console.log(trending);
	useEffect(() => {
		fetchtrendingcoins();
	}, []);

	const responsive = {
		0: {
			items: stocks ? 3 : 2,
		},
		520: {
			items: stocks ? 6 : 4,
		},
	};

	const items = trending.map((coins) => {
		let profit = coins.market_cap_change_percentage_24h >= 0;
		return (
			<>
				<img
					//if image link has large img make it small(faster loading)
					src={
						coins.image.includes("/large/")
							? coins.image.replace("/large/", "/small/")
							: coins.image
					}
					alt={coins.name}
					height="70"
					style={{ marginBottom: 10 }}
					loading="lazy"
				/>
				<span
					style={{
						fontSize: "17px",
						textTransform: "uppercase",
						fontWeight: 600,
						color: "blue",
						marginLeft: "5px",
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
				animationDuration={1000}
				autoPlayInterval={500}
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
