
export const createMockConnection= ()=>{
    const connection = {};
    connection.initialize = jest.fn().mockImplementation(()=>{
        return new Promise((resolve, reject)=>{
            resolve();
        })
    });
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
};


