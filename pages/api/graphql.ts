import { gql, ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse, IncomingMessage } from "http";

const allData = require("../Data/all_currencies_table.json");

console.log(allData[0]);

const typeDefs = gql`
	type Query {
		getCoins: [Coin]!
	}

	type Mutation {
		createcoin(input: CreateCoinInput): [Coin]
		addtolist(symbol: String): Coin
	}

	type Coin {
		name: String
		symbol: String
		market_cap: Int
		Price: Int
		Ciculating: Int
		Volume24: Int
		Volume7: Int
	}

	input CreateCoinInput {
		name: String
		symbol: String
		market_cap: Int
		Price: Int
		Ciculating: Int
		Volume24: Int
		Volume7: Int
	}

	type User {
		username: String
		email: String
		watching: [Coin]
	}
`;

const resolvers = {
	Query: {
		getCoins: () => {
			return [
				{
					symbol: "BTC",
					icon_url: "/",
					price: "8893",
					name: "Charts",
					max_supply: "4000",
				},
			];
		},
	},
};

export const playground: Boolean = true;
const apolloServer = new ApolloServer({
	typeDefs,

	resolvers,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(
	req: MicroRequest,
	res: ServerResponse<IncomingMessage>
) {
	await startServer;
	await apolloServer.createHandler({
		path: "/api/graphql",
	})(req, res);
}

export const config = {
	api: {
		bodyParser: false,
	},
};
