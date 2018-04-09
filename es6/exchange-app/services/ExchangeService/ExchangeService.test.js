import ExchangeService from './ExchangeService';
import { createMockConnection } from '../../../testHelper/testHelper';

describe('Exchange Service',()=>{
    let exchangeService,
        connection,
        topic;

    beforeAll(()=>{
        connection = createMockConnection();
        topic = 'some-topic';
        exchangeService = new ExchangeService(connection, topic);
    });

    it('should notify to all subscribed observers when required',()=>{
        const observer1 = jest.fn().mockImplementation(()=>{});
        const observer2 = jest.fn().mockImplementation(()=>{});

        exchangeService.subscribe(observer1);
        exchangeService.subscribe(observer2);
        exchangeService.notifyAll('some message');

        expect(observer1).toHaveBeenCalled();
        expect(observer2).toHaveBeenCalled();
    });

    it('should initialize connection when initialized', ()=>{
        exchangeService.init();
        expect(connection.initialize).toHaveBeenCalled();
    });

    it('should subcribe to the given topic, on the given connection when connection is initialized',()=>{
        exchangeService.init();
        connection.initialize().then(()=>{
            expect(connection.subscribe).toHaveBeenCalledWith('some-topic', exchangeService.notifyAll);
        });

    })
});