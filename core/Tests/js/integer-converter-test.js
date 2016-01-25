function getConverter(){
    return new Eternity.Components.Converter.Integer();
}

QUnit.test('Integer converter test', function(assert){
    var converter = getConverter();
    
    assert.strictEqual(converter.get('1'), 1, 'Test string 1 to integer convertion');
    assert.strictEqual(converter.get('1.1'), 1, 'Test string 1.1 to integer convertion');
    assert.strictEqual(converter.get('1,1'), 1, 'Test string 1,1 to integer convertion');
    assert.strictEqual(converter.get('00001,1'), 1, 'Test string 00001,1 to integer convertion');
    assert.throws(function(){converter.get('ads');}, new Error('Can\'t parse value "ads"'), 'Test parsing "ads" string');
});