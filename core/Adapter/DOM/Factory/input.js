Eternity.Adapter.DOM.Factory.Input = function() {
    this.create = function(element, type) {
        var input = new Eternity.Adapter.DOM.Element.Input(element);
        
        if (type) {
            input.setType(type);
        }
        
        return input;
    };
};