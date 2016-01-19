var _result;

function getResolver(){
    return new Eternity.Components.Input.Resolver.Resolver({
        resolve: function(result){
            _result = result;
        }
    });
}

function getHandler(){
    return {
        supports: function(sign){
            return true;
        },
        handle: function(element, e){
            return 'result_ok';
        }
    };
}

function getElement(){
    return {
        tagName: 'some-element'
    };
}

QUnit.test('Resolver test', function(assert){
    var resolver = getResolver(),
        handler = getHandler(),
        element = getElement();
    
    resolver.registerHandler(handler);
    
    resolver.resolve(element, new Event('click'), 'bro');
    
    assert.equal(_result, 'result_ok', 'Resolve result');
});