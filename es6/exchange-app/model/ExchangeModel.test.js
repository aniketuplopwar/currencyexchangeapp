import {createMockService} from '../../testHelper/testHelper';
import ExchangeModel from './ExchangeModel';

describe('Exchange Model', ()=>{
    let exchangeModel;

    beforeEach(()=>{
        exchangeModel = new ExchangeModel();
    })

    it('should create a new entry in currencyPairMap  when a new entry is received',()=>{
        const updatedModel = exchangeModel.update({body:'{"name": "gbpusd", "bestBid": 1, "bestAsk": 2  }'});

        expect(Object.keys(updatedModel).length).toBe(1);

    });

    it('should update currencyPairArray whenever currencyPairMap is updated', ()=>{

        const updatedModel = exchangeModel.update({body:'{"name": "gbpusd"}'});

        expect(updatedModel.length).toBe(1);
    });

    it('should calculate and store the mid price as avg of bestBid and bestAsk in entry under currencyPairMap when information is received', ()=>{
        const updatedModel = exchangeModel.update({body:'{"name": "gbpusd", "bestBid": 2.0, "bestAsk": 4.0}'});
        const midPriceArr = updatedModel[0]['midPrice'];

        expect(updatedModel[0].name).toBe('gbpusd');
        expect(midPriceArr.length).toBe(1);
        expect(Math.floor(midPriceArr[0])).toBe(3);
    });

    it('should update the mid price array and add a new entry  for the pair of currency when information is received', ()=>{
        let updatedModel ;
        updatedModel = exchangeModel.update({body:'{"name": "gbpusd", "bestBid": 2.0, "bestAsk": 4.0}'});
        updatedModel = exchangeModel.update({body:'{"name": "gbpusd", "bestBid": 6.0, "bestAsk": 4.0}'});
        const midPriceArr = updatedModel[0]['midPrice'];

        expect(midPriceArr.length).toBe(2);
        expect(Math.floor(midPriceArr[0])).toBe(3);
        expect(Math.floor(midPriceArr[1])).toBe(5);
    });

    it('should store mid price with time stamp when receive a row information', ()=>{
        let updatedModel ;
        updatedModel = exchangeModel.update({body:'{"name": "gbpusd", "bestBid": 2.0, "bestAsk": 4.0}'});
        updatedModel = exchangeModel.update({body:'{"name": "gbpusd", "bestBid": 6.0, "bestAsk": 4.0}'});
        const midPriceWithTimeStampArr = updatedModel[0]['midPriceWithTimeStamp'];

        expect(midPriceWithTimeStampArr.length).toBe(2);
        expect(typeof midPriceWithTimeStampArr[0]['timestamp']).toBe('number');
    });

    it('should remove mid price which was present more than prescribed time',()=>{
        let updatedModel ;
        updatedModel = exchangeModel.update({body:'{"name": "gbpusd", "bestBid": 2.0, "bestAsk": 4.0}'});
        let timeAtTheTimeOfInsertion = new Date().getTime();
        let currentTime = timeAtTheTimeOfInsertion + 101;
        exchangeModel.filterMidPrice(currentTime, 100);
        const midPriceWithTimeStampArr = updatedModel[0]['midPriceWithTimeStamp'];

        expect(midPriceWithTimeStampArr.length).toBe(0);


    })
});