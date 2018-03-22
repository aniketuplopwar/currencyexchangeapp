class StompService {
    constructor(stompInstance, baseUrl) {
        this.client = stompInstance.client(baseUrl);
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

export default StompService;