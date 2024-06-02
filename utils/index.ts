//@ts-ignore
import { poseidon } from "circomlibjs";
import Decimal from "decimal.js";
import {groth16} from "snarkjs" ;
//@ts-ignore
import {utils} from "ffjavascript"; // fro the encoding techniques - little or big edian 
import crypto from "crypto" ;
import bigInt from "big-integer";
import fs from "fs" ;

// console.log(poseidon) ;
// console.log(crypto) ;
// console.log(utils);
// console.log(groth16);
// console.log(ss);
// console.log(bigInt) ;
// console.log(groth16);


// big number is the uinion of --- number | bigint | string | BigInteger;

type bigNumber = string | bigint  ; // as in the defination of the groth16 there is the publicsignals is defined as the string and number(bignumber) 

//ticket 
 type Ticket = { 
    nullifier   : bigint, 
    nullifierhash : bigint, 
    secret  : bigint,    
    pre_commitment  : Buffer,
    commitment  : bigint,
};
//function verifyProof(uint[2] calldata _pA, u  _pB, uint[2] calldata _pC, uint[2] calldata _pubSignals) public view returns (bool) {

//  proof: {
    // pi_a: [
    //     '13467724321987646925263629914929225281489887064379845264733254395834285251300',
    //     '3039612730117518460526773809659248920991971660364081305610320010613209727130',
    //     '1'
    //   ],
    //   pi_b: [ [Array], [Array], [Array] ],
    //   pi_c: [
    //     '20886218909279063439506093681267401300201668119671727622274014578541878967672',
    //     '12129274871018148495343907950063759965555896746684689218896481489846486401502',
    //     '1'
    //   ],
    //   protocol: 'groth16',
    //   curve: 'bn128'
    // },

     type Proof = {
        pi_a: bigNumber [],
        pi_b: bigNumber[][],
        pi_c: bigNumber[],
        protocol: string, // 'groth16
        curve: string, // bn128 
    }
    

    // 
    type PublicSignals = {
        nullifierHash: bigint,
        commitmentHash: bigint
    }
    type TotalProof = { 
        proof : Proof 
        publicSignals : Array<any>
        
    }

// creating the nullifierhash function 
function nullifierhasher (nullifier : bigNumber)  : bigint {
return poseidon([nullifier])
}

// first it take the secret and nullifer and then hash it 
function commitmenthasher (nullifer : bigNumber , secret : bigNumber ) : bigint {
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

function toNoteHex(number: Buffer | any, length = 32) {
    const str = number instanceof Buffer ? number.toString('hex') : bigInt(number).toString(16)
    return '0x' + str.padStart(length * 2, '0')
}

// create the ticket  
async function createTicket(nullifier : bigint  , secret : bigint) : Promise<Ticket> {
    return { 
        nullifier : nullifier , 
        nullifierhash :  nullifierhasher(nullifier) ,
        secret : secret ,
        commitment :   commitmenthasher(nullifier , secret), 
        //adding the two 
        pre_commitment :  Buffer.concat([utils.leInt2Buff(nullifier,31) , utils.leInt2Buff(secret,31)]),
    };
}
// let ticket = createTicket(2n,4n) ;
// console.log(ticket) ;

// i have uses the chainid so that it can prevent from the replay attack 
// we have to create the ticket event base -- that is based on the event index 
async function createEventTicket(chainid  : number) : Promise<string>{
    // ticket 
    const  ticket = await createTicket(generateRandomNumber(), generateRandomNumber()) ;
    const ticket_hash = toNoteHex(ticket.pre_commitment , 62) ; 
    const ticket_string = `ZKTP-${chainid}-${ticket_hash}`; 
    return ticket_string ;    
    // the main thing the ticket contain is the 
    // nullifier and secret 
    // we store the  commitment_preimage on the ticket itself 
    //  let perimage = utils.leBuff2int(ticket.pre_commitment);
     //adding all this to make the
     // checking what would be the good  
    // let event_ticket = "0x" + event_index.toString(16)+ perimage.toString(16) 
    //  console.log(perimage) ;    
    }
    // createEventTicket(2);



// generating the proof
// for generating the proof we include the 
// inputs , wasm file , and verifcation key 
async function generateTicketProof(ticket : Ticket ) : Promise<any> {
    
    // signal input nullifier  ;
    // signal input  secret ; 
    // signal input nullifierhash ;
    // signal input commitmenthash ;  
    const intput = {
        // their are four inputs 
        // commitment , nullifier , nullifier hash , secret
        nullifier : ticket.nullifier ,
        nullifierhash :  ticket.nullifierhash ,
        commitmenthash : ticket.commitment , 
        secret : ticket.secret , 
        
    } ;

    // we have to define the path for the wasm file and verification key 
 
    let  proofGenFiles = {
        wasm : "./circuits/Ticket_js/Ticket.wasm" ,
        vk : "./circuits/Ticket_0001.zkey" , // prover key 
   }
    
    const {proof , publicSignals}  =  await groth16.fullProve(
        intput,
        proofGenFiles.wasm ,
        proofGenFiles.vk 
    )

    return { proof , publicSignals }
}


// let test the proof generator in the system from the 


// verify the proof 
// as nullifierhash string , commintemt  string 
export function verifyTicket(vk: any, {proof , publicSignals } : TotalProof ): Promise<boolean> {
    return groth16.verify(
        vk,
        [
            publicSignals[0]   ,
            publicSignals[1],
       ],
       //@ts-ignore
       proof    
   )
}


// type solidityProof = {
//     pi_a 
// }
//// convert the proof according to the verifier.sol
//function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[2] calldata _pubSignals) public view returns (bool) {


async function testProofGenerator() {
    const proof : TotalProof = await generateTicketProof( await createTicket(2n,4n) ) ;
    
    const verificationKeyFile = fs.readFileSync("./circuits/verification_key.json", "utf-8");
    const verificationKey = JSON.parse(verificationKeyFile);
    console.log(await verifyTicket( verificationKey, proof ) ); // in this verification key is contain the cureve name also so 
console.log("proof is verified ") ;    
}
    testProofGenerator() ;






export {}