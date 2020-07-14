class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'artists',
      likedArtists: [],
      artistURL: ''
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.otherPage = this.otherPage.bind(this);
    this.postLikedArtists = this.postLikedArtists.bind(this);
  }
  handleButtonClick(e) {
    e.preventdefault();
    this.setState(state => ({
      page: !state.page
    }));
  }
  otherPage(otherPage) {
    this.setState(prevState => {
      return {
        page: otherPage
      }
    })
  }
  getArtistsPage() {
    fetch('/', {
      method: 'GET'
    });
  }
  postLikedArtists(e) {
    e.preventdefault();
    fetch('/favorites', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //artist names, links to websites
        artistNames: this.state.likedArtists,
        linkToURL: ''
      })
    })
    .then(res => {
      //res.json?
      res.json();
      console.log('response: ', res);
    })
    .then(data => {
      console.log('data', data);
    })
    .catch(err => {
      console.log('error posting liked artists: ', err);
    })
  }
  componentDidMount() {
    this.postLikedArtists();
  }
  render() {
   if (this.state.page === 'artists') {
     //handleHeartClick
     //buttonClick={this.handleButtonClick}
     return <ArtistsPage value={this.state} otherPage={this.otherPage} postArtists={this.postLikedArtists} />
   }
   if (this.state.page === 'favorites') {
     //buttonClick={this.handleButtonClick}
     return <FavoritesPage value={this.state} otherPage={this.otherPage} />
   }
  }
}

function ArtistsPage(props) {
  return (
    <div class="container">
      <h1 class="page-title">Artists</h1>
      <button class="button" type="button"
        onClick={(e) => {
          props.otherPage('favorites');
        }}>
        Favorites
      </button>
      <div id="artist-cards">

      </div>
    </div>
  )
}

function favoritesPage(props) {
  return (
    <div class="container">
      <h1 class="page-title">Favorites</h1>
      <button class="button" type="button"
        onClick={(e) => {
          props.otherPage('artists');
        }}>
        Artists
      </button>
      <div id="artist-links">

      </div>
    </div>
  )
}

class ToggleHeart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isHeartFilled: 'false'};
    this.handleHeartClick = this.handleHeartClick.bind(this);
  }
  handleHeartClick() {
    this.setState(state => ({
      isHeartFilled: !state.isHeartFilled
    }));
  }
  render() {
    return (
      <input onClick={this.handleHeartClick}>
        {this.state.isHeartFilled ? 'fa fa-heart fa-2x' : 'fa fa-heart-o fa-2x'}
      </input>
    );
  }
}

class ArtistCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isCardClicked: false};
    this.handleCardClick = this.handleCardClick.bind(this);
  }
  handleCardClick(e) {
    e.preventdefault();
    this.setState(state => ({
      isCardClicked: !state.isCardClicked
    }));
  }
  render() {
    return (
      <button onClick={this.handleCardClick}>
        {this.state.isCardClicked ? '' : ''}
      </button>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

/*
components:
1. artist image card/artistList
   -props:
   1. artistsList - artists in array of objs
   2. link in favorites
2. button
3. heart

state:
1. page - artists/favorites
2. heart - empty/filled
*/




// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// const element = <Welcome name="Sara" />;


// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );