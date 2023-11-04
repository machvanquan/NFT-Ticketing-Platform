import { setVisible } from "@solana/wallet-adapter-react-ui";

const ConnectWallet = () => {
  const { setVisible } = useWalletModal();

  const connect = () => {
    setVisible(true);
  };

  return <button onClick={connect}>Connect wallet</button>;
};

export default ConnectWallet;
