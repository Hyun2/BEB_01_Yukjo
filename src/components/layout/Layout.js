import { useStore } from "../../store";
import Header from "../header/Header";
import "./Layout.css";

const Layout = (props) => {
  const [account, setAccount] = useStore((state) => [
    state.account,
    state.setAccount,
  ]);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const connectWallet = async () => {
    setIsLoading(true);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <Header clickWallet={connectWallet} accountAddr={account} />
      {props.children}
    </div>
  );
};

export default Layout;
