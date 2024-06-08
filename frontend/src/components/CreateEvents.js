"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const constants_1 = require("../web3/constants");
const providers_1 = require("../web3/providers");
const NotificationBar_1 = __importDefault(require("./NotificationBar"));
const EventCard_1 = __importDefault(require("./EventCard")); // Import the EventCard component
function CreateEvents() {
    // calling the creating event 
    async function getEventDetails() {
        const provider = (0, providers_1.getWeb3Provider)();
        const contract_read = (0, providers_1.getContractRead)(provider, constants_1.zktp_address); // for the read  
        let index = await contract_read.ticketEvents(2);
        console.log(index.noOfTicketAvl.toString());
    }
    const [events, setEvents] = (0, react_1.useState)([]);
    const [notification, setNotification] = (0, react_1.useState)(null);
    const [inputs, setInputs] = (0, react_1.useState)({ input1: '', input2: '', input3: '' });
    async function create() {
        const provider = (0, providers_1.getWeb3Provider)();
        const contract_read = (0, providers_1.getContractRead)(provider, constants_1.zktp_address); // for the read 
        const contract = (0, providers_1.getContract)(provider, constants_1.zktp_address); // for the signer 
        (0, providers_1.createEvent)(contract, inputs.input1, inputs.input2, inputs.input3);
        contract_read.on("NewTicketEvent", async (creator, index, name, availableTicket, price) => {
            const newEvent = {
                index: Number(index),
                creator,
                price: Number(price),
                event_name: name,
                availableTicket: Number(availableTicket)
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            const message = `Event created by ${creator}, Index: ${index}, Name: ${name}, Tickets: ${availableTicket}, Price: ${price}`;
            alert("event created");
            setNotification(message);
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Input 1:', inputs.input1);
        console.log('Input 2:', inputs.input2);
        console.log('Input 3:', inputs.input3);
    };
    // let  define here to create the to open to make the system very clear 
    // how the events works 
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Create Events"),
            react_1.default.createElement("button", { onClick: create }, " create Events"),
            react_1.default.createElement("button", { onClick: getEventDetails }, "Event details ")),
        react_1.default.createElement("form", { onSubmit: handleSubmit },
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null,
                    "Input 1:",
                    react_1.default.createElement("input", { type: "text", name: "input1", value: inputs.input1, onChange: handleChange }))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null,
                    "Input 2:",
                    react_1.default.createElement("input", { type: "text", name: "input2", value: inputs.input2, onChange: handleChange }))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("label", null,
                    "Input 3:",
                    react_1.default.createElement("input", { type: "text", name: "input3", value: inputs.input3, onChange: handleChange }))),
            react_1.default.createElement("button", { type: "submit", onClick: create }, "Submit")),
        notification && react_1.default.createElement(NotificationBar_1.default, { message: notification, onClose: () => setNotification(null) }),
        react_1.default.createElement("h2", null, "Event List"),
        react_1.default.createElement("div", { className: "event-list" }, events.map((event) => (react_1.default.createElement(EventCard_1.default, { key: event.index, event: event }))))));
}
exports.default = CreateEvents;
