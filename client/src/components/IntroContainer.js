/* eslint-disable max-len */

import React from 'react'
import { Container } from 'semantic-ui-react'
import IntroContent from './IntroContent'
import IntroSignedIn from './IntroSignedIn';

function IsLoggedIn (props) {
  let logged = localStorage.gamerName ? true : false;
  if (logged) {
    return <IntroSignedIn />
  } else {
    return <IntroContent />
  }
}

const IntroContainer = () => (
  <div>
    <Container id='intro' fluid>
      <IsLoggedIn />
    </Container>
  </div>
)

export default IntroContainer

/*

*/