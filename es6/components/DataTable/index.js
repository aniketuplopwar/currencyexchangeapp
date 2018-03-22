
const DataTable = ({colInfo, rowInfo})=>{
    const table = document.createElement('table');
    const tHead = document.createElement('thead');
    const tBody = document.createElement('tbody');
    

    const createTableHeader = (thead, headerList)=>{
        const tr = document.createElement('tr');
        
        return headerList && headerList.reduce((thead, header)=>{
            const th = document.createElement('th');
            th.innerHTML = header.label;
            thead.appendChild(th);
            return thead;
        },thead);
    };

    const createTableBody = (tBody, rows, headerList)=>{
        return rows && rows.reduce((tBody, row)=>{
            const tr = document.createElement('tr');
            headerList.map((header)=>{
                const td = document.createElement('td');
                td.innerHTML = row[header.dataField];
                tr.appendChild(td);
            });
            tBody.appendChild(tr);
            return tBody;
        }, tBody);
    };
    
    
    const headers = createTableHeader(tHead, colInfo);
    const body = createTableBody(tBody, rowInfo, colInfo)

    table.appendChild(tHead);
    table.appendChild(tBody);
    return table;
};


export default DataTable;