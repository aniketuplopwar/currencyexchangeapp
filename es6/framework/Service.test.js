import Service from './Service';
import { createMockConnection } from '../testHelper/testHelper'; 

describe('Service',()=>{
    let connection,
        service,
        topic;
    beforeAll(()=>{
        connection = createMockConnection();
        topic = 'some-topic';
        service = new Service(connection, topic);
    });

    it('should initialize connection when initialized', ()=>{
        service.init();
        expect(connection.initialize).toHaveBeenCalled();
    });

    it('should subcribe to the given topic, on the given connection when connection is initialized',()=>{
        service.init();
        connection.initialize().then(()=>{
            expect(connection.subscribe).toHaveBeenCalledWith('some-topic', service.notifyAll);
        });

    })
});