const { ApolloServer, gql } = require("apollo-server");
const POST_ADDED = "POST_ADDED";
const typeDefs = gql `
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type myData {
    id: Int
    name: String
    email: String
  }

  type myBook {
    title: String
    author: String
  }
  #mutation
  type Mutation {
    addBook(title: String): myBook
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    myBook(title: String): [myBook]
    myData(id: Int, email: String): [myData]
    #myData(email: String): [myData]
  }
`;
const books = [{
        title: "The Awakening",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
];

const myData = [{
        id: 1,
        name: "Mahesh",
        email: "mt.sparkle031@gmail.com",
    },
    {
        id: 2,
        name: "Test Mahesh",
        email: "et.sparkle031@gmail.com",
    },
    {
        id: 3,
        name: "Test 1 Mahesh",
        email: "pt.sparkle031@gmail.com",
    },
];
const myBook = [{
        title: "The Awakening",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
];
const resolvers = {
    Query: {
        books: () => book,
        myData: (parent, args, ctx, info) => {
            if (args.id) {
                return myData.filter((e) => e.id === args.id);
            }
            if (args.email) {
                return myData.filter((e) => e.email === args.email);
            }
        },
        myBook: (parent, args, ctx, info) => {
            return [myBook.find((e) => e.title === args.title)];
            //@ filter  return myBook.filter((e) => e.title === args.title);
        },
    },
    Mutation: {
        addBook(parent, args, ctx, info) {
            return {
                title: args.title,
            };
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});