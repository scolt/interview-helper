import 'index.html';
import 'common/styl/global.styl';

import React from 'react';
import AppContainer from 'appContainer';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

window.onpopstate = e => {
    history.go(1);
};

window.startApp = () => render(<AppContainer/>, document.getElementById('app'));
/^(http|https):\/\//.test(document.URL) ?
    window.startApp() :
    document.addEventListener('deviceready', window.startApp, false);
