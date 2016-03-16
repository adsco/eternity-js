Eternity.Components.DOM.Element.Manipulator = function() {
    var _construct = function() {

    };
    
    this.addAttribute = function(element, attribute, value) {
        return element.setAttribute(attribute, value);
    };
    
    this.removeAttribute = function(element, attribute) {
        return element.removeAttribute(attribute);
    };
    
    _construct.call(this);
};