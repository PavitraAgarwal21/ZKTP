import {ethers} from "hardhat" ;
export const verifier_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export async function deploy_verifier() {
    const VerifierFactory = await ethers.getContractFactory("TicketVerifier");
    const verifier = await VerifierFactory.deploy();
    // console.log("Verifier has been deployed to : ", verifier.target);
return verifier.target; 
}
deploy_verifier();

