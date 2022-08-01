import express from 'express';
import http from 'http';

const PORT = 8081;

const app = express();

app.use(express.json());

app.use((req, res) => {
  const { body } = req;

  console.log('a', body);

  res.send('asdf');
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
