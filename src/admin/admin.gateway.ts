import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets"
import {Server} from "socket.io";

@WebSocketGateway({
    cors: true,
    origin: '*'
})

export class AdminGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage("server_message")
    listenForMessages(@MessageBody() data: string) {
        this.server.sockets.emit("server_message", "hi");
    }

    sendMessageToStudent(data) {
        try {
            this.server.sockets.emit("server_message", data);
        } catch(error) {
            console.log("Error", error);
        }
    }
}