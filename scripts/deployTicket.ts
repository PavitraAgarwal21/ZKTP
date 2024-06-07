
import { ethers } from "hardhat";
const VERIFIER = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
async function main() {
    const zktpFactory = await ethers.getContractFactory("ZKTP");
    const zktp = await zktpFactory.deploy(VERIFIER);
    // const verifier = await VerifierDeploy.deployed();

    console.log("Verifier has been deployed to : ", zktp.target);
    console.log("Verifier has been deployed to : ", await zktp.calculateFees(100));
    // TODO: REDEPLOY!
    // verifier deployed on BTT Donau testnet : 0xC88ec599D643D84C7BE4315087b23581ac854064   
}
main()
// zktp = 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0