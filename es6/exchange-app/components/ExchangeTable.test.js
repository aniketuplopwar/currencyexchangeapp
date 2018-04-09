import * as matchers from 'jest-jquery-matchers';
import {createMockGraph} from '../../testHelper/testHelper';

import ExchangeTable from './ExchangeTable';
import EXCHANGE_TABLE_HEADERS from './ExchangeTableHeaders';

const $ = require('jquery');

describe('Exchange Table', ()=>{
    let exchangeTable,
        graph,
        container;

    beforeEach(()=>{
        container = document.createElement('div');
        container.id= "test";

        document.body.appendChild(container);
        graph = createMockGraph();
        exchangeTable = new ExchangeTable(container, graph);
        exchangeTable.init();
    });


   it('should render a table with headers as Name, Best Bid Price, Best Ask Price, Best Bid Last Changed, Best Ask Last Changed, Mid Price Graph when initialized',()=>{
        const header = $(container).find('thead'),
            th = $(container).find('th');

        expect(header.length).toBe(1);
        EXCHANGE_TABLE_HEADERS.map((header, idx)=>{
            expect($(th[idx]).html()).toBe(header.label);
        });
    });

    it('should add a row when a new currency combination is sent', ()=>{
        exchangeTable.update([{
                                    "name": "gbpeur",
                                    "bestBid": 1.2769288230817817,
                                    "bestAsk": 1.3198532657938347,
                                    "openBid": 1.2730610209098692,
                                    "openAsk": 1.302938979090131,
                                    "lastChangeAsk": 0.06670269836371356,
                                    "lastChangeBid": 0.04403160636520176
                                }]);
        const rows = $(container).find('tbody > tr');

        expect(rows.length).toBe(1);
    });

    it('should be sorted ascending on lastChangeBid when given more than one row', ()=>{
         exchangeTable.update([
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
        
        const rows = $(container).find('tbody > tr'),
              row0Col0 = $(rows[0]).find('td')[0],
              row1Col0 = $(rows[1]).find('td')[0],
              row2Col0 = $(rows[2]).find('td')[0];

        expect(rows.length).toBe(3);
        expect($(row0Col0).html()).toBe('gbpjpy');
        expect($(row1Col0).html()).toBe('gbpeur');
        expect($(row2Col0).html()).toBe('gbpinr');
    });

    it('should render midPrice as graph in the table when rendered',()=>{
        const midPriceArr = [1,2,3];
        exchangeTable.update([{
                                "name": "gbpeur",
                                "bestBid": 1.2769288230817817,
                                "bestAsk": 1.3198532657938347,
                                "openBid": 1.2730610209098692,
                                "openAsk": 1.302938979090131,
                                "lastChangeAsk": 0.06670269836371356,
                                "lastChangeBid": 0.06403160636520176,
                                "midPrice": midPriceArr
                            }
                        ]);
        expect(graph.draw).toHaveBeenCalledWith(midPriceArr);
                
    });
});