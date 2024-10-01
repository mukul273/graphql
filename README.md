# GraphQL

Learning GraphQL

1. GraphQL makes one to many and many to many or many to one relationship very easy,
2. Why do we need GraphQL?
   1. To avoid under and/or over fetching of the data,
   2. To have filtered approach of the data required (need to know basis) in one query,
   3. Fast data fetching without making multiple trips to server (as opposed to traditional REST API approach),
   4. Lightweight JSON query(request) and response approach,
3. It's important to know NodeJs for graphQL,
4. Let's get Started
   1. `npm init -y` in the folder that want to create the project,
   2. `npm pkg set type="module"` - this is a requirement to treat this as module,
   3. `npm install @apollo/server graphql` - apollo server dependencies install,
   4. Create [index.js](./index.js) and import apolo server,
5. Scalar types in graphql are int, float, string, boolean, ID(key for data objects),
6. `typeDefs` - descriptions of data types and their relationship they have other data types,
7. `resolvers` - resolver functions that determines how to respond to queries of data on the graph,
8. `nodemon {filename index.js for e.g.}` - restart the apollo server automaatically,
9. `input` is a special type of variable that can group together several arguments in one type, **very useful for mutations**,
10. Apollo server always runs on `http://localhost:4000/` so make sure you have that running,
11. This tutorial uses poor man's database,

## References

1. [Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started)
2. [Reference Code](https://github.com/iamshaunjp/graphql-crash-course)
3. Query examples:
   ```
   query AuthorQuery($authorId: ID!, $id: ID!, $gameId: ID! ) {
      author(id: $authorId) {
         name,
         verified
      },
      review(id: $id) {
         rating,
         content
      },
      game(id: $gameId) {
         title,
         platform
      }
   }
   ```
   ```
   query GameQuery($gameId: ID!) {
      game(id: $gameId) {
         title,
         reviews {
            rating,
            content
         }
      }
   }
   ```
4. ```
   query GameQuery($gameId: ID!, $authorId: ID!) {
      game(id: $gameId) {
         title,
         reviews {
            rating,
            content
         }
      },
      author(id: $authorId) {
         name,
         verified
         reviews {
            rating,
            content
         }
      }
   }
   ```
5. ```
   query ReviewQuery($reviewId: ID!) {
      review(id: $reviewId) {
         rating,
         content
         game {
            title,
            platform,
            reviews {
            rating
            }
         }
         author {
            name,
            verified
         }
      }
   }
   ```
6. ````
   mutation deleteMutation($deleteGameId: ID!) {
      deleteGame(id: $deleteGameId) {
         id,
         title,
         platform
      }
   }
   ````
7. ````
   mutation addGameMutation($game: AddGameInput!) {
      addGame(game: $game) {
         id,
         title,
         platform
      }
   }
   and then to check the results:
   query GameQuery($authorId: ID!) {
      games {
         id,
         title,
         platform
      }
   }
   ````
8. ""
   ````
   mutation editGameMutation($updateGameId: ID!, $edits: EditGameProps!) {
      updateGame(id: $updateGameId, edits: $edits) {
         title,
         platform
      }
   } 
   and then to check the results:
   query GameQuery($authorId: ID!) {
      games {
         id,
         title,
         platform
      }
   }
   ````
