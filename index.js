import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './_db.js'

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find((game) => game.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find((review) => review.id === args.id) // this means find within reviews where review.id equals to args.id amd return that matching review
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find((author) => author.id === args.id)
        }
    },
    Game: {
        reviews(parent ) {
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent ) {
            return db.reviews.filter((review) => review.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((a) => a.id === parent.id)
        },
        game(parent) {
            return db.games.find((g) => g.id === parent.id)
        }
    },
    Mutation: {
        deleteGame(_, args) { 
            db.games = db.games.filter((g) => g.id !== args.id)
            return db.games
        },
        addGame(_, args) {
            let game = {
                ...args.game, 
                id: Math.floor(Math.random() * 100000).toString()
            }
            db.games.push(game)
            return game
        },
        updateGame(_, args) {
            db.games = db.games.map((g) => {
                if(g.id === args.id){
                    return { ...g, ...args.edits}
                }
                return g
            })
            
            return db.games.find((g) => args.id === g.id)
        }
    },
    
}

//GrapQL server set up
const server = new ApolloServer({
    // descriptions of data types and their relationship they have other data types aka Schemas
    // resolver functions that determines how to respond to queries of data on the graph
    typeDefs, 
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`Server ready at: ${url}`)
console.log('GraphQL server started at 4000')