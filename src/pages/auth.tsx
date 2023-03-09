import AuthInput from "@/components/auth/AuthInput";
import { GoogleIcon } from "@/components/icons";
import { useState } from "react";

export default function Auth() {
	const [mode, setMode] = useState<"login" | "signin">("login");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	function onSubmit() {
		if (mode === "login") {
			console.log("login");
		} else {
			console.log("signin");
		}
	}

	return (
		<div className={`
			flex flex-col h-screen items-center justify-center
		`}>

			<div className={`w-1/2`}>
				<h1
					className={`
					text-lg font-bold mb-5	
				`}
				>
					{mode === "login" ? "Login" : "Sign in"}
				</h1>

				<AuthInput label="Name" value={name} valueHasChanged={setName} required />
				<AuthInput
					label="Email"
					type="email"
					value={email}
					valueHasChanged={setEmail}
					required
				/>
				<AuthInput
					label="Password"
					type="password"
					value={password}
					valueHasChanged={setPassword}
					required
				/>

				<button
					onClick={onSubmit}
					className={`
					w-full bg-indigo-500 hover:bg-indigo-400 text-white
					rounded-lg px-4 py-3 mt-6
				`}
				>
					{mode === "login" ? "Login" : "Sign in"}
				</button>

				<hr className={`my-6 border-gray-300 w-full`}/>

				<button
					onClick={onSubmit}
					className={`
					flex items-center justify-center
					w-full bg-red-500 text-gray-700 hover:bg-red-400 
					rounded-lg px-3 py-3
				`}
				>
					<div className={`
						flex items-center justify-center
						bg-white rounded-full h-8 w-8

					`}>
						{GoogleIcon}
					</div>
					
					<span className={`
						ml-3 text-white
					`}>Login with Google</span>
				</button>

			</div>

		</div>
	);
}
