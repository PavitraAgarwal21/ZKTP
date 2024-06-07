import { ethers ,  } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {parseTicket , createTicket  ,createEventTicket } from "../utils/index"
 const VERIFIER = "0x5FbDB2315678afecb367f032d93F642f64180aa3" ;
const ZKTP = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" ;
import {Address, ZKTP} from "../typechain-types"
async function createticket() {
}  
async function main() {
     const [owner , otherAddress] = await ethers.getSigners() ;
    // console.log(owner.address) ;
     const zktp = await ethers.getContractAt("ZKTP" , ZKTP) ;
     console.log(zktp.target) ;
     const ticketstring = await createEventTicket(0x2b6653dc) ;
     console.log(ticketstring) ;

     const parsedTicket = await parseTicket(ticketstring) ;
   console.log(parsedTicket) ;
 
}
main()
// zktp = 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0