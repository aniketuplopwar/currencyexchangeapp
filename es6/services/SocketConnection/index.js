class SocketConnection {
    constructor(socketInstance, baseUrl) {
        this.client = socketInstance.client(baseUrl);
    }

    subscribe(url, cb) {
        this.client.subscribe(url, cb);
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect({}, resolve);
        });
    }
}

export default SocketConnection;