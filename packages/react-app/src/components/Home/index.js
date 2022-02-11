import React, { useState } from "react";
import { parseEther } from "@ethersproject/units";
import { ETH_VAL } from "../../constants";

import {
  Container,
  InnerContainer,
  TextWrapper,
  NFTContainer,
  ProgressBarContainer,
  ButtonWrapper,
  ImgWrapper,
  PointWrapper,
} from "./styles"; //k-k

export const Home = ({ contract, signer, remainTokenCount }) => {
  const [amount, setAmount] = useState(ETH_VAL);
  const [count, setCount] = useState(1);
  const [minting, setMinting] = useState(false);
  const [cnt, setCnt] = useState(1);
  const [currentAccount, setCurrentAccount] = useState(null);

  const mintNftHandler = async () => {
    setMinting(true);
    try {
      const mintFunction = contract.connect(signer)["mint"];
      console.log(mintFunction)
      const hash = await mintFunction(count, {
        value: parseEther((amount * count).toString()),
      });
      await hash.wait();
      setMinting(false);
    } catch (e) {
      setMinting(false);
      console.log(e);
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button"
      >
        Connect Wallet
      </button>
    );
  };
  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className="cta-button mint-nft-button">
        Mint NFT
      </button>
    );
  };

  return (
    <Container>
      <InnerContainer>
        <TextWrapper>
          <h1>MINT AN ANTI APE NOW</h1>
          <h2>{remainTokenCount}/11111</h2>
          <NFTContainer>
            <p>NFT Count {cnt > 0 && <span>{cnt}</span>}</p>
            <ProgressBarContainer>
              <PointWrapper active={true} onClick={() => setCnt(1)} />
              <PointWrapper active={true} onClick={() => setCnt(1)} />
              <PointWrapper active={cnt > 1} onClick={() => setCnt(2)} />
            </ProgressBarContainer>
          </NFTContainer>
          <ButtonWrapper>
            {currentAccount ? mintNftButton() : connectWalletButton()}
          </ButtonWrapper>
        </TextWrapper>
        <ImgWrapper>
          <img src="/home-hero.png" alt="" />
        </ImgWrapper>
      </InnerContainer>
    </Container>
  );
};
