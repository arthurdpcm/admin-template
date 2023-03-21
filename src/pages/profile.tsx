import Layout from "@/components/template/Layout";
import Head from "next/head";

export default function Profile() {
	return (
		<>
			<Head>
				<title>Profile</title>

			</Head>


			<div
				className={`

      		`}
			>
				<Layout title="Profile" subtitle="Manage your user informations!">
					<h1>Profile</h1>
				</Layout>
			</div>
		</>
	);
}
