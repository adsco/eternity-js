QUnit.test('Unit | Converter | Text', function(assert) {
    var text = new Eternity.Components.Converter.Text();
    
    assert.equal(text.toDisplayValue('Testing'), 'Testing', 'Test text converter to display value');
    assert.equal(text.toInternalValue('Testing'), 'Testing', 'Test text converter to internal value'); 
});

QUnit.test('Unit | Converter | Integer', function(assert) {
    var integer = new Eternity.Components.Converter.Integer()
    
    assert.equal(integer.toDisplayValue('2,7'), 2, 'Testing "2,7" to integer display value');
    assert.equal(integer.toDisplayValue('0,7'), 0, 'Testing "0,7" to integer display value');
    assert.equal(integer.toDisplayValue('3'), 3, 'Testing "2,7" to integer display value');
    assert.equal(integer.toDisplayValue('ads'), 0, 'Testing "ads" to integer display value');
    assert.equal(integer.toInternalValue('2'), 2, 'Testing "2" to internal value');
    assert.equal(integer.toInternalValue('ads'), 0, 'Testing "ads" to internal value');
});

QUnit.test('Unit | Converter | Float', function(assert) {
    var float = new Eternity.Components.Converter.Float();
    
    assert.equal(float.toDisplayValue('2,3'), '2,3', 'Testing "2,3" to display value');
    assert.equal(float.toDisplayValue('1.9'), '1,9', 'Testing "1.9" to display value');
    assert.equal(float.toDisplayValue('0.8'), '0,8', 'Testing "0.8" to display value');
    assert.equal(float.toDisplayValue('0,8'), '0,8', 'Testing "0,8" to display value');
    assert.equal(float.toInternalValue('0,3', {digits: 1}), 0.3, 'Testing "0,3 and digits 1" to internal value');
    assert.equal(float.toInternalValue('0,3', {digits: 0}), 0, 'Testing "0,3 and digits 0" to internal value');
    assert.equal(float.toInternalValue('0,3123', {digits: 2}), 0.31, 'Testing "0,3123 and digits 2" to internal value');
    assert.equal(float.toInternalValue('0,3125', {digits: 1}), 0.3, 'Testing "0,3125 and digits 1" to internal value');
});

QUnit.test('Unit | Converter | Converter', function(assert) {
    var converter = new Eternity.Components.Converter.Converter();
    var text = new Eternity.Components.Converter.Text();
    var integer = new Eternity.Components.Converter.Integer();
    var float = new Eternity.Components.Converter.Float();
    
    converter.addConverter('text', text);
    converter.addConverter('integer', integer);
    converter.addConverter('float', float);
    
    assert.equal(converter.toDisplayValue('text', 'Testing'), 'Testing', 'Test text converter to display value');
    assert.equal(converter.toInternalValue('text', 'Testing'), 'Testing', 'Test text converter to internal value');
    assert.equal(converter.toDisplayValue('integer', '2,7'), 2, 'Testing "2,7" to integer display value');
    assert.equal(converter.toDisplayValue('integer', '0,7'), 0, 'Testing "0,7" to integer display value');
    assert.equal(converter.toDisplayValue('integer', '3'), 3, 'Testing "2,7" to integer display value');
    assert.equal(converter.toDisplayValue('integer', 'ads'), 0, 'Testing "ads" to integer display value');
    assert.equal(converter.toInternalValue('integer', '2'), 2, 'Testing "2" to internal value');
    assert.equal(converter.toInternalValue('integer', 'ads'), 0, 'Testing "ads" to internal value');
    assert.equal(converter.toDisplayValue('float', '2,3'), '2,3', 'Testing "2,3" to display value');
    assert.equal(converter.toDisplayValue('float', '1.9'), '1,9', 'Testing "1.9" to display value');
    assert.equal(converter.toDisplayValue('float', '0.8'), '0,8', 'Testing "0.8" to display value');
    assert.equal(converter.toDisplayValue('float', '0,8'), '0,8', 'Testing "0,8" to display value');
    assert.equal(converter.toInternalValue('float', '0,3', {digits: 1}), 0.3, 'Testing "0,3 and digits 1" to internal value');
    assert.equal(converter.toInternalValue('float', '0,3', {digits: 0}), 0, 'Testing "0,3 and digits 0" to internal value');
    assert.equal(converter.toInternalValue('float', '0,3123', {digits: 2}), 0.31, 'Testing "0,3123 and digits 2" to internal value');
    assert.equal(converter.toInternalValue('float', '0,3125', {digits: 1}), 0.3, 'Testing "0,3125 and digits 1" to internal value');
});
