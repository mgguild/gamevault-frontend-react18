import React, { ComponentProps } from 'react'
import styled from 'styled-components'

import Spacer from '../Spacer'

const ModalActions: React.FC<ComponentProps<any>> = ({ children }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction>{child}</StyledModalAction>
          {i < l - 1 && <Spacer />}
        </>
      ))}
    </StyledModalActions>
  )
}

const StyledModalActions = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.primaryDark}00;
  display: flex;
  margin: 0;
  padding: ${(props) => props.theme.spacing[4]}px 0;
`

const StyledModalAction = styled.div`
  flex: 1;
`

export default ModalActions
