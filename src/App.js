import React from 'react';
import { Layout } from 'antd';
import { Provider, useSelector } from 'react-redux'; 
import { createStore } from 'redux';
import { reducer } from './redux/reducer';
import FormInput from './components/FormInput';
import RegionInfo from './components/RegionInfo';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import './App.css';

const { Header, Sider, Content, Footer } = Layout;
const store = createStore(reducer);

function App() {
  const region = useSelector((state) => state.region); 

  return (
    <Provider store={store}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header  style={{ display: 'flex', justifyContent: 'center' }}>
        <h1
    style={{
      float: 'left',
      color: '#fff',
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0 55px',
    }}
  >
    Map World Explorer
  </h1>
  <div className="dummy-login-logout" style={{ float: 'right', marginleft:'15px', position:'relative', left:'35%' }}>
    Login 
  </div>
  <div style={{ clear: 'both' }}></div> 
  <div style={{marginTop:"5px", color:'white', position:'relative', left:'35%'}}>
  <FontAwesomeIcon icon={faUser} beat /></div>
  
        </Header>
        <Layout>
          <Sider collapsible>
            <div className="sidebar-content">
              <FormInput />
              <RegionInfo />
              <Sidebar />
            </div>
          </Sider>
          <Content>
            <Map region={region} /> 
          </Content>
        </Layout>
        <Footer>
       
        </Footer>
      </Layout>
    </Provider>
  );
}

export default App;