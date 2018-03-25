import View from './View';
const $ = require('jquery');


describe('View',()=>{
    let Component,
        view;
    beforeAll(()=>{
        const testElement = document.createElement('div');
        testElement.id= 'test';
        document.body.appendChild(testElement);

        Component = jest.fn().mockImplementation(()=>{
            this.render = (content)=>{
                const componentElement = document.createElement('span');
                componentElement.id = 'mock-component';
                componentElement.innerHTML = content;
                return componentElement;
            }
        });

        view = new View('test');

    });

    it('should render component in the given container when rendered',()=>{
        view.prepareView = ()=>{
            return {
                render: (content)=>{
                    const span = document.createElement('span');
                    span.id= "mock-component";
                    span.innerHTML = content;
                    return span;
                }
            };
        }
        view.init();
        view.render('some-content');

       expect($('#mock-component').length).toBe(1);
       expect($('#mock-component').html()).toBe('some-content');
    });
});