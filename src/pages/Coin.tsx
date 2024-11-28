import React, { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import styled from "styled-components";


export default function Coin(){
  const {coinId} = useParams()
  const [loading,setLoading]= useState<boolean>(true)
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


  const Title =  styled.h1`
    color:${props=>props.theme.accentColor};
  `;


  const Loader = styled.span`
    text-align: center;
    display: block;
  `
  // react-route-dom으로 상태 보내기
  const {state} = useLocation();
  
  return  (
  <Container>
    <Header>
      <Title>{state?.name || "Loading"}</Title>
    </Header>
    {
      loading ? 
      <Loader>"loading..."</Loader>
      : null 
    }
    </Container>
  )
}