var _result;

function getResolver() {
    return new Eternity.Components.Input.Resolver.Resolver({
        resolve: function(result){
            _result = result;
        }
    });
}

function getHandler() {
    return {
        handle: function(element, e) {
            return 'result_ok';
        },
        supports: function(sign) {
            return true;
        }
    };
}

function getElement() {
    return {
        tagName: 'some-element'
    };
}

QUnit.test('Resolver test', function(assert) {
    var resolver = getResolver(),
        handler1 = getHandler(),
        handler2 = getHandler(),
        handler3 = getHandler(),
        element = getElement();

    resolver.registerHandler(handler1, 1);

    assert.deepEqual(resolver.resolve(element, new Event('click')), [handler1], 'Resolve result');

    resolver.registerHandler(handler2, 3);
    resolver.registerHandler(handler3, 2);
    assert.deepEqual(resolver.resolve(element, new Event('click')), [handler1, handler3, handler2], 'Resolve result, sorted by priority');
});