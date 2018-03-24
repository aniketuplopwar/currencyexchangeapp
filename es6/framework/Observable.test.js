import Observable from './Observable';

describe('Observable',()=>{
    
    it('should notify the subscribed observer when notified',()=>{
        const observable = new Observable();
        const observer = jest.fn().mockImplementation(()=>{});

        observable.subscribe(observer);
        observable.notifyAll('some message');

        expect(observer).toHaveBeenCalled();
        expect(observer).toHaveBeenCalledWith('some message');
    });

    it('should notify to all subscribed observers when notified',()=>{
        const observable = new Observable();
        const observer1 = jest.fn().mockImplementation(()=>{});
        const observer2 = jest.fn().mockImplementation(()=>{});

        observable.subscribe(observer1);
        observable.subscribe(observer2);
        observable.notifyAll('some message');

        expect(observer1).toHaveBeenCalled();
        expect(observer2).toHaveBeenCalled();
    });
})