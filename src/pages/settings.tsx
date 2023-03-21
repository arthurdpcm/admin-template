import Layout from "@/components/template/Layout";
import Head from "next/head";

export default function Settings() {
	return (
		<>
			<Head>
				<title> Settings</title>

			</Head>
			<div
				className={`

      		`}
			>
				<Layout title="Settings" subtitle="Configure your settings">
					<h3>Content</h3>
				</Layout>
			</div>
		</>
	);
}
