define([
    'mustache!mortgage',
    'helpers/TooltipHelper'
], function(
    mortgageTemplate,
    TooltipHelper
){
    'use strict';

    return Backbone.View.extend({



        render: function(){
            this.$el = mortgageTemplate();
            this.tooltipHelper = new TooltipHelper();
            return this;
        },

        remove: function(){
            var boundRemove = _(Backbone.View.prototype.remove).bind(this);

            console.log("remove");
            if (this.model.isDefaulted) {
                console.log("defaulted");
                this.tooltipHelper.removeTooltip(this.tooltipHelper.displayTooltip("Defaulted!", this.$el));
            }
            
            this.$el.animate({opacity: 0}, 1000, function(){
                boundRemove();
            });
        },


    });
});