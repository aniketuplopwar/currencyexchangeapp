
export default class ExchangeModel  {
    constructor() {
        this.state = ({currencyPairMap:{}});
    }


    update(message){
        this.updateCurrencyPairMap(JSON.parse(message.body));
        this.filterMap();
        return this.getCurrencyPairList();
    }


    getCurrencyPairList(){
        return Object.keys(this.state.currencyPairMap).map(key=>this.state.currencyPairMap[key]);
    }


    updateCurrencyPairMap(currencyPair){
        let existingStateForPair = this.state.currencyPairMap[currencyPair.name];

        currencyPair['midPriceWithTimeStamp']  = !existingStateForPair ? [] : existingStateForPair['midPriceWithTimeStamp'];
        currencyPair['midPriceWithTimeStamp'].push(this.calculateMidPrice(currencyPair.bestBid, currencyPair.bestAsk));
        currencyPair['midPrice'] = this.getMidPriceValueList(currencyPair['midPriceWithTimeStamp']);

        this.state.currencyPairMap[currencyPair.name] = currencyPair;
    }

    calculateMidPrice(bestBid, bestAsk){
        return {
            timestamp: new Date().getTime(),
            value: (parseFloat(bestBid) + parseFloat(bestAsk))/2
        };
    }

    getMidPriceValueList(midPriceWithTimeStampArr){
        return midPriceWithTimeStampArr.map(midPrice=>midPrice.value);
    }

    filterMidPrice(currentTime, maxTime){
        Object.keys(this.state.currencyPairMap).map((key)=>{
            const currPair = this.state.currencyPairMap[key];
            currPair.midPriceWithTimeStamp = currPair.midPriceWithTimeStamp.filter(midPrice=> (currentTime - midPrice.timestamp) < maxTime);
        });
    }

    filterMap(){
        this.filterMidPrice(new Date().getTime(), 30000);
    }
}