import React from 'react'; //import ReactDOM from 'react-dom';

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
      //artistList: this.props.artistList,
      ArtistList: ArtistList,
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
      };
    });
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

  getLikedArtists(likedArtists) {
    let data = {
      likedArtists
    }; //this.state.likedArtists?

    console.log('likedArtists: ', likedArtists);
    fetch('/artists', {
      method: 'GET'
    }).then(res => res.json()).catch(err => {
      console.log('error getting liked artists', err);
    });
  }

  componentDidMount() {
    this.postLikedArtists();
  }

  postLikedArtists(data) {
    //pass in callback, then call w/data or data.result when handling res?
    fetch('/artists', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json()) //parses the response as JSON
    //console.log('response: ', res);
    .then(data => console.log('success: ', data)).catch(err => {
      console.log('error posting liked artists: ', err);
    });
  }

  render() {
    // if (this.state.page === 'artists') {
    //   //buttonClick={this.handleButtonClick}
    //   return (
    //       <ArtistsPage value={this.state} otherPage={this.otherPage} handleCardClick={this.handleCardClick} handleHeartToggle={this.handleHeartToggle} postArtists={this.postLikedArtists} />
    //   );
    // } else {
    //   //buttonClick={this.handleButtonClick}
    //   //handle link click?
    //   return (
    //     <FavoritesPage value={this.state} otherPage={this.otherPage} />
    //   );
    // }
    return /*#__PURE__*/React.createElement("div", null, "hello");
  }

}

function ArtistsPage(props) {
  //mapping each card individually from artistList
  console.log('App props', props);
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Artists"), /*#__PURE__*/React.createElement("button", {
    className: "button",
    type: "button",
    onClick: e => {
      props.otherPage('favorites');
    }
  }, "Favorites"), /*#__PURE__*/React.createElement("div", {
    className: "inner-container",
    id: "artist-cards"
  }, props.value.ArtistList.map((artist, index) => /*#__PURE__*/React.createElement("img", {
    src: artist.imageURL,
    key: index
  }))));
}

function FavoritesPage(props) {
  //render each link from favoritesList w/map func
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, "Favorites"), /*#__PURE__*/React.createElement("button", {
    className: "button",
    type: "button",
    onClick: e => {
      props.otherPage('artists');
    }
  }, "Artists"), /*#__PURE__*/React.createElement("div", {
    className: "inner-container",
    id: "artist-links"
  }, props.ArtistList.map(artist => {
    return /*#__PURE__*/React.createElement("div", null, (artist.name, artist.artistLink));
  })));
}

const ArtistList = [{
  name: 'letha wilson',
  imageURL: 'https://www.lethaprojects.com/visuals/images/outdoors/ghostofatree-right-view.jpg',
  artistLink: "https://www.lethaprojects.com",
  isLiked: false
}, {
  name: 'genesis baez',
  imageURL: 'http://media.virbcdn.com/cdn_images/resize_1600x1600/23/ac1718b745965aed-Baez_1.jpg',
  artistLink: "http://www.genesisbaez.com/",
  isLiked: false
}, {
  name: 'sarah-louise barbett',
  imageURL: 'https://aisselles.files.wordpress.com/2010/12/img_0016.jpg?w=1104',
  artistLink: "https://aisselles.files.wordpress.com",
  isLiked: false
}, {
  name: 'jessica halonen',
  imageURL: 'http://www.jessicahalonen.com/files/gimgs/44_spliced-branch-ball-1.jpg',
  artistLink: "http://www.jessicahalonen.com",
  isLiked: false
}, {
  name: 'laura owens',
  imageURL: 'https://www.owenslaura.com/wp-content/uploads/2013/01/HQ-16LO9359P-Untitled.jpg',
  artistLink: "https://www.owenslaura.com",
  isLiked: false
}, {
  name: 'deborah roberts',
  imageURL: 'https://i0.wp.com/conflictofinteresttx.com/wp-content/uploads/2017/07/The-Power-dance-30x22-2017.jpeg?w=469',
  artistLink: "http://www.deborahrobertsart.com/",
  isLiked: false
}, {
  name: 'ana esteve llorens',
  imageURL: 'http://www.anaestevellorens.com/projects/project6/07%20Quasy%20Infinite.jpg',
  artistLink: "http://www.anaestevellorens.com",
  isLiked: false
}, {
  name: 'jackie furtado',
  imageURL: 'https://s3.amazonaws.com/artfare-production-mobile/Artworks/Images/Image-1/image-1-d67b0616-077b-4fee-97be-275e4dde6107.jpg',
  artistLink: "https://jackiefurtado.com/",
  isLiked: false
}, {
  name: 'viviane sassen',
  imageURL: 'https://www.vivianesassen.com/site/assets/files/2940/umbra_nab_vs_3942.0x1500.jpg',
  artistLink: "https://www.vivianesassen.com",
  isLiked: false
}]; // ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

export default App; // let ArtistLinks = (props) => {
// }

{
  /* <input onClick={this.handleCardClick}>
   {props.value.isCardClicked ? '' : ''}
  </input> */
} // function ToggleHeart(props) {
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
// postLikedArtists() { //not front end event, so can't use e
//   //e.preventdefault();
//     fetch('/favorites', {
//       method: 'POST',
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ArtistList: this.state.ArtistList
//       })
//     })
//     .then(res => {
//       //console.log('response: ', res);
//       //let parsedReq = JSON.parse(req.body);
//       res.json();
//       //JSON.parse --> is it already parsed becuase of bodyParser?
//     })
//     .then(data => {
//       console.log('success: ', data);
//     })
//     .catch(err => {
//       console.log('error posting liked artists: ', err);
//     })
//   }
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
// {props.value.artistList.map(artist, (artist, index) => { //element, then func run on each el
//   return <artistList artist={ artist } key={ index } handleHeartToggle={props.handleHeartToggle} />;
// })}
// {props.artistList.map(artist, (artist, index) => {
//   return <ArtistList artist={ artist } key={ index } />;
// })}
//let parsedReq = JSON.parse(req.body);
// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }
// const element = <Welcome name="Sara" />;
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );

{
  /* <div className="inner-container" id="artist-cards">
  {props.value.ArtistList.map((artist) =>  //element, then func run on each el
   <div>{artist.imageURL}<div/>
  )}
  <input onClick={this.handleHeartToggle}>
   {props.value.isHeartFilled ? <div className="heart"><a href="#"><i className="fa fa-heart fa-2x"></i></a></div> : <div className="heart"><a href="#"><i className="fa fa-heart-o fa-2x"></i></a></div>}
  </input>
  </div> */
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9BcHAuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiQXBwIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwicGFnZSIsImlzSGVhcnRGaWxsZWQiLCJBcnRpc3RMaXN0IiwiaXNDYXJkQ2xpY2tlZCIsImxpa2VkQXJ0aXN0cyIsImhhbmRsZUJ1dHRvbkNsaWNrIiwiYmluZCIsIm90aGVyUGFnZSIsImhhbmRsZUNhcmRDbGljayIsImhhbmRsZUhlYXJ0VG9nZ2xlIiwicG9zdExpa2VkQXJ0aXN0cyIsImUiLCJwcmV2ZW50ZGVmYXVsdCIsInNldFN0YXRlIiwicHJldlN0YXRlIiwiZ2V0QXJ0aXN0c1BhZ2UiLCJmZXRjaCIsIm1ldGhvZCIsImdldExpa2VkQXJ0aXN0cyIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwidGhlbiIsInJlcyIsImpzb24iLCJjYXRjaCIsImVyciIsImNvbXBvbmVudERpZE1vdW50IiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVuZGVyIiwiQXJ0aXN0c1BhZ2UiLCJ2YWx1ZSIsIm1hcCIsImFydGlzdCIsImluZGV4IiwiaW1hZ2VVUkwiLCJGYXZvcml0ZXNQYWdlIiwibmFtZSIsImFydGlzdExpbmsiLCJpc0xpa2VkIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCLEMsQ0FDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUFXQSxNQUFNQyxHQUFOLFNBQWtCRCxLQUFLLENBQUNFLFNBQXhCLENBQWtDO0FBQ2hDQyxFQUFBQSxXQUFXLENBQUNDLEtBQUQsRUFBUTtBQUNqQixVQUFNQSxLQUFOO0FBQ0EsU0FBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLElBQUksRUFBRSxTQURLO0FBRVhDLE1BQUFBLGFBQWEsRUFBRSxPQUZKO0FBR1g7QUFDQUMsTUFBQUEsVUFBVSxFQUFFQSxVQUpEO0FBS1hDLE1BQUFBLGFBQWEsRUFBRSxLQUxKO0FBTVg7QUFDQUMs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQUM7Ozs7Ozs7O0FBT1MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy9pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuLypcbmNvbXBvbmVudHM6XG4xLiBhcHAgLSBldmVyeXRoaW5nIHdpbGwgYmUgcmVuZGVyZWQsIGhlYXJ0VG9nZ2xlLCBidXR0b25DbGljaywgcG9zdExpa2VkQXJ0aXN0cyB0byBkYlxuMi4gcGFnZXMgLSBjb250YWluZXIgY29tcG9uZW50cywgcmVuZGVyIG90aGVyIGNvbXBvbmVudHMgaW5zaWRlXG4zLiBhcnRpc3QgY2FyZHMgLSBtYXBwaW5nIGVhY2ggY2FyZCBpbmRpdmlkdWFsbHkgZnJvbSBhcnRpc3RMaXN0XG40LiBmYXZvcml0ZXMgLSByZW5kZXIgZWFjaCBsaW5rIGZyb20gZmF2b3JpdGVzTGlzdCB3L21hcCBmdW5jXG5cbnJ1bm5pbmcgb3JkZXI6XG4gIC0gY29uc3RydWN0b3IsIHJlbmRlciwgY29tcG9uZW50RGlkTW91bnRcbiovXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwYWdlOiAnYXJ0aXN0cycsXG4gICAgICBpc0hlYXJ0RmlsbGVkOiAnZmFsc2UnLFxuICAgICAgLy9hcnRpc3RMaXN0OiB0aGlzLnByb3BzLmFydGlzdExpc3QsXG4gICAgICBBcnRpc3RMaXN0OiBBcnRpc3RMaXN0LFxuICAgICAgaXNDYXJkQ2xpY2tlZDogZmFsc2UsXG4gICAgICAvL2xpa2VkQXJ0aXN0cyAtLT4ge25hbWUsIGltYWdlVVJMLCBhcnRpc3RMaW5rLCBpc0xpa2VkfVxuICAgICAgbGlrZWRBcnRpc3RzOiBbXVxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVCdXR0b25DbGljayA9IHRoaXMuaGFuZGxlQnV0dG9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm90aGVyUGFnZSA9IHRoaXMub3RoZXJQYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVDYXJkQ2xpY2sgPSB0aGlzLmhhbmRsZUNhcmRDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSGVhcnRUb2dnbGUgPSB0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wb3N0TGlrZWRBcnRpc3RzID0gdGhpcy5wb3N0TGlrZWRBcnRpc3RzLmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlQnV0dG9uQ2xpY2soZSkge1xuICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+ICh7XG4gICAgICBwYWdlOiAhc3RhdGUucGFnZVxuICAgIH0pKTtcbiAgfVxuICBvdGhlclBhZ2Uob3RoZXJQYWdlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShwcmV2U3RhdGUgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFnZTogb3RoZXJQYWdlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBoYW5kbGVDYXJkQ2xpY2soZSkge1xuICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+ICh7XG4gICAgICBpc0NhcmRDbGlja2VkOiAhc3RhdGUuaXNDYXJkQ2xpY2tlZFxuICAgIH0pKTtcbiAgfVxuICBoYW5kbGVIZWFydFRvZ2dsZShlKSB7XG4gICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbiAgICAgIGlzSGVhcnRGaWxsZWQ6ICFzdGF0ZS5pc0hlYXJ0RmlsbGVkXG4gICAgfSkpO1xuICB9XG4gIGdldEFydGlzdHNQYWdlKCkge1xuICAgIGZldGNoKCcvJywge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pO1xuICB9XG4gIGdldExpa2VkQXJ0aXN0cyhsaWtlZEFydGlzdHMpIHtcbiAgICBsZXQgZGF0YSA9IHsgbGlrZWRBcnRpc3RzIH07IC8vdGhpcy5zdGF0ZS5saWtlZEFydGlzdHM/XG4gICAgY29uc29sZS5sb2coJ2xpa2VkQXJ0aXN0czogJywgbGlrZWRBcnRpc3RzKTtcbiAgICBmZXRjaCgnL2FydGlzdHMnLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSlcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBnZXR0aW5nIGxpa2VkIGFydGlzdHMnLCBlcnIpO1xuICAgICAgfSk7XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5wb3N0TGlrZWRBcnRpc3RzKCk7XG4gIH1cbiAgcG9zdExpa2VkQXJ0aXN0cyhkYXRhKSB7IC8vcGFzcyBpbiBjYWxsYmFjaywgdGhlbiBjYWxsIHcvZGF0YSBvciBkYXRhLnJlc3VsdCB3aGVuIGhhbmRsaW5nIHJlcz9cbiAgICBmZXRjaCgnL2FydGlzdHMnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgfSlcbiAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSkgIC8vcGFyc2VzIHRoZSByZXNwb25zZSBhcyBKU09OXG4gICAgICAvL2NvbnNvbGUubG9nKCdyZXNwb25zZTogJywgcmVzKTtcbiAgICAudGhlbihkYXRhID0+IGNvbnNvbGUubG9nKCdzdWNjZXNzOiAnLCBkYXRhKSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBwb3N0aW5nIGxpa2VkIGFydGlzdHM6ICcsIGVycik7XG4gICAgfSk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIC8vIGlmICh0aGlzLnN0YXRlLnBhZ2UgPT09ICdhcnRpc3RzJykge1xuICAgIC8vICAgLy9idXR0b25DbGljaz17dGhpcy5oYW5kbGVCdXR0b25DbGlja31cbiAgICAvLyAgIHJldHVybiAoXG4gICAgLy8gICAgICAgPEFydGlzdHNQYWdlIHZhbHVlPXt0aGlzLnN0YXRlfSBvdGhlclBhZ2U9e3RoaXMub3RoZXJQYWdlfSBoYW5kbGVDYXJkQ2xpY2s9e3RoaXMuaGFuZGxlQ2FyZENsaWNrfSBoYW5kbGVIZWFydFRvZ2dsZT17dGhpcy5oYW5kbGVIZWFydFRvZ2dsZX0gcG9zdEFydGlzdHM9e3RoaXMucG9zdExpa2VkQXJ0aXN0c30gLz5cbiAgICAvLyAgICk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIC8vYnV0dG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9uQ2xpY2t9XG4gICAgLy8gICAvL2hhbmRsZSBsaW5rIGNsaWNrP1xuICAgIC8vICAgcmV0dXJuIChcbiAgICAvLyAgICAgPEZhdm9yaXRlc1BhZ2UgdmFsdWU9e3RoaXMuc3RhdGV9IG90aGVyUGFnZT17dGhpcy5vdGhlclBhZ2V9IC8+XG4gICAgLy8gICApO1xuICAgIC8vIH1cblxuICAgIHJldHVybiA8ZGl2PmhlbGxvPC9kaXY+XG4gIH1cbn1cblxuZnVuY3Rpb24gQXJ0aXN0c1BhZ2UocHJvcHMpIHsgLy9tYXBwaW5nIGVhY2ggY2FyZCBpbmRpdmlkdWFsbHkgZnJvbSBhcnRpc3RMaXN0XG4gIGNvbnNvbGUubG9nKCdBcHAgcHJvcHMnLCBwcm9wcyk7XG4gIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPkFydGlzdHM8L2gxPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvblwiIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICBwcm9wcy5vdGhlclBhZ2UoJ2Zhdm9yaXRlcycpO1xuICAgICAgICAgIH19PlxuICAgICAgICAgIEZhdm9yaXRlc1xuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbm5lci1jb250YWluZXJcIiBpZD1cImFydGlzdC1jYXJkc1wiPlxuICAgICAgICAgIHtwcm9wcy52YWx1ZS5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0LCBpbmRleCkgPT5cbiAgICAgICAgICAgIDxpbWcgc3JjPXthcnRpc3QuaW1hZ2VVUkx9IGtleT17IGluZGV4IH0+PC9pbWc+XG4gICAgICAgICAgKX1cblxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICApXG59XG5cbmZ1bmN0aW9uIEZhdm9yaXRlc1BhZ2UocHJvcHMpIHsgLy9yZW5kZXIgZWFjaCBsaW5rIGZyb20gZmF2b3JpdGVzTGlzdCB3L21hcCBmdW5jXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgIDxoMSBjbGFzc05hbWU9XCJwYWdlLXRpdGxlXCI+RmF2b3JpdGVzPC9oMT5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgcHJvcHMub3RoZXJQYWdlKCdhcnRpc3RzJyk7XG4gICAgICAgIH19PlxuICAgICAgICBBcnRpc3RzXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtbGlua3NcIj5cbiAgICAgICAge3Byb3BzLkFydGlzdExpc3QubWFwKChhcnRpc3QpID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj57YXJ0aXN0Lm5hbWUsIGFydGlzdC5hcnRpc3RMaW5rfTwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmNvbnN0IEFydGlzdExpc3QgPSBbXG4gIHtcbiAgICBuYW1lOiAnbGV0aGEgd2lsc29uJyxcbiAgICBpbWFnZVVSTDogJ2h0dHBzOi8vd3d3LmxldGhhcHJvamVjdHMuY29tL3Zpc3VhbHMvaW1hZ2VzL291dGRvb3JzL2dob3N0b2ZhdHJlZS1yaWdodC12aWV3LmpwZycsXG4gICAgYXJ0aXN0TGluazogXCJodHRwczovL3d3dy5sZXRoYXByb2plY3RzLmNvbVwiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnZ2VuZXNpcyBiYWV6JyxcbiAgICBpbWFnZVVSTDogJ2h0dHA6Ly9tZWRpYS52aXJiY2RuLmNvbS9jZG5faW1hZ2VzL3Jlc2l6ZV8xNjAweDE2MDAvMjMvYWMxNzE4Yjc0NTk2NWFlZC1CYWV6XzEuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHA6Ly93d3cuZ2VuZXNpc2JhZXouY29tL1wiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnc2FyYWgtbG91aXNlIGJhcmJldHQnLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly9haXNzZWxsZXMuZmlsZXMud29yZHByZXNzLmNvbS8yMDEwLzEyL2ltZ18wMDE2LmpwZz93PTExMDQnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cHM6Ly9haXNzZWxsZXMuZmlsZXMud29yZHByZXNzLmNvbVwiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnamVzc2ljYSBoYWxvbmVuJyxcbiAgICBpbWFnZVVSTDogJ2h0dHA6Ly93d3cuamVzc2ljYWhhbG9uZW4uY29tL2ZpbGVzL2dpbWdzLzQ0X3NwbGljZWQtYnJhbmNoLWJhbGwtMS5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cDovL3d3dy5qZXNzaWNhaGFsb25lbi5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2xhdXJhIG93ZW5zJyxcbiAgICBpbWFnZVVSTDogJ2h0dHBzOi8vd3d3Lm93ZW5zbGF1cmEuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDEzLzAxL0hRLTE2TE85MzU5UC1VbnRpdGxlZC5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cHM6Ly93d3cub3dlbnNsYXVyYS5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2RlYm9yYWggcm9iZXJ0cycsXG4gICAgaW1hZ2VVUkw6ICdodHRwczovL2kwLndwLmNvbS9jb25mbGljdG9maW50ZXJlc3R0eC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTcvMDcvVGhlLVBvd2VyLWRhbmNlLTMweDIyLTIwMTcuanBlZz93PTQ2OScsXG4gICAgYXJ0aXN0TGluazogXCJodHRwOi8vd3d3LmRlYm9yYWhyb2JlcnRzYXJ0LmNvbS9cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2FuYSBlc3RldmUgbGxvcmVucycsXG4gICAgaW1hZ2VVUkw6ICdodHRwOi8vd3d3LmFuYWVzdGV2ZWxsb3JlbnMuY29tL3Byb2plY3RzL3Byb2plY3Q2LzA3JTIwUXVhc3klMjBJbmZpbml0ZS5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cDovL3d3dy5hbmFlc3RldmVsbG9yZW5zLmNvbVwiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnamFja2llIGZ1cnRhZG8nLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2FydGZhcmUtcHJvZHVjdGlvbi1tb2JpbGUvQXJ0d29ya3MvSW1hZ2VzL0ltYWdlLTEvaW1hZ2UtMS1kNjdiMDYxNi0wNzdiLTRmZWUtOTdiZS0yNzVlNGRkZTYxMDcuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHBzOi8vamFja2llZnVydGFkby5jb20vXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICd2aXZpYW5lIHNhc3NlbicsXG4gICAgaW1hZ2VVUkw6ICdodHRwczovL3d3dy52aXZpYW5lc2Fzc2VuLmNvbS9zaXRlL2Fzc2V0cy9maWxlcy8yOTQwL3VtYnJhX25hYl92c18zOTQyLjB4MTUwMC5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cHM6Ly93d3cudml2aWFuZXNhc3Nlbi5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9XG5dO1xuXG5cbi8vIFJlYWN0RE9NLnJlbmRlcihcbi8vICAgPEFwcCAvPixcbi8vICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuLy8gKTtcblxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuLy8gbGV0IEFydGlzdExpbmtzID0gKHByb3BzKSA9PiB7XG5cbi8vIH1cblxuey8qIDxpbnB1dCBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhcmRDbGlja30+XG4gIHtwcm9wcy52YWx1ZS5pc0NhcmRDbGlja2VkID8gJycgOiAnJ31cbjwvaW5wdXQ+ICovfVxuXG4vLyBmdW5jdGlvbiBUb2dnbGVIZWFydChwcm9wcykge1xuLy8gICByZXR1cm4gKFxuLy8gICAgIC8vb25DbGljaz17dGhpcy5oYW5kbGVIZWFydENsaWNrfVxuLy8gICAgIDxpbnB1dCBvbkNsaWNrPXsoZSkgPT4ge1xuLy8gICAgICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuLy8gICAgICAgcHJvcHMuaXNIZWFydEZpbGxlZCA/ICdmYSBmYS1oZWFydCBmYS0yeCcgOiAnZmEgZmEtaGVhcnQtbyBmYS0yeCc7XG4vLyAgICAgICAvL3B1c2ggYXJ0aXN0cyBpbnRvIGxpa2VkQXJ0aXN0c1xuLy8gICAgICAgLy9wb3N0IHRvIGRiIC0tPiBwYXNzIGluIGFydGlzdHMgd2hvc2UgaGVhcnRzIGFyZSBmaWxsZWQtaW5cbi8vICAgICAgIC8vaWYgKHByb3BzLmlzSGVhcnRGaWxsZWQgPT09IHRydWUpLCAnZmEgZmEtaGVhcnQgZmEtMngnLCBwb3N0XG4vLyAgICAgICBwcm9wcy5wb3N0TGlrZWRBcnRpc3RzKCk7XG4vLyAgICAgfX0+XG4vLyAgICAgPC9pbnB1dD5cbi8vICAgKTtcbi8vIH1cbi8vIGNsYXNzIFRvZ2dsZUhlYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICBzdXBlcihwcm9wcyk7XG4vLyAgICAgdGhpcy5zdGF0ZSA9IHtpc0hlYXJ0RmlsbGVkOiAnZmFsc2UnfTtcbi8vICAgICB0aGlzLmhhbmRsZUhlYXJ0Q2xpY2sgPSB0aGlzLmhhbmRsZUhlYXJ0Q2xpY2suYmluZCh0aGlzKTtcbi8vICAgfVxuLy8gICBoYW5kbGVIZWFydENsaWNrKCkge1xuLy8gICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbi8vICAgICAgIGlzSGVhcnRGaWxsZWQ6ICFzdGF0ZS5pc0hlYXJ0RmlsbGVkXG4vLyAgICAgfSkpO1xuLy8gICB9XG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlSGVhcnRDbGlja30+XG4vLyAgICAgICAgIHt0aGlzLnN0YXRlLmlzSGVhcnRGaWxsZWQgPyAnZmEgZmEtaGVhcnQgZmEtMngnIDogJ2ZhIGZhLWhlYXJ0LW8gZmEtMngnfVxuLy8gICAgICAgPC9pbnB1dD5cbi8vICAgICApO1xuLy8gICB9XG4vLyB9XG5cbi8vIHBvc3RMaWtlZEFydGlzdHMoKSB7IC8vbm90IGZyb250IGVuZCBldmVudCwgc28gY2FuJ3QgdXNlIGVcbi8vICAgLy9lLnByZXZlbnRkZWZhdWx0KCk7XG4vLyAgICAgZmV0Y2goJy9mYXZvcml0ZXMnLCB7XG4vLyAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbi8vICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbi8vICAgICAgICAgQXJ0aXN0TGlzdDogdGhpcy5zdGF0ZS5BcnRpc3RMaXN0XG4vLyAgICAgICB9KVxuLy8gICAgIH0pXG4vLyAgICAgLnRoZW4ocmVzID0+IHtcbi8vICAgICAgIC8vY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnLCByZXMpO1xuLy8gICAgICAgLy9sZXQgcGFyc2VkUmVxID0gSlNPTi5wYXJzZShyZXEuYm9keSk7XG4vLyAgICAgICByZXMuanNvbigpO1xuLy8gICAgICAgLy9KU09OLnBhcnNlIC0tPiBpcyBpdCBhbHJlYWR5IHBhcnNlZCBiZWN1YXNlIG9mIGJvZHlQYXJzZXI/XG4vLyAgICAgfSlcbi8vICAgICAudGhlbihkYXRhID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzOiAnLCBkYXRhKTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaChlcnIgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHBvc3RpbmcgbGlrZWQgYXJ0aXN0czogJywgZXJyKTtcbi8vICAgICB9KVxuLy8gICB9XG5cbi8vIGNsYXNzIEFydGlzdENhcmRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICBzdXBlcihwcm9wcyk7XG4vLyAgICAgdGhpcy5zdGF0ZSA9IHtcbi8vICAgICAgIGlzQ2FyZENsaWNrZWQ6IGZhbHNlLFxuLy8gICAgICAgYXJ0aXN0VVJMOiAnJ1xuLy8gICAgIH07XG4vLyAgICAgdGhpcy5oYW5kbGVDYXJkQ2xpY2sgPSB0aGlzLmhhbmRsZUNhcmRDbGljay5iaW5kKHRoaXMpO1xuLy8gICB9XG4vLyAgIGhhbmRsZUNhcmRDbGljayhlKSB7XG4vLyAgICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuLy8gICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbi8vICAgICAgIGlzQ2FyZENsaWNrZWQ6ICFzdGF0ZS5pc0NhcmRDbGlja2VkXG4vLyAgICAgfSkpO1xuLy8gICB9XG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FyZENsaWNrfT5cbi8vICAgICAgICAge3RoaXMuc3RhdGUuaXNDYXJkQ2xpY2tlZCA/ICcnIDogJyd9XG4vLyAgICAgICA8L2lucHV0PlxuLy8gICAgICk7XG4vLyAgIH1cbi8vIH1cblxuLy8ge3Byb3BzLnZhbHVlLmFydGlzdExpc3QubWFwKGFydGlzdCwgKGFydGlzdCwgaW5kZXgpID0+IHsgLy9lbGVtZW50LCB0aGVuIGZ1bmMgcnVuIG9uIGVhY2ggZWxcbi8vICAgcmV0dXJuIDxhcnRpc3RMaXN0IGFydGlzdD17IGFydGlzdCB9IGtleT17IGluZGV4IH0gaGFuZGxlSGVhcnRUb2dnbGU9e3Byb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlfSAvPjtcbi8vIH0pfVxuXG4vLyB7cHJvcHMuYXJ0aXN0TGlzdC5tYXAoYXJ0aXN0LCAoYXJ0aXN0LCBpbmRleCkgPT4ge1xuLy8gICByZXR1cm4gPEFydGlzdExpc3QgYXJ0aXN0PXsgYXJ0aXN0IH0ga2V5PXsgaW5kZXggfSAvPjtcbi8vIH0pfVxuXG4vL2xldCBwYXJzZWRSZXEgPSBKU09OLnBhcnNlKHJlcS5ib2R5KTtcblxuXG4vLyBmdW5jdGlvbiBXZWxjb21lKHByb3BzKSB7XG4vLyAgIHJldHVybiA8aDE+SGVsbG8sIHtwcm9wcy5uYW1lfTwvaDE+O1xuLy8gfVxuXG4vLyBjb25zdCBlbGVtZW50ID0gPFdlbGNvbWUgbmFtZT1cIlNhcmFcIiAvPjtcblxuXG4vLyBSZWFjdERPTS5yZW5kZXIoXG4vLyAgIGVsZW1lbnQsXG4vLyAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jylcbi8vICk7XG5cblxuey8qIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtY2FyZHNcIj5cbntwcm9wcy52YWx1ZS5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0KSA9PiAgLy9lbGVtZW50LCB0aGVuIGZ1bmMgcnVuIG9uIGVhY2ggZWxcbiAgPGRpdj57YXJ0aXN0LmltYWdlVVJMfTxkaXYvPlxuKX1cbjxpbnB1dCBvbkNsaWNrPXt0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlfT5cbiAge3Byb3BzLnZhbHVlLmlzSGVhcnRGaWxsZWQgPyA8ZGl2IGNsYXNzTmFtZT1cImhlYXJ0XCI+PGEgaHJlZj1cIiNcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFydCBmYS0yeFwiPjwvaT48L2E+PC9kaXY+IDogPGRpdiBjbGFzc05hbWU9XCJoZWFydFwiPjxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQtbyBmYS0yeFwiPjwvaT48L2E+PC9kaXY+fVxuPC9pbnB1dD5cbjwvZGl2PiAqL31cblxuIl19