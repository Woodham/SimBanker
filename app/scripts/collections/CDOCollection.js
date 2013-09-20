define([
    'models/CDOModel'
], function(
    CDOModel
) {
    'use strict';

    return Backbone.Collection.extend({
        defaultChance: 0.01 * 3,

        model: CDOModel,

        cdoDefault: function(){
            console.log("CDO ticking.");
            var randomIndex, randomCDO;

            if(this.isEmpty()){
                return;
            }

            console.log("Checking whether to default CDO");

            if(Math.random() < this.defaultChance){
                console.log("Decided to default CDO");
                randomIndex = Math.floor(Math.random() * this.length);
                randomCDO = this.at(randomIndex);
                randomCDO.isDefaulted = true;
                this.trigger('defaultedCDO', randomCDO);
                this.remove(randomCDO);
            }
        },

        setDefaultChance: function(defaultChance) {
            this.defaultChance = defaultChance;
        }

    });

});
