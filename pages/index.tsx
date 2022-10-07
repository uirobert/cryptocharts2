import Head from "next/head";
import Script from "next/script";
import Dashboard from "../components/Dashboard";

import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "https://localhost:3000/api/graphql",
	cache: new InMemoryCache(),
});

export default function Index() {
	return (
		<>
			<Dashboard />
		</>
	);
}
