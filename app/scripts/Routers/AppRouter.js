define(['backbone'], function(Backbone){
        var AppRouter = Backbone.Router.extend({

            _sourceView: null,
            collection: null,

            routes: {
                'source/:id': 'showFile'
            },

            initialize: function(sources, sourceView){
                if(!sources){
                    throw new Error('Router view needs a SourceFiles collection');
                }
                this.collection = sources;
                this._sourceView = sourceView;
            },

            showFile: function(id){
                var model = this.collection.get(id);
                if(_.isUndefined(model)){
                    return;
                }
                this._sourceView.showSource(model);
            }
        });
        return AppRouter;
    }
);
