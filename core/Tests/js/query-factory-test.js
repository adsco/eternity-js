function getQueryFactory(){
    return new QueryFactory();
}

QUnit.test('Query factory test', function(assert){
    var factory = getQueryFactory();
    
    assert.deepEqual(factory.create(), {tag: '', id: '', classes: [], attributes: []}, 'Create empty query object');
});