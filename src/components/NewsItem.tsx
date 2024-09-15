import { Component } from 'react';
import { Link } from 'react-router-dom';

interface NewsItemProps {
  title: string | null;
  description: string | null;
  imageUrl?: string;
  newsUrl?: string;
  publishedAt?: string;
  author?: string;
}

class NewsItem extends Component<NewsItemProps> {
  defaultImageURI: string =
    'https://images.pexels.com/photos/68744/loggerhead-turtle-sea-ocean-water-68744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  static defaultProps = {
    newsUrl: 'https://biographywiki.net/ayushmann-khurrana/',
    imageUrl:
      'https://images.pexels.com/photos/68744/loggerhead-turtle-sea-ocean-water-68744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'This is a default title',
    description: 'This is a default description',
  };

  render() {
    const { title, description, imageUrl, newsUrl, author, publishedAt } =
      this.props;
    return (
      <div className='my-3'>
        <div className='card'>
          <img
            src={imageUrl ? imageUrl : this.defaultImageURI}
            className='card-img-top'
            alt='...'
          />
          <div className='card-body'>
            <h5 className='card-title'>{title ? title.slice(0, 40) : ''}</h5>
            <p className='card-text'>
              {description ? description.slice(0, 80) : ''}
            </p>
            <p className='card-text'>
              <small className='text-muted'>
                By {author ? author : 'Unknown'} <br />
                At{' '}
                {publishedAt
                  ? new Date(publishedAt).toLocaleString()
                  : 'XX-XX-XXXX'}
              </small>
            </p>
            <Link
              to={newsUrl ? newsUrl : this.defaultImageURI}
              target='_blank'
              className='btn btn-sm btn-dark'
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
