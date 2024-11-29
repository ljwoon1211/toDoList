import React, { useEffect, useState } from "react"
import { Outlet, Route, Routes, useMatch } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchTickerInfo } from "../services/api";
import {Helmet} from "react-helmet"
const Container =styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  a{
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    color:${props=>props.theme.textColor};
    padding: 5px;
    width: max-content;
  }
`;

const Title =  styled.h1`
  text-align: center;

  font-size: 48px;
  color:${props=>props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;


export default function Coin(){
  const {coinId} = useParams()
    // react-route-dom으로 상태 보내기
  const {state} = useLocation();

  const priceMatch = useMatch(`btc/${coinId}/price`);
  const chartMatch = useMatch(`btc/${coinId}/chart`);

  console.log("Chart Match:", chartMatch);  // 이 로그를 통해 실제 반환값 확인
  console.log("Price Match:", priceMatch);
  const { isLoading:infoLoading, data:infoData } = useQuery<InfoData>({
    queryKey: ["info",coinId], 
    queryFn: () => fetchCoinInfo(coinId),
    // refetchInterval: 5 * 1000  
  })

  const { isLoading:tickersLoading, data:tickersData } = useQuery<PriceData>({
    queryKey: ["tickers",coinId], 
    queryFn: () => fetchTickerInfo(coinId) 
  })

  const loading = infoLoading || tickersLoading;

  if(!coinId){
    return (<p>코인 아이디가 없습니다.</p>)
  }

  
  return  (
  <Container>
    <Helmet>
      <Title>
        {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
      </Title>    
    </Helmet>
    <Header>
      <Link to="/">Home</Link>
      <Title>
        {/* {coinId} */}
        {state?.name ? state.name : loading ? "Loading..." : infoData?.name}

      </Title>    
    </Header>
    {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
            <span>Price:</span>
            <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">
                  Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">
                  Price
              </Link>
            </Tab>
          </Tabs>

          <Outlet/>
        </>
      )}
    </Container>
  )
}