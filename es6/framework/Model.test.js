import Model from  './Model';
import { createMockService} from '../testHelper/testHelper';
describe('Model',()=>{
    let service, model;

    beforeAll(()=>{
        service = createMockService();
        model = new Model({}, service);
    });

    it('should initialize the given service when initialized', ()=>{
        model.init();
        expect(service.init).toHaveBeenCalled();
    });

    it('should subscribe to service events when initialized', ()=>{
        model.init();
        expect(service.subscribe).toHaveBeenCalled();
    });

    it('should pass its updated state to subscriber when receive message from service', ()=>{
        model.init();

        const subscriber = jest.fn().mockImplementation((message)=>{});
        model.subscribe(subscriber);
        service.onMessage('some message');


        expect(subscriber).toHaveBeenCalledWith('some message');
    });
});