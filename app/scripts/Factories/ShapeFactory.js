define(['Models/Shape'], function(Shape){
    return {
        getInitialShapes: function(){
            var shapes = [];
            _(3).times(_.bind(function(){
                shapes.push(this.getRandomShape());
            }, this));
            return shapes;
        },

        getShape: function(x,y,w,h){
            return new Shape({
                x: x,
                y: y,
                width: w,
                height: h
            });
        },

        getSquare: function(x,y,w){
            var shape = this.getShape(x,y,w,w);
            shape.set('type', 'rectangle');
            return shape;
        },

        getCircle: function(x,y,r){
            var shape = this.getShape(x,y,r,r);
            shape.set('type', 'circle');
            return shape;
        },

        getRandomShape: function(){
            var x = _.random(100,500);
            var y = _.random(100,500);
            var w = _.random(50,150);
            return Boolean(_.random(0,1)) ? this.getSquare(x,y,w) : this.getCircle(x,y,w);
        }
    }
});
