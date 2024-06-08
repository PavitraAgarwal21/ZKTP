"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy_zktp = exports.zktp_address = void 0;
const hardhat_1 = require("hardhat");
const deploy_verifier_1 = require("./deploy_verifier");
exports.zktp_address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
async function deploy_zktp() {
    const zktpFactory = await hardhat_1.ethers.getContractFactory("ZKTP");
    const zktp = await zktpFactory.deploy(deploy_verifier_1.verifier_address);
    // const verifier = await VerifierDeploy.deployed();
    // console.log("zktp has been deployed to : ", zktp.target); 
    return zktp.target;
}
exports.deploy_zktp = deploy_zktp;
deploy_zktp();
