import SocketConection from './SocketConnection';
import StompConfig from './SocketConnection/StompConfig';

let stompInstance;


class ConnectionFactory {
    static getStompInstance() {
        if (!stompInstance) {
            stompInstance = new SocketConection(Stomp, StompConfig.BASE_URL);
        }
        return stompInstance;
    }
}

export default ConnectionFactory;