"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./NotificationBar.css"); // Assuming you will add some basic styling
const NotificationBar = ({ message, onClose }) => {
    return (react_1.default.createElement("div", { className: "notification-bar" },
        react_1.default.createElement("span", null, message),
        react_1.default.createElement("button", { onClick: onClose }, "Close")));
};
exports.default = NotificationBar;
