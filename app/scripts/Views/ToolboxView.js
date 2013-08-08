define(['backbone'], function(Backbone){

    var ToolboxView = Backbone.View.extend({

        className: 'toolbox',

        events: {
            'click' : 'rainbow'
        },

        initialize: function(){
            if(!this.collection){
                throw new Error('Toolbox view needs a Shapes collection');
            }
        },

        render: function(){
            return this.$el;
        },

        rainbow: function(){
            this.collection.forEach(function(shape){
                var colour = '#' + Math.random().toString(16).substring(2,8);
                shape.set('fill', colour);
            })
        }

    });
    return ToolboxView;
});

