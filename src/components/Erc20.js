import { useState } from "react";
import erc20Abi from "../erc20Abi";
import styled from "styled-components";

const TokenWrapper = styled.div`
  padding: 10px;
`;

function Erc721({ web3, account, erc20list, erc20addr, setErc20list }) {
  // TODO: 하드 코딩된 토큰 컨트랙트 주소
  const [to, setTo] = useState("");
  // const sendToken = async (tokenAddr, tokenId) => {
  //   const tokenContract = await new web3.eth.Contract(erc721Abi, tokenAddr, {
  //     from: account,
  //   });
  //   tokenContract.methods
  //     .transferFrom(account, to, tokenId)
  //     .send({
  //       from: account,
  //     })
  //     .on("receipt", (receipt) => {
  //       setTo("");
  //       // TODO
  //       setErc721list(erc721list.filter((token) => token.tokenId !== tokenId));
  //     });
  // };
  return (
    // test
    <div className="erc20list">
      {erc20list.map((token) => {
        return (
          <TokenWrapper className="erc20token" key={token.symbol + token.name}>
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
              <button className="sendErc20Btn" onClick={() => {}}>
                send token
              </button>
            </div>
          </TokenWrapper>
        );
      })}
    </div>
  );
}

export default Erc721;
