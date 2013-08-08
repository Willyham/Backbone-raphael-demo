define([
    'backbone',
    'raphael',
    'raphael.freeTransform',
    'backbone.raphael',
    'backbone.transformable'], function(Backbone){

    var ShapeView = Backbone.RaphaelTransformableView.extend({

        events: {
            'click' : 'changeColour'
        },

        initialize: function(){
            if(!this.model){
                throw new Error('Shape needed to create ShapeView');
            }
            if(!this.options.paper){
                throw new Error('Paper needed to create ShapeView');
            }
        },

        render: function(){
            var element;
            switch(this.model.get('type')){
                case 'rectangle':
                    element = this.options.paper.rect(this.model.get('x'), this.model.get('y'), this.model.get('width'),this.model.get('height'));
                    break;
                case 'circle':
                    element = this.options.paper.circle(this.model.get('x'), this.model.get('y'), this.model.get('width')/2);
                    break;
            }
            this.initElement(element, {
                keepRatio: [ 'axisX', 'axisY', 'bboxCorners', 'bboxSides' ]
            });
        },

        changeColour: function(){
            var colour = '#' + Math.random().toString(16).substring(2,8);
            // Setting attributes on the model automatically changes the SVG
            this.model.set('fill', colour);
        }
    });
    return ShapeView;
});
