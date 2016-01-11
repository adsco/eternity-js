function getSingleSigner(){
    return new Single({
        getAttributes: function(element, attributes){
            return {'data-cell-id': element.getAttribute('data-cell-id')};
        }
    });
}

function getMockElement(){
    var element = document.createElement('input');
    
    element.setAttribute('data-cell-id', '125');
    
    return element;
}

QUnit.test('Singe signer test', function(assert){
    var signer = getSingleSigner(),
        element = getMockElement();

    assert.equal(signer.sign(element), '125', 'Get attribute value');
});