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
    'jquery',
    'backbone',
    'raphael',
    'Routers/AppRouter',
    'Collections/Shapes',
    'Collections/SourceFiles',
    'Views/PaperView',
    'Views/ShapeView',
    'Views/ToolboxView',
    'Views/SourceView',
    'Views/SourceSelectorView',
    'Factories/ShapeFactory',
    'backbone.raphael',
    'backbone.transformable'
], function ($, Backbone, Raphael, AppRouter, Shapes, SourceFiles, PaperView, ShapeView, ToolboxView, SourceView, SourceSelectorView, ShapeFactory) {

    var sources = new SourceFiles();
    var loadSources = sources.fetch();

    var shapes = new Shapes();
    var paperView = new PaperView({
        collection: shapes
    });

    var loadShapes = shapes.fetch();

    $.when(loadShapes, loadSources).then(function(){

        // Make a new source view
        var sourceView = new SourceView();
        $('#codeContainer').html(sourceView.render());

        // Make the app router
        var appRouter = new AppRouter(sources,sourceView);

        // Build the view to swtich between files
        var sourceSelectorView = new SourceSelectorView({
            collection: sources,
            router: appRouter
        });
        $('#switcher').html(sourceSelectorView.render());

        // Create the toolbox
        var tbv = new ToolboxView({
            collection: shapes
        });
        var $paperContainer = $('#paperContainer');
        $paperContainer.prepend(tbv.render());

        // Add default shapes
        if(shapes.isEmpty()){
            shapes.reset(ShapeFactory.getInitialShapes());
            shapes.forEach(function(shape){
                shape.save();
            });
        }

        // Start the history
        Backbone.history.start();

        //Auto navigate to source 0
        appRouter.navigate('source/0', {trigger:true});
    });
});
