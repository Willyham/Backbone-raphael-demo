define(['backbone','Models/SourceFile'], function(Backbone, SourceFile){
    var SourceFiles = Backbone.Collection.extend({
        model: SourceFile,
        url: 'source.php'
    });
    return SourceFiles;
});
