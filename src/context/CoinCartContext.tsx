import { createContext, useContext, ReactNode } from "react";

type CoinCartProviderProps = {
	//type given to the children property in react
	children: ReactNode;
};
// initializing context and passing  empty obj
const CoinCartContext = createContext({});

//func to  just return the useContext
export function useCoinCart() {
	return useContext(CoinCartContext);
}

//this is the provider function which wraps the element in which the shoppingCart value would be used
export function CoinCartProvider({ children }: CoinCartProviderProps) {
	return (
		<CoinCartContext.Provider value={{}}>{children}</CoinCartContext.Provider>
	);
}
