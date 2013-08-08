define(['backbone','Models/Shape','localstorage'], function(Backbone, Shape){
   var Shapes = Backbone.Collection.extend({
       model: Shape,
       localStorage: new Backbone.LocalStorage('Shapes')
   });
   return Shapes;
});