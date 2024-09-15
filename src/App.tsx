// import './styles/styles.scss';
import { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  categories = [
    'general',
    'sports',
    'business',
    'health',
    'science',
    'technology',
    'entertainment',
  ];

  pageSize: number = 6;

  state = {
    progress: 0,
  };

  constructor(props: Record<string, never>) {
    super(props);
    this.setProgress = this.setProgress.bind(this); // Bind the setProgress method
  }

  setProgress(progress: number) {
    this.setState({ progress: progress });
  }

  apikey: string = process.env.REACT_APP_NEWS_API_KEY!;

  render() {
    return (
      <div>
        <Router>
          <NavBar categories={this.categories} />
          <LoadingBar
            color='red'
            height={3}
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
            {this.categories.map((category) => {
              return (
                <Route
                  key={category}
                  path={`/${category}`}
                  element={
                    <News
                      apiKey={this.apikey}
                      key={category}
                      setProgress={this.setProgress}
                      pageSize={this.pageSize}
                      country='us'
                      category={category}
                    />
                  }
                />
              );
            })}
            <Route
              path='/'
              element={
                <News
                  apiKey={this.apikey}
                  key='general'
                  setProgress={this.setProgress}
                  pageSize={this.pageSize}
                  country='us'
                  category='general'
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
