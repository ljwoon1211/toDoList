const BASE_URL = `https://api.coinpaprika.com/v1`
const BASE_URL_nomadcoders = `https://ohlcv-api.nomadcoders.workers.dev`

export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json())
}

export async function fetchCoinInfo(coinId?: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json())
}

export async function fetchTickerInfo(coinId?: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json())
}

// https://ohlcv-api.nomadcoders.workers.dev?coinId=btc-bitcoin

export async function fetchCoinHistory(coinId?: string) {

  return fetch(`${BASE_URL_nomadcoders}?coinId=${coinId}`).then((res) => res.json())
}