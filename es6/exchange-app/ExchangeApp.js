import ExchangeModel from './model/ExchangeModel';
import ExchangeView from  './view/ExchangeView';
import Controller from '../framework/Controller'
import Service from '../framework/Service';

export default class ExchangeApp {
    init(connection){
        const service = new Service(connection, '/fx/prices');
        const model = new ExchangeModel(service);
        const view = new ExchangeView('table-container');
        const controller =  new Controller(model, view);

        controller.init()
    }
}
