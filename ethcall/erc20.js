import { getDefaultProvider } from 'ethers';

import { Contract, Provider } from 'ethcall';

import erc20Abi from '../abi/erc20.json' assert { type: 'json' };
import { ETHERSCAN_API_KEY } from '../secretEnv.js';

const run = async () => {
  const provider = getDefaultProvider('mainnet', { etherscan: ETHERSCAN_API_KEY });
  const ethcallProvider = new Provider(1, provider);

  const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
  const daiContract = new Contract(daiAddress, erc20Abi);

  const accounts = [
    '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
  ];

  const calls = accounts.map((account) => daiContract.balanceOf(account));

  try {
    const balances = await ethcallProvider.all(calls);
    console.log(balances);

  } catch (err) {
    console.log(err)
  }
}

run()