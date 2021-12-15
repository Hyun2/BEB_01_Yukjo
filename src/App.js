import { useEffect, useState } from 'react';
import erc721Abi from './erc721Abi.js';
import erc20Abi from './erc20Abi.js';

import _ from 'lodash';
import Web3 from 'web3';

import TokenList from './components/TokenList';
import Header from './components/header/Header';

//erc 20 컨트랙트 주소 : 0x83476E01eC13AAcF97b7f23c8bd19BaDE5341892
// symbol : S20

function App() {
	const [web3, setWeb3] = useState();
	const [account, setAccount] = useState('');
	const [newErc721addr, setNewErc721addr] = useState('');
	const [newErc20addr, setNewErc20addr] = useState('');
	const [erc721list, setErc721list] = useState([]);
	const [erc20amount, setErc20amount] = useState(0);
	//
	const [to, setTo] = useState('');

	useEffect(() => {
		if (typeof window.ethereum !== 'undefined') {
			try {
				const web = new Web3(window.ethereum);
				setWeb3(web);
			} catch (err) {
				console.log(err);
			}
		}
	}, []);
	const connectWallet = async () => {
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts',
		});
		setAccount(accounts[0]);
	};

	const addNewErc721Token = async () => {
		console.log('addNewErc called');
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
			// tokens + erc721list 후
			let uniqArr = _.uniqBy([...erc721list, ...tokens], 'tokenId');
			setErc721list(uniqArr);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div className='App'>
			<Header />
			<button
				className='metaConnect'
				onClick={() => {
					connectWallet();
				}}>
				connect to MetaMast
			</button>
			<div className='userInfo'>주소: {account}</div>
			<div className='newErc721'>
				<input
					type='text'
					onChange={(e) => {
						setNewErc721addr(e.target.value); // 입력받을 때마다 newErc721addr 갱신
					}}></input>
				<button onClick={addNewErc721Token}>add new erc721</button>
			</div>

			<TokenList
				web3={web3}
				account={account}
				erc721list={erc721list}
				newErc721addr={newErc721addr}
			/>
		</div>
	);
}

export default App;
