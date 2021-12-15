import { useState } from "react";
import erc20Abi from "../erc20Abi";

function Erc20({
  web3,
  account,
  erc20list,
  newErc20addr,
  setErc20list,
  updateErc20TokenBalance,
}) {
  // TODO: 하드 코딩된 토큰 컨트랙트 주소
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);

  const sendToken = async (tokenAddr) => {
    console.log(tokenAddr);
    console.log(account, to, parseInt(amount));
    console.log(typeof account, typeof to, typeof parseInt(amount));
    try {
      const tokenContract = await new web3.eth.Contract(erc20Abi, tokenAddr, {
        from: account,
      });
      if (amount > 0) {
        tokenContract.methods
          .transfer(to, web3.utils.toWei(amount, "ether"))
          .send({
            from: account,
          })
          .on("receipt", (receipt) => {
            setTo("");
            // TODO: Token 전송 후 잔액 수정하는 부분
            updateErc20TokenBalance(tokenAddr);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    // test
    <div className="erc20list">
      {erc20list.map((token) => {
        return (
          <div className="erc20token" key={token.symbol + token.name}>
            Name: <span className="name">{token.name}</span>(
            <span className="symbol">{token.symbol}</span>)
            <span>{token.balance}</span>
            <div className="tokenTransfer">
              To:{" "}
              <input
                type="text"
                onChange={(e) => {
                  setTo(e.target.value);
                }}
              ></input>
              Amount:{" "}
              <input type="nu" onChange={(e) => setAmount(e.target.value)} />
              <button
                className="sendErc20Btn"
                onClick={() => {
                  sendToken(newErc20addr);
                }}
              >
                send token
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Erc20;
