const Lang = imports.lang;

const Local = imports.misc.extensionUtils.getCurrentExtension();
const BaseProvider = Local.imports.BaseProvider;


const Api = new Lang.Class({
  Name: 'Kraken.Api',
  Extends: BaseProvider.Api,

  apiName: "Kraken",

  currencies: ['USD', 'EUR'],

  coins: ['BTC','mBTC', 'ETH', 'LTC'],

  interval: 30, // 60 requests per 10 minutes

  attributes: {
    last: function (options) {
      const renderCurrency = BaseProvider.CurrencyRenderer(options);
      const renderChange = BaseProvider.ChangeRenderer();
      const find = (tickerObj) => {
        const result = tickerObj.result;
        for (var property in result) {
            log('Kraken prop ' + property);
            if (result.hasOwnProperty(property)) {
                data = result[property].c[0];
                log('Kraken data ' + data);
                return data;
            }
        }
    }
      return {
        text: (data) => renderCurrency(find(data)),
        change: (data) => renderChange(find(data))
      };
    }
  },

  getLabel: function (options) {
    return "Kraken " + options.currency + "/" + options.coin;
  },

  getUrl: function (options) {
    const coin = BaseProvider.baseCoin(options.coin);
    log('Kraken URL ' + "https://api.kraken.com/0/public/Ticker?pair=" +
      coin.toUpperCase() + options.currency.toUpperCase() + '/');
    return "https://api.kraken.com/0/public/Ticker?pair=" +
      coin.toUpperCase() + options.currency.toUpperCase();
  }
});
