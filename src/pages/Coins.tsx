import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { fetchCoins } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "react-query";
const Container =styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color:white;
  color:${props=>props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a{
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover{
    a{
      color:${
        props => props.theme.accentColor
      }
    }
  }
`;
const Title =  styled.h1`
  color:${props=>props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`
interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: true,
    type: string,
}


export default function Coins(){
  // const queryClient = useQueryClient()

  const { isLoading, data }= useQuery<ICoin[]>({
    queryKey: ["allCoins"], 
    queryFn: () => fetchCoins() 
  })

  // const [coins, setCoins]= useState<ICoin[]>([])
  // const [loading,setLoading]= useState<boolean>(true)
  // useEffect(()=>{
  //   (async()=>{
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins")
  //     const json = await response.json()
  //     console.log(json)
  //     setCoins(json.slice(0,100))
  //     setLoading(false);
  //   })();
  // },[])

  return (
    <Container>
      <Header>
        <Title>코인들입니다.</Title>
      </Header>
      {
        isLoading ? 
          <Loader>"loading..."</Loader>
        :
      (
      <CoinsList>
        {data?.slice(0,100).map((coin)=><Coin key={coin.id}>
            <Link 
              to={`btc/${coin.id}`}
              state={{
                name:coin.name,
              }}
            >
              <Img src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`} />
              {coin.name} &rarr;

            </Link>
          </Coin>
        )}
      </CoinsList>
      )}
    </Container>
  )
}
