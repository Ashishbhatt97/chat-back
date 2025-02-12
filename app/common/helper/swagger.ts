import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My API",
    description: "API documentation for my project",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json"; // Output file
const endpointsFiles = ["./app/routes"]; // Path to API routes

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated");
});
