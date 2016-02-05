function getMapper(){
    return new Eternity.Helper.RuleMapper();
}

QUnit.test('Mapper test', function(assert){
    var mapper = getMapper(),
        field = {
            fields: ['field1'],
            target: 'field2',
            handler: function(){
                return 1;
            }
        };
    
    mapper.map(field.fields, field.target, field.handler);
    
    assert.throws(
        function(){
            mapper.map('field1', 'field2', function(){});
        },
        new Error('Argument fields must be an array of strings'),
        'Pass string instead of array as 1-st argument'
    );
    assert.throws(
        function(){
            mapper.map(['field1'], 'field2', function(){});
        },
        new Error('Target field "field2" cannot have more than 1 formula'),
        'Add already mapped field, should throw error'
    );
    
    assert.equal(mapper.isMapped('field1'), true, 'Test isMapped, should be true');
    assert.equal(mapper.isMapped('field2'), false, 'Test isMapped, should be false');
    assert.deepEqual(mapper.getMapByInitiator('field1'), [{field: "field1", handler: field.handler, target: field.target}], 'Test get field by initiator');
    assert.deepEqual(mapper.getMapByTarget('field2'), {field: "field1", handler: field.handler, target: field.target}, 'Test get field by target');
    assert.deepEqual(mapper.getTargetInitiators('field2'), [{field: "field1", handler: field.handler, target: field.target}], 'Get target by initiators');
});