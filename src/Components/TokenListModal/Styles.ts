import styled from 'styled-components'

export const TokenListModalWrapper = styled.div`
  width: 30rem;
  padding: 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.lightGrey};
  color: #fff;

  .header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
`

export const TokenListModalSearchBox = styled.input`
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.lightestGrey};
  display: block;
  padding: 1rem;
  width: 100%;
  background: transparent;
  outline: 0;
  color: #fff;
  transition: 0.3s border;
  margin-bottom: 1.5rem;

  &:focus {
    border: 1px solid ${(props) => props.theme.primaryColor};
  }
`

export const TokenListModalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 1rem;

  > .token-name {
    width: 100%;
    padding: 0 1rem;
  }
`
