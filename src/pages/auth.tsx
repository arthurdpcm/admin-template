import AuthInput from "@/components/auth/AuthInput";
import { GoogleIcon, WarningIcon } from "@/components/icons";
import Image from "next/image";
import { useState } from "react";
import Horizon from "public/horizon.jpg";
import useAuth from "@/data/hook/useAuth";

export default function Auth() {
	const [mode, setMode] = useState<"login" | "signup">("login");
	const [error, setError] = useState(null);

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const { signup, login, loginGoogle } = useAuth();

	async function onSubmit() {
		try{
			if (mode === "login") {
				await login(email, password)
	
			} else {
				await signup(email, password)
	
			}
		} catch(e){
			showError(e?.message ?? "Unknow error!")
		}
		
	}

	function showError(msg: any, seconds = 10) {
		setError(msg);
		setTimeout(() => setError(null), seconds * 1000);
	}

	return (
		<div
			className={`
			flex h-screen items-center justify-center
		`}
		>
			<div className={`hidden md:block md:w-1/2 lg:w-2/3`}>
				<Image
					src={Horizon}
					alt="Horizon"
					className={`h-screen w-full object-cover`}
				/>
			</div>

			<div className={` m-10 w-full md:w-1/2 lg:w-1/3`}>
				<h1
					className={`
					text-3xl font-bold mb-5	
				`}
				>
					{mode === "login" ? "Login" : "Sign up"}
				</h1>

				{error ? (
					<div
						className={` flex items-center
						bg-red-400 text-white py-3 px-5 my-2
						border border-red-700 rounded-lg
					`}
					>
						{WarningIcon()}
						<span className={`ml-3`}>{error}</span>
					</div>
				) : (
					false
				)}

				{/* <AuthInput
					label="Name"
					value={name}
					valueHasChanged={setName}
					required
				/> */}
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
					{mode === "login" ? "Login" : "Sign up"}
				</button>

				<hr className={`my-6 border-gray-300 w-full`} />

				<button
					onClick={loginGoogle}
					className={`
					flex items-center justify-center
					w-full bg-red-500 text-gray-700 hover:bg-red-400 
					rounded-lg px-3 py-3
				`}
				>
					<div
						className={`
						flex items-center justify-center
						bg-white rounded-full h-8 w-8

					`}
					>
						{GoogleIcon}
					</div>

					<span
						className={`
						ml-3 text-white
					`}
					>
						Login with Google
					</span>
				</button>

				{mode === "login" ? (
					<p className={`mt-2`}>
						New here?{" "}
						<a
							onClick={() => setMode("signup")}
							className={`
							text-blue-500 hover:text-blue-700 font-medium
							cursor-pointer hover:underline
						`}
						>
							Click here to sign up!
						</a>
					</p>
				) : (
					<p className={`mt-2`}>
						Have an account?{" "}
						<a
							onClick={() => setMode("login")}
							className={`
							text-blue-500 hover:text-blue-700 font-medium
							cursor-pointer hover:underline
						`}
						>
							Login here
						</a>
					</p>
				)}
			</div>
		</div>
	);
}
