"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const index_1 = require("../utils/index");
const VERIFIER = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ZKTP = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
async function createticket() {
}
async function main() {
    const [owner, otherAddress] = await hardhat_1.ethers.getSigners();
    // console.log(owner.address) ;
    const zktp = await hardhat_1.ethers.getContractAt("ZKTP", ZKTP);
    console.log(zktp.target);
    const ticketstring = await (0, index_1.createEventTicket)(0x2b6653dc);
    console.log(ticketstring);
    const parsedTicket = await (0, index_1.parseTicket)(ticketstring);
    console.log(parsedTicket);
}
main();
// zktp = 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
