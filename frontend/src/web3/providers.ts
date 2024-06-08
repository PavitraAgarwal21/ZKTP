// for provding the usefull funciton for connecting to the wallet 
import {ethers, BigNumber}  from "ethers"; 
import MetaMaskOnboarding from "@metamask/onboarding";
import { zktp_abi } from "./constants";
export const ZEROADDRESS = "0x0000000000000000000000000000000000000000"

export const formatEther = (bn: ethers.BigNumberish) => ethers.utils.formatEther(bn)




export function getWeb3Provider() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
}
export async function getChainId() {
  const chainId = await window.ethereum.request({
    method: "eth_chainId",
    params: [],
  });
  return chainId;
}
export async function requestAccounts(provider : any) {
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
}
export const getContract = (provider:any , address:any   ) => {
  const signer = provider.getSigner();
  return new ethers.Contract(address, zktp_abi, signer);
};

export const getContractRead = (provider :any , address : any ) => {
  return new ethers.Contract(address, zktp_abi, provider);
};


export const createEvent = async(zktp : any , price : string  , event_name : string , no_of_ticket : any ) =>  {
  return await zktp.createTicketEvent(ethers.utils.parseEther(price) , event_name , no_of_ticket);
}

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


export function calculatePurchaseFeeLocal(purchasePrice: BigNumber) {
  const fee = purchasePrice.div(100);
  const total = purchasePrice.add(fee);
  return [total, fee];
}

// // geeting the