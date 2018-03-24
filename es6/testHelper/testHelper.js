export const createMockObservable = ()=>{
    const subscriptionList = [];
    return {
        subscribe: jest.fn().mockImplementation((subscriber)=>{
            subscriptionList.push(subscriber);
        }),
        onMessage: (message)=>{
            subscriptionList.map((subscriber)=>{
                subscriber.call(null,message);
            })
        }
    };
}

export const createMockView = ()=>{
    return {
        render: jest.fn().mockImplementation((data)=>{})
    }
}

export const createMockModel = ()=>{
    const model = createMockObservable();
    model.init = jest.fn().mockImplementation(()=>{});
    return model;
}

export const createMockService = ()=>{
    const service = createMockObservable();
    service.init = jest.fn().mockImplementation(()=>{});
    return service;
}

export const createMockConnection= ()=>{
    const connection = {};
    connection.connect = jest.fn().mockImplementation(()=>{});
    connection.subscribe = jest.fn().mockImplementation((topic, callback)=>{});
    return connection;
}

export const createMockGraph = ()=>{
    return {
        draw: jest.fn().mockImplementation((arr)=>{
            return document.createElement('div');
        })
    }
}

export const createMockSparklineGraph = ()=>{
    return {
        draw: jest.fn().mockImplementation((element, arr)=>{
            return {
                element: document.createElement('div')
            };
        })
    }
}

