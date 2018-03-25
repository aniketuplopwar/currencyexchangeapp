import EXCHANGE_TABLE_HEADERS from './ExchangeTableHeaders';
import DataTable from './DataTable';


class ExchangeTable {
    constructor(graph){
        this.graph = graph;
    }

    render(state){
        const rows = state.currencyPairArray ? state.currencyPairArray : [];

        rows.map((row)=>{
            row.midPriceGraph = this.graph.draw(row.midPrice);
            return row;
        });

        return DataTable({
                colInfo: EXCHANGE_TABLE_HEADERS, 
                rowInfo: rows, 
                sortByCol: 'lastChangeBid'
            });
    }
}

export default ExchangeTable;