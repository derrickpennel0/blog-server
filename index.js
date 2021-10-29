const { ApolloServer, gql } = require("apollo-server")

const port = process.env.PORT || 5005;


// This is our blog which conatins all the information of the author
const blogs = [
    // {
    //    title: "Client server Computing",
    //    author: "Lalit Kumar",
    // aboutAuthor: "Manager of Welch Company",
    //    description: "The market is massive and meeting a need for this type of information is difficult. Young ones aren’t exactly rolling in cash. They may have had to give up work and are now relying on just one wage coming in, so the need to be more frugal with everyday living is a must.",
    //    date: "20th October,2021",
    //    likes: 1,
    //    commment:[],
    //    replies:[]
    //    banner: "Yes, this is the banner"
    // },

    {
        title: "Market massiveness",
        author: "Kweku Mensah",
        aboutAuthor: "CEO of Ghana farm LTD",
        description: "The market is now massive and meeting a need for this type of information. Studnets aren’t exactly rolling in cash. They may have had to give up work and are now relying on just one wage coming in, so the need to be more frugal with everyday living is a must.",
        date: "24th October,2021",
        likes: 12,
        commment: [],
        replies: [],
        banner: "Yes, this is the banner"
    

    },
    {
        title: "Tales of Gbawe DA",
        author: "Derrick Gyasi",
        aboutAuthor: "Teacher at Gbawe DA School",
        description: "There’s also a section on their that shows guys how to make a little more cash on top of their monthly day job wage, which is vital in some cases just to keep your head above water.  A lot of new dads have the added stress of not having their wives’ or girlfriends’ wage coming in each month, due to the temporary career change in being a full time mum of a baby. ",
        date: "21st October,2021",
        likes: 14,
        commment: [],
        replies: [],
        banner: "Yes, this is the banner"

    },
    {
        title: "The North Face",
        author: "Mark Zane",
        aboutAuthor: "Owner of The North Face",
        description: "People across the country really like the way The North Face comes up with new products. Their socks,shirts, shorts, jerseys, shoes and tanks tops are all comfortable",
        date: "15th June,2021",
        likes: 5,
        commment: [],
        replies: [],
        banner: "Yes, this is the banner"

    },
    {
        title: "Puma brand",
        author: "Kobby Emma",
        aboutAuthor: "Owner of Puma",
        description: "People across the country really like the way Puma comes up with new products. Their socks,shirts, shorts, jerseys, shoes and tanks tops are all comfortable",
        date: "17th June,2021",
        likes: 9,
        commment: [],
        replies: [],
        banner: "Yes, this is the banner"
    },
    {
        title: "The Adidas Company",
        author: "Derrick Adjei-Mensah",
        aboutAuthor: "Owner of adidas Company",
        description: "People across the country really like the way Adidas comes up with new products. Their socks,shirts, shorts, jerseys, shoes and tanks tops are all comfortable",
        date: "19th June,2021",
        likes: 4,
        commment: [],
        replies: [],
        banner: "Yes, this is the banner"

    },
    {
        title: "Market massiveness",
        author: "Kweku Mensah",
        aboutAuthor: "CEO of Ghana farm LTD",
        description: "The market is now massive and meeting a need for this type of information. Studnets aren’t exactly rolling in cash. They may have had to give up work and are now relying on just one wage coming in, so the need to be more frugal with everyday living is a must.",
        date: "24th October,2021",
        likes: 12,
        commment: [],
        replies: [],
        banner: "Yes, this is the banner"
    },
];

// Schemas to shape our code 
const schemas = gql `
   type Blog {
       title: String!
       author: String
       aboutAuthor: String!
       date: String
       description: String!
       likes: Int 
       banner: String
       comment: [String!]
       replies: [String!]

   }

   type Query {
       blogs: [Blog]
       blog(title: String!):Blog
       Readblog(
           title:String!
       ):Blog
   }

   type Mutation {
       createBlog(
        title: String!
       aboutAuthor: String!
       author: String!
       date: String
       description: String!
       likes: Int
       banner: String
       comment: [String]
      replies: [String]
       ):Blog
 
       updateBlog(title: String!, 
       description: String!): Blog
    deleteBlog(title: String!, 
    description: String): Blog
    likeBlog(title: String!): Blog
    unlikeBlog(title: String!): Blog
    comment(title: String!): Blog
    deleteComment(title: String!): Blog
    replyingComment(title: String!): Blog

   }
   `;
// This is the shape of our code which we can the RESOLVERS
const blogsResolvers = {
    Query: {
        blogs: () => blogs,
        Readblog: (parent,args)=>
        blogs.find((blog)=>blog.title===args.title? blog.description:"There is no content found")

    },

    Mutation: {
        createBlog: (parent, args) => {
            const { title, author, aboutAuthor, date, description, likes, comment, replies } = args;
            const blog = { title, author, aboutAuthor, date, description, likes, comment, replies };
            blogs.push(blog);
            return blog;
        },
         updateBlog: (parent, args) => {
      const { title, decription } = args;
      const locationOfBlog = blogs.findIndex((blog) => blog.title === args.title);
      blogs[locationOfBlog].description = description;
      return args;
    },

    deleteBlog: (parent, args) => {
      const locationOfBlog = blogs.findIndex((blog) => blog.title === args.title);
      blogs.splice(locationOfBlog, 2);
      return args;
    },

    likeBlog: (parent, args) => {
      const locationOfBlog = blogs.findIndex((blog) => blog.title === args.title);
      blogs[locationOfBlog].likes += 1;
    },

    unlikeBlog: (parent, args) => {
      const locationOfBlog = blogs.findIndex((blog) => blog.title === args.title);
      if (blogs[locationOfBlog].likes <= 0) {
        console.log("There is nothing you can unlike here");
      } else {
        blogs[locationOfBlog].likes -= 1;
      }
      return args;
    },
  },
};

const server = new ApolloServer({
    typeDefs: schemas,
    resolvers: blogsResolvers,
    playground: true,
    introspection: true,
});
server.listen(port).then(({ url }) => {
    console.log(`Server ready at ${url} and ready to be used`);
}).catch(err => console.log(err.message));