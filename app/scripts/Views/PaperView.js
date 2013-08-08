define([
    'backbone',
    'raphael'], function(Backbone, Raphael){

    var PaperView = Backbone.View.extend({

        el: $('#paper'),
        _paper: null,

        initialize: function(){
            this._paper = Raphael(this.el, this.$el.width(), this.$el.height())
        },

        render: function(){
            return this.$el.html();
        },

        getPaper: function(){
            return this._paper;
        }
    });
    return PaperView;
});
