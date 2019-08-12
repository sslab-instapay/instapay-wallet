var web3_utils_1 = require("web3-utils");
var bignumber_js_1 = require("bignumber.js");

exports.deriveNonce = function (invoice) {
    var invoiceChecksum = web3_utils_1.soliditySha3({ type: 'bytes16', value: invoice.id }, { type: 'uint256', value: invoice.network.toString() }, { type: 'bytes32', value: invoice.contractAddress }, { type: 'bytes32', value: invoice.publicKey }, { type: 'uint256', value: invoice.amount.toFixed(0) }, { type: 'bytes32', value: invoice.tokenAddress });
    var completeNonce = new bignumber_js_1.default(invoiceChecksum);
    var fragment = new bignumber_js_1.default(2).pow(32);
    return completeNonce.mod(fragment).toNumber();
};

exports.createInvoice = function (params) {
    if (!params.tokenAddress && !params.contractAddress) {
        throw new Error('Either tokenAddress or contractAddress should be non-null');
    }
    if (params.generateId && !params.amount) {
        throw new Error('Invoices with id should contain amount property');
    }
    var invoice = {
        network: params.network,
        publicKey: params.publicKey,
        tokenAddress: params.tokenAddress || params.contractAddress,
    };
    if (params.contractAddress)
        invoice.contractAddress = params.contractAddress;
    if (params.amount)
        invoice.amount = new bignumber_js_1.default(params.amount);
    return invoice;
};

exports.encodeInvoice = function (invoice) {
    var data = [invoice.network, invoice.publicKey];
    if (invoice.id)
        data.push(invoice.id);
    data.push(invoice.tokenAddress);
    if (invoice.contractAddress)
        data.push(invoice.contractAddress);
    if (invoice.amount)
        data.push(compressAmount(invoice.amount.toString()));
    return INVOICE_PREFIX + data.join('|');
};

exports.decodeInvoice = function (encoded) {
    var data = encoded.substring(INVOICE_PREFIX.length).split('|');
    var invoice = {
        network: Number.parseInt(data.shift()),
        publicKey: data.shift(),
        tokenAddress: undefined,
    };
    var nextPiece = data.shift();
    if (nextPiece.substr(0, 2) !== '0x') {
        invoice.id = nextPiece;
        nextPiece = data.shift();
    }
    invoice.tokenAddress = nextPiece;
    if (data.length === 0)
        return invoice;
    nextPiece = data.shift();
    if (nextPiece.substr(0, 2) === '0x') {
        invoice.contractAddress = nextPiece;
        if (data.length > 0) {
            invoice.amount = new bignumber_js_1.default(decompressAmount(data.shift()));
        }
    }
    else {
        invoice.amount = new bignumber_js_1.default(decompressAmount(nextPiece));
    }
    if (invoice.id)
        invoice.nonce = exports.deriveNonce(invoice);
    return invoice;
};
var compressAmount = function (amount) {
    for (var i = amount.length - 1; i >= 0; i--) {
        if (amount[i] !== '0') {
            var zerosAmount = amount.length - i - 1;
            return zerosAmount > 2 ? amount.substring(0, i + 1) + '^' + zerosAmount.toString() : amount;
        }
    }
    return amount;
};
var decompressAmount = function (amount) {
    var caretPosition = amount.indexOf('^');
    return caretPosition === -1
        ? amount
        : amount.substring(0, caretPosition) +
        '0'.repeat(Number.parseInt(amount.substring(caretPosition + 1)));
};
var INVOICE_PREFIX = 'RN';
