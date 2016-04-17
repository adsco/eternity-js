window.onload = function() {
    var inputElement = document.getElementById('input1');
    var input = new Eternity.Adapter.DOM.Element.Input(inputElement);
    
    input.inject(
        'converter',
        {
            toDisplayValue: function(type, value, config) {
                return value;
            },
            toInternalValue: function(type, value, config) {
                return value;
            }
        }
    );
    
    input.setConfig(
        'float',
        {
            digits: 2
        }
    );
    
    input.setType('float');
    
    input.setValue('2,59');
    
    console.log(input.getValue());
};
