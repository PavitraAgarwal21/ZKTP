"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const EventCard = ({ event }) => {
    return (react_1.default.createElement("div", { className: "event-card" },
        react_1.default.createElement("p", null,
            "Index: ",
            event.index),
        react_1.default.createElement("p", null,
            "Creator: ",
            event.creator),
        react_1.default.createElement("p", null,
            "Event Name: ",
            event.event_name),
        react_1.default.createElement("p", null,
            "Available Tickets: ",
            event.availableTicket),
        react_1.default.createElement("p", null,
            "Price: ",
            event.price)));
};
exports.default = EventCard;
