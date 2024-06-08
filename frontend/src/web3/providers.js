"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePurchaseFeeLocal = exports.createEvent = exports.getContractRead = exports.getContract = exports.requestAccounts = exports.getChainId = exports.getWeb3Provider = exports.formatEther = exports.ZEROADDRESS = void 0;
// for provding the usefull funciton for connecting to the wallet 
const ethers_1 = require("ethers");
const constants_1 = require("./constants");
exports.ZEROADDRESS = "0x0000000000000000000000000000000000000000";
const formatEther = (bn) => ethers_1.ethers.utils.formatEther(bn);
exports.formatEther = formatEther;
function getWeb3Provider() {
    const provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
    return provider;
}
exports.getWeb3Provider = getWeb3Provider;
async function getChainId() {
    const chainId = await window.ethereum.request({
        method: "eth_chainId",
        params: [],
    });
    return chainId;
}
exports.getChainId = getChainId;
async function requestAccounts(provider) {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0];
}
exports.requestAccounts = requestAccounts;
const getContract = (provider, address) => {
    const signer = provider.getSigner();
    return new ethers_1.ethers.Contract(address, constants_1.zktp_abi, signer);
};
exports.getContract = getContract;
const getContractRead = (provider, address) => {
    return new ethers_1.ethers.Contract(address, constants_1.zktp_abi, provider);
};
exports.getContractRead = getContractRead;
const createEvent = async (zktp, price, event_name, no_of_ticket) => {
    return await zktp.createTicketEvent(ethers_1.ethers.utils.parseEther(price), event_name, no_of_ticket);
};
exports.createEvent = createEvent;
//export function getJsonRpcProvider() {
//   // getting this from the constant as we are using the sepoli network so it will be work as fine 
//     return new ethers.providers.JsonRpcProvider(rpcurl_sepoli);
// }
// export function web3Injected(): boolean {
//     //@ts-ignore
//     if (window.ethereum !== undefined) {
//         return true;
//     } else {
//         return false;
//     }
// }
// export async function requestAccounts() {
//   //@ts-ignore
//   await window.ethereum.request({ method: "eth_requestAccounts" });
// }
// export function doOnBoarding() {
//   const onboarding = new MetaMaskOnboarding();
//   onboarding.startOnboarding();
// }
// // lets see is this helpfull or not ok ?? 
// export async function onboardOrSwitchNetwork(handleError: any) {
//   if (!web3Injected()) {
//       handleError("You need to install metamask!");
//       await doOnBoarding();
//       return false;
//   }
//   await requestAccounts();
//   return true;
// }
// export function getWeb3Provider() {
//   //@ts-ignore
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   //@ts-ignore
//   window.ethereum.on('chainChanged', (chainId) => {
//       // Handle the new chain.
//       // Correctly handling chain changes can be complicated.
//       // We recommend reloading the page unless you have good reason not to.
//       // window.location.reload();
//   });
//   return provider;
// }
// export async function getContract(provider: any, at: string, abi : any ): Promise<any> {
//   const signer = provider.getSigner();
//   return new ethers.Contract(at, abi, signer);
// }
function calculatePurchaseFeeLocal(purchasePrice) {
    const fee = purchasePrice.div(100);
    const total = purchasePrice.add(fee);
    return [total, fee];
}
exports.calculatePurchaseFeeLocal = calculatePurchaseFeeLocal;
// // geeting the
