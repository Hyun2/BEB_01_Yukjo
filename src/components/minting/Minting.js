import { useEffect, useState } from "react";
import Web3 from "web3";
import erc721Abi from "../../erc721Abi";
import { useStore } from "../../store";
import styled from "styled-components";
// import { Button, TextInputField, Text } from "evergreen-ui";
import {
  TextInput,
  Button,
  Modal,
  LoadingOverlay,
  Tooltip,
} from "@mantine/core";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

// import { ToastContainer, toast } from "react-toastify";

// import { Form, Button, Input } from "antd";

import Loading from "../loading/Loading";

const Wrapper = styled.div`
  margin: 0px auto;
`;

const Container = styled.div`
  width: 772px;
  // margin-bottom: 32px;
  // width: 100%;
`;

const CTextInput = styled(TextInput)`
  margin-bottom: 26px;

  label {
    font-size: 18px;
  }
`;

const Minting = () => {
  const [recipientForMintingErc721, setRecipientForMintingErc721] =
    useState("");
  const [tokenUriForMintingErc721, setTokenUriForMintingErc721] = useState("");
  const [recipientError, setRecipientError] = useState(false);
  const [tokenUriError, setTokenUriError] = useState(false);
  const [web3, setWeb3] = useStore((state) => [state.web3, state.setWeb3]);
  const account = useStore((state) => state.account);
  const [modalOpend, setModalOpened] = useState(false);
  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useStore((state) => [
    state.isLoading,
    state.setIsLoading,
  ]);

  const [erc721list, setErc721list] = useStore((state) => [
    state.erc721list,
    state.setErc721list,
  ]);
  const navigate = useNavigate();

  const updateRecipientError = () => {
    if (!recipientForMintingErc721)
      setRecipientError("받는 사람의 지갑 주소를 입력해주세요.");
    else setRecipientError(false);
  };

  const updateTokenUriError = () => {
    if (!tokenUriForMintingErc721)
      setTokenUriError("외부 링크(이미지 URL)를 입력해주세요.");
    else setTokenUriError(false);
  };

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

  // const notify = () =>
  //   toast.success("생성된 NFT를 확인하러 가실래요?", {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });

  const addNewErc721Token = async () => {
    console.log("addNewErc721 called");
    setIsLoading(true);
    try {
      const tokenContract = await new web3.eth.Contract(
        erc721Abi,
        "0xBe8005cA209f608C98694B9d9fA6f358f1f2f8A8"
      );
      const name = await tokenContract.methods.name().call();
      const symbol = await tokenContract.methods.symbol().call();
      const totalSupply = await tokenContract.methods.totalSupply().call();
      console.log(name, symbol, totalSupply);
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
      console.log(tokens);
      // tokens + erc721list 후 tokenId로 중복제거
      let uniqArr = _.uniqBy([...erc721list, ...tokens], "tokenId");
      setErc721list(uniqArr);
      console.log(erc721list);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  const mintErc721 = async (e) => {
    e.preventDefault();
    if (!recipientForMintingErc721 || !tokenUriForMintingErc721) {
      updateRecipientError();
      updateTokenUriError();
      return;
    }

    try {
      console.log(web3);
      const tokenContract = await new web3.eth.Contract(
        erc721Abi,
        "0xBe8005cA209f608C98694B9d9fA6f358f1f2f8A8",
        {
          from: account,
        }
      );

      const res = await tokenContract.methods
        .mintNFT(recipientForMintingErc721, tokenUriForMintingErc721)
        .send()
        .on("transactionHash", () => {
          setModalOpened(true);
        })
        .on("confirmation", (_, recipient) => {
          console.log("confirmation");
          // notify();
          setSuccess(true);
          setModalOpened(false);
        });

      console.log(res);

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
      {isLoading && <Loading />}
      {account && (
        <Wrapper>
          <Container className="mint-nft">
            {/* <Ttitle>
              생성되는 ERC721 NFT contract 주소:{" "}
              <Code>0xBe8005cA209f608C98694B9d9fA6f358f1f2f8A8</Code>
            </Ttitle> */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                style={{ marginBottom: "40px" }}
                variant="light"
                color="indigo"
                onClick={() => navigate("/")}
              >
                <span style={{ marginLeft: "10px" }}>메인 페이지로 이동</span>
              </Button>
              <Tooltip
                label="생성이 완료되면 활성화됩니다."
                position="bottom"
                placement="end"
                gutter={10}
              >
                <Button
                  style={{ marginBottom: "40px" }}
                  variant="light"
                  color="indigo"
                  onClick={() => addNewErc721Token()}
                  disabled={!success}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>

                  <span style={{ marginLeft: "10px" }}>
                    생성된 NFT 확인하러 가기
                  </span>
                </Button>
              </Tooltip>
            </div>
            <CTextInput
              id="recipient-addres"
              type="text"
              required
              label="받는 사람 지갑 주소"
              onChange={(e) => {
                // updateRecipientError();
                setRecipientForMintingErc721(e.target.value);
              }}
              onKeyUp={() => {
                updateRecipientError();
              }}
              placeholder="받는 사람 지갑 주소"
              error={recipientError}
              onBlur={updateRecipientError}
            />
            <CTextInput
              type="text"
              required
              label="외부 링크(이미지 URL)"
              onChange={(e) => {
                // updateTokenUriError();
                setTokenUriForMintingErc721(e.target.value);
              }}
              onKeyUp={() => {
                updateTokenUriError();
              }}
              placeholder="이미지 URL"
              error={tokenUriError}
              onBlur={updateTokenUriError}
            />
            <Button
              variant="outline"
              color="indigo"
              size="md"
              onClick={mintErc721}
            >
              NFT 생성
            </Button>
            <Modal
              centered
              opened={modalOpend}
              onClose={() => setModalOpened(false)}
              hideCloseButton
            >
              <div>
                <LoadingOverlay
                  style={{ width: 400, position: "relative" }}
                  overlayOpacity={0.3}
                  visible={modalOpend}
                />
              </div>
              <div
                style={{
                  margin: "20px 0",
                  fontSize: "18px",
                }}
              >
                <p style={{ textAlign: "center" }}>NFT 생성이 진행 중입니다.</p>
                <p style={{ textAlign: "center" }}>
                  창을 닫아도 생성은 진행 됩니다.
                </p>
                <p style={{ textAlign: "center" }}>
                  생성이 완료되면 메타마스크에서 알림을 드립니다.
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="outline"
                  color="indigo"
                  size="md"
                  onClick={() => setModalOpened(false)}
                >
                  닫기
                </Button>
              </div>
            </Modal>
            {/* <ToastContainer
              onClick={() => {
                console.log("clicked!");
              }}
            /> */}
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default Minting;
