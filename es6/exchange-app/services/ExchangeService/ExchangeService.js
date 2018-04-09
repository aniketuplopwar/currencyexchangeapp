export default class ExchangeService{

    constructor(connection, topic){
        this.topic = topic;
        this.connection = connection;
        this.subscriberList = [];
    }

    subscribe(subscriber){
        this.subscriberList.push(subscriber);
    }

    notifyAll(message){
        this.subscriberList.map((subscriber)=>{
            subscriber.call(null, message);
        })
    }

    init(){
        this.connection.initialize().then(()=>{
            this.connection.subscribe(this.topic, this.notifyAll.bind(this));
        });
    }
}