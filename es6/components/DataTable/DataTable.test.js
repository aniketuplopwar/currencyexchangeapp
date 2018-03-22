import * as matchers from 'jest-jquery-matchers';
const $ = require('jquery');

import DataTable from './index';

describe('Exchange table',()=>{
    const colInfo = [
        {
            label:'Name',
            dataField: 'name'
        },
        {
            label: 'Age',
            dataField: 'age'
        },
        {
            label: 'City',
            dataField: 'city'
        }
    ];

    beforeEach(function () {
        jest.addMatchers(matchers);
    });

    it('should render a table when rendered', ()=> {

        expect(DataTable({})).toHaveTag('table');
    });

    it('should render a table with headers as Name, Age, city when colInfo is provided', ()=> {

        const table = $(DataTable({colInfo})),
                header = table.find('thead'),
                th = table.find('th');
        expect(header.length).toBe(1);
        expect($(th[0]).html()).toBe('Name');
        expect($(th[1]).html()).toBe('Age');
        expect($(th[2]).html()).toBe('City');
    });

    it('should render a table with header when no row information is available', ()=> {
        
        const table = $(DataTable({colInfo})),
                header = table.find('thead'),
                tr = table.find('tr');
        expect(header.length).toBe(1);
        expect(tr.length).toBe(0);
    });

    it('should render a table with 1 row when one row information is provided', ()=> {
        const rowInfo = [
            {
                "name": "Aniket",
                "age": 30,
                "city": "Pune"
            }
        ]
        
        const table = $(DataTable({colInfo, rowInfo})),
                header = table.find('thead'),
                tr = table.find('tr'),
                cells = $(tr[0]).find('td');
        expect(header.length).toBe(1);
        expect(tr.length).toBe(1);
        expect($(cells[0]).html()).toBe('Aniket');
        expect($(cells[1]).html()).toBe('30');
        expect($(cells[2]).html()).toBe('Pune');
    });

    it('should render a table with multiple row when multiple row information is provided', ()=> {
        const rowInfo = [
            {
                "name": "Aniket",
                "age": 30,
                "city": "Pune"
            },
            {
                "name": "Abhishek",
                "age": 29,
                "city": "pune"
            }

        ]
        
        const table = $(DataTable({colInfo, rowInfo})),
                header = table.find('thead'),
                tr = table.find('tr');
        expect(header.length).toBe(1);
        expect(tr.length).toBe(2);
    });
});
