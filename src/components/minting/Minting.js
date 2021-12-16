import { useState } from "react";
import erc721Abi from "../../erc721Abi";
import { useStore } from "../../store";

const Minting = () => {
  const [recipientForMintingErc721, setRecipientForMintingErc721] =
    useState("");
  const [tokenUriForMintingErc721, setTokenUriForMintingErc721] = useState("");
  const web3 = useStore((state) => state.web3);
  const account = useStore((state) => state.account);

  const mintErc721 = async () => {
    if (!recipientForMintingErc721 || !tokenUriForMintingErc721) {
      alert("받는 사람 지갑 주소와 이미지 URL을 입력해주세요.");
      return;
    }

    try {
      const tokenContract = await new web3.eth.Contract(
        erc721Abi,
        "0xBe8005cA209f608C98694B9d9fA6f358f1f2f8A8",
        {
          from: account,
        }
      );

      const res = await tokenContract.methods
        .mintNFT(recipientForMintingErc721, tokenUriForMintingErc721)
        .send();

      // if (erc721list) {
      //   addNewErc721Token();
      // }

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {account && (
        <div className="mint-nft">
          <div>
            생성되는 ERC721 NFT contract 주소:
            0xBe8005cA209f608C98694B9d9fA6f358f1f2f8A8
          </div>
          <input
            type="text"
            onChange={(e) => setRecipientForMintingErc721(e.target.value)}
            placeholder="받는 사람 지갑 주소"
          />
          <input
            type="text"
            onChange={(e) => setTokenUriForMintingErc721(e.target.value)}
            placeholder="이미지 URL"
          />
          <button onClick={mintErc721}>ERC721 NFT 생성</button>
        </div>
      )}
    </>
  );
};

export default Minting;
