import Model from "../../framework/Model";

export default class ExchangeModel extends Model {
    constructor(service) {
        super({currencyPairMap:{}, currencyPairArray: []}, service);

    }

    updateCurrencyPairArray(){
        this.state.currencyPairArray = Object.keys(this.state.currencyPairMap).map((key)=>{
                                            return this.state.currencyPairMap[key];
                                        });
    }

    calculateMidPrice(bestBid, bestAsk){
        const timestamp = new Date().getTime();
        return {
            timestamp,
            value: (parseFloat(bestBid) + parseFloat(bestAsk))/2
        };
    }

    getMidPriceValueArr(midPriceWithTimeStampArr){
        return midPriceWithTimeStampArr.map((midPrice)=>{
            return midPrice.value;
        })
    }

    filterMidPrice(){
        Object.keys(this.state.currencyPairMap).map((key)=>{
            const currPair = this.state.currencyPairMap[key];
            currPair.midPriceWithTimeStamp = currPair.midPriceWithTimeStamp.filter((midPrice)=>{
                                                return (new Date().getTime() - midPrice.timestamp) < 30000;
                                            });
            currPair.midPrice = this.getMidPriceValueArr(currPair.midPriceWithTimeStamp);
        });
        this.notifyAll(this.state);
    }

    resetFilterInterval(){
        if(this.filterInterVal) clearInterval(this.filterInterVal);
        this.filterInterVal = setInterval(this.filterMidPrice.bind(this), 1000);
    }

    updateModel(message){
        let currencyPair = JSON.parse(message.body);
        let existingStateForPair = this.state.currencyPairMap[currencyPair.name];

        if(!existingStateForPair){
            currencyPair['midPriceWithTimeStamp'] = [];
        }else{
            currencyPair['midPriceWithTimeStamp'] = existingStateForPair['midPriceWithTimeStamp'];;
        }

        currencyPair['midPriceWithTimeStamp'].push(this.calculateMidPrice(currencyPair.bestBid, currencyPair.bestAsk));
        currencyPair['midPrice'] = this.getMidPriceValueArr(currencyPair['midPriceWithTimeStamp']);
        this.state.currencyPairMap[currencyPair.name] = currencyPair;

        this.updateCurrencyPairArray();

        this.resetFilterInterval();

    }


}   