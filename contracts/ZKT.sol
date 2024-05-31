
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

// interface for the verifier contract  
interface IVerifier {
     function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory _input
    ) external returns (bool);
} 
 // event  
 struct TicketEvent { 
    address payable creator ; 
    uint256 price ; 
    string  eventName ;
    uint256 noOfTicketAvl;
 }
// ticket commitment 
 struct TicketCommitment {
 address buyer ;
 uint256 ticketEventIndex ;
 bool used ; 
 }
contract ZKT{ 

     using Math for uint256 ; 
     using Address for address ;
    
    address payable  contractOwner ; 
    IVerifier public verifier ; 
    uint256 public ticketEventIndex;
    constructor(IVerifier _verify ) {
        verifier = _verify;
        contractOwner = payable (msg.sender) ;  
        ticketEventIndex  = 0 ;
    }

// helper function 
    function calculateFees(uint256 ticketPrice  ) pure public  returns (uint256, uint256  ) {
        (bool _sucess ,uint256 fees) = ticketPrice.tryDiv(100) ; // the one percent of the ticket price is the  fees 
        (bool _sucess2,uint256 total) = ticketPrice.tryAdd(fees) ; 
        return (fees , total) ;
    } 
//create event for the TicketEvent 
mapping (uint256 => TicketEvent ) ticketEvents ;

event NewTicketEvent(
    address indexed  creator ,
    uint256 indexed  index ,
    string name ,
    uint256 availableTicket ,
    uint256 price 
);


// create Ticket - event
function createTicketEvent(uint256 _price , string calldata _event_name , uint256 _on_of_ticket) external   {

ticketEventIndex +=1 ;
ticketEvents[ticketEventIndex].price = _price ; 
ticketEvents[ticketEventIndex].eventName = _event_name ;
ticketEvents[ticketEventIndex].noOfTicketAvl = _on_of_ticket ;
ticketEvents[ticketEventIndex].creator = payable (msg.sender) ;

emit NewTicketEvent(msg.sender, ticketEventIndex , _event_name, _on_of_ticket, _price);
}



mapping (bytes32 =>TicketCommitment) TicketCommitments ;

// buy ticket  
// inputs - commitment and eventIndex 
// commitment is generated at the backend 
function buyTicket(bytes32 commitment , uint256 eventIndex) external payable  {

// right amount of the ticket price 
(uint256 fees , uint256 total ) = calculateFees(ticketEvents[eventIndex].price);
require(msg.value == total , "Invalid ticket price ") ;

// ticket is sold out 
require(ticketEvents[eventIndex].noOfTicketAvl > 0 , "tickets are sold out !!") ;

// ticket is not valid // 
// case one 
        // when the commitment is already used 
    require(!TicketCommitments[commitment].used , "invalid commitment" );

// it means with this commitment ticket is created 
    TicketCommitments[commitment].used = true ; 
    TicketCommitments[commitment].buyer = msg.sender ; 
    TicketCommitments[commitment].ticketEventIndex = eventIndex ;
    ticketEvents[eventIndex].noOfTicketAvl -= 1 ;


//TODO! some custom logic 
//case 1 sending the ticket price to the event creator when it is invalidated the ticket not just after buying of thr ticket . 
//case 2 if it is not invldated then after the event is expire the 50-50 is given back to the ticket buyer and event creator . 


// sending the ticket price to event creator 
   Address.sendValue(ticketEvents[eventIndex].creator , ticketEvents[eventIndex].price) ; 
   
   
   // sending fees to the contract creator
   Address.sendValue(contractOwner , fees) ;
}


mapping (bytes32 => bool) nullifierHashes ; 

// verify ticket 
// we can verify the ticket that if the person konw the nullifierhash 
// the nullifier is not used before 
// commitment is also correct 
function verifyTicket(bytes32 _nullifierHash , bytes32 _commitment ) external view returns (bool) { 

// if the ticket already nullified or invlidated then it will be true 
if (nullifierHashes[_nullifierHash]) { 
    return false ;
}
// if ticket is not created for this commitment  
if (!TicketCommitments[_commitment].used)
{
    return false ;
}
return true ; 
}

// invalidate ticket 
// fucntion defination 
    function verify(uint[] memory input, Proof memory proof) internal view returns (uint) {}



}