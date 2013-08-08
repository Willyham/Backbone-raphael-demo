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
        localstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
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
    'Models/Shape',
    'Collections/Shapes',
    'Views/PaperView',
    'Views/ShapeView',
    'Views/ToolboxView',
    'backbone.raphael',
    'backbone.transformable'
], function (Backbone, Raphael, Shape, Shapes, PaperView, ShapeView, ToolboxView) {

    var paperView = new PaperView();
    var paper = paperView.getPaper();
    var $paperContainer = $('#paperContainer');

    function getInitialShapes(){
        return [
            new Shape({
                x: 100,
                y: 100,
                width: 50,
                height: 50,
                type: 'rectangle'
            }),
            new Shape({
                x: 200,
                y: 200,
                width: 50,
                height: 50,
                type: 'circle'
            })
        ];
    }

    var shapes = new Shapes();
    var loadShapes = shapes.fetch();
    loadShapes.done(function(){

        if(shapes.isEmpty()){
            shapes.reset(getInitialShapes());
            shapes.forEach(function(shape){
                shape.save();
            });
        }

        var tbv = new ToolboxView({
            collection: shapes
        });
        $paperContainer.prepend(tbv.render());

        shapes.forEach(function(shape){
            // Create a new instance of the view, and render
            new ShapeView({
                paper: paper,
                model: shape,
                saveOnChange: true
            }).render();
        });
    });
});
