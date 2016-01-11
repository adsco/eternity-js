function getElementCrawler(){
    return new ElementCrawler();
}

function decorateElement(element){
    element.name = 'element';
    element.id   = 'element';
    element.setAttribute('data-attribute-1', 'attr1');
    element.setAttribute('data-attribute-2', 'attr2');
    element.setAttribute('data-attribute-3', 'attr3');
}

QUnit.test('Element crawler test', function(assert){
    var crawler = getElementCrawler(),
        element = document.createElement('input');
        
    decorateElement(element);
    
    assert.deepEqual(crawler.getAttributes(element, ['tagName']), {tagName: 'INPUT'}, 'Get element tag name only');
    assert.deepEqual(crawler.getAttributes(element, ['id']), {id: 'element'}, 'Get element id only');
    assert.deepEqual(crawler.getAttributes(element, ['name']), {name: 'element'}, 'Get element name only');
    assert.deepEqual(crawler.getAttributes(element, ['data-attribute-1']), {'data-attribute-1': 'attr1'}, 'Get element single attribute only');
    
    assert.deepEqual(crawler.getAttributes(element, ['tagName', 'id', 'name']), {tagName: 'INPUT', name: 'element', id: 'element'}, 'Get element tag name, id and name');
    assert.deepEqual(
        crawler.getAttributes(
            element, 
            [
                'data-attribute-1',
                'data-attribute-2',
                'data-attribute-3'
            ]
        ),
        {'data-attribute-1': 'attr1', 'data-attribute-2': 'attr2', 'data-attribute-3': 'attr3'},
        'Get element name only'
    );
});