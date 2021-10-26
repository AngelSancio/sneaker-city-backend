import { app } from "./config/app";
import sneakersRouter from "./routes/sneakers";
import cartRouter from "./routes/cart";

// Rutas
app.use('/api/v1/',sneakersRouter)
app.use('/api/v1/',cartRouter)