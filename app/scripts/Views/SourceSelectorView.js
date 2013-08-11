define(['backbone'], function(Backbone){

    var SourceSelectorView = Backbone.View.extend({

        tagName: 'select',
        optionTemplate: _.template('<option value="<%=value%>"><%=key%></option>'),

        events: {
            'change': 'changeFile'
        },

        initialize: function(){
            if(!this.collection){
                throw new Error('SourceSelectorView requires a SourceFiles collection')
            }
            this.listenTo(this.collection, 'reset', this.renderOptions);
        },

        changeFile: function(event){
            var fileID = event.target.value;
            this.options.router.navigate("source/"+fileID, {trigger: true});
        },

        render: function(){
            if(!this.collection.isEmpty()){
                this.renderOptions();
            }
            return this.$el;
        },

        renderOptions: function(){
            var self = this;
            this.$el.empty();
            this.collection.forEach(function(source){
                self.$el.append(self.optionTemplate({
                    value: source.get('id'),
                    key: source.get('name')
                }));
            });
        }

    });
    return SourceSelectorView;
});

