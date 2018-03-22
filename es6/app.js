import AppController from './AppController';
import ServiceFactory from './services/ServiceFactory';
import ExchangeTable from './components/ExchangeTable';

const stompInstance = ServiceFactory.getStompInstance();
const exchangeTable = new ExchangeTable();

stompInstance.connect().then(()=>{
    const controller = new AppController(stompInstance, '/fx/prices', exchangeTable);
    controller.init();
})