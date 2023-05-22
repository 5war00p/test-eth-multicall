import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { WALLET_PRIVATE_KEY } from "../secretEnv";
import ethers from "ethers";
import { Provider, Contract } from 'ethcall';

const signer = new ethers.Wallet(WALLET_PRIVATE_KEY);

const thirdwebSigner = ThirdwebSDK.fromSigner(signer);

const ethcallProvider = new Provider(1, thirdwebSigner);

const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const daiContract = new Contract(daiAddress, erc20Abi);

const accounts = [
  '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
];

const calls = accounts.map((account) => daiContract.balanceOf(account));

const balances = await ethcallProvider.all(calls);
console.log(balances);
