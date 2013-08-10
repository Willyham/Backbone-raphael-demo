define(['backbone'], function(Backbone){

    var SourceView = Backbone.View.extend({

        tagName: 'pre',
        className: 'source',
        template: _.template('<%- code %>'),

        render: function(){
            return this.$el;
        },

        showSource: function(model){
            this.$el.empty();
            this.$el.html(model.get('code'));
        }
    });
    return SourceView;
});

