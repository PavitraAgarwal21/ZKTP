"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testProofGenerator = exports.verifyTicket = exports.generateTicketProof = exports.createEventTicket = exports.parseTicket = exports.createTicket = exports.ticketHex = exports.generateRandomNumber = exports.commitmenthasher = exports.nullifierhasher = void 0;
//@ts-ignore
const circomlibjs_1 = require("circomlibjs");
const snarkjs_1 = require("snarkjs");
//@ts-ignore
const ffjavascript_1 = require("ffjavascript"); // fro the encoding techniques - little or big edian 
const crypto_1 = __importDefault(require("crypto"));
const big_integer_1 = __importDefault(require("big-integer"));
const fs_1 = __importDefault(require("fs"));
// creating the nullifierhash function 
function nullifierhasher(nullifier) {
    return (0, circomlibjs_1.poseidon)([nullifier]);
}
exports.nullifierhasher = nullifierhasher;
// first it take the secret and nullifer and then hash it 
function commitmenthasher(nullifer, secret) {
    return (0, circomlibjs_1.poseidon)([BigInt(nullifer), BigInt(secret)]);
}
exports.commitmenthasher = commitmenthasher;
// let nullifier_hash : bigint = commitmenthasher(3n , 12n) ;
// console.log(nullifier_hash) ;
// generating the randome number of the bytes32  as we defined in the solidity contract 
function generateRandomNumber() {
    return ffjavascript_1.utils.leBuff2int(crypto_1.default.randomBytes(31));
}
exports.generateRandomNumber = generateRandomNumber;
// let random_number = generateRandomNumber() ;
// console.log(random_number) ;
// creating the ticket 
function ticketHex(number, length = 32) {
    const str = number instanceof Buffer ? number.toString('hex') : (0, big_integer_1.default)(number).toString(16);
    return '0x' + str.padStart(length * 2, '0');
}
exports.ticketHex = ticketHex;
// create the ticket  
async function createTicket(nullifier, secret) {
    return {
        nullifier: nullifier,
        nullifierhash: nullifierhasher(nullifier),
        secret: secret,
        commitment: commitmenthasher(nullifier, secret),
        //adding the two 
        pre_commitment: Buffer.concat([ffjavascript_1.utils.leInt2Buff(nullifier, 31), ffjavascript_1.utils.leInt2Buff(secret, 31)]),
    };
}
exports.createTicket = createTicket;
async function parseTicket(noteString) {
    const noteRegex = /zkticket-(?<chainid>\d+)-0x(?<note>[0-9a-fA-F]{124})/g;
    const match = noteRegex.exec(noteString);
    if (!match || !match.groups) {
        throw new Error("Invalid Note!");
    }
    const buf = Buffer.from(match.groups.note, "hex");
    const nullifier = ffjavascript_1.utils.leBuff2int(buf.slice(0, 31));
    const secret = ffjavascript_1.utils.leBuff2int(buf.slice(31, 62));
    const cryptoNote = await createTicket(nullifier, secret);
    const chainid = Number(match.groups.chainid);
    return { cryptoNote, chainid };
}
exports.parseTicket = parseTicket;
// let ticket = createTicket(2n,4n) ;
// console.log(ticket) ;
// i have uses the chainid so that it can prevent from the replay attack 
// we have to create the ticket event base -- that is based on the event index 
async function createEventTicket(chainid) {
    // ticket 
    const ticket = await createTicket(generateRandomNumber(), generateRandomNumber());
    const ticket_hash = ticketHex(ticket.pre_commitment, 62);
    const ticket_string = `ZKTP-${chainid}-${ticket_hash}`;
    return ticket_string;
    // the main thing the ticket contain is the 
    // nullifier and secret 
    // we store the  commitment_preimage on the ticket itself 
    //  let perimage = utils.leBuff2int(ticket.pre_commitment);
    //adding all this to make the
    // checking what would be the good  
    // let event_ticket = "0x" + event_index.toString(16)+ perimage.toString(16) 
    //  console.log(perimage) ;    
}
exports.createEventTicket = createEventTicket;
// createEventTicket(2);
// generating the proof
// for generating the proof we include the 
// inputs , wasm file , and verifcation key 
async function generateTicketProof(ticket) {
    // signal input nullifier  ;
    // signal input  secret ; 
    // signal input nullifierhash ;
    // signal input commitmenthash ;  
    const intput = {
        // their are four inputs 
        // commitment , nullifier , nullifier hash , secret
        nullifier: ticket.nullifier,
        nullifierhash: ticket.nullifierhash,
        commitmenthash: ticket.commitment,
        secret: ticket.secret,
    };
    // we have to define the path for the wasm file and verification key 
    let proofGenFiles = {
        wasm: "./circuits/Ticket_js/Ticket.wasm",
        vk: "./circuits/Ticket_0001.zkey", // prover key 
    };
    const { proof, publicSignals } = await snarkjs_1.groth16.fullProve(intput, proofGenFiles.wasm, proofGenFiles.vk);
    return { proof, publicSignals };
}
exports.generateTicketProof = generateTicketProof;
// let test the proof generator in the system from the 
// verify the proof 
// as nullifierhash string , commintemt  string 
function verifyTicket(vk, { proof, publicSignals }) {
    return snarkjs_1.groth16.verify(vk, [
        publicSignals[0],
        publicSignals[1],
    ], 
    //@ts-ignore
    proof);
}
exports.verifyTicket = verifyTicket;
// type solidityProof = {
//     pi_a 
// }
//// convert the proof according to the verifier.sol
//function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[2] calldata _pubSignals) public view returns (bool) {
async function testProofGenerator() {
    const proof = await generateTicketProof(await createTicket(2n, 4n));
    const verificationKeyFile = fs_1.default.readFileSync("./circuits/verification_key.json", "utf-8");
    const verificationKey = JSON.parse(verificationKeyFile);
    console.log(await verifyTicket(verificationKey, proof)); // in this verification key is contain the cureve name also so 
    console.log("proof is verified ");
}
exports.testProofGenerator = testProofGenerator;
testProofGenerator();
