"use client";
import React, { createContext, useState } from "react";

const usePageState = () => useState({
        elements: [],
    });

export const PageContext = createContext(null);

export const usePage = () => {
	const page = React.useContext(PageContext);
	if (!page) {
		throw new Error("usePage must be used within a PageContext");
	}
	return page;
};

const PageProvider = ({ children }) => {
	const [pageContext, setPageContext] = usePageState();
	return (
		<PageContext.Provider value={[pageContext, setPageContext]}>
			{children}
		</PageContext.Provider>
	);
};

export default PageProvider;