import { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import NewsItem from './NewsItem'; // Assuming you have a NewsItem component
import Spinner from './Spinner'; // Assuming you have a Spinner component

interface NewsState {
  articles: Array<{
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }>;
  loading: boolean;
  page: number;
  totalResults: number;
}

type NewsProps = {
  pageSize: number;
  category?: string;
  country?: string;
  setProgress: (progress: number) => void;
  apiKey: string;
};

class News extends Component<NewsProps, NewsState> {
  apiKey = this.props.apiKey;

  constructor(props: NewsProps) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  componentDidMount(): void {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    const { page } = this.state;
    const { pageSize, category, country, setProgress } = this.props;
    setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${
      country || 'us'
    }&category=${category || 'general'}&apiKey=${this.apiKey}&page=${page}&pageSize=${pageSize}`;
    setProgress(10);
    this.setState({ loading: true });
    setProgress(30);
    const response = await fetch(url);
    setProgress(60);
    const data = await response.json();
    setProgress(90);
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
    });
    setProgress(100);
  };

  fetchMoreArticles = () => {
    const { page, articles, totalResults } = this.state;

    // Prevent fetching if all articles are already loaded or currently loading
    if (articles.length >= totalResults || this.state.loading) {
      return;
    }

    const { pageSize, category, country } = this.props;
    const url = `https://newsapi.org/v2/top-headlines?country=${
      country || 'us'
    }&category=${category || 'general'}&apiKey=${this.apiKey}&page=${page + 1}&pageSize=${pageSize}`;
    // this.setState({ loading: true });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState) => ({
          articles: prevState.articles.concat(data.articles),
          page: prevState.page + 1,
          loading: false,
        }));
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { articles, loading, totalResults } = this.state;
    const articleLength = articles ? articles.length : 0;

    return (
      <div className='container my-3'>
        <h1 className='h1 text-center' style={{ marginTop: '80px' }}>
          NewsMonkey -{' '}
          {this.props.category
            ? this.capitalizeFirstLetter(this.props.category)
            : 'General'}{' '}
          News
        </h1>
        {loading && <Spinner />} {/* Initial load spinner */}
        <InfiniteScroll
          pageStart={0}
          loadMore={this.fetchMoreArticles}
          hasMore={articleLength < totalResults}
          loader={<Spinner key={0} />}
        >
          <div className='row'>
            {articles && articles.length > 0
              ? articles.map((element) => (
                  <div className='col-md-4' key={this.generateRandomKey()}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : 'Unknown'}
                      publishedAt={element.publishedAt}
                    />
                  </div>
                ))
              : !loading && <p>No articles available</p>}
          </div>
        </InfiniteScroll>
      </div>
    );
  }

  capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  generateRandomKey = () => {
    return Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string of length 9
  };
}

export default News;
