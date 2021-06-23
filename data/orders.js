const orders = [
  {
    name: "Bruce Wayne",
    orderNumber: "FDS-5551111",
    SKUs: [12142, 70084, 5555],
    tags: ["24 Hour Hold"],
    total: 500,
  },
  {
    name: "Don Wright",
    orderNumber: "FDS-6540121",
    SKUs: [12457, 121214, 5555],
    tags: [],
    total: 985,
  },
  {
    name: "Billy Batson",
    orderNumber: "FDS-7412541",
    SKUs: [65214, 88874, 32562],
    tags: ["BackOrder"],
    total: 50,
  },
  {
    name: "Barbara Gordon",
    orderNumber: "FDS-111222",
    SKUs: [666555, 85525],
    tags: [],
    total: 23.89,
  },
  {
    name: "Tim Porter",
    orderNumber: "FDS-512412",
    SKUs: ["1245-SQ0100"],
    tags: ["24 Hour Hold"],
    total: 54.95,
  },
  {
    name: "Steven Rogers",
    orderNumber: "FDS-2365214",
    SKUs: ["75508-SQ050", 121214, 65040],
    tags: ["24 Hour Hold"],
    total: 98.54,
  },
  {
    name: "Matthew Michael Murdock",
    orderNumber: "FDS-39581245",
    SKUs: [666555],
    tags: ["Invalid Address"],
    total: 78.34,
  },
];

module.exports = { orders };
