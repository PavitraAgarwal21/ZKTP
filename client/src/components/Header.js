import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWeb3Provider, requestAccounts } from "../web3/web3";
import { Button, Navbar } from "flowbite-react";
import { storeContext } from "../useContext/storeContext";

import logo from "../Img/ZKTPS2.png";
const Header = () => {
  const [display, setDisplay] = useState(null);
  const { account, setAccount, status, index } = useContext(storeContext);
  const truncateWalletAddress = async (address, length = 4) => {
    if (!address) return "";
    const start = address.substring(0, length);
    const end = address.substring(address.length - length);
    setAccount(`${start}...${end}`);
    setDisplay(`${start}...${end}`);

  };
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = getWeb3Provider();
      const address = await requestAccounts(provider);
      truncateWalletAddress(address);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const connect = async () => {
      const provider = getWeb3Provider();
      try {
        const address = await requestAccounts(provider);
        truncateWalletAddress(address);
      } catch (error) {
        console.log(error);
      }
    };
    connect();
  }, []);

  return (
    <Navbar fluid rounded className="bg-transparent shadow-lg text-white">
    <Navbar.Brand href="/">
      <img
        src={logo}
        className="ml-200"
        alt="Flowbite React Logo"
        style={{
          height: "157px",
          marginTop: "-50px",
          marginBottom: "-55px",
          marginLeft: "100px",
        }}
      />
      {/* <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
        ZKTPS
      </span> */}
    </Navbar.Brand>
    <div className="flex md:order-2 mr-20">
      {!account ? (
        <Button color="dark" onClick={connectWallet}>
          Connect Wallet
        </Button>
      ) : (
        <Button color="dark" onClick={connectWallet}>
          {display}
        </Button>
      )}
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse>
      {/* {status ? ( */}
        <Link to={`/home/${index}`}>Home</Link>
      {/* ) : (  */}
        <Link to="/">Home</Link>
      {/* )}  */}
      {/* {status && ( */}
        <>
          <Link to="/verify">Verify Ticket</Link>
          <Link to="/invalidate">Invalidate Ticket</Link>
          <Link to="/resale">Resale Tickets</Link>
        </>
      {/* )} */}
      <Link to="/buyResale">Buy Resale Tickets</Link>
      <Link to="/info">Info</Link>
    </Navbar.Collapse>
  </Navbar>
  );
};

export default Header;