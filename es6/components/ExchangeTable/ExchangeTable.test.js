import * as matchers from 'jest-jquery-matchers';
const $ = require('jquery');

import ExchangeTable from './index';
import EXCHANGE_TABLE_HEADERS from './ExchangeTableHeaders';

describe('Exchange Table', ()=>{
    let exchangeTable;

    beforeAll(()=>{
        exchangeTable = new ExchangeTable();
    });

    it('should render a table with headers as Name, Best Bid Price, Best Ask Price, Best Bid Last Changed, Best Ask Last Changed, Trend when column information is provided',()=>{
        const table = $(exchangeTable.render()),
        header = table.find('thead'),
        th = table.find('th');
        expect(header.length).toBe(1);
        EXCHANGE_TABLE_HEADERS.map((header, idx)=>{
            expect($(th[idx]).html()).toBe(header.label);
        });
    });


    it('should add a row when a new currency combination is sent', ()=>{
        const table = exchangeTable.render([{
            "name": "gbpeur",
            "bestBid": 1.2769288230817817,
            "bestAsk": 1.3198532657938347,
            "openBid": 1.2730610209098692,
            "openAsk": 1.302938979090131,
            "lastChangeAsk": 0.06670269836371356,
            "lastChangeBid": 0.04403160636520176
        }]);
         const rows = $(table).find('tr');
        expect(rows.length).toBe(1);
    });

    it('should add a row when an update is sent for existing currency combination in the table', ()=>{
        exchangeTable.render([{
            "name": "gbpeur",
            "bestBid": 1.2769288230817817,
            "bestAsk": 1.3198532657938347,
            "openBid": 1.2730610209098692,
            "openAsk": 1.302938979090131,
            "lastChangeAsk": 0.06670269836371356,
            "lastChangeBid": 0.04403160636520176
        }]);

        const table = exchangeTable.render([{
            "name": "gbpeur",
            "bestBid": 1.2567893,
            "bestAsk": 1.3198532657938347,
            "openBid": 1.2730610209098692,
            "openAsk": 1.302938979090131,
            "lastChangeAsk": 0.06670269836371356,
            "lastChangeBid": 0.04403160636520176
        }]);
        const rows = $(table).find('tr'),
             renderdBestBid = rows.find('td')[1]

        expect(rows.length).toBe(1);
        expect($(renderdBestBid).html()).toBe('1.2567893');
    });

    it('should be sorted ascending on lastChangeBid when given more than one row', ()=>{

        const table = exchangeTable.render([
            {
                "name": "gbpeur",
                "bestBid": 1.2769288230817817,
                "bestAsk": 1.3198532657938347,
                "openBid": 1.2730610209098692,
                "openAsk": 1.302938979090131,
                "lastChangeAsk": 0.06670269836371356,
                "lastChangeBid": 0.06403160636520176
            },
            {
                "name": "gbpinr",
                "bestBid": 1.2769288230817817,
                "bestAsk": 1.3198532657938347,
                "openBid": 1.2730610209098692,
                "openAsk": 1.302938979090131,
                "lastChangeAsk": 0.06670269836371356,
                "lastChangeBid": 0.07403160636520176
            },
            {
                "name": "gbpjpy",
                "bestBid": 1.2567893,
                "bestAsk": 1.3198532657938347,
                "openBid": 1.2730610209098692,
                "openAsk": 1.302938979090131,
                "lastChangeAsk": 0.06670269836371356,
                "lastChangeBid": 0.05403160636520176
            }
        ]);

        const rows = $(table).find('tr'),
              row0Col0 = $(rows[0]).find('td')[0],
              row1Col0 = $(rows[1]).find('td')[0],
              row2Col0 = $(rows[2]).find('td')[0];

        expect(rows.length).toBe(3);
        expect($(row0Col0).html()).toBe('gbpjpy');
        expect($(row1Col0).html()).toBe('gbpeur');
        expect($(row2Col0).html()).toBe('gbpinr');
    });
});