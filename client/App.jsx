/*
components:
1. app - everything will be rendered, heartToggle, buttonClick, postLikedArtists to db
2. pages - container components, render other components inside
3. artist cards - mapping each card individually from artistList
4. favorites - render each link from favoritesList w/map func

running order:
  - constructor, render, componentDidMount
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'artists',
      isHeartFilled: 'false',
      artists: artistList,
      isCardClicked: false,
      //likedArtists --> {name, imageURL, artistLink, isLiked}
      likedArtists: []
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.otherPage = this.otherPage.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleHeartToggle = this.handleHeartToggle.bind(this);
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
  handleCardClick(e) {
    e.preventdefault();
    this.setState(state => ({
      isCardClicked: !state.isCardClicked
    }));
  }
  handleHeartToggle(e) {
    e.preventdefault();
    this.setState(state => ({
      isHeartFilled: !state.isHeartFilled
    }));
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
        artists: this.state.artists
      })
    })
    .then(res => {
      //res.json?
      res.json();
      //json.parse
      //console.log('response: ', res);
    })
    .then(data => {
      console.log('success: ', data);
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
     //buttonClick={this.handleButtonClick}
     return (
      <div>
        <ArtistsPage value={this.state} otherPage={this.otherPage} handleCardClick={this.handleCardClick} handleHeartToggle={this.handleHeartToggle} postArtists={this.postLikedArtists} />
      </div>
     );
   }
   if (this.state.page === 'favorites') {
     //buttonClick={this.handleButtonClick}
     //handle link click?
     return <FavoritesPage value={this.state} otherPage={this.otherPage} />
   }
  }
}

function ArtistsPage(props) { //mapping each card individually from artistList
  return (
    <div className="container">
      <h1 className="page-title">Artists</h1>
      <button className="button" type="button"
        onClick={(e) => {
          props.otherPage('favorites');
        }}>
        Favorites
      </button>
      <div className="inner-container" id="artist-cards">
        {props.artists.map((artist, index) => {
          return <ArtistLinks artist={ artist } key={ index } handleHeartToggle={props.handleHeartToggle} />;
        })}
        <input onClick={this.handleHeartToggle}>
          {this.state.isHeartFilled ? <div classname="heart"><a href="#"><i className="fa fa-heart fa-2x"></i></a></div> : <div classname="heart"><a href="#"><i className="fa fa-heart-o fa-2x"></i></a></div>}
        </input>
        <input onClick={this.handleCardClick}>
          {this.state.isCardClicked ? '' : ''}
        </input>
      </div>
    </div>
  )
}

function FavoritesPage(props) { //render each link from favoritesList w/map func
  return (
    <div className="container">
      <h1 className="page-title">Favorites</h1>
      <button className="button" type="button"
        onClick={(e) => {
          props.otherPage('artists');
        }}>
        Artists
      </button>
      <div className="inner-container" id="artist-links">
        {props.artists.map((artist, index) => {
          return <ArtistLinks artist={ artist } key={ index } />;
        })}

      </div>
    </div>
  )
}

let ArtistLinks = (props) => {

}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);


// function ToggleHeart(props) {
//   return (
//     //onClick={this.handleHeartClick}
//     <input onClick={(e) => {
//       e.preventdefault();
//       props.isHeartFilled ? 'fa fa-heart fa-2x' : 'fa fa-heart-o fa-2x';
//       //push artists into likedArtists
//       //post to db --> pass in artists whose hearts are filled-in
//       //if (props.isHeartFilled === true), 'fa fa-heart fa-2x', post
//       props.postLikedArtists();
//     }}>
//     </input>
//   );
// }
// class ToggleHeart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {isHeartFilled: 'false'};
//     this.handleHeartClick = this.handleHeartClick.bind(this);
//   }
//   handleHeartClick() {
//     this.setState(state => ({
//       isHeartFilled: !state.isHeartFilled
//     }));
//   }
//   render() {
//     return (
//       <input onClick={this.handleHeartClick}>
//         {this.state.isHeartFilled ? 'fa fa-heart fa-2x' : 'fa fa-heart-o fa-2x'}
//       </input>
//     );
//   }
// }

// class ArtistCards extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isCardClicked: false,
//       artistURL: ''
//     };
//     this.handleCardClick = this.handleCardClick.bind(this);
//   }
//   handleCardClick(e) {
//     e.preventdefault();
//     this.setState(state => ({
//       isCardClicked: !state.isCardClicked
//     }));
//   }
//   render() {
//     return (
//       <input onClick={this.handleCardClick}>
//         {this.state.isCardClicked ? '' : ''}
//       </input>
//     );
//   }
// }



// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// const element = <Welcome name="Sara" />;


// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );