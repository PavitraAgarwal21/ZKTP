"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy_verifier = exports.verifier_address = void 0;
const hardhat_1 = require("hardhat");
exports.verifier_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
async function deploy_verifier() {
    const VerifierFactory = await hardhat_1.ethers.getContractFactory("TicketVerifier");
    const verifier = await VerifierFactory.deploy();
    // console.log("Verifier has been deployed to : ", verifier.target);
    return verifier.target;
}
exports.deploy_verifier = deploy_verifier;
deploy_verifier();
