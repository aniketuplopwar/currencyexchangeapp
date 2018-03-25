import ExchangeModel from './model/ExchangeModel';
import ExchangeView from  './view/ExchangeView';
import Controller from '../framework/Controller'
import ServiceFactory from '../services/ServiceFactory';

export default class ExchangeApp {
    init(){
        const service = ServiceFactory.getExchangeServiceInstance();
        const model = new ExchangeModel(service);
        const view = new ExchangeView('table-container');
        const controller =  new Controller(model, view);

        controller.init()
    }
}
