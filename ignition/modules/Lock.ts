import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const LockModule = buildModule("LockModule", (m) => {


  const lock = m.contract("verifier");

  console.log(lock.id);


  
  return { lock };

});

export default LockModule;
