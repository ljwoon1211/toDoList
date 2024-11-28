import React from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"

export default function Coins(){
  const Title =  styled.h1`
    color:${props=>props.theme.accentColor};
  `;

  return <Title>코인들입니다.</Title>
 
}
