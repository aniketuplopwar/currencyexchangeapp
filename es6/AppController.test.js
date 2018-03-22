import AppController from './app';

describe('this test should always pass', ()=>{
    let app,
        stompInstance,
        view;
    
    beforeAll(()=>{
        stompInstance = (()=>{
            const topicSubscriptions = {}
            return {
                connect: jest.fn().mockImplementation(()=>{
                    return new Promise((resolve, reject)=>{
                        resolve();
                    })
                }),
                subscribe: jest.fn().mockImplementation((topic, callback)=>{
                    topicSubscriptions[topic] = callback;
                }),
                onMessage: (topic, message)=>{
                    topicSubscriptions[topic].call(null, message);
                }
            };
        })();

        view = {
            render: jest.fn().mockImplementation(()=>{})
        }
         
        app = new AppController(stompInstance, 'sometopic', view);
    });


    it('should subscribe to topic when initialized',()=>{
        app.init();
        expect(stompInstance.subscribe).toHaveBeenCalled();
        
    });

    it('should render the view when subscribed topic receives message',()=>{
        app.init();
        stompInstance.onMessage('sometopic', 'somemessage');
        expect(view.render).toHaveBeenCalled();
        
    });
})