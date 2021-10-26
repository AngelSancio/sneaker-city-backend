import { app } from "./config/app";
import directionsRouter from "./routes/directions";

// Rutas
app.use('/api/directions',directionsRouter)