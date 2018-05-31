import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers, } from 'react-navigation';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware, } from 'react-navigation-redux-helpers';
import allReducers from './allReducers';
import PageNation from './pageNation';

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
  );

const store = createStore(allReducers, applyMiddleware(middleware),);

const addListener = createReduxBoundAddListener('root');

class App extends React.Component {
  render() {
    return (
      <PageNation navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav:state.nav,
});

const Container = connect(mapStateToProps)(App);

class Root extends React.Component {
  render(){
    return (
        <Provider store={ store }>
          <Container />
        </Provider>
      );
  }
}

export default Root;