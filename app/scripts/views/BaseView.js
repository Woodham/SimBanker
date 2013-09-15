define([
    'views/MortgageMarketView',
    'views/NewsTickerView',
    'views/IncomeView',
    'views/MortgageInventoryView',
    'views/CDOInventoryView',
    'views/BankerView',
    'views/InvestorsView',
    'helpers/MortgageHelper',
    'mustache!base'
], function(
    MortgageMarketView,
    NewsTickerView,
    IncomeView,
    MortgageInventoryView,
    CDOInventoryView,
    BankerView,
    InvestorsView,
    MortgageHelper,
    baseTemplate
) {
    'use strict';

    return Backbone.View.extend({

        initialize: function(){

            this.banker = {
                amount: 0
            };

            this.income = {
                increment: 0
            };


            this.mortgageMarketView = new MortgageMarketView();
            this.newsTickerView = new NewsTickerView();
            this.investorView = new InvestorsView();
            this.mortgageInventoryView = new MortgageInventoryView();
            this.cdoInventoryView = new CDOInventoryView({
                banker: this.banker,
                mortgagesInventory: this.mortgageInventoryView.collection
            });

            this.bankerView = new BankerView({
                banker: this.banker
            });
            this.incomeView = new IncomeView({
                income: this.income
            });

            this.listenTo(this.mortgageMarketView, 'boughtMortgage', this.onBoughtMortgage);
        },

        render: function(){
            this.$el.html(baseTemplate());

            this.mortgageMarketView.$el = this.$('.mortgage-market');
            this.mortgageMarketView.render();

            this.newsTickerView.$el = this.$('.news-ticker');
            this.newsTickerView.render();

            this.bankerView.$el = this.$('.banker');
            this.bankerView.render();

            this.incomeView.$el = this.$('.income-counter');
            this.incomeView.render();

            this.mortgageInventoryView.$el = this.$('.mortgage-inventory');
            this.mortgageInventoryView.render();

            this.cdoInventoryView.$el = this.$('.cdo-inventory');
            this.cdoInventoryView.render();

            this.investorView.$el = this.$('.investors');
            this.investorView.render();

            this.setIncomeTimer();
        },

        setIncomeTimer: function(){
            setTimeout(_(function() {
                this.banker.amount += this.income.increment;
                this.bankerView.updateCalculatorDisplay();

                this.setIncomeTimer();
            }).bind(this), 1000);
        },

        onBoughtMortgage: function(type){
            var mortgageModel = MortgageHelper.createModel(type);

            this.income.increment += mortgageModel.get('valuation');
            this.incomeView.updateIncomeIncrement();

            this.mortgageInventoryView.collection.add(mortgageModel);
        }

    });

});