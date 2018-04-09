import SocketConection from './SocketConnection/index';
import StompConfig from './SocketConnection/StompConfig';
import ExchangeService from './ExchangeService/ExchangeService';

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
            exchangeServiceInstance = new ExchangeService(ServiceFactory.getStompInstance(), '/fx/prices');
        }
        return exchangeServiceInstance;
    }

}

export default ServiceFactory;