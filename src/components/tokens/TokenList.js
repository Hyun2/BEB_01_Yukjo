import Erc721 from './erc721/Erc721';
import Erc20 from './erc20/Erc20';

// TokenList.js
function TokenList({
	web3,
	account,
	erc721list,
	newErc721addr,
	setErc721list,
	erc20list,
	newErc20addr,
	setErc20list,
	updateErc20TokenBalance,
}) {
	return (
		<div className='tokenlist'>
			{erc20list.length > 0 && (
				<>
					<div class='erc20__token__intro'>
						<h1>My Erc20 Token List</h1>
					</div>
					<Erc20
						web3={web3}
						account={account}
						erc20list={erc20list}
						newErc20addr={newErc20addr}
						setErc20list={setErc20list}
						updateErc20TokenBalance={updateErc20TokenBalance}
					/>
				</>
			)}
			{erc721list.length > 0 && (
				<>
					<div class='erc721__token__intro'>
						<h1>My Erc721 Token List</h1>
					</div>
					<Erc721
						web3={web3}
						account={account}
						erc721list={erc721list}
						erc721addr={newErc721addr}
						setErc721list={setErc721list}
					/>
				</>
			)}
		</div>
	);
}

export default TokenList;
