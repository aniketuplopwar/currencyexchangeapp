import SocketConection from './SocketConnection';
import StompConfig from './SocketConnection/StompConfig';
import Service from '../framework/Service';

let stompInstance,
    exchangeServiceInstance;


class ServiceFactory {
    static getStompInstance() {
        if (!stompInstance) {
            stompInstance = new SocketConection(Stomp, StompConfig.BASE_URL);
        }
        return stompInstance;
    }

    static getExchangeServiceInstance(){
        if(!exchangeServiceInstance){
            exchangeServiceInstance = new Service(ServiceFactory.getStompInstance(), '/fx/prices');
        }
        return exchangeServiceInstance;
    }

}

export default ServiceFactory;