import { Contract, Provider } from 'ethcall';
import { InfuraProvider } from 'ethers';
import { INFURA_API_KEY } from '../secretEnv.js';
import erc20Abi from '../abi/erc20.json' assert { type: 'json' };

const provider = new InfuraProvider('mainnet', INFURA_API_KEY);

const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

async function call() {
  const ethcallProvider = new Provider(1, provider);

  const daiContract = new Contract(daiAddress, erc20Abi);

  const uniswapDaiPool = '0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667';

  const ethBalanceCall = ethcallProvider.getEthBalance(uniswapDaiPool);
  const daiBalanceCall = daiContract.balanceOf(uniswapDaiPool);

  const data = await ethcallProvider.all([ethBalanceCall, daiBalanceCall], {
    blockTag: 'latest',
  });

  const ethBalance = data[0];
  const daiBalance = data[1];

  console.log('eth balance', ethBalance.toString());
  console.log('dai balance', daiBalance.toString());
}

call();