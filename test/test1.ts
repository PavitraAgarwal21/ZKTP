import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre from "hardhat";

const VERIFIER = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
  describe("verifier", function () {
    async function deployOneYearLockFixture() {
      const [owner, otherAccount] = await hre.ethers.getSigners();
  
      const Lock = await hre.ethers.getContractAt("verifier",VERIFIER);
      console.log(Lock.target)
      return { Lock ,  owner, otherAccount };
    }
    describe("Deployment", function () {
      it("Should set the right unlockTime", async function () {
        const { Lock, owner , otherAccount } = await loadFixture(deployOneYearLockFixture);
        expect(1).to.equal(1);
    })});
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