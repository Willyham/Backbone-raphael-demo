define([
    'backbone',
    'raphael',
    'Views/ShapeView'], function(Backbone, Raphael, ShapeView){

    var PaperView = Backbone.View.extend({

        el: $('#paper'),
        _paper: null,

        initialize: function(){
            this._paper = Raphael(this.el, this.$el.width(), this.$el.height());
            this.listenTo(this.collection, 'add', this.renderShape);
            this.listenTo(this.collection, 'reset', this.renderShapes);
        },

        renderShapes: function(shapes){
            shapes.forEach(_.bind(this.renderShape,this));
        },

        renderShape: function(shape){
            // Create a new instance of the view, and render
            new ShapeView({
                paper: this._paper,
                model: shape,
                saveOnChange: true
            }).render();
        }

    });
    return PaperView;
});
