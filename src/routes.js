const routes = [
  {
    api: "/signup",
    methods: ["post"],
    url: "http://localhost:3001/api/users/signup",
    isAuthenticated: false,
    microservice: "IDP",
  },
  {
    api: "/login",
    methods: ["post"],
    url: "http://localhost:3001/api/users/login",
    isAuthenticated: false,
    microservice: "IDP",
  },
  {
    api: "/profile",
    methods: ["get", "patch"],
    url: "http://localhost:3001/api/users/profile",
    isAuthenticated: true,
    microservice: "IDP",
  },
  {
    api: "/videos",
    methods: ["get"],
    url: "http://localhost:3002/api/videos",
    isAuthenticated: false,
    microservice: "Video Provider",
  },
  {
    api: "/videos/:id",
    methods: ["get"],
    url: "http://localhost:3002/api/videos",
    isAuthenticated: true,
    microservice: "Video Provider",
  },
  {
    api: "/comments",
    methods: ["post"],
    url: "http://localhost:3002/api/comments",
    isAuthenticated: true,
    microservice: "Video Provider",
  },
  {
    api: "/comments/:id",
    methods: ["post", "get", "patch"],
    url: "http://localhost:3002/api/comments",
    isAuthenticated: true,
    microservice: "Video Provider",
  },
  {
    api: "/ratings/:id",
    methods: ["post"],
    url: "http://localhost:3002/api/ratings",
    isAuthenticated: true,
    microservice: "Video Provider",
  },
];

module.exports = routes;