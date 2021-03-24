import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.lightGrey};
  padding: 2rem;
`

export const ConnectWallet = styled.span`
  padding: 0.75rem 1rem;
  background: ${(props) => props.theme.primaryColor};
  border-radius: ${(props) => props.theme.borderRadius};
  color: #000;
  font-weight: 600;
  cursor: pointer;
`
