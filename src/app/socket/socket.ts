import { Server } from "socket.io";
import { createServer } from "http";
import { rafoServ } from "../data";
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173'
  }
});
io.on('connection', (socket) => {
    console.log('Client connected');
  
    socket.on('requestPlanetData', () => {
      console.log('Received request for message');
      socket.emit('planetDataFromSocket', rafoServ.getChartDataForPlanets());
    });

    socket.on('requestSystemData', () => {
        console.log("recieved request for system data")
        socket.emit('systemDataFromSocket', rafoServ.getChartDataForSystems());
    })

    socket.on('requestShardData', () => {
        console.log("recieved request for shard data")
        socket.emit('shardDataFromSocket', rafoServ.getChartDataForShards())
    })


    socket.on('requestDateData', () => {
        console.log("recieved request for date data")
        socket.emit('dateDataFromSocket', rafoServ.getChartDataForDates())
    })
  });

io.listen(5000)