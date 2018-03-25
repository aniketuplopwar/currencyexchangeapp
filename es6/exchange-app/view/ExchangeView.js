import View from "../../framework/View";
import ExchangeTable from "./components/ExchangeTable";
import SparklineGraph from "./components/SparklineGraph";

export default class ExchangeView extends View {
    constructor(containerId){
        super(containerId);
    }

    prepareView(){
        const exchangeTable = this.prepareExchangeTable(this.prepareGraph());
        return exchangeTable;
    }

    prepareExchangeTable(graph){
        return new ExchangeTable(graph);
    }

    prepareGraph(){
        return new SparklineGraph();
    }

}