/**
 * Element's attributes retriever
 */
Eternity.Components.DOM.Element.Crawler = function() {
    /**
     * Get list of attributes
     * 
     * @param {Element} element - element to inspect
     * @param {String[]} attributes - list of attributes to extract value from
     * @returns {JSON} {<passed attribute name>: <value>, ...}
     */
    this.getAttributes = function(element, attributes) {
        var result = {},
            i;

        for (i = 0; i < attributes.length; i++) {
            result[attributes[i]] = this.getAttribute(element, attributes[i]);
        }

        return result;
    };

    /**
     * Get single attribute value of element
     * 
     * @param {Element} element - element to inspect
     * @param {String} attribute - attribute to extract value from
     * @returns {String}
     */
    this.getAttribute = function(element, attribute){
        if ('undefined' !== typeof element[attribute]) {
            return element[attribute];
        } else {
            return element.getAttribute(attribute);
        }
    };
};