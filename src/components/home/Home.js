import { useEffect, useState } from "react";
import erc721Abi from "../../erc721Abi.js";
import erc20Abi from "../../erc20Abi.js";
import _ from "lodash";
import Web3 from "web3";

import Header from "../header/Header";
import Loading from "../loading/Loading";
import UserInfo from "../userInfo/UserInfo";
import TokenList from "../tokens/TokenList";
import NoAccount from "../userInfo/NoAccount.js";
import NoTokenList from "../userInfo/NoTokenList";

import "./Home.css";

function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  const [newErc721addr, setNewErc721addr] = useState("");
  const [erc721list, setErc721list] = useState([]);
  const [newErc20addr, setNewErc20addr] = useState("");
  const [erc20list, setErc20list] = useState([]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  const connectWallet = async () => {
    setIsLoading(true);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    setIsLoading(false);
  };

  const updateErc20TokenBalance = async (tokenAddr) => {
    try {
      const tokenContract = await new web3.eth.Contract(erc20Abi, newErc20addr);
      const name = await tokenContract.methods.name().call();
      const symbol = await tokenContract.methods.symbol().call();
      const balance = await tokenContract.methods.balanceOf(account).call();

      setErc20list((prev) =>
        prev.map((token) => {
          if (token.addr !== tokenAddr) return token;
          return {
            name,
            symbol,
            balance: web3.utils.fromWei(balance),
            addr: newErc20addr,
          };
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const addNewErc20Token = async () => {
    setIsLoading(true);
    console.log("addNewErc20Token");
    let isNew = true;
    if (newErc20addr) {
      try {
        for (let erc20 of erc20list) {
          if (erc20.addr === newErc20addr) {
            isNew = false;
          }
        }

        if (isNew) {
          const tokenContract = await new web3.eth.Contract(
            erc20Abi,
            newErc20addr
          );

          const name = await tokenContract.methods.name().call();
          const symbol = await tokenContract.methods.symbol().call();
          const balance = await tokenContract.methods.balanceOf(account).call();
          setErc20list((prev) => [
            ...prev,
            {
              name,
              symbol,
              balance: web3.utils.fromWei(balance),
              addr: newErc20addr,
            },
          ]);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    }
  };

  const addNewErc721Token = async () => {
    console.log("addNewErc called");
    setIsLoading(true);
    if (newErc721addr) {
      try {
        const tokenContract = await new web3.eth.Contract(
          erc721Abi,
          newErc721addr
        );
        const name = await tokenContract.methods.name().call();
        const symbol = await tokenContract.methods.symbol().call();
        const totalSupply = await tokenContract.methods.totalSupply().call();
        // token id arr
        let arr = [];
        // 비교할 token 객체 arr
        let tokens = [];
        for (let i = 1; i <= totalSupply; i++) {
          arr.push(i);
        }
        for (let tokenId of arr) {
          let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
          if (String(tokenOwner).toLowerCase() === account) {
            let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
            tokens.push({ name, symbol, tokenId, tokenURI });
          }
        }
        // tokens + erc721list 후 tokenId로 중복제거
        let uniqArr = _.uniqBy([...erc721list, ...tokens], "tokenId");
        setErc721list(uniqArr);
        setIsLoading(false);
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="App">
      {isLoading && <Loading />}
      <Header clickWallet={connectWallet} accountAddr={account} />
      <div className="container">
        {account ? (
          <>
            {erc20list.length + erc721list.length !== 0 ? (
              <>
                <UserInfo account={account} />
                <div className="newErc20">
                  <input
                    type="text"
                    onChange={(e) => {
                      setNewErc20addr(e.target.value); // 입력받을 때마다 newErc20addr 갱신
                    }}
                  ></input>
                  <button onClick={addNewErc20Token}>add new erc20</button>
                </div>

                <div className="newErc721">
                  <input
                    type="text"
                    onChange={(e) => {
                      setNewErc721addr(e.target.value); // 입력받을 때마다 newErc721addr 갱신
                    }}
                  ></input>
                  <button onClick={addNewErc721Token}>add new erc721</button>
                </div>
                <TokenList
                  web3={web3}
                  account={account}
                  erc721list={erc721list}
                  newErc721addr={newErc721addr}
                  setErc721list={setErc721list}
                  erc20list={erc20list}
                  newErc20addr={newErc20addr}
                  updateErc20TokenBalance={updateErc20TokenBalance}
                />
              </>
            ) : (
              <NoTokenList
                addNewErc721Token={addNewErc721Token}
                addNewErc20Token={addNewErc20Token}
                setNewErc721addr={setNewErc721addr}
                setNewErc20addr={setNewErc20addr}
                newErc20addr={newErc20addr}
                newErc721addr={newErc721addr}
              />
            )}
          </>
        ) : (
          <NoAccount clickWallet={connectWallet} />
        )}
      </div>
    </div>
  );
}

export default Home;
