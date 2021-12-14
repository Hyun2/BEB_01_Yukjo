import { useEffect, useState } from 'react';
import erc721Abi from './erc721Abi.js';
import Web3 from 'web3';

import TokenList from './components/TokenList';

function App() {
	const [web3, setWeb3] = useState();
	const [account, setAccount] = useState('');
	const [newErc721addr, setNewErc721addr] = useState('');
	const [erc721list, setErc721list] = useState([]);

	useEffect(() => {
		// window.ethereum이 있다면
		if (typeof window.ethereum !== 'undefined') {
			try {
				const web = new Web3(window.ethereum);
				setWeb3(web);
			} catch (err) {
				console.log(err);
			}
		}
	}, []);
	// wallet 정보 state에 저장(address)
	const connectWallet = async () => {
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts',
		});
		setAccount(accounts[0]);
	};

	const addNewErc721Token = async () => {
		try {
			// web3.eth.Contract(abi, erc721addr) returns contract object
			const tokenContract = await new web3.eth.Contract(
				// 배포된 컨트랙트의 abi
				erc721Abi,
				// 배포된 컨트랙트의 address
				newErc721addr
			);
			//
			console.log(tokenContract.methods);
			// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/IERC721Metadata.sol
			const name = await tokenContract.methods.name().call();
			const symbol = await tokenContract.methods.symbol().call();
			// openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol
			const totalSupply = await tokenContract.methods.totalSupply().call();
			// totalSupply => account 주인의 모든 토큰 length를 반환 uint
			let arr = [];
			for (let i = 1; i <= totalSupply; i++) {
				arr.push(i);
				console.log(arr);
			}
			// [1,2,3, .....]
			for (let tokenId of arr) {
				// 토큰 주인 validation
				// each 토큰별로 validation
				// ownerOf() 참고 URL
				// https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#IERC721-ownerOf-uint256-
				let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
				// 우리의 account state는 소문자로 구성된 해시 value
				// (address hash).toLowerCase()
				console.log(tokenOwner);
				if (String(tokenOwner).toLowerCase() === account) {
					// tokenURI()
					// function tokenURI(uint256 tokenId) public override returns(string memory) {
					//     return string(abi.encodePacked("https://example.com/token/", tokenId.fromUint256(), ".json"));
					// }
					let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
					setErc721list((prevState) => {
						return [...prevState, { name, symbol, tokenId, tokenURI }];
					});
				}
			}
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div className='App'>
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
				updateToken={addNewErc721Token}
			/>
		</div>
	);
}

export default App;
