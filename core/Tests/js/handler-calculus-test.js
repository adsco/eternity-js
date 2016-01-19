function getHandler(){
    return new Eternity.Components.Input.Handler.Calculus(
        //data provider
        {
            getValue: function(){
                return 125;
            }
        },
        //mapper
        {
            get: function(identifier){
                return {
                    target: '125',
                    field: '125',
                    handler: function(handler){
                        return 125;
                    }
                };
            }
        },
        //element crawler
        {
            getAttribute: function(element, attribute){
                return element;
            }
        }
    );
}

function getComplexHandler(){
    var provider = {
        values: {
            'simple-1': 1,
            'simple-2': 2,
            'simple-3': 3,
            'simple-4': 4
        },
        getValue: function(identifier){
            return provider.values[identifier];
        }
    };
    
    return new Eternity.Components.Input.Handler.Calculus(
        //data provider
        provider,
        //mapper
        {
            get: function(identifier){
                identifier += '';
                switch(identifier){
                    case '1': {
                        return {
                            field: '1',
                            target: '1',
                            handler: function(handler){
                                return handler.getValue('2') * handler.getValue('3');
                            }
                        };
                    }
                    case '2': {
                        return {
                            field: '2',
                            target: '2',
                            handler: function(handler){
                                return handler.getValue('simple-1') + handler.getValue('simple-2');
                            }
                        };
                    }
                    case '3': {
                        return {
                            field: '3',
                            target: '3',
                            handler: function(handler){
                                return handler.getValue('simple-3') + handler.getValue('simple-4');
                            }
                        };
                    }
                }
            }
        },
        //element crawler
        {
            getAttribute: function(element, attribute){
                return element;
            }
        }
    );
}

QUnit.test('Testing calculus', function(assert){
    var handler = getHandler();
    
    assert.strictEqual(handler.supports(), true, 'Test supports method');
    assert.deepEqual(handler.handle(), {data: [{field: '125', value: 125}], type: 'update-value'}, 'Testing simple mapping');
});

QUnit.test('Testing complex calculus', function(assert){
    var handler = getComplexHandler();
    
    assert.deepEqual(handler.handle(3), {data: [{field: '3', value: 7}], type: 'update-value'}, '.handle(3) equals 7');
    assert.deepEqual(
        handler.handle(1),
        {
            data: [
                {field: '2', value: 3},
                {field: '3', value: 7},
                {field: '1', value: 21}
            ],
            type: 'update-value'
        },
        '.handle(1) equals 21'
    );
});