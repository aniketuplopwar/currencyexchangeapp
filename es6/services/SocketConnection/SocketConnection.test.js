import StompService from './index';

describe("Stomp Service", ()=>{
    let sampleStompService,
        mockStomp;

    
    const subscribe = jest.fn().mockImplementation(()=>{});
    const connectStomp = jest.fn().mockImplementation(()=>{});

    const client = jest.fn().mockImplementation(()=>{
            return {
                subscribe: subscribe,
                connect: connectStomp,
                onMessage: (route, message)=>{
                   // routeMap[route].call(null, message);
                }
            }
    });

    beforeAll(()=>{
        mockStomp = {client}
        sampleStompService = new StompService(mockStomp, 'localhost');
    });

    it('should attempt to connect to stomp server when initialize',()=>{
        expect(client).toHaveBeenCalled();
        sampleStompService.initialize().then(()=>{
            expect(connectStomp).toHaveBeenCalled();
        });
    });

    it('should listen to server event when subscribed',()=>{
        sampleStompService.initialize();
        sampleStompService.subscribe('some-event', ()=>{});

        expect(subscribe).toHaveBeenCalled();
    });
})