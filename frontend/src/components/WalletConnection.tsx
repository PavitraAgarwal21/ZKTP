import React  , {useEffect , useState }from 'react';
import { requestAccounts , getWeb3Provider , ZEROADDRESS} from '../web3/providers';


const  WalletConnection = () =>  {
    const [account, setAccount] = useState("");
    const truncateWalletAddress = async (address : any , length = 4) => {
        if (!address) return "";
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
        <> 
     <div>hello my dear friends </div>


     {!account ? (
              <li className="nav-item">
                <button className="btn btn-light" onClick={connectWallet}>
                  Connect Wallet
                </button>
              </li>
            ) : (
              <li className="nav-item ms-1">
                <button className="btn btn-light" onClick={connectWallet}>
                  {account}
                </button>
              </li>
            )}

     </>
  );
}
export default WalletConnection;
