// @ts-nocheck

import User from "../../model/User";
import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import route from "next/router";
import Cookies from "js-cookie";

interface AuthContextProps {
	user?: User;
    loading?: boolean
	signup?: (email: string, password: string) => Promise<void>;
	login?: (email: string, password: string) => Promise<void>
	loginGoogle?: () => Promise<void>;
	logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

async function normalizedUser(firebaseUser: firebase.User): Promise<User> {
	const token = await firebaseUser.getIdToken();


	return {
		uid: firebaseUser.uid,
		name: firebaseUser.displayName as string,
		email: firebaseUser.email as string,
		token,
		
		provider: firebaseUser.providerData[0].providerId,
		imageUrl: firebaseUser.photoURL,
	};
	
}

function manageCookie(logged: boolean) {
	if (logged) {
		Cookies.set("admin-template-arthur-auth", logged, {
			expires: 7,
		});
	} else {
		Cookies.remove("admin-template-arthur-auth");
	}
}

export function AuthProvider(props) {
	const [user, setUser] = useState<User>(null);
	const [loading, setLoading] = useState(true);

	async function logout() {
		try {
			setLoading(true);
			await firebase.auth().signOut();
			await configureSession(null);
		} finally {
			setLoading(false);
			route.push("/auth");
		}
	}

	async function configureSession(firebaseUser: any) {
		if (firebaseUser?.email) {
			const user = await normalizedUser(firebaseUser);
			setUser(user);
			manageCookie(true);
			setLoading(false);
			return user.email;
		} else {
			setUser(null);
			manageCookie(false);
			setLoading(false);
			return false;
		}
	}

	async function loginGoogle() {
		try {
			setLoading(true);
			const res = await firebase
				.auth()
				.signInWithPopup(new firebase.auth.GoogleAuthProvider());
			await configureSession(res.user);
			route.push("/");
		} finally {
			setLoading(false);
		}
	}

	async function login(email:string, password:string) {
		try {
			setLoading(true);
			const res = await firebase
				.auth().signInWithEmailAndPassword(email, password)
				
			await configureSession(res.user);
			route.push("/");
		} finally {
			setLoading(false);
		}
	}

	async function signup(email:string, password:string) {
		try {
			setLoading(true);
			const res = await firebase
				.auth().createUserWithEmailAndPassword(email, password)
				
				
			await configureSession(res.user);
			route.push("/");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {

		if (Cookies.get("admin-template-arthur-auth")) {
			const cancel = firebase.auth().onIdTokenChanged(configureSession);
			return () => cancel();
		} else {
            setLoading(false)
        }
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
                loading,
				login,
				signup,
				loginGoogle,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
