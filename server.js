const app = require("express")();
const cors = require("cors");
const server = require("http").createServer(app);
const io= require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("chat message", (msg) => {
       io.emit("chat message", msg);
    });

    socket.on("disconnect", () => { 
        console.log("user disconnected");
    });
});

server.listen(8080, () => 
    console.log("server started"));