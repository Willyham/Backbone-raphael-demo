/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        eve:          '../bower_components/raphael-amd/eve.0.3.4',
        raphael:      '../bower_components/raphael-amd/raphael.2.1.0.amd',
        'raphael.core': '../bower_components/raphael-amd/raphael.2.1.0.core',
        'raphael.svg':  '../bower_components/raphael-amd/raphael.2.1.0.svg',
        'raphael.vml':  '../bower_components/raphael-amd/raphael.2.1.0.vml',
        'backbone.raphael': '../bower_components/backbone.raphael-amd/backbone.raphael',
        'raphael.freeTransform': '../bower_components/raphael.free_transform/raphael.free_transform',
        'backbone.transformable': '../bower_components/backbone.raphael.transformable/backbone.raphael.transformable'
    }
});

require([
    'backbone',
    'raphael',
    'raphael.freeTransform',
    'backbone.raphael',
    'backbone.transformable',
], function (Backbone, Raphael) {
    // Create a raphael instance

    var $paper = $('#paper');

    var paper = Raphael($paper.get(0), $paper.width(), $paper.height());

    // Create a Backbone RaphaelView
    var RectangleView = Backbone.RaphaelTransformableView.extend({

        events: {
            'click' : 'changeColour'
        },

        initialize: function(){
            if(!this.model){
                throw new Error('Model needed to create RaphaelTransformableView');
            }
            if(!this.options.paper){
                throw new Error('Paper needed to create RaphaelTransformableView');
            }
        },

        render: function(){
            var rect = this.options.paper.rect(this.model.get('x'), this.model.get('y'), this.model.get('width'),this.model.get('height'));
            this.initElement(rect);
        },

        changeColour: function(){
            var colour = '#' + Math.random().toString(16).substring(2,8);
            // Setting attributes on the model automatically changes the SVG
            this.model.set('fill', colour);
        }

    });

    var mySquare = new Backbone.RaphaelTransformableModel({
        x: 100,
        y: 100,
        width: 50,
        height: 50
    });

    // Create a new instance of the view, and render
    new RectangleView({
        paper: paper,
        model: mySquare,
        // Transforming the shape will save the model by default, so set this to false if you don't define a model url.
        saveOnChange: true
    }).render();
});
