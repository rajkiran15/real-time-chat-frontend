import { io } from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_BACKEND_URL;

class SocketService {
  constructor() {
    if (!SocketService.instance) {
      this.socket = io(SOCKET_URL);
      SocketService.instance = this;
    }
    return SocketService.instance;
  }

  getSocket() {
    return this.socket;
  }
}

const socketInstance = new SocketService().getSocket();
export default socketInstance;
