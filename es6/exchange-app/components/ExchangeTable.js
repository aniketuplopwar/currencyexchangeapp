import EXCHANGE_TABLE_HEADERS from './ExchangeTableHeaders';

export default class ExchangeTable {

    constructor(container, graph){
        this.graph = graph;
        this.container = container;
        this.colInfo = EXCHANGE_TABLE_HEADERS;
    }

    init(){
        this.table = document.createElement('TABLE');
        this.tHead = document.createElement('THEAD');
        this.tBody = document.createElement('TBODY');

        this.table.appendChild(this.tHead);
        this.table.appendChild(this.tBody);
        this.renderTableHeader(this.colInfo);

        this.container.appendChild(this.table);
    }

    renderTableHeader (headerList) {
        const tr = document.createElement('tr');

        headerList.map(header => {
            tr.appendChild(this.renderCell('TH', header.label))
        });

        this.tHead.appendChild(tr);
    }

    renderTableBody(rows, headerList, sortByCol) {
        rows = this.sortAscending(rows, sortByCol);

        this.tBody.innerHTML = '';
        rows.map((row) => {
            const tr = document.createElement('tr');
            headerList.map(header => {
                tr.appendChild(this.renderCell('TD', row[header.dataField]))
            });
            this.tBody.appendChild(tr);
        });
    }

    sortAscending(rows, sortBy) {
        if (!sortBy || rows.length === 0) return rows;

        if(typeof rows[0][sortBy] == 'string') {
                return rows.sort((a, b) => {
                    return a[sortBy] > b[sortBy] ? 1 : -1;
                });
        }

        return rows.sort((a, b) => {
            return a[sortBy] - b[sortBy];
        });
    }


    renderCell(elementType, content){
        const cell = document.createElement(elementType);
        content instanceof HTMLElement ? cell.appendChild(content) : cell.innerHTML = content;
        return cell;
    }


    update(rows){
        rows.map((row)=>{
            row.midPriceGraph = this.graph.draw(row.midPrice);
            return row;
        });

        this.renderTableBody(rows, this.colInfo, 'lastChangeBid');
    }
}
