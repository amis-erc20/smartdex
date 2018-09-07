/*
 * 0xtrades.info
 * https://github.com/vsergeev/0xtrades.info
 *
 * Copyright (c) 2017 Ivan (Vanya) A. Sergeev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/******************************************************************************/
/* Constants */
/******************************************************************************/
var ZEROEX_GENESIS_BLOCK = {
    1: 4145578,
    42: 4145578,
};
var ZEROEX_RELAY_ADDRESSES = {
    1: {
        "0xa258b39954cef5cb142fd567a46cddb31a670124": "Radar Relay",
        "0xeb71bad396acaa128aeadbc7dbd59ca32263de01": "Kin Alpha",
        "0xc22d5b2951db72b44cfb8089bb8cd374a3c354ea": "OpenRelay",
        "0x5dd835a893734b8d556eccf87800b76dda5aedc5": "BambooRelay",
        "0x5e150a33ffa97a8d22f59c77ae5487b089ef62e9": "TokenJar",
        "0x8124071f810d533ff63de61d0c98db99eeb99d64": "Star Bit",
        "0xe269e891a2ec8585a378882ffa531141205e92e9": "DDEX",
        "0x173a2467cece1f752eb8416e337d0f0b58cad795": "ERCDEX",
        "0x7219612be7036d1bfa933e16ca1246008f38c5fe": "The Ocean",
        "0x55890b06f0877a01bb5349d93b202961f8e27a9b": "Shark Relay",
        "0x4524baa98f9a3b9dec57caae7633936ef96bd708": "LedgerDex",
        "0x6f7ae872e995f98fcd2a7d3ba17b7ddfb884305f": "Tokenlon",
    },
    42: {},
};
var ZEROEX_TOKEN_INFOS = {};
var ZEROEX_EXCHANGE_ADDRESS = null;
var ZEROEX_TOKEN_ADDRESS = null;
var NETWORK_NAME = {
    1: "Mainnet",
    3: "Ropsten",
    4: "Rinkeby",
    42: "Kovan",
};
var NETWORK_BLOCK_EXPLORER = {
    1: "https://etherscan.io",
    3: "https://ropsten.etherscan.io",
    4: "https://rinkeby.etherscan.io",
    42: "https://kovan.etherscan.io",
};
var PRICE_API_URL = function (symbols, base) {
    return "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + symbols.join(',') + "&tsyms=" + base;
};
Logger = {
    enable: function () { Logger.log = Logger._log_console; },
    disable: function () { Logger.log = Logger._log_null; },
    _log_console: console.log.bind(window.console),
    _log_null: function (s) { },
    log: null,
    error: console.error.bind(window.console),
};
