import { app } from "./config/app";
import sneakersRouter from "./routes/sneakers";

// Rutas
app.use('/api/v1/sneakers',sneakersRouter)