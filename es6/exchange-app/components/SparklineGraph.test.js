import SparklineGraph from './SparklineGraph';
import {createMockSparklineGraph} from '../../testHelper/testHelper';

describe('Sparkline',()=>{
    it('should throw and error if Sparkline is not defined',()=>{
        try{
            new SparklineGraph();
        }catch(e){
            expect(e.message).toBe('This graph needs Sparkline, make sure you have Sparkline library included');
        }
    });

    it('should return html element when drawn',()=>{
        global.Sparkline = createMockSparklineGraph();
        const graph = new SparklineGraph();
        const drawnGraph = graph.draw([1,2,3]);
        expect(drawnGraph instanceof HTMLElement).toBe(true);
    })
})