import ExchangeModel from './model/ExchangeModel';
import ExchangeTable from './components/ExchangeTable';
import SparklineGraph from "./components/SparklineGraph";
import ServiceFactory from './services/ServiceFactory';

export default class ExchangeApp {
    constructor(){
        this.view = new ExchangeTable(document.getElementById('table-container'), new SparklineGraph());
        this.model= new ExchangeModel();
        this.service = ServiceFactory.getExchangeServiceInstance();
    }

    init(){
        this.service.init();
        this.view.init();

        this.service.subscribe((message)=>{
            this.view.update(this.model.update(message));
        });
    }
}
