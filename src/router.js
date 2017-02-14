import React, { Component,PropTypes } from 'react';
import { Router, Route, IndexRoute, Link ,IndexRedirect} from 'dva/router';
import IndexPage from './routes/IndexPage';
import MainPage from './routes/MainPage';
import Projects from './routes/Projects';
import Projectid from './routes/Projectid';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" >
          <Route name="login" path="login" component={IndexPage} /> 
          <Route name="main" path="main" breadcrumbName="Home" component={MainPage} >
               <Route  path="projects" breadcrumbName="我的项目" component={Projects} /> 
               <Route path="project/:id" breadcrumbName="项目:id"  component={Projectid} /> 
               <IndexRedirect to="projects" />
          </Route>
          <IndexRedirect to="login" />
      </Route>
    </Router>
  );
};
