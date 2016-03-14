var ids = [];

Eternity.Components.DOM.Crawler = function() {
    this.getElement = function(id) {
        return -1 === ids.indexOf(id) ? true : false;
    };
};

function getMockCrawler() {
    return new Eternity.Components.DOM.Crawler();
};

function getDomGenerator() {
    return new Eternity.Components.DOM.Element.Generator(getMockCrawler());
}

QUnit.test('Unit | DOM element generator', function(assert) {
    var domGenerator = getDomGenerator();
    
    assert.equal(domGenerator.generateId(), 'eternity-0', 'Id generated using default namespace');
    assert.equal(domGenerator.generateId('ns'), 'ns-0', 'Id generated using "ns" namespace');
    
    ids.push('ns-0');
    assert.equal(domGenerator.generateId('ns'), 'ns-1', 'Reserved ids are considered, "ns-0" is reserved - "ns-1" is generated');
    
    ids.push('ns-1');
    ids.push('ns-2');
    assert.equal(domGenerator.generateId('ns'), 'ns-3', 'Reserved ids are considered, "ns-0, ns-1, ns-2" are reserved - "ns-3" is generated');
});