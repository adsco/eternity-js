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
        handle: function(element, e){
            return 'result_ok';
        },
        supports: function(sign){
            return true;
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
    assert.deepEqual(resolver.resolve(element, new Event('click')), [handler], 'Resolve result');
});