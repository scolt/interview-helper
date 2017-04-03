import React from 'react';
import withStore from 'common/components/withStore/withStore';
import './newsGrid.styl';

const NewsGrid = React.createClass({
    render() {
        const articles = this.props.data.news.articles;
        const list = <div className="notes-grid">
            {articles.map((tile, i) =>
                <span key={i} className="article" href={`#/note/${tile._id}`}>
                    <div className="image">
                        <div className="date">
                            {tile.date.day}<br />
                            {tile.date.month}
                        </div>
                        <div className="author">
                            {tile.author}
                        </div>
                        <img src={tile.urlToImage || 'assets/user-bg.jpg'} />
                    </div>
                    <div className="article-metadata">
                        <a href={tile.url} className="title" target="_blank">
                            {tile.title}
                        </a>
                        <div className="description">
                            {tile.description}
                        </div>
                    </div>
                </span>)
            }
        </div>;

        return <div>
            {list}
        </div>;
    }
});

export default withStore(NewsGrid);
