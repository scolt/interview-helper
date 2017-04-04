import request from 'superagent';
import config from '../config/config';

function restApi({model, id='', method='get', params = {}, type} = {}) {
    return (dispatch, getState) => {
        const payload = getState()[model] && getState()[model].payload;

        dispatch({
            type: 'startProcessing',
            reqData: {model, params, type, id}
        });

        const path = id ? `/${id}` : '';

        let processedParams = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
        return request[method](`${config.restURL}/${model}${path}?${processedParams}`)
            .set('Accept', 'application/json')
            .send(payload)
            .end((err, res) => {
                const error = err || (res.body && res.body.err);

                const dataForDispatcher = error ? {
                    type: 'errProcessing',
                    reqData: {model, params, type, id},
                    resData: error
                } : {
                    type: 'endProcessing',
                    reqData: {model, params, type, id},
                    resData: res.body
                };

                dispatch(dataForDispatcher);
            });
    };
}

export default restApi;
