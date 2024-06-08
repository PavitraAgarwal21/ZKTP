import { ethers } from "hardhat";
import { verifier_address as VERIFIER } from "./deploy_verifier";   
export const zktp_address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
export async function deploy_zktp() {
    const zktpFactory = await  ethers.getContractFactory("ZKTP");
    const zktp = await zktpFactory.deploy(VERIFIER);
    // const verifier = await VerifierDeploy.deployed();
    // console.log("zktp has been deployed to : ", zktp.target); 
return zktp.target;
}
deploy_zktp();

