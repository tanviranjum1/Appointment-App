const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const appointmentsRoutes = require("./routes/appointments");
const usersRoutes = require("./routes/users");
const teachersRoutes = require("./routes/teachers");
const studentsRoutes = require("./routes/students");

const app = express();
const port = 9291;

// connect to mongodb.
connectDB();

const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//this will allow to accept json data in the body.
app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigins = [`${process.env.REACT_APP_FRONTEND_URL}`];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );

  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/teachers", teachersRoutes);
app.use("/api/students", studentsRoutes);

app.get("/", async function (req, res) {
  res.send("GET request to homepage");
});

app.use(notFound, errorHandler);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
