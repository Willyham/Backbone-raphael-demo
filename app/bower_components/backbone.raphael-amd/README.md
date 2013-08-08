# Backbone.raphael-amd

An AMD compatible version of [backbone-raphael](https://github.com/tomasAlabes/backbone.raphael) by Tomas Alabes.

### An easy way to add svg/vml views into your Backbone app

This extension enables you to add views to your backbone apps tweaking how
Backbone and RaphaelJS handle event bindings.

### Quickstart guide

- Install [raphael-amd](https://github.com/pajtai/raphael-amd)
- ``bower install backbone.raphael-amd`` (or your preferred installation method)
- Setup your require.js config:

```javascript
  paths: {
      'foo...': 'bar...',
      'backbone': '../path/to/backbone',
      'backbone.raphael': '../bower_components/backbone.raphael-amd/backbone.raphael'
  }

```

- Then use backbone-raphael in place of Backbone when using require:

```javascript
  require([
      'backbone.raphael',
      'raphael'
  ], function (Backbone, Raphael) {
  
      // Create a raphael instance
      var paper = Raphael('paper', 500, 500);
  
      // Create a Backbone RaphaelView
      var TestView = Backbone.RaphaelView.extend({
          render: function(){
              var rect = this.options.paper.rect(50,50,50,50);
              rect.attr('fill', '#00DD00');
          }
      });
  
      // Create a new instance of the test view, and render
      new TestView({ paper: paper }).render();
  });

```


## Copyright and license
Licensed under the **MIT** license.
