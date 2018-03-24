import View from './framework/View';
import Controller from './framework/Controller';
import Service from './framework/Service';

import ExchangeModel from './models/ExchangeModel';

import ConnectionFactory from './services/ConnectionFactory';

import ExchangeTable from './components/ExchangeTable';
import SparklineGraph from './components/SparklineGraph';

class App {

    init(){
        const socketInstance = ConnectionFactory.getStompInstance();
        const exchangeTable = new ExchangeTable(new SparklineGraph());
        
        const exchangeService = new Service(socketInstance, '/fx/prices');

        const exchangeModel = new ExchangeModel(exchangeService);
        
        const exchangeView = new View(exchangeTable, 'table-container');

        const exchangeController = new Controller(exchangeModel, exchangeView);
        
        socketInstance.connect().then(()=>{
            exchangeController.init();
        })
    }

}


const exchangeApp = new App();
exchangeApp.init();