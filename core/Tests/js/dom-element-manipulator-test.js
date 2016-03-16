function getDomElementManipulator() {
    return new Eternity.Components.DOM.Element.Manipulator();
}

QUnit.test('Unit | Eternity.Components.DOM.Element.Manipulator', function(assert) {
    var manipulator = getDomElementManipulator();
    var element = document.createElement('input');
    
    manipulator.addAttribute(element, 'id', 'ns-1');
    assert.equal(element.id, 'ns-1', 'Id attribute is set');
    
    manipulator.removeAttribute(element, 'id');
    assert.equal(element.id, '', 'Id attribute removed');
    
    manipulator.addAttribute(element, 'data-class', 'ns');
    assert.equal(element.getAttribute('data-class'), 'ns', 'Attribute "data-class" is set')
});