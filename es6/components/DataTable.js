
const DataTable = ({colInfo, rowInfo = [], sortByCol})=>{
    const table = document.createElement('table');
    const tHead = document.createElement('thead');
    const tBody = document.createElement('tbody');


    const sort = (rows, sortBy)=> {
        if(!sortBy || rows.length === 0) return rows;
        switch(typeof rows[0][sortBy]){
            case 'string':
                return rows.sort((a, b) => {
                    return  a[sortBy] > b[sortBy] ? 1 : -1;
                });
            case 'number':
                return rows.sort((a, b) => {
                    return  a[sortBy] - b[sortBy];
                });
        }
        return rows.sort((a, b) => {
            return  a[sortBy] - b[sortBy];
        });
    };


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
                if(typeof row[header.dataField] !== 'object'){
                    td.innerHTML = row[header.dataField];
                }else{
                    td.appendChild(row[header.dataField]);
                }
                
                tr.appendChild(td);
            });
            tBody.appendChild(tr);
            return tBody;
        }, tBody);
    };

    
    rowInfo = sort(rowInfo, sortByCol);

    const headers = createTableHeader(tHead, colInfo);
    const body = createTableBody(tBody, rowInfo, colInfo);


    table.appendChild(tHead);
    table.appendChild(tBody);

    return table;
};


export default DataTable;