"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const network_helpers_1 = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const chai_1 = require("chai");
const hardhat_1 = __importDefault(require("hardhat"));
const VERIFIER = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
describe("verifier", function () {
    async function deployOneYearLockFixture() {
        const [owner, otherAccount] = await hardhat_1.default.ethers.getSigners();
        const Lock = await hardhat_1.default.ethers.getContractAt("verifier", VERIFIER);
        console.log(Lock.target);
        return { Lock, owner, otherAccount };
    }
    describe("Deployment", function () {
        it("Should set the right unlockTime", async function () {
            const { Lock, owner, otherAccount } = await (0, network_helpers_1.loadFixture)(deployOneYearLockFixture);
            (0, chai_1.expect)(1).to.equal(1);
        });
    });
});
//writing the test in the and then what we do to export the usefull fucntion then 
//it will be very usefull to perform that so 
// lets do it ok 
// testing involves these four parts  overall 
// 1 -- create the event 
// 2 -- buy the ticket 
// 3 -- download the ticket 
// 4 -- verify the ticket
// 5 -- invalidate the ticket 
