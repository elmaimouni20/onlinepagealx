"use client";
import React, { createContext, useState } from "react";

const useSideBarState = () => useState({
        isSideBarOpen:false,
		listPages:[],
    });

export const SideBarContext = createContext(null);

export const useSideBar = () => {
	const sidebar = React.useContext(SideBarContext);
	if (!sidebar) {
		throw new Error("useSideBar must be used within a SideBarContext");
	}
	return sidebar;
};

const SideBarProvider = ({ children }) => {
	const [sidebar, setSidebar] = useSideBarState();

	return (
		<SideBarContext.Provider value={[sidebar, setSidebar]}>
			{children}
		</SideBarContext.Provider>
	);
};

export default SideBarProvider;