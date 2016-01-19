var value = {};

function getResultHandlerCalculus(){
    return new Eternity.Components.Output.Handler.ValueUpdater({
        getSingle: function(){
            return value;
        }
    });
}

function getResult(){
    return {
        type: '',
        data: [{
            field: '',
            value: 1
        }]
    };
}

QUnit.test('Result handler calculus', function(assert){
    var handler = getResultHandlerCalculus(),
        result = getResult();
    
    result.type = 'update-value';
    assert.equal(handler.supports(result), true, 'Test supports method, should return true');
    
    result.type = 'update-attribute';
    assert.equal(handler.supports(result), false, 'Test supports method, should return false');
    
    result.type = 'update-value';
    handler.handle(result);
    assert.equal(value.value, 1, 'Handle test');
});