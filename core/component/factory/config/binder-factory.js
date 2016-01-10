/**
 * Binder config factory
 */
function BinderFactory(){
    this.create = function(){
        return {
            events: [],
            handler: null
        };
    };
}