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
    })

    it('should subcribe to the given topic, on the given connection whe initialized',()=>{
        service.init();
        expect(connection.subscribe).toHaveBeenCalledWith('some-topic', service.notifyAll);
    })
});