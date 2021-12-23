const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
    /**
     * @param {Scope} $
     */
    handle($){
        $.sendMesage('Send ping')
    }

}

module.exports = OtherwiseController