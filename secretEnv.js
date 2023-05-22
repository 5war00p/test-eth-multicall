import * as dotenv from 'dotenv'
dotenv.config()

const INFURA_API_KEY = process.env.INFURA_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY

export {
    INFURA_API_KEY,
    ETHERSCAN_API_KEY,
    WALLET_PRIVATE_KEY
}