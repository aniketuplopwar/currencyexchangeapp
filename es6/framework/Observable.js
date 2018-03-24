export default class Observable {
    constructor(){
        this.subscriberList = [];
    }

    notifyAll(message){
        this.subscriberList.map((subscriber)=>{
            subscriber.call(null, message);
        })
    }

    subscribe(subscriber){
        this.subscriberList.push(subscriber);
    }
}