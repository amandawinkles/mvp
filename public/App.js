import React from 'react';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/*
components:
1. app - everything will be rendered, heartToggle, buttonClick, postLikedArtists to db
2. pages - container components, render other components inside
3. artist cards - mapping each card individually from artistList
4. favorites - render each link from favoritesList w/map func

running order:
  - constructor, render, componentDidMount
*/
//<i className="fas fa-heart" size="2x"></i> //solid
//<FontAwesomeIcon icon={faHeart} size="2x" /> //solid
//<i className="far fa-heart"></i> //outline
//<FontAwesomeIcon icon={['far', 'heart']} size="2x" /> //outline

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
    //if isHeartFilled === true, postLikedArtists, else delete artist
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

  componentDidMount() {
    fetch('/artists', {
      method: 'GET'
    }).then(response => response.json()).then(data => {
      console.log('👘 data in GET: ', data);
      this.setState({
        likedArtists: data
      });
    }).catch(err => {
      console.log('error getting liked artists', err);
    });
  }

  postLikedArtists(data) {
    //pass in callback, then call w/data or data.result when handling res?
    console.log('🧶 data in POST: ', data);
    data = {
      likedArtists: this.state.likedArtists
    };
    fetch('/artists', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }); // .then(res => res.json())  //parses the response as JSON
    //   console.log('response: ', res);
    // .then(data => console.log('success: ', data))
    // .catch(err => {
    //   console.log('error posting liked artists: ', err);
    // });
  }

  render() {
    //return <Heart/>
    if (this.state.page === 'artists') {
      //buttonClick={this.handleButtonClick}
      return /*#__PURE__*/React.createElement(ArtistsPage, {
        value: this.state,
        otherPage: this.otherPage,
        postArtists: this.postLikedArtists
      });
    } else {
      //buttonClick={this.handleButtonClick}
      //handle link click?
      return /*#__PURE__*/React.createElement(FavoritesPage, {
        value: this.state,
        otherPage: this.otherPage
      });
    } //return <div>hello</div>

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
  }, props.value.ArtistList.map((artist, index) => /*#__PURE__*/React.createElement(ArtistCards, {
    artist: artist,
    key: index,
    handleCardClick: props.handleCardClick,
    handleHeartToggle: props.handleHeartToggle
  }))));
}

let ArtistCards = props => /*#__PURE__*/React.createElement("div", {
  className: "artist-card-entry"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
  src: props.artist.imageURL
})), /*#__PURE__*/React.createElement("div", {
  className: "heart-icon",
  onClick: () => props.handleHeartToggle(props.artist)
}, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
  icon: faHeart,
  size: "2x"
})));

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
}];
export default App; // ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
// let ArtistLinks = (props) => {
// }

{
  /* <input onClick={this.handleCardClick}>
   {props.value.isCardClicked ? '' : ''}
  </input> */
} // let ListArtists = (props) => (
//   <div className="inner-container" id="artist-cards">
//     {props.value.ArtistList.map((artist, index) =>
//       <ArtistCards artist={ artist } key={ index } handleCardClick={this.handleCardClick} handleHeartToggle={this.handleHeartToggle} />
//     )}
//   </div>
// );
// onClick={ () => props.handleHeartToggle(props.artist) } //props.value.isHeartFilled
//onClick={this.handleHeartToggle}
// <div>
//           <img src={artist.imageURL} key={ index }></img>
//           {/* <FontAwesomeIcon icon={faHeart} size="2x" /> */}
//           </div>
//         )
//         )}
//         {/* <input onClick={this.handleHeartToggle}>
//           {props.value.isHeartFilled ? <div className="heart"><a href="#"><i className="fa fa-heart fa-2x"></i></a></div> : <div className="heart"><a href="#"><i className="fa fa-heart-o fa-2x"></i></a></div>}
//         </input> */}
// getArtistsPage() {
//   fetch('/', {
//     method: 'GET'
//   });
// }
// getLikedArtists() {
//   //let data = { likedArtists }; //this.state.likedArtists?
//   //console.log('likedArtists: ', likedArtists);
//   fetch('/artists', {
//     method: 'GET'
//   })
//     .then(response => response.json())
//     .then(data => {
//       this.setState({likedArtists: data})
//     })
//     .catch(err => {
//       console.log('error getting liked artists', err);
//     });
// }
// componentDidMount() {
//   this.postLikedArtists();
// }
// postLikedArtists(data) { //pass in callback, then call w/data or data.result when handling res?
//   fetch('/artists', {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   })
//   .then(res => res.json())  //parses the response as JSON
//     console.log('response: ', res);
//   .then(data => console.log('success: ', data))
//   .catch(err => {
//     console.log('error posting liked artists: ', err);
//   });
// }
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
{
  /* <div className="inner-container" id="artist-cards">
  {props.value.ArtistList.map((artist, index) => (
   <div>
   <img src={artist.imageURL} key={ index }></img>
    {/* <FontAwesomeIcon icon={faHeart} size="2x" /> */
} //   </div>
// )
// )}

{
  /* <input onClick={this.handleHeartToggle}>
   {props.value.isHeartFilled ? <div className="heart"><a href="#"><i className="fa fa-heart fa-2x"></i></a></div> : <div className="heart"><a href="#"><i className="fa fa-heart-o fa-2x"></i></a></div>}
  </input> */
} // </div> */}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9BcHAuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiZmFIZWFydCIsImZhckhlYXJ0IiwiRm9udEF3ZXNvbWVJY29uIiwiQXBwIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwicGFnZSIsImlzSGVhcnRGaWxsZWQiLCJBcnRpc3RMaXN0IiwiaXNDYXJkQ2xpY2tlZCIsImxpa2VkQXJ0aXN0cyIsImhhbmRsZUJ1dHRvbkNsaWNrIiwiYmluZCIsIm90aGVyUGFnZSIsImhhbmRsZUNhcmRDbGljayIsImhhbmRsZUhlYXJ0VG9nZ2xlIiwicG9zdExpa2VkQXJ0aXN0cyIsImUiLCJwcmV2ZW50ZGVmYXVsdCIsInNldFN0YXRlIiwicHJldlN0YXRlIiwiZ2V0QXJ0aXN0c1BhZ2UiLCJmZXRjaCIsIm1ldGhvZCIsImNvbXBvbmVudERpZE1vdW50IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnIiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW5kZXIiLCJBcnRpc3RzUGFnZSIsInZhbHVlIiwibWFwIiwiYXJ0aXN0IiwiaW5kZXgiLCJBcnRpc3RDYXJkcyIsImltYWdlVVJMIiwiRmF2b3JpdGVzUGFnZSIsIm5hbWUiLCJhcnRpc3RMaW5rIiwiaXNMaWtlZCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsbUNBQXhCO0FBQ0EsU0FBU0MsUUFBVCxRQUF5QixxQ0FBekI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLGdDQUFoQztBQUVBOzs7Ozs7Ozs7O0FBV0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTUMsR0FBTixTQUFrQkosS0FBSyxDQUFDSyxTQUF4QixDQUFrQztBQUNoQ0MsRUFBQUEsV0FBVyxDQUFDQyxLQUFELEVBQVE7QUFDakIsVUFBTUEsS0FBTjtBQUNBLFNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUFDOzs7Ozs7OztBQU9TO0FBRVY7QUFBQzs7Ozs7QUFLcUQsQyxDQUN0RDtBQUNBO0FBQ0E7O0FBRUE7QUFBQzs7O0FBRVcsQyxDQUNaIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZhSGVhcnQgfSBmcm9tIFwiQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zXCI7XG5pbXBvcnQgeyBmYXJIZWFydCB9IGZyb20gXCJAZm9ydGF3ZXNvbWUvZnJlZS1yZWd1bGFyLXN2Zy1pY29uc1wiO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVJY29uIH0gZnJvbSBcIkBmb3J0YXdlc29tZS9yZWFjdC1mb250YXdlc29tZVwiO1xuXG4vKlxuY29tcG9uZW50czpcbjEuIGFwcCAtIGV2ZXJ5dGhpbmcgd2lsbCBiZSByZW5kZXJlZCwgaGVhcnRUb2dnbGUsIGJ1dHRvbkNsaWNrLCBwb3N0TGlrZWRBcnRpc3RzIHRvIGRiXG4yLiBwYWdlcyAtIGNvbnRhaW5lciBjb21wb25lbnRzLCByZW5kZXIgb3RoZXIgY29tcG9uZW50cyBpbnNpZGVcbjMuIGFydGlzdCBjYXJkcyAtIG1hcHBpbmcgZWFjaCBjYXJkIGluZGl2aWR1YWxseSBmcm9tIGFydGlzdExpc3RcbjQuIGZhdm9yaXRlcyAtIHJlbmRlciBlYWNoIGxpbmsgZnJvbSBmYXZvcml0ZXNMaXN0IHcvbWFwIGZ1bmNcblxucnVubmluZyBvcmRlcjpcbiAgLSBjb25zdHJ1Y3RvciwgcmVuZGVyLCBjb21wb25lbnREaWRNb3VudFxuKi9cblxuLy88aSBjbGFzc05hbWU9XCJmYXMgZmEtaGVhcnRcIiBzaXplPVwiMnhcIj48L2k+IC8vc29saWRcbi8vPEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYUhlYXJ0fSBzaXplPVwiMnhcIiAvPiAvL3NvbGlkXG4vLzxpIGNsYXNzTmFtZT1cImZhciBmYS1oZWFydFwiPjwvaT4gLy9vdXRsaW5lXG4vLzxGb250QXdlc29tZUljb24gaWNvbj17WydmYXInLCAnaGVhcnQnXX0gc2l6ZT1cIjJ4XCIgLz4gLy9vdXRsaW5lXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwYWdlOiAnYXJ0aXN0cycsXG4gICAgICBpc0hlYXJ0RmlsbGVkOiAnZmFsc2UnLFxuICAgICAgLy9hcnRpc3RMaXN0OiB0aGlzLnByb3BzLmFydGlzdExpc3QsXG4gICAgICBBcnRpc3RMaXN0OiBBcnRpc3RMaXN0LFxuICAgICAgaXNDYXJkQ2xpY2tlZDogZmFsc2UsXG4gICAgICAvL2xpa2VkQXJ0aXN0cyAtLT4ge25hbWUsIGltYWdlVVJMLCBhcnRpc3RMaW5rLCBpc0xpa2VkfVxuICAgICAgbGlrZWRBcnRpc3RzOiBbXVxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVCdXR0b25DbGljayA9IHRoaXMuaGFuZGxlQnV0dG9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm90aGVyUGFnZSA9IHRoaXMub3RoZXJQYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVDYXJkQ2xpY2sgPSB0aGlzLmhhbmRsZUNhcmRDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSGVhcnRUb2dnbGUgPSB0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wb3N0TGlrZWRBcnRpc3RzID0gdGhpcy5wb3N0TGlrZWRBcnRpc3RzLmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlQnV0dG9uQ2xpY2soZSkge1xuICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+ICh7XG4gICAgICBwYWdlOiAhc3RhdGUucGFnZVxuICAgIH0pKTtcbiAgfVxuICBvdGhlclBhZ2Uob3RoZXJQYWdlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShwcmV2U3RhdGUgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFnZTogb3RoZXJQYWdlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBoYW5kbGVDYXJkQ2xpY2soZSkge1xuICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+ICh7XG4gICAgICBpc0NhcmRDbGlja2VkOiAhc3RhdGUuaXNDYXJkQ2xpY2tlZFxuICAgIH0pKTtcbiAgfVxuICBoYW5kbGVIZWFydFRvZ2dsZShlKSB7IC8vaWYgaXNIZWFydEZpbGxlZCA9PT0gdHJ1ZSwgcG9zdExpa2VkQXJ0aXN0cywgZWxzZSBkZWxldGUgYXJ0aXN0XG4gICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbiAgICAgIGlzSGVhcnRGaWxsZWQ6ICFzdGF0ZS5pc0hlYXJ0RmlsbGVkXG4gICAgfSkpO1xuICB9XG4gIGdldEFydGlzdHNQYWdlKCkge1xuICAgIGZldGNoKCcvJywge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGZldGNoKCcvYXJ0aXN0cycsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfwn5GYIGRhdGEgaW4gR0VUOiAnLCBkYXRhKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bGlrZWRBcnRpc3RzOiBkYXRhfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIGdldHRpbmcgbGlrZWQgYXJ0aXN0cycsIGVycik7XG4gICAgICB9KTtcbiAgfVxuICBwb3N0TGlrZWRBcnRpc3RzKGRhdGEpIHsgLy9wYXNzIGluIGNhbGxiYWNrLCB0aGVuIGNhbGwgdy9kYXRhIG9yIGRhdGEucmVzdWx0IHdoZW4gaGFuZGxpbmcgcmVzP1xuICAgIGNvbnNvbGUubG9nKCfwn6e2IGRhdGEgaW4gUE9TVDogJywgZGF0YSk7XG4gICAgZGF0YSA9IHtsaWtlZEFydGlzdHM6IHRoaXMuc3RhdGUubGlrZWRBcnRpc3RzfTtcbiAgICBmZXRjaCgnL2FydGlzdHMnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgfSlcbiAgICAvLyAudGhlbihyZXMgPT4gcmVzLmpzb24oKSkgIC8vcGFyc2VzIHRoZSByZXNwb25zZSBhcyBKU09OXG4gICAgLy8gICBjb25zb2xlLmxvZygncmVzcG9uc2U6ICcsIHJlcyk7XG4gICAgLy8gLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZygnc3VjY2VzczogJywgZGF0YSkpXG4gICAgLy8gLmNhdGNoKGVyciA9PiB7XG4gICAgLy8gICBjb25zb2xlLmxvZygnZXJyb3IgcG9zdGluZyBsaWtlZCBhcnRpc3RzOiAnLCBlcnIpO1xuICAgIC8vIH0pO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICAvL3JldHVybiA8SGVhcnQvPlxuICAgIGlmICh0aGlzLnN0YXRlLnBhZ2UgPT09ICdhcnRpc3RzJykge1xuICAgICAgLy9idXR0b25DbGljaz17dGhpcy5oYW5kbGVCdXR0b25DbGlja31cbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgPEFydGlzdHNQYWdlIHZhbHVlPXt0aGlzLnN0YXRlfSBvdGhlclBhZ2U9e3RoaXMub3RoZXJQYWdlfSBwb3N0QXJ0aXN0cz17dGhpcy5wb3N0TGlrZWRBcnRpc3RzfSAvPlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9idXR0b25DbGljaz17dGhpcy5oYW5kbGVCdXR0b25DbGlja31cbiAgICAgIC8vaGFuZGxlIGxpbmsgY2xpY2s/XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RmF2b3JpdGVzUGFnZSB2YWx1ZT17dGhpcy5zdGF0ZX0gb3RoZXJQYWdlPXt0aGlzLm90aGVyUGFnZX0gLz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy9yZXR1cm4gPGRpdj5oZWxsbzwvZGl2PlxuICB9XG59XG5cbmZ1bmN0aW9uIEFydGlzdHNQYWdlKHByb3BzKSB7IC8vbWFwcGluZyBlYWNoIGNhcmQgaW5kaXZpZHVhbGx5IGZyb20gYXJ0aXN0TGlzdFxuICBjb25zb2xlLmxvZygnQXBwIHByb3BzJywgcHJvcHMpO1xuICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cInBhZ2UtdGl0bGVcIj5BcnRpc3RzPC9oMT5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b25cIiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgcHJvcHMub3RoZXJQYWdlKCdmYXZvcml0ZXMnKTtcbiAgICAgICAgICB9fT5cbiAgICAgICAgICBGYXZvcml0ZXNcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtY2FyZHNcIj5cbiAgICAgICAgICB7cHJvcHMudmFsdWUuQXJ0aXN0TGlzdC5tYXAoKGFydGlzdCwgaW5kZXgpID0+XG4gICAgICAgICAgICA8QXJ0aXN0Q2FyZHMgYXJ0aXN0PXsgYXJ0aXN0IH0ga2V5PXsgaW5kZXggfSBoYW5kbGVDYXJkQ2xpY2s9e3Byb3BzLmhhbmRsZUNhcmRDbGlja30gaGFuZGxlSGVhcnRUb2dnbGU9e3Byb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gIClcbn1cblxubGV0IEFydGlzdENhcmRzID0gKHByb3BzKSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwiYXJ0aXN0LWNhcmQtZW50cnlcIj5cbiAgICA8ZGl2PlxuICAgICAgPGltZyBzcmM9e3Byb3BzLmFydGlzdC5pbWFnZVVSTH0+PC9pbWc+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJoZWFydC1pY29uXCIgb25DbGljaz17ICgpID0+IHByb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlKHByb3BzLmFydGlzdCkgfT5cbiAgICAgIDxGb250QXdlc29tZUljb24gaWNvbj17ZmFIZWFydH0gc2l6ZT1cIjJ4XCIgLz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gICk7XG5cbmZ1bmN0aW9uIEZhdm9yaXRlc1BhZ2UocHJvcHMpIHsgLy9yZW5kZXIgZWFjaCBsaW5rIGZyb20gZmF2b3JpdGVzTGlzdCB3L21hcCBmdW5jXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgIDxoMSBjbGFzc05hbWU9XCJwYWdlLXRpdGxlXCI+RmF2b3JpdGVzPC9oMT5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgcHJvcHMub3RoZXJQYWdlKCdhcnRpc3RzJyk7XG4gICAgICAgIH19PlxuICAgICAgICBBcnRpc3RzXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtbGlua3NcIj5cbiAgICAgICAge3Byb3BzLkFydGlzdExpc3QubWFwKChhcnRpc3QpID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj57YXJ0aXN0Lm5hbWUsIGFydGlzdC5hcnRpc3RMaW5rfTwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmNvbnN0IEFydGlzdExpc3QgPSBbXG4gIHtcbiAgICBuYW1lOiAnbGV0aGEgd2lsc29uJyxcbiAgICBpbWFnZVVSTDogJ2h0dHBzOi8vd3d3LmxldGhhcHJvamVjdHMuY29tL3Zpc3VhbHMvaW1hZ2VzL291dGRvb3JzL2dob3N0b2ZhdHJlZS1yaWdodC12aWV3LmpwZycsXG4gICAgYXJ0aXN0TGluazogXCJodHRwczovL3d3dy5sZXRoYXByb2plY3RzLmNvbVwiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnZ2VuZXNpcyBiYWV6JyxcbiAgICBpbWFnZVVSTDogJ2h0dHA6Ly9tZWRpYS52aXJiY2RuLmNvbS9jZG5faW1hZ2VzL3Jlc2l6ZV8xNjAweDE2MDAvMjMvYWMxNzE4Yjc0NTk2NWFlZC1CYWV6XzEuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHA6Ly93d3cuZ2VuZXNpc2JhZXouY29tL1wiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnc2FyYWgtbG91aXNlIGJhcmJldHQnLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly9haXNzZWxsZXMuZmlsZXMud29yZHByZXNzLmNvbS8yMDEwLzEyL2ltZ18wMDE2LmpwZz93PTExMDQnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cHM6Ly9haXNzZWxsZXMuZmlsZXMud29yZHByZXNzLmNvbVwiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnamVzc2ljYSBoYWxvbmVuJyxcbiAgICBpbWFnZVVSTDogJ2h0dHA6Ly93d3cuamVzc2ljYWhhbG9uZW4uY29tL2ZpbGVzL2dpbWdzLzQ0X3NwbGljZWQtYnJhbmNoLWJhbGwtMS5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cDovL3d3dy5qZXNzaWNhaGFsb25lbi5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2xhdXJhIG93ZW5zJyxcbiAgICBpbWFnZVVSTDogJ2h0dHBzOi8vd3d3Lm93ZW5zbGF1cmEuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDEzLzAxL0hRLTE2TE85MzU5UC1VbnRpdGxlZC5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cHM6Ly93d3cub3dlbnNsYXVyYS5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2RlYm9yYWggcm9iZXJ0cycsXG4gICAgaW1hZ2VVUkw6ICdodHRwczovL2kwLndwLmNvbS9jb25mbGljdG9maW50ZXJlc3R0eC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTcvMDcvVGhlLVBvd2VyLWRhbmNlLTMweDIyLTIwMTcuanBlZz93PTQ2OScsXG4gICAgYXJ0aXN0TGluazogXCJodHRwOi8vd3d3LmRlYm9yYWhyb2JlcnRzYXJ0LmNvbS9cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2FuYSBlc3RldmUgbGxvcmVucycsXG4gICAgaW1hZ2VVUkw6ICdodHRwOi8vd3d3LmFuYWVzdGV2ZWxsb3JlbnMuY29tL3Byb2plY3RzL3Byb2plY3Q2LzA3JTIwUXVhc3klMjBJbmZpbml0ZS5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cDovL3d3dy5hbmFlc3RldmVsbG9yZW5zLmNvbVwiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnamFja2llIGZ1cnRhZG8nLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2FydGZhcmUtcHJvZHVjdGlvbi1tb2JpbGUvQXJ0d29ya3MvSW1hZ2VzL0ltYWdlLTEvaW1hZ2UtMS1kNjdiMDYxNi0wNzdiLTRmZWUtOTdiZS0yNzVlNGRkZTYxMDcuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHBzOi8vamFja2llZnVydGFkby5jb20vXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICd2aXZpYW5lIHNhc3NlbicsXG4gICAgaW1hZ2VVUkw6ICdodHRwczovL3d3dy52aXZpYW5lc2Fzc2VuLmNvbS9zaXRlL2Fzc2V0cy9maWxlcy8yOTQwL3VtYnJhX25hYl92c18zOTQyLjB4MTUwMC5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cHM6Ly93d3cudml2aWFuZXNhc3Nlbi5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9XG5dO1xuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcblxuXG5cblxuXG5cbi8vIFJlYWN0RE9NLnJlbmRlcihcbi8vICAgPEFwcCAvPixcbi8vICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuLy8gKTtcblxuXG4vLyBsZXQgQXJ0aXN0TGlua3MgPSAocHJvcHMpID0+IHtcblxuLy8gfVxuXG57LyogPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FyZENsaWNrfT5cbiAge3Byb3BzLnZhbHVlLmlzQ2FyZENsaWNrZWQgPyAnJyA6ICcnfVxuPC9pbnB1dD4gKi99XG5cbiAvLyBsZXQgTGlzdEFydGlzdHMgPSAocHJvcHMpID0+IChcbiAgLy8gICA8ZGl2IGNsYXNzTmFtZT1cImlubmVyLWNvbnRhaW5lclwiIGlkPVwiYXJ0aXN0LWNhcmRzXCI+XG4gIC8vICAgICB7cHJvcHMudmFsdWUuQXJ0aXN0TGlzdC5tYXAoKGFydGlzdCwgaW5kZXgpID0+XG4gIC8vICAgICAgIDxBcnRpc3RDYXJkcyBhcnRpc3Q9eyBhcnRpc3QgfSBrZXk9eyBpbmRleCB9IGhhbmRsZUNhcmRDbGljaz17dGhpcy5oYW5kbGVDYXJkQ2xpY2t9IGhhbmRsZUhlYXJ0VG9nZ2xlPXt0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlfSAvPlxuICAvLyAgICAgKX1cbiAgLy8gICA8L2Rpdj5cbiAgLy8gKTtcblxuICAvLyBvbkNsaWNrPXsgKCkgPT4gcHJvcHMuaGFuZGxlSGVhcnRUb2dnbGUocHJvcHMuYXJ0aXN0KSB9IC8vcHJvcHMudmFsdWUuaXNIZWFydEZpbGxlZFxuXG4gIC8vb25DbGljaz17dGhpcy5oYW5kbGVIZWFydFRvZ2dsZX1cblxuICAvLyA8ZGl2PlxuICAvLyAgICAgICAgICAgPGltZyBzcmM9e2FydGlzdC5pbWFnZVVSTH0ga2V5PXsgaW5kZXggfT48L2ltZz5cblxuICAvLyAgICAgICAgICAgey8qIDxGb250QXdlc29tZUljb24gaWNvbj17ZmFIZWFydH0gc2l6ZT1cIjJ4XCIgLz4gKi99XG4gIC8vICAgICAgICAgICA8L2Rpdj5cbiAgLy8gICAgICAgICApXG4gIC8vICAgICAgICAgKX1cblxuICAvLyAgICAgICAgIHsvKiA8aW5wdXQgb25DbGljaz17dGhpcy5oYW5kbGVIZWFydFRvZ2dsZX0+XG4gIC8vICAgICAgICAgICB7cHJvcHMudmFsdWUuaXNIZWFydEZpbGxlZCA/IDxkaXYgY2xhc3NOYW1lPVwiaGVhcnRcIj48YSBocmVmPVwiI1wiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWhlYXJ0IGZhLTJ4XCI+PC9pPjwvYT48L2Rpdj4gOiA8ZGl2IGNsYXNzTmFtZT1cImhlYXJ0XCI+PGEgaHJlZj1cIiNcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFydC1vIGZhLTJ4XCI+PC9pPjwvYT48L2Rpdj59XG4gIC8vICAgICAgICAgPC9pbnB1dD4gKi99XG5cblxuLy8gZ2V0QXJ0aXN0c1BhZ2UoKSB7XG4vLyAgIGZldGNoKCcvJywge1xuLy8gICAgIG1ldGhvZDogJ0dFVCdcbi8vICAgfSk7XG4vLyB9XG4vLyBnZXRMaWtlZEFydGlzdHMoKSB7XG4vLyAgIC8vbGV0IGRhdGEgPSB7IGxpa2VkQXJ0aXN0cyB9OyAvL3RoaXMuc3RhdGUubGlrZWRBcnRpc3RzP1xuLy8gICAvL2NvbnNvbGUubG9nKCdsaWtlZEFydGlzdHM6ICcsIGxpa2VkQXJ0aXN0cyk7XG4vLyAgIGZldGNoKCcvYXJ0aXN0cycsIHtcbi8vICAgICBtZXRob2Q6ICdHRVQnXG4vLyAgIH0pXG4vLyAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuLy8gICAgIC50aGVuKGRhdGEgPT4ge1xuLy8gICAgICAgdGhpcy5zZXRTdGF0ZSh7bGlrZWRBcnRpc3RzOiBkYXRhfSlcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaChlcnIgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coJ2Vycm9yIGdldHRpbmcgbGlrZWQgYXJ0aXN0cycsIGVycik7XG4vLyAgICAgfSk7XG4vLyB9XG4vLyBjb21wb25lbnREaWRNb3VudCgpIHtcbi8vICAgdGhpcy5wb3N0TGlrZWRBcnRpc3RzKCk7XG4vLyB9XG4vLyBwb3N0TGlrZWRBcnRpc3RzKGRhdGEpIHsgLy9wYXNzIGluIGNhbGxiYWNrLCB0aGVuIGNhbGwgdy9kYXRhIG9yIGRhdGEucmVzdWx0IHdoZW4gaGFuZGxpbmcgcmVzP1xuLy8gICBmZXRjaCgnL2FydGlzdHMnLCB7XG4vLyAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuLy8gICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4vLyAgIH0pXG4vLyAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKSAgLy9wYXJzZXMgdGhlIHJlc3BvbnNlIGFzIEpTT05cbi8vICAgICBjb25zb2xlLmxvZygncmVzcG9uc2U6ICcsIHJlcyk7XG4vLyAgIC50aGVuKGRhdGEgPT4gY29uc29sZS5sb2coJ3N1Y2Nlc3M6ICcsIGRhdGEpKVxuLy8gICAuY2F0Y2goZXJyID0+IHtcbi8vICAgICBjb25zb2xlLmxvZygnZXJyb3IgcG9zdGluZyBsaWtlZCBhcnRpc3RzOiAnLCBlcnIpO1xuLy8gICB9KTtcbi8vIH1cblxuLy8gZnVuY3Rpb24gVG9nZ2xlSGVhcnQocHJvcHMpIHtcbi8vICAgcmV0dXJuIChcbi8vICAgICAvL29uQ2xpY2s9e3RoaXMuaGFuZGxlSGVhcnRDbGlja31cbi8vICAgICA8aW5wdXQgb25DbGljaz17KGUpID0+IHtcbi8vICAgICAgIGUucHJldmVudGRlZmF1bHQoKTtcbi8vICAgICAgIHByb3BzLmlzSGVhcnRGaWxsZWQgPyAnZmEgZmEtaGVhcnQgZmEtMngnIDogJ2ZhIGZhLWhlYXJ0LW8gZmEtMngnO1xuLy8gICAgICAgLy9wdXNoIGFydGlzdHMgaW50byBsaWtlZEFydGlzdHNcbi8vICAgICAgIC8vcG9zdCB0byBkYiAtLT4gcGFzcyBpbiBhcnRpc3RzIHdob3NlIGhlYXJ0cyBhcmUgZmlsbGVkLWluXG4vLyAgICAgICAvL2lmIChwcm9wcy5pc0hlYXJ0RmlsbGVkID09PSB0cnVlKSwgJ2ZhIGZhLWhlYXJ0IGZhLTJ4JywgcG9zdFxuLy8gICAgICAgcHJvcHMucG9zdExpa2VkQXJ0aXN0cygpO1xuLy8gICAgIH19PlxuLy8gICAgIDwvaW5wdXQ+XG4vLyAgICk7XG4vLyB9XG4vLyBjbGFzcyBUb2dnbGVIZWFydCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4vLyAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4vLyAgICAgc3VwZXIocHJvcHMpO1xuLy8gICAgIHRoaXMuc3RhdGUgPSB7aXNIZWFydEZpbGxlZDogJ2ZhbHNlJ307XG4vLyAgICAgdGhpcy5oYW5kbGVIZWFydENsaWNrID0gdGhpcy5oYW5kbGVIZWFydENsaWNrLmJpbmQodGhpcyk7XG4vLyAgIH1cbi8vICAgaGFuZGxlSGVhcnRDbGljaygpIHtcbi8vICAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+ICh7XG4vLyAgICAgICBpc0hlYXJ0RmlsbGVkOiAhc3RhdGUuaXNIZWFydEZpbGxlZFxuLy8gICAgIH0pKTtcbi8vICAgfVxuLy8gICByZW5kZXIoKSB7XG4vLyAgICAgcmV0dXJuIChcbi8vICAgICAgIDxpbnB1dCBvbkNsaWNrPXt0aGlzLmhhbmRsZUhlYXJ0Q2xpY2t9PlxuLy8gICAgICAgICB7dGhpcy5zdGF0ZS5pc0hlYXJ0RmlsbGVkID8gJ2ZhIGZhLWhlYXJ0IGZhLTJ4JyA6ICdmYSBmYS1oZWFydC1vIGZhLTJ4J31cbi8vICAgICAgIDwvaW5wdXQ+XG4vLyAgICAgKTtcbi8vICAgfVxuLy8gfVxuXG4vLyBwb3N0TGlrZWRBcnRpc3RzKCkgeyAvL25vdCBmcm9udCBlbmQgZXZlbnQsIHNvIGNhbid0IHVzZSBlXG4vLyAgIC8vZS5wcmV2ZW50ZGVmYXVsdCgpO1xuLy8gICAgIGZldGNoKCcvZmF2b3JpdGVzJywge1xuLy8gICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4vLyAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4vLyAgICAgICAgIEFydGlzdExpc3Q6IHRoaXMuc3RhdGUuQXJ0aXN0TGlzdFxuLy8gICAgICAgfSlcbi8vICAgICB9KVxuLy8gICAgIC50aGVuKHJlcyA9PiB7XG4vLyAgICAgICAvL2NvbnNvbGUubG9nKCdyZXNwb25zZTogJywgcmVzKTtcbi8vICAgICAgIC8vbGV0IHBhcnNlZFJlcSA9IEpTT04ucGFyc2UocmVxLmJvZHkpO1xuLy8gICAgICAgcmVzLmpzb24oKTtcbi8vICAgICAgIC8vSlNPTi5wYXJzZSAtLT4gaXMgaXQgYWxyZWFkeSBwYXJzZWQgYmVjdWFzZSBvZiBib2R5UGFyc2VyP1xuLy8gICAgIH0pXG4vLyAgICAgLnRoZW4oZGF0YSA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzczogJywgZGF0YSk7XG4vLyAgICAgfSlcbi8vICAgICAuY2F0Y2goZXJyID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBwb3N0aW5nIGxpa2VkIGFydGlzdHM6ICcsIGVycik7XG4vLyAgICAgfSlcbi8vICAgfVxuXG4vLyBjbGFzcyBBcnRpc3RDYXJkcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4vLyAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4vLyAgICAgc3VwZXIocHJvcHMpO1xuLy8gICAgIHRoaXMuc3RhdGUgPSB7XG4vLyAgICAgICBpc0NhcmRDbGlja2VkOiBmYWxzZSxcbi8vICAgICAgIGFydGlzdFVSTDogJydcbi8vICAgICB9O1xuLy8gICAgIHRoaXMuaGFuZGxlQ2FyZENsaWNrID0gdGhpcy5oYW5kbGVDYXJkQ2xpY2suYmluZCh0aGlzKTtcbi8vICAgfVxuLy8gICBoYW5kbGVDYXJkQ2xpY2soZSkge1xuLy8gICAgIGUucHJldmVudGRlZmF1bHQoKTtcbi8vICAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+ICh7XG4vLyAgICAgICBpc0NhcmRDbGlja2VkOiAhc3RhdGUuaXNDYXJkQ2xpY2tlZFxuLy8gICAgIH0pKTtcbi8vICAgfVxuLy8gICByZW5kZXIoKSB7XG4vLyAgICAgcmV0dXJuIChcbi8vICAgICAgIDxpbnB1dCBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhcmRDbGlja30+XG4vLyAgICAgICAgIHt0aGlzLnN0YXRlLmlzQ2FyZENsaWNrZWQgPyAnJyA6ICcnfVxuLy8gICAgICAgPC9pbnB1dD5cbi8vICAgICApO1xuLy8gICB9XG4vLyB9XG5cbi8vIHtwcm9wcy52YWx1ZS5hcnRpc3RMaXN0Lm1hcChhcnRpc3QsIChhcnRpc3QsIGluZGV4KSA9PiB7IC8vZWxlbWVudCwgdGhlbiBmdW5jIHJ1biBvbiBlYWNoIGVsXG4vLyAgIHJldHVybiA8YXJ0aXN0TGlzdCBhcnRpc3Q9eyBhcnRpc3QgfSBrZXk9eyBpbmRleCB9IGhhbmRsZUhlYXJ0VG9nZ2xlPXtwcm9wcy5oYW5kbGVIZWFydFRvZ2dsZX0gLz47XG4vLyB9KX1cblxuLy8ge3Byb3BzLmFydGlzdExpc3QubWFwKGFydGlzdCwgKGFydGlzdCwgaW5kZXgpID0+IHtcbi8vICAgcmV0dXJuIDxBcnRpc3RMaXN0IGFydGlzdD17IGFydGlzdCB9IGtleT17IGluZGV4IH0gLz47XG4vLyB9KX1cblxuLy9sZXQgcGFyc2VkUmVxID0gSlNPTi5wYXJzZShyZXEuYm9keSk7XG5cblxuLy8gZnVuY3Rpb24gV2VsY29tZShwcm9wcykge1xuLy8gICByZXR1cm4gPGgxPkhlbGxvLCB7cHJvcHMubmFtZX08L2gxPjtcbi8vIH1cblxuLy8gY29uc3QgZWxlbWVudCA9IDxXZWxjb21lIG5hbWU9XCJTYXJhXCIgLz47XG5cblxuLy8gUmVhY3RET00ucmVuZGVyKFxuLy8gICBlbGVtZW50LFxuLy8gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXG4vLyApO1xuXG5cbnsvKiA8ZGl2IGNsYXNzTmFtZT1cImlubmVyLWNvbnRhaW5lclwiIGlkPVwiYXJ0aXN0LWNhcmRzXCI+XG57cHJvcHMudmFsdWUuQXJ0aXN0TGlzdC5tYXAoKGFydGlzdCkgPT4gIC8vZWxlbWVudCwgdGhlbiBmdW5jIHJ1biBvbiBlYWNoIGVsXG4gIDxkaXY+e2FydGlzdC5pbWFnZVVSTH08ZGl2Lz5cbil9XG48aW5wdXQgb25DbGljaz17dGhpcy5oYW5kbGVIZWFydFRvZ2dsZX0+XG4gIHtwcm9wcy52YWx1ZS5pc0hlYXJ0RmlsbGVkID8gPGRpdiBjbGFzc05hbWU9XCJoZWFydFwiPjxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQgZmEtMnhcIj48L2k+PC9hPjwvZGl2PiA6IDxkaXYgY2xhc3NOYW1lPVwiaGVhcnRcIj48YSBocmVmPVwiI1wiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWhlYXJ0LW8gZmEtMnhcIj48L2k+PC9hPjwvZGl2Pn1cbjwvaW5wdXQ+XG48L2Rpdj4gKi99XG5cbnsvKiA8ZGl2IGNsYXNzTmFtZT1cImlubmVyLWNvbnRhaW5lclwiIGlkPVwiYXJ0aXN0LWNhcmRzXCI+XG57cHJvcHMudmFsdWUuQXJ0aXN0TGlzdC5tYXAoKGFydGlzdCwgaW5kZXgpID0+IChcbiAgPGRpdj5cbiAgPGltZyBzcmM9e2FydGlzdC5pbWFnZVVSTH0ga2V5PXsgaW5kZXggfT48L2ltZz5cblxuICB7LyogPEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYUhlYXJ0fSBzaXplPVwiMnhcIiAvPiAqL31cbi8vICAgPC9kaXY+XG4vLyApXG4vLyApfVxuXG57LyogPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlSGVhcnRUb2dnbGV9PlxuICB7cHJvcHMudmFsdWUuaXNIZWFydEZpbGxlZCA/IDxkaXYgY2xhc3NOYW1lPVwiaGVhcnRcIj48YSBocmVmPVwiI1wiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWhlYXJ0IGZhLTJ4XCI+PC9pPjwvYT48L2Rpdj4gOiA8ZGl2IGNsYXNzTmFtZT1cImhlYXJ0XCI+PGEgaHJlZj1cIiNcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFydC1vIGZhLTJ4XCI+PC9pPjwvYT48L2Rpdj59XG48L2lucHV0PiAqL31cbi8vIDwvZGl2PiAqL31cblxuIl19