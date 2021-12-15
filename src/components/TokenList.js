import Erc721 from "./Erc721";
import Erc20 from "./Erc20";
import styled from "styled-components";

const Container = styled.div`
  // padding: 20px;
`;

// TokenList.js
function TokenList({
  web3,
  account,
  erc721list,
  newErc721addr,
  setErc721list,
  erc20list,
}) {
  return (
    <Container className="tokenlist">
      <Erc20 erc20list={erc20list} />

      <Erc721
        web3={web3}
        account={account}
        erc721list={erc721list}
        erc721addr={newErc721addr}
        setErc721list={setErc721list}
      />
    </Container>
  );
}

export default TokenList;
