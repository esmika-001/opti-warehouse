class CORS {
  cors = () =>
    cors({
      origin: (origin, callback) => {
        if (process.env.NODE_ENV === "development") return callback(null, true);
        if (process.env.CLIENT_URL.split(", ").includes(origin)) callback(null, true);
        else callback(new Error("Not allowed by CORS"));
      },
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    });
}

module.exports = CORS;
