import {createMockService} from '../testHelper/testHelper';
import ExchangeModel from './ExchangeModel';
describe('Exchange Model', ()=>{
    let exchangeModel,
        service;

    beforeAll(()=>{
        service = createMockService();
        exchangeModel = new ExchangeModel(service);
        exchangeModel.init();
    })

    it('should create a new entry in currencyPairMap  when a new entry is received',()=>{
        let newState = {};
        const subscriber = jest.fn().mockImplementation((state)=>{
            newState = state;
        });
        exchangeModel.subscribe(subscriber);
        service.onMessage({body:'{"name": "gbpusd", "bestBid": 1, "bestAsk": 2  }'});

        expect(subscriber).toHaveBeenCalled();
        expect(Object.keys(newState.currencyPairMap).length).toBe(1);

    });

    it('should update an entry in currencyPairMap  when the received entry is already present in the map',()=>{
        let newState = {};
        const subscriber = jest.fn().mockImplementation((state)=>{
            newState = state;
        });
        exchangeModel.subscribe(subscriber);
        service.onMessage({body:'{"name": "gbpusd", "bestBid": 1, "bestAsk": 2  }'});
        service.onMessage({body:'{"name": "gbpusd", "bestBid": 2, "bestAsk": 2  }'});

        expect(Object.keys(newState.currencyPairMap).length).toBe(1);
        expect(newState.currencyPairMap.gbpusd.bestBid).toBe(2);
    });

    it('should update currencyPairArray whenever currencyPairMap is updated', ()=>{
        let newState = {};
        const subscriber = jest.fn().mockImplementation((state)=>{
            newState = state;
        });
        exchangeModel.subscribe(subscriber);
        service.onMessage({body:'{"name": "gbpusd"}'});

        expect(newState.currencyPairArray.length).toBe(1);
    });

    it('should calculate and store the mid price as avg of bestBid and bestAsk in entry under currencyPairMap when information is received', ()=>{
        exchangeModel = new ExchangeModel(service);
        exchangeModel.init();
        let newState = {};
        const subscriber = jest.fn().mockImplementation((state)=>{
            newState = state;
        });
        exchangeModel.subscribe(subscriber);
        service.onMessage({body:'{"name": "gbpusd", "bestBid": 2.0, "bestAsk": 4.0}'});
        const midPriceArr = newState.currencyPairMap['gbpusd']['midPrice'];
        expect(midPriceArr.length).toBe(1);
        expect(Math.floor(midPriceArr[0])).toBe(3);
    });

    it('should update the mid price array and add a new entry  for the pair of currencty when information is received', ()=>{
        exchangeModel = new ExchangeModel(service);
        exchangeModel.init();
        let newState = {};
        const subscriber = jest.fn().mockImplementation((state)=>{
            newState = state;
        });
        exchangeModel.subscribe(subscriber);
        service.onMessage({body:'{"name": "gbpusd", "bestBid": 2.0, "bestAsk": 4.0}'});
        service.onMessage({body:'{"name": "gbpusd", "bestBid": 6.0, "bestAsk": 4.0}'});
        const midPriceArr = newState.currencyPairMap['gbpusd']['midPrice'];
        expect(midPriceArr.length).toBe(2);
        expect(Math.floor(midPriceArr[0])).toBe(3);
        expect(Math.floor(midPriceArr[1])).toBe(5);
    });
});