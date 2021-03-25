import styled from 'styled-components'

export const ConnectionModalWrapper = styled.div`
  width: 30rem;
  padding: 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  background: ${(props) => props.theme.lightGrey};
  color: #fff;
`

export const ProvidersList = styled.ul`
  padding: 0.5rem 0;

  > li {
    margin: 1rem 0;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-radius: ${(props) => props.theme.borderRadius};
    border: 1px solid ${(props) => props.theme.secondaryColor};
    list-style-type: none;
    transition: border-color 0.2s;
    font-weight: 600;

    &:hover {
      border-color: ${(props) => props.theme.primaryColor};
    }

    img {
      height: 2rem;
      width: auto;
    }
  }
`
