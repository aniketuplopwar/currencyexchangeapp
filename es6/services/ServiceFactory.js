import StompService from './StompService';
import StompConfig from './StompService/StompConfig';

let stompInstance;


class ServiceFactory {
    static getStompInstance() {
        if (!stompInstance) {
            stompInstance = new StompService(Stomp, StompConfig.BASE_URL);
        }
        return stompInstance;
    }
}

export default ServiceFactory;