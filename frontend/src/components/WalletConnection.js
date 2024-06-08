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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const providers_1 = require("../web3/providers");
const WalletConnection = () => {
    const [account, setAccount] = (0, react_1.useState)("");
    const truncateWalletAddress = async (address, length = 4) => {
        if (!address)
            return "";
        const start = address.substring(0, length);
        const end = address.substring(address.length - length);
        setAccount(`${start}...${end}`);
    };
    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const provider = (0, providers_1.getWeb3Provider)();
            const address = await (0, providers_1.requestAccounts)(provider);
            truncateWalletAddress(address);
        }
        catch (error) {
            alert(error);
        }
    };
    (0, react_1.useEffect)(() => {
        const connect = async () => {
            const provider = (0, providers_1.getWeb3Provider)();
            try {
                const address = await (0, providers_1.requestAccounts)(provider);
                truncateWalletAddress(address);
            }
            catch (error) {
                console.log(error);
            }
        };
        connect();
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null, "hello my dear friends "),
        !account ? (react_1.default.createElement("li", { className: "nav-item" },
            react_1.default.createElement("button", { className: "btn btn-light", onClick: connectWallet }, "Connect Wallet"))) : (react_1.default.createElement("li", { className: "nav-item ms-1" },
            react_1.default.createElement("button", { className: "btn btn-light", onClick: connectWallet }, account)))));
};
exports.default = WalletConnection;
