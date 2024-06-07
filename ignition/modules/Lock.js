"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("@nomicfoundation/hardhat-ignition/modules");
const LockModule = (0, modules_1.buildModule)("LockModule", (m) => {
    const lock = m.contract("verifier");
    console.log(lock.id);
    return { lock };
});
exports.default = LockModule;
