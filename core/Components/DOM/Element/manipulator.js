/**
 * DOM element manipulator, used for working with DOM properties for now
 */
Eternity.Components.DOM.Element.Manipulator = function() {
    /**
     * Constructor
     */
    var _construct = function() {

    };
    
    /**
     * Add attribute to element
     * 
     * @param {Object} element - element that will receive attribute
     * @param {String} attribute - attribute name
     * @param {mixed} value - attribute value
     * @returns {Object} - passed element
     */
    this.addAttribute = function(element, attribute, value) {
        return element.setAttribute(attribute, value);
    };
    
    /**
     * Remove attribute from element
     * 
     * @param {Object} element - element whos attribute will be removed
     * @param {String} attribute - name of attribute to remove
     * @returns {Object} - passed element
     */
    this.removeAttribute = function(element, attribute) {
        return element.removeAttribute(attribute);
    };
    
    _construct.call(this);
};