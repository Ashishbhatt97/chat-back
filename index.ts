import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import errorHandler from "./app/common/middleware/error-handler.middleware";
import routes from "./app/routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./app/common/helper/swagger-output.json";
import { type IUser } from "./app/users/user.dto";

declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> {}
    interface Request {
      user?: User;
    }
  }
}

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Passport Middleware
app.use(passport.initialize());

// Routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Global Error Handler
app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
