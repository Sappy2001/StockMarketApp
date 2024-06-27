import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useEffect,
} from "react";
import { getWatchListedData } from "../services/apiservices";
import { useAuth } from "../../Auth/authProvider";
import WatchCanvas from "../Header/WatchCanvas";

type WatchListProviderProps = {
	//type given to the children property in react
	children: ReactNode;
};
//type given only one is applicable
type WatchListType = "crypto" | "stock";
// if type is crypto then 1st one else the next one
type watchdata = WatchListType extends "crypto"
	? { image: string; symbol: string; price: number }
	: { image: string; symbol: string; price: number };

// ? { cryptoImage: string; symbol: string; price: number }
// : { stockImage: string; symbol: string; price: number };
// here if im using this im always getting stockIamge as default value in watchData

//type given for crypto|stock extends means has the property
type WatchListContext<Type extends WatchListType> = {
	openWatchList: () => void;
	closeWatchList: () => void;
	addToWatch: (
		id: string,
		type: Type,
		//onlyif Type is crypto then take image else exchange
		data: watchdata
	) => void;
	removeFromWatch: (id: string) => void;
	getWatchQuantity: number;
	watchItems: WatchItem[];
};
// initializing context and passing  empty obj
//explicitly setting type of {} empt obj
const WatchListContext = createContext({} as WatchListContext<WatchListType>);

//func to  just return the useContext
export function useWatchList() {
	return useContext(WatchListContext);
}

export type WatchItem = {
	id: string;
	type: WatchListType;
	data: watchdata;
};

//this is the provider function which wraps the element in which the shoppingCart value would be used
export function WatchListProvider({ children }: WatchListProviderProps) {
	const user = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const [watchItems, setWatchItems] = useState<WatchItem[]>([]);
	const fetchWatchedData = async () => {
		try {
			const res = await getWatchListedData(user?.email);

			const updatedWatchItems = res.data.map((item: any) => {
				let data: watchdata;
				if (item.data.type === "crypto") {
					data = {
						image: item.data.image,
						symbol: item.symbol,
						price: item.data.price,
					};
				} else {
					data = {
						image: item.data.image,
						symbol: item.symbol,
						price: item.data.price,
					};
				}
				return {
					id: item.id,
					type: item.data.type,
					data: data,
				};
			});
			setWatchItems(updatedWatchItems);
		} catch (err) {
			console.log(err);
		}
	};
	const getWatchQuantity = watchItems.length;

	useEffect(() => {
		fetchWatchedData();
	}, [getWatchQuantity, watchItems, user]);

	const openWatchList = () => setIsOpen(true);
	const closeWatchList = () => setIsOpen(false);

	function addToWatch(id: string, type: WatchListType, data: watchdata) {
		{
			setWatchItems((currItems) => {
				//check if the item is already present
				if (currItems.find((item) => item.id === id)) {
					return currItems;
				}
				//if not add to watchItems
				return [...currItems, { id, type, data }];
			});
		}
	}
	function removeFromWatch(id: string) {
		//if item present then remove it
		setWatchItems((currItems) => {
			return currItems.filter((item) => item.id !== id);
		});
	}
	return (
		<WatchListContext.Provider
			value={{
				getWatchQuantity,
				addToWatch,
				removeFromWatch,
				openWatchList,
				closeWatchList,
				watchItems,
			}}
		>
			{children}
			<WatchCanvas isOpen={isOpen} />
		</WatchListContext.Provider>
	);
}
