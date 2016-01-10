function getBinderFactory(){
    return new BinderFactory();
}

QUnit.test('Binder factory test', function(assert){
    var factory = getBinderFactory();
    
    assert.deepEqual(factory.create(), {event: null, handler: null}, 'Creating binder object');
});