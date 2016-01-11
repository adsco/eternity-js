function getFactory(){
    return new ResultFactory();
}

QUnit.test('Result factory test', function(assert){
    var factory = getFactory();
    
    assert.deepEqual(factory.create(), {type: null, data: null}, 'Result factoty creation');
});