import Layout from "@/components/template/Layout";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title> Home</title>

			</Head>
			<div
				className={`

      		`}
			>
				<Layout title="Home" subtitle="Creating Admin Template">
					<h3>Content</h3>
				</Layout>
			</div>
		</>
	);
}
