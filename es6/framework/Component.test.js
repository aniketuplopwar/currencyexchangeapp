import Component from './Component';

describe('Component',()=>{
    it('should have a render method when defined',()=>{
        const component = new Component();
        expect(Component).toBeDefined();
        expect(component.render).toBeDefined();
    })

    it('should should return an HTML element when rendered',()=>{
        const component = new Component();
        expect(component.render() instanceof HTMLElement).toBe(true);
    })
});