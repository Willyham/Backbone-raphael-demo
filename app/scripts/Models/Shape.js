define([
    'backbone',
    'backbone.transformable'], function(Backbone){
    var Shape = Backbone.RaphaelTransformableModel.extend({
        type: 'rectangle'
    });
    return Shape;
});
