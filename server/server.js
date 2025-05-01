import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/webhooks.js";
import * as Sentry from "@sentry/node";
import "./config/instrument.js";
// add
 import { clerkMiddleware, requireAuth } from "@clerk/express";

// Initialize Express
const app = express();
// Port
const PORT = process.env.PORT || 5000;

// Connect to Database
await connectDB();
await connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

// Routes
app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
// add middlerware
app.use("/api/users", requireAuth(),userRoutes);
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);


Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

