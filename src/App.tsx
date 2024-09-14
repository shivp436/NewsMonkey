// import './styles/styles.scss';
import { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  pageSize: number = 6;
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<News key="general" pageSize={this.pageSize} country='us' category='general' />} />
            <Route path='/sports' element={<News key="sports" pageSize={this.pageSize} country='us' category='sports' />} />
            <Route path='/business' element={<News key="business" pageSize={this.pageSize} country='us' category='business' />} />
            <Route path='/health' element={<News key="health" pageSize={this.pageSize} country='us' category='health' />} />
            <Route path='/science' element={<News key="science" pageSize={this.pageSize} country='us' category='science' />} />
            <Route path='/technology' element={<News key="technology" pageSize={this.pageSize} country='us' category='technology' />} />
            {/* 
              Here we need to do force remounting of the component, 
              because it's the same component and it doesn't remount even if the props change.

              We pass a key prop to the component to force remounting.
            */}
          </Routes>
        </Router>
      </div>
    );
  }
}
