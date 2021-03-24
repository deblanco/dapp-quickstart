import styled from 'styled-components'

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${(props) => props.theme.grey};
  color: ${(props) => props.theme.secondaryColor};
`
