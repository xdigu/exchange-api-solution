import  http from 'http';
import server from './server';

const PORT = process.env.PORT || 8080;

const httpServer = http.createServer(server);

httpServer.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
