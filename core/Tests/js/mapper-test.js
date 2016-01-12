function getMapper(){
    return new Mapper();
}

QUnit.test('Mapper test', function(assert){
    var mapper = getMapper(),
        field = {
            field: 'field1',
            handler: function(){
                return 1;
            }
        };
    
    mapper.add(field.field, field.handler);
    
    assert.throws(
        function(){
            mapper.add('field1', function(){});
        },
        new Error('Field "field1" already mapped, pass replace true flag if you want to replace formula'),
        'Add already mapped field, should throw error'
    );
    
    assert.equal(mapper.isMapped('field1'), true, 'Test isMapped, should be true');
    assert.equal(mapper.isMapped('field2'), false, 'Test isMapped, should be false');
    assert.deepEqual(mapper.get('field1'), field, 'Test get field');
    assert.equal(mapper.getHandler('field1'), field.handler, 'Test get field handler');
    assert.ok(mapper.add(field.field, field.handler, true), 'Add already mapped field, with true replace flag');
});