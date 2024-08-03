import { ethers, providers } from "ethers";

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
export async function requestAccounts(provider) {
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
}
// export const getContract = (provider, address) => {
//   const contractABI = abi.abi;
//   const signer = provider.getSigner();
//   return new ethers.Contract(address, contractABI, signer);
// };

// export const getContractRead = (provider, address) => {
//   const contractABI = abi.abi;
//   return new ethers.Contract(address, contractABI, provider);
// };
  export function toHex(number) {
    return ethers.BigNumber.from(number)._hex;
  }
  export function toDecimal(number) {
    return parseInt(number, 16);
  }