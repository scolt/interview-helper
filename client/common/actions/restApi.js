import request from 'superagent';
import config from '../config/config';

function restApi({model, method='get', params = {}, type} = {}) {
    return (dispatch, getState) => {
        const payload = getState()[model] && getState()[model].payload;

        dispatch({
            type: 'startProcessing',
            reqData: {model, params, type}
        });

        params.apiKey = config.apiKey;

        let processedParams = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
        return request[method](`${config.restURL}/${model}?${processedParams}`)
            .set('Accept', 'application/json')
            .send(payload)
            .end((err, res) => {
                const error = err || (res.body && res.body.err);

                const dataForDispatcher = error ? {
                    type: 'errProcessing',
                    reqData: {model, params, type},
                    resData: error
                } : {
                    type: 'endProcessing',
                    reqData: {model, params, type},
                    resData: res.body
                };

                dispatch(dataForDispatcher);
            });
    };
}

export default restApi;
