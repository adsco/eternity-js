/** Query builder mock object */
function getQueryBuilder(){
    var builder = {
        _pattern: null,
        setPattern: function(pattern){
            builder._pattern = pattern;
        },
        createQuery: function(){
            return builder;
        },
        setTag: function(tag){
            builder._pattern = tag;
            
            return builder;
        },
        setId: function(){
            return builder;
        },
        addClass: function(){
            return builder;
        },
        addAttribute: function(){
            return builder;
        },
        getQuery: function(){
            return builder._pattern;
        }
    };
    
    return builder;
};

function getMockContainer(){
    return document.getElementById('qunit-mock-container');
}

QUnit.test('DOMCrawler test', function(assert){
    var container = getMockContainer(),
        builder = getQueryBuilder(),
        crawler = new DOMCrawler(builder),
        el;
    
    //Grab inexisting element
    assert.deepEqual(
        Array.prototype.slice.call(crawler.getElements({tag: 'body'}, {tag: '[attribute="inexistant"]'})),
        [],
        'Grab inexisting elements'
    );
    
    //Grab element by id
    el = createMockElement({tag: 'div', id: 'mock-1'});
    container.appendChild(el);
    assert.deepEqual(
        Array.prototype.slice.call(crawler.getElements({tag: 'body'}, {tag: '#mock-1'})),
        [el],
        'Grab element by id'
    );
    el.remove();
    
    el = createMockElement({tag: 'div', id: 'mock-1'});
    container.appendChild(el);
    assert.deepEqual(
        Array.prototype.slice.call(crawler.getElements({tag: 'body'}, {tag: '#mock-2'})),
        [],
        'Grab inexisting element by id'
    );
    el.remove();
    
    //Grab by tag name
    runCrawler(
        assert,
        crawler,
        container,
        {tag: '#' + container.id},
        {tag: 'a'},
        {tag: 'a'},
        ['Grab by a tag single element', 'Grab by a tag multiple elements']
    );
    
    runCrawler(
        assert,
        crawler,
        container,
        {tag: '#' + container.id},
        {tag: 'a'},
        {tag: 'div'},
        ['Grab by a tag inexisting single element', 'Grab by a tag inexisting multiple elements'],
        false
    );
    
    //Grab by class name
    runCrawler(
        assert,
        crawler,
        container,
        {tag: '#' + container.id},
        {tag: '.mock-class-1'},
        {tag: 'a', classes: ['mock-class-1']},
        ['Grab single element by class name', 'Multiple elements by class name']
    );
    
    runCrawler(
        assert,
        crawler,
        container,
        {tag: '#' + container.id},
        {tag: '.mock-class-1'},
        {tag: 'a', classes: ['mock-class-2']},
        ['Grab single inexisting element by class name', 'Multiple inexisting elements by class name'],
        false
    );
    
    runCrawler(
        assert,
        crawler,
        container,
        {tag: '#' + container.id},
        {tag: '.mock-class-1.mock-class-2'},
        {tag: 'a', classes: ['mock-class-1', 'mock-class-2']},
        ['Grab single element by multiple class names', 'Multiple elements by multiple class names']
    );
    
    runCrawler(
        assert,
        crawler,
        container,
        {tag: '#' + container.id},
        {tag: '.mock-class-1.mock-class-2'},
        {tag: 'a', classes: ['mock-class-3', 'mock-class-4']},
        ['Grab single element by multiple class names', 'Multiple elements by multiple class names'],
        false
    );
    
    //Grab by attribute
    runCrawler(
        assert,
        crawler,
        container,
        {tag: '#' + container.id},
        {tag: '[data-mock-attribute=mock]'},
        {tag: 'a', attributes: [{name: 'data-mock-attribute', value: 'mock'}]},
        ['Grab single element by attribute value', 'Multiple elements by attribute value']
    );
    
    runCrawler(
        assert,
        crawler,
        container,
        {tag: '#' + container.id},
        {tag: '[data-mock-attribute=mock]'},
        {tag: 'a', attributes: [{name: 'data-mock-attribute', value: 'mock-fake'}]},
        ['Grab single element by attribute value', 'Multiple elements by attribute value'],
        false
    );
    
    runCrawler(
        assert,
        crawler,
        container,
        {tag: '#' + container.id},
        {tag: '[data-mock-attribute=mock][data-mock-value=mock]'},
        {tag: 'a', attributes: [{name: 'data-mock-attribute', value: 'mock'}, {name: 'data-mock-value', value: 'mock'}]},
        ['Grab single element by multiple attribute values', 'Multiple elements by multiple attribute values']
    );
    
    runCrawler(
        assert,
        crawler,
        container,
        {tag: '#' + container.id},
        {tag: '[data-mock-attribute=mock][data-mock-value=mock]'},
        {tag: 'a', attributes: [{name: 'data-mock-attribute', value: 'mock-fake'}, {name: 'data-mock-value', value: 'mock-fake'}]},
        ['Grab single element by multiple attribute values', 'Multiple elements by multiple attribute values'],
        false
    );
});

function runCrawler(assert, crawler, container, parent, pattern, elConfig, messages, exist){
    var el,
        els = [];

    exist = 'undefined' === typeof exist ? true : exist;

    //single
    el = createMockElement(elConfig);
    container.appendChild(el);
    assert.deepEqual(Array.prototype.slice.call(crawler.getElements(parent, pattern)), exist ? [el] : [], messages[0]);
    el.remove();
    
    //multiple
    els.push(createMockElement(elConfig));
    els.push(createMockElement(elConfig));
    container.appendChild(els[0]);
    container.appendChild(els[1]);
    assert.deepEqual(Array.prototype.slice.call(crawler.getElements(parent, pattern)), exist ? els : [], messages[1]);
    els[0].remove();
    els[1].remove();
}

function createMockElement(config){
    var el = document.createElement(config.tag),
        i;
    
    if(config.id){
        el.id = config.id;
    }
    
    if(config.classes){
        for(i = 0; i < config.classes.length; i++){
            el.classList.add(config.classes[i]);
        }
    }
    
    if(config.attributes){
        for(i = 0; i < config.attributes.length; i++){
            el.setAttribute(config.attributes[i].name, config.attributes[i].value);
        }
    }
    
    return el;
}