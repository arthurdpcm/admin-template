import React from "react";
import { DarkIcon, LightIcon } from "../icons";

interface ButtonChangeThemeProps {
	theme?: string;
	changeTheme?: () => void;
}

export default function ButtonChangeTheme(props: ButtonChangeThemeProps) {
	return props.theme === "dark" ? (
		<div
			onClick={props.changeTheme}
			className={`
            hidden sm:flex items-center cursor-pointer
            bg-gradient-to-r from-yellow-300 to-yellow-600
            w-14 lg:w-24 h-8 p-1 rounded-full 
        `}
		>
			<div
				className={`
                flex items-center justify-center
                bg-white text-yellow-600 rounded-full
                w-6 h-6
            `}
			>
				{LightIcon(4)}
			</div>
			<div
				className={`
                hidden lg:flex items-center ml-4
                text-white

            `}
			>
				<span
					className={`
                    text-sm
                `}
				>
					Light
				</span>
			</div>
		</div>
	) : (
		<div
			onClick={props.changeTheme}
			className={`
        hidden sm:flex items-center justify-end cursor-pointer
        bg-gradient-to-r from-purple-500 to-indigo-900
        w-14 lg:w-24 h-8 p-1 rounded-full 
        `}
		>
			<div
				className={`
                hidden lg:flex items-center mr-4
                text-gray-300
                
            `}
			>
				<span
					className={`
                    text-sm
                `}
				>
					Dark
				</span>
			</div>

			<div
				className={`
                flex items-center justify-center
                bg-gray-900 text-gray-200 rounded-full
                h-6 w-6
            `}
			>
				{DarkIcon(4)}
			</div>
		</div>
	);
}
