//@ts-ignore
import { poseidon } from "circomlibjs";
import Decimal from "decimal.js";
import {groth16} from "snarkjs" ;
//@ts-ignore
import {utils} from "ffjavascript"; // fro the encoding techniques - little or big edian 
import crypto from "crypto" ;
import bigInt from "big-integer";
// console.log(poseidon) ;
// console.log(crypto) ;
// console.log(utils);
// console.log(groth16);
// console.log(ss);
// console.log(bigInt) ;
// console.log(groth16);


// big number is the uinion of --- number | bigint | string | BigInteger;

type bigNumber = bigint ; 

//ticket 
 type Ticket = { 
    nullifier   : bigint, 
    nullifierhash : bigint, 
    secret  : bigint,    
    pre_commitment  : Buffer,
    commitment  : bigint,
};


// creating the nullifierhash function 
function nullifierhasher (nullifier : bigNumber)  : bigNumber {
return poseidon([nullifier])
}

// first it take the secret and nullifer and then hash it 
function commitmenthasher (nullifer : bigNumber , secret : bigNumber ) : bigNumber {
    return poseidon([BigInt(nullifer) , BigInt(secret)]) 
}
// let nullifier_hash : bigint = commitmenthasher(3n , 12n) ;
// console.log(nullifier_hash) ;

// generating the randome number of the bytes32  as we defined in the solidity contract 
function generateRandomNumber() : bigint {
    return utils.leBuff2int(crypto.randomBytes(31));
}   
// let random_number = generateRandomNumber() ;
// console.log(random_number) ;
// creating the ticket 


// create the ticket  
function createTicket(nullifier : bigint  , secret : bigint) : Ticket{
   return { 
        nullifier : nullifier , 
        nullifierhash :  nullifierhasher(nullifier) ,
        secret : secret ,
        commitment :  commitmenthasher(nullifier , secret), 
        //adding the two 
        pre_commitment : Buffer.concat([utils.leInt2Buff(nullifier,31) , utils.leInt2Buff(secret,31)]),
    };
}
// let ticket = createTicket(2n,4n) ;
// console.log(ticket) ;


// we have to create the ticket event base -- that is based on the event index 
function createEventTicket(event_index : number) {
    // ticket 
    let ticket = createTicket(generateRandomNumber(), generateRandomNumber()) ;
    // the main thing the ticket contain is the 
     // nullifier and secret 
     // we store the  commitment_preimage on the ticket itself 
     let perimage = utils.leBuff2int(ticket.pre_commitment);
     //adding all this to make the
     // checking what would be the good  
    let event_ticket = "0x" + event_index.toString(16)+ perimage.toString(16) 
     console.log(perimage) ;    
    }
createEventTicket(2);

// let ticket : Ticket = createTicket(3n , 12n) ;






export {}