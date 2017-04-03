import newsModel from './common/ModelNews';

export default function (state = newsModel, action) {
    if (action.type === 'startProcessing') {
        return {...state, isLoading: true};
    }

    if (action.type === 'endProcessing' && action.reqData.model === 'articles') {
        const articles = action.resData.articles.map(item => {
            const date = new Date(item.publishedAt);
            item.date = {
                day: date.getDate(),
                month: date.toLocaleString('en-us', { month: 'short' })
            };
            return item;
        });
        return {...state, isLoading: false, articles: [...action.resData.articles]};
    }
    return state;
}
