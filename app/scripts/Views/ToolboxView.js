define(['backbone', 'Factories/ShapeFactory'], function(Backbone, ShapeFactory){

    var ToolboxView = Backbone.View.extend({

        className: 'toolbox',
        template: _.template('<div class="toolboxItem add">Add Shape</div><div class="toolboxItem rainbow">Rainbow!</div><div class="toolboxItem clear">Clear All</div>'),

        events: {
            'click .rainbow' : 'rainbow',
            'click .add' : 'addShape',
            'click .clear' : 'clearAll'
        },

        initialize: function(){
            if(!this.collection){
                throw new Error('Toolbox view needs a Shapes collection');
            }
        },

        render: function(){
            return this.$el.html(this.template());
        },

        addShape: function(){
            this.collection.add(ShapeFactory.getRandomShape());
        },

        clearAll: function(){
            this.collection.forEach(function(shape){
                shape.destroy();
            });
        },

        rainbow: function(){
            this.collection.forEach(function(shape){
                var colour = '#' + Math.random().toString(16).substring(2,8);
                shape.set('fill', colour);
                shape.save();
            })
        }

    });
    return ToolboxView;
});

