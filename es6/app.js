import ConnectionFactory from './services/ConnectionFactory';
import ExchangeApp from './exchange-app/ExchangeApp';
const socketInstance = ConnectionFactory.getStompInstance();

socketInstance.connect().then(()=>{
    const app = new ExchangeApp();
    app.init(socketInstance);
});