import EXCHANGE_TABLE_HEADERS from './ExchangeTableHeaders';
import DataTable from '../DataTable';


class ExchangeTable {
    constructor(){
        this.rowsMap = {};
    }

    sortRows(rows, sortBy) {
       return rows.sort((a, b) => {
            return  a[sortBy] - b[sortBy];
        })
    }

    insertRows(rows) {
        if(rows){
            rows.map((row)=>{
                this.rowsMap[row.name] = row;
            });
        }
    }

    getRowValues(){
        return Object.keys(this.rowsMap).map((key)=>{
            return this.rowsMap[key];
        });
    }

    render(newRows) {
        this.insertRows(newRows);
        const rowInfo = this.sortRows(this.getRowValues(), 'lastChangeBid');
        

        return DataTable({colInfo: EXCHANGE_TABLE_HEADERS, rowInfo});
    }
}

export default ExchangeTable;