import app from './app';
import { env } from './config/env';

const port = parseInt(env.PORT);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API: http://localhost:${port}/api/v1`);
});
