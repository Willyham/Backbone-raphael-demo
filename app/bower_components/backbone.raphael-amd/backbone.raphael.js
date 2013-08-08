/*
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone'], function (Backbone) {
            // Use global variables if the locals are undefined.
            return factory(Backbone || root.Backbone);
        });
    } else {
        // RequireJS isn't being used. Assume backbone is loaded in <script> tags
        factory(Backbone);
    }
}(this, function (Backbone) {

    Backbone.RaphaelView = Backbone.View.extend({

        setElement: function (element, delegate, undelegateEvents) {
            if (this.el && undelegateEvents) this.undelegateEvents();
            // el and $el will be the same, $el would have no special meaning...
            this.el = this.$el = element;
            if (delegate !== false) this.delegateEvents();
            return this;
        },

        delegateEvents: function (events, undelegateEvents) {
            if (!(events || (events = _.result(this, 'events')))) return this;
            if (undelegateEvents) this.undelegateEvents();
            for (var eventName in events) {
                var method = events[eventName];
                if (!_.isFunction(method)) method = this[events[eventName]];
                if (!method) continue;

                method = _.bind(method, this);
                //If it is one of the svg/vml events
                if (this.el[eventName]) {
                    this.el[eventName](method);
                }
                // Custom events for RaphaelView object
                else {
                    this.on(eventName, method);
                }

            }
            return this;
        },

        // Clears all callbacks previously bound to the view with `delegateEvents`.
        undelegateEvents: function () {
            if (this.el.type) this.el.unbindAll();
            return this;
        }
    });
    return Backbone;
}));

