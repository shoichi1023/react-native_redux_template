#react-native+redux+react-navigationのテンプレート

<br />

制作時に編集するファイルと編集しなくていいファイルを完全に分離したかった。
component、Reducer、Actionファイルを追加して作っていってください。
ベースにしたプログラム：[React Navigation(v2)](https://reactnavigation.org/docs/en/redux-integration.html)

ソース丸ごとDLしたい人はここ：[react-native template](https://github.com/shoichi1023/template)
使い方が知りたい人はこっちです：[react-native+redux+react-navigationサンプル](https://qiita.com/shoichi1023/items/b5ffb85b160211e53324)

<br />

App.js　―　コンテナとなるファイル。ルートのコンポーネント
navResucer.js　  ―　react-navigationのためのReducer
pageNation.js　　―　react-navigationのnavigatorを作ってる場所。component(ページ)を登録する
allReducer.js　―　reducerをまとめるためのファイル。reducerを作ったらここに登録




<br />

↓　編集しないファイル　↓



```App.js
import React from 'react';
import { addNavigationHelpers, } from 'react-navigation';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware, } from 'react-navigation-redux-helpers';
import { createStore, applyMiddleware, } from 'redux';
import { Provider, connect, } from 'react-redux';
import PageNation from './pageNation';
import allReducers from './allReducers';

//reduxとreact-navigationの橋渡し
const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
  );

//storeを作成
const store = createStore(allReducers, applyMiddleware(middleware));

//ページ遷移命令を受け取るためのリスナー
const addListener = createReduxBoundAddListener('root');

//stateを各コンポーネントに渡すための枠組み
class App extends React.Component {
  render() {
    return (
      //container・・・ページ遷移のための枠組み
      <PageNation navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      })} />
    );
  }
}

//stateをAppコンポーネントに混ぜ込むときの形式を設定
const mapStateToProps = (state) => ({
  nav:state.nav,
});

//connect...stateやdispachを受け取る、受け渡す形式を決める
const Container = connect(mapStateToProps)(App);


//storeをAppに受け渡すための枠組み
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
```


<br />

```navReducer.js
import PageNation, { rootCom } from './pageNation';

//現在のページのstateを取得
const navState = PageNation.router.getStateForAction(PageNation.router.getActionForPathAndParams(rootCom));

const navReducer = (state = navState, action) => {
  //次のページのstateを取得
  const nextState = PageNation.router.getStateForAction(action,state);
  //次のページがあればnextStateを、なければstateを返す
  return nextState || state;
};

export default navReducer
```


<br />
↓　編集するファイル　↓

```pageNation.js
import { StackNavigator } from 'react-navigation';

export const rootCom = '';//ここにルート要素のキーを設定
//const rootCom = 'Page1';

//ページ⇔コンポーネント対応表
const PageNation = StackNavigator({
/*
  Page1: {
    screen: Page1,
  },
  Page2: {
    screen: Page2,
  },
*/
});

export default PageNation
```



<br />

```allReducer.js
import { combineReducers } from 'redux';
import navReducer from './navReducer';

//Reducerをまとめる
const allReducers = combineReducers({
  nav: navReducer,
  /*
  r1: reducer1,
  r2: reducer2,
        .
        .
        .
        .
  */
});

export default allReducers
```



<br />
