const qtumjsWallet = require('qtumjs-wallet');

class cryptoWallet {

  constructor(){
    this.network = qtumjsWallet.networks.testnet
    this.mnemonic = qtumjsWallet.generateMnemonic()
    this.bank = this.network.fromWIF('cNkhHVdZrmo5vFw1eQCZovi56JDR9AMrwyEJFDGnUgLgkKkWGBxP')
  };

  createNewWallet(){
    const newWallet = this.network.fromMnemonic(this.mnemonic);
    const privatekey = newWallet.toWIF();
    const publicaddress = newWallet.address;
    return newWallet;
  }

  loadWallet(privatekey){
    const loadedWallet = this.network.fromWIF(privatekey)
    return loadedWallet
  }

  // getInfo(){
  //   return this.wallet.getInfo();
  // }
  //
  // async getBankInfo() {
  //   const info = await this.bank.getInfo();
  //   console.log(info);
  // }

  async send(sendAddress, sendAmount) {
    const contractAddress = '37c17869b941a88382d93fba5f6706dd5861ff66';
    // ABI encoded data for the send-to-method transaction
    const encodedData = "18160ddd"

    const tx = await this.bank.contractSend(contractAddress, encodedData, {
      amount: sendAmount,
    })
    console.log(tx);
    return tx;
  }

};

module.exports = cryptoWallet;
