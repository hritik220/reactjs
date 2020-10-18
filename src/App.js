import React, { Fragment } from 'react';
import {Container,Marquee} from 'reactstrap';
import Createform from './Component/createform'

function App() {

  return (
     <Fragment>
          <Container>
                <div style={{textAlign:"center",color:"green"}}>
                       <marquee behavior="alternate"><h1>Api call Using Axios in Reactjs</h1></marquee>
                      <hr/>
                      <Createform/>
                </div>
          </Container>
     </Fragment>
  );
}

export default App;
