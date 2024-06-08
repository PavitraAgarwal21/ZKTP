import React , {useState} from "react";
import { zktp_address } from "../web3/constants"; 
import { getWeb3Provider , getChainId , requestAccounts , getContract, getContractRead , createEvent} from "../web3/providers";
import NotificationBar from './NotificationBar';
import EventCard from './EventCard'; // Import the EventCard component

export type Event = {
    index : number , 
    creator : string ,
    price : number  , 
    event_name : string ,
    availableTicket : number ,
}




function CreateEvents() {


 
// calling the creating event 
    

    async function getEventDetails( ) {

        const provider = getWeb3Provider();
        const contract_read = getContractRead(provider , zktp_address);// for the read  
         let index = await  contract_read.ticketEvents(2) ;
         console.log(index.noOfTicketAvl.toString());    

    } 

    const [events, setEvents] = useState<Event[]>([]);
    const [notification, setNotification] = useState<string | null>(null);
    const [inputs, setInputs] = useState({ input1: '', input2: '', input3: '' });
   async function create() {
        const provider = getWeb3Provider();
        const contract_read = getContractRead(provider , zktp_address);// for the read 
        const contract = getContract(provider , zktp_address); // for the signer 
        createEvent(contract , inputs.input1 , inputs.input2 , inputs.input3 ); 
        contract_read.on("NewTicketEvent" , async (creator ,index , name , availableTicket , price  )=> {
            const newEvent: Event = {
                index: Number(index),
                creator,
                price: Number(price),
                event_name: name,
                availableTicket: Number(availableTicket)
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            const message = `Event created by ${creator}, Index: ${index}, Name: ${name}, Tickets: ${availableTicket}, Price: ${price}`;
                alert("event created") ;
                setNotification(message);

        })
    }
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setInputs({
                ...inputs,
                [name]: value,
            });
        };
    
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log('Input 1:', inputs.input1);
            console.log('Input 2:', inputs.input2);
            console.log('Input 3:', inputs.input3);
        };
    

    // let  define here to create the to open to make the system very clear 
    // how the events works 

    
    return (
        <div> 
        <div>
            <h1>Create Events</h1>
            <button onClick={create}> create Events</button>
        <button onClick={getEventDetails}>Event details </button>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Input 1:
                    <input type="text" name="input1" value={inputs.input1} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Input 2:
                    <input type="text" name="input2" value={inputs.input2} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Input 3:
                    <input type="text" name="input3" value={inputs.input3} onChange={handleChange} />
                </label>
            </div>
            <button type="submit" onClick={create} >Submit</button>
        </form>
        {notification && <NotificationBar message={notification} onClose={() => setNotification(null)} />}
        <h2>Event List</h2>
            <div className="event-list">
                {events.map((event) => (
                    <EventCard key={event.index} event={event} />
                ))}
            </div>
        </div>
    );
   }
export default CreateEvents  ;