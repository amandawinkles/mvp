import React from 'react';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'artists',
      ArtistList: ArtistList,
      isCardClicked: false,
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

  handleHeartToggle(ArtistList, artist) {
    console.log('🦋 artist: ', artist); //if artist.isLiked === true, postLikedArtists, else delete artist

    if (artist.isLiked === false) {
      artist.isLiked = true;
    } else {
      artist.isLiked = false;
    }

    let copyList = ArtistList.slice();
    console.log('🐯 copyList: ', copyList);
    artist = copyList[artist];

    function handler(e) {
      e.preventdefault();
      this.setState(state => ({
        ArtistList: copyList
      }));
    }

    console.log('artist list after state: ', ArtistList);
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
    if (this.state.page === 'artists') {
      //buttonClick={this.handleButtonClick}
      return /*#__PURE__*/React.createElement(ArtistsPage, {
        value: this.state,
        otherPage: this.otherPage,
        postArtists: this.postLikedArtists,
        handleHeartToggle: this.handleHeartToggle,
        handleCardClick: this.handleCardClick
      });
    } else {
      //buttonClick={this.handleButtonClick}
      //handle link click?
      return /*#__PURE__*/React.createElement(FavoritesPage, {
        value: this.state,
        otherPage: this.otherPage
      });
    }
  }

} //mapping each card individually from artistList


function ArtistsPage(props) {
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

function ArtistCards(props) {
  console.log('props from ArtistCards 🦊', props);
  return /*#__PURE__*/React.createElement("div", {
    className: "artist-card-entry"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: props.artist.imageURL
  })), /*#__PURE__*/React.createElement("div", {
    className: "heart-icon",
    onClick: e => props.handleHeartToggle(ArtistList, props.artist)
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faHeart,
    size: "2x"
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
}];
export default App;
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
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
// let ArtistLinks = (props) => {
// }

{
  /* <input onClick={this.handleCardClick}>
   {props.value.isCardClicked ? '' : ''}
  </input> */
} //this.props.handleHeartToggle(this.props.value.isHeartFilled)
//onClick={ () => props.handleHeartToggle(props.artist) }
// let ArtistCards = (props) => (
//   <div className="artist-card-entry">
//     <div>
//       <img src={props.artist.imageURL}></img>
//     </div>
//     <div className="heart-icon" onClick={ () => props.handleHeartToggle(props.artist) }>
//       <FontAwesomeIcon icon={faHeart} size="2x" />
//     </div>
//   </div>
//   );
// let ListArtists = (props) => (
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
// let ArtistCards = (props) => (
//   //console.log('props from ArtistCards 🦊', props)
//   <div className="artist-card-entry">
//     <div>
//       <img src={props.artist.imageURL}></img>
//     </div>
//     <div className="heart-icon" onClick={props.handleHeartClick(props.artist)}>
//       <FontAwesomeIcon icon={faHeart} size="2x" />
//     </div>
//   </div>
//   );
//variable = this.state.ArtistList
//let listState = this.state.ArtistList;
//let modArtistObj = Object.assign({}, artist);
// if (modArtistObj.isLiked === false) {
//   modArtistObj.isLiked = true;
// } else {
//   modArtistObj.isLiked = false;
// }
//copyList[modArtistObj]
//this.state.ArtistList
//console.log(' copyList2: ', copyList);
//modArtistObj = variable[artist]
//let modArtistObj = copyList[artist];
// handleHeartToggle(ArtistList, artist) {
//   console.log(' artist: ', artist);
//   if (artist.isLiked === false) {
//     artist.isLiked = true;
//   } else {
//     artist.isLiked = false;
//   }
//   //modify artist by changing isLiked: true
//     //copy ArtistList array
//       //new array = ArtistList.slice()
//       let copyList = ArtistList.slice();
//       console.log(' copyList: ', copyList);
//       artist = copyList[artist];
//       //map through copyList
//         //if (copyList[index] === modArtistObj)
//   //replace artist toggled w/new modified artist obj
//     //artist = modArtistObj
//     //copyList.filter(artist => artist === modArtistObj)
//     //<ArtistList artistObj={ artist } key={ index } />
//     //<ArtistList artistObj={ artistObj } key={ index } />
//     //map ArtistList, locate artist, set artist = modArtistObj
//     // let newList = copyList.map((artistObj, index) => {
//     //   if (copyList[index] === modArtistObj) {
//     //     return artistObj={ modArtistObj } key={ index };
//     //   } else {
//     //     return artistObj={ artistObj } key={ index };
//     //   }
//     // });
//      //this.setState w/new array for ArtistList
//     //console.log('artist list state: ', ArtistList);
//     function handler(e) {
//       e.preventdefault();
//       this.setState(state => ({ ArtistList: copyList }));
//     }
//     console.log('artist list after state: ', ArtistList);
// }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9BcHAuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiZmFIZWFydCIsImZhckhlYXJ0IiwiRm9udEF3ZXNvbWVJY29uIiwiQXBwIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwicGFnZSIsIkFydGlzdExpc3QiLCJpc0NhcmRDbGlja2VkIiwibGlrZWRBcnRpc3RzIiwiaGFuZGxlQnV0dG9uQ2xpY2siLCJiaW5kIiwib3RoZXJQYWdlIiwiaGFuZGxlQ2FyZENsaWNrIiwiaGFuZGxlSGVhcnRUb2dnbGUiLCJwb3N0TGlrZWRBcnRpc3RzIiwiZSIsInByZXZlbnRkZWZhdWx0Iiwic2V0U3RhdGUiLCJwcmV2U3RhdGUiLCJhcnRpc3QiLCJjb25zb2xlIiwibG9nIiwiaXNMaWtlZCIsImNvcHlMaXN0Iiwic2xpY2UiLCJoYW5kbGVyIiwiZ2V0QXJ0aXN0c1BhZ2UiLCJmZXRjaCIsIm1ldGhvZCIsImNvbXBvbmVudERpZE1vdW50IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJjYXRjaCIsImVyciIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlbmRlciIsIkFydGlzdHNQYWdlIiwidmFsdWUiLCJtYXAiLCJpbmRleCIsIkFydGlzdENhcmRzIiwiaW1hZ2VVUkwiLCJGYXZvcml0ZXNQYWdlIiwibmFtZSIsImFydGlzdExpbmsiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxPQUFULFFBQXdCLG1DQUF4QjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIscUNBQXpCO0FBQ0EsU0FBU0MsZUFBVCxRQUFnQyxnQ0FBaEM7O0FBRUEsTUFBTUMsR0FBTixTQUFrQkosS0FBSyxDQUFDSyxTQUF4QixDQUFrQztBQUNoQ0MsRUFBQUEsV0FBVyxDQUFDQyxLQUFELEVBQVE7QUFDakIsVUFBTUEsS0FBTjtBQUNBLFNBQUtDLEtBQUwsR0FBYTtBQUNYQyxN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RUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQUM7Ozs7Ozs7O0FBT1M7QUFFVjtBQUFDOzs7OztBQUtxRCxDLENBQ3REO0FBQ0E7QUFDQTs7QUFFQTtBQUFDOzs7QUFFVyxDLENBQ1o7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDUTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZmFIZWFydCB9IGZyb20gXCJAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnNcIjtcbmltcG9ydCB7IGZhckhlYXJ0IH0gZnJvbSBcIkBmb3J0YXdlc29tZS9mcmVlLXJlZ3VsYXItc3ZnLWljb25zXCI7XG5pbXBvcnQgeyBGb250QXdlc29tZUljb24gfSBmcm9tIFwiQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lXCI7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwYWdlOiAnYXJ0aXN0cycsXG4gICAgICBBcnRpc3RMaXN0OiBBcnRpc3RMaXN0LFxuICAgICAgaXNDYXJkQ2xpY2tlZDogZmFsc2UsXG4gICAgICBsaWtlZEFydGlzdHM6IFtdXG4gICAgfTtcbiAgICB0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrID0gdGhpcy5oYW5kbGVCdXR0b25DbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMub3RoZXJQYWdlID0gdGhpcy5vdGhlclBhZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUNhcmRDbGljayA9IHRoaXMuaGFuZGxlQ2FyZENsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVIZWFydFRvZ2dsZSA9IHRoaXMuaGFuZGxlSGVhcnRUb2dnbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnBvc3RMaWtlZEFydGlzdHMgPSB0aGlzLnBvc3RMaWtlZEFydGlzdHMuYmluZCh0aGlzKTtcbiAgfVxuICBoYW5kbGVCdXR0b25DbGljayhlKSB7XG4gICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbiAgICAgIHBhZ2U6ICFzdGF0ZS5wYWdlXG4gICAgfSkpO1xuICB9XG4gIG90aGVyUGFnZShvdGhlclBhZ2UpIHtcbiAgICB0aGlzLnNldFN0YXRlKHByZXZTdGF0ZSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYWdlOiBvdGhlclBhZ2VcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGhhbmRsZUNhcmRDbGljayhlKSB7XG4gICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbiAgICAgIGlzQ2FyZENsaWNrZWQ6ICFzdGF0ZS5pc0NhcmRDbGlja2VkXG4gICAgfSkpO1xuICB9XG4gIGhhbmRsZUhlYXJ0VG9nZ2xlKEFydGlzdExpc3QsIGFydGlzdCkge1xuICAgIGNvbnNvbGUubG9nKCfwn6aLIGFydGlzdDogJywgYXJ0aXN0KTtcbiAgICAvL2lmIGFydGlzdC5pc0xpa2VkID09PSB0cnVlLCBwb3N0TGlrZWRBcnRpc3RzLCBlbHNlIGRlbGV0ZSBhcnRpc3RcbiAgICBpZiAoYXJ0aXN0LmlzTGlrZWQgPT09IGZhbHNlKSB7XG4gICAgICBhcnRpc3QuaXNMaWtlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFydGlzdC5pc0xpa2VkID0gZmFsc2U7XG4gICAgfVxuICAgIGxldCBjb3B5TGlzdCA9IEFydGlzdExpc3Quc2xpY2UoKTtcbiAgICBjb25zb2xlLmxvZygn8J+QryBjb3B5TGlzdDogJywgY29weUxpc3QpO1xuICAgIGFydGlzdCA9IGNvcHlMaXN0W2FydGlzdF07XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHsgQXJ0aXN0TGlzdDogY29weUxpc3QgfSkpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZygnYXJ0aXN0IGxpc3QgYWZ0ZXIgc3RhdGU6ICcsIEFydGlzdExpc3QpO1xuICB9XG4gIGdldEFydGlzdHNQYWdlKCkge1xuICAgIGZldGNoKCcvJywge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGZldGNoKCcvYXJ0aXN0cycsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfwn5GYIGRhdGEgaW4gR0VUOiAnLCBkYXRhKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bGlrZWRBcnRpc3RzOiBkYXRhfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIGdldHRpbmcgbGlrZWQgYXJ0aXN0cycsIGVycik7XG4gICAgICB9KTtcbiAgfVxuICBwb3N0TGlrZWRBcnRpc3RzKGRhdGEpIHsgLy9wYXNzIGluIGNhbGxiYWNrLCB0aGVuIGNhbGwgdy9kYXRhIG9yIGRhdGEucmVzdWx0IHdoZW4gaGFuZGxpbmcgcmVzP1xuICAgIGNvbnNvbGUubG9nKCfwn6e2IGRhdGEgaW4gUE9TVDogJywgZGF0YSk7XG4gICAgZGF0YSA9IHtsaWtlZEFydGlzdHM6IHRoaXMuc3RhdGUubGlrZWRBcnRpc3RzfTtcbiAgICBmZXRjaCgnL2FydGlzdHMnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgfSlcbiAgICAvLyAudGhlbihyZXMgPT4gcmVzLmpzb24oKSkgIC8vcGFyc2VzIHRoZSByZXNwb25zZSBhcyBKU09OXG4gICAgLy8gICBjb25zb2xlLmxvZygncmVzcG9uc2U6ICcsIHJlcyk7XG4gICAgLy8gLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZygnc3VjY2VzczogJywgZGF0YSkpXG4gICAgLy8gLmNhdGNoKGVyciA9PiB7XG4gICAgLy8gICBjb25zb2xlLmxvZygnZXJyb3IgcG9zdGluZyBsaWtlZCBhcnRpc3RzOiAnLCBlcnIpO1xuICAgIC8vIH0pO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSAnYXJ0aXN0cycpIHtcbiAgICAgIC8vYnV0dG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9uQ2xpY2t9XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxBcnRpc3RzUGFnZSB2YWx1ZT17dGhpcy5zdGF0ZX0gb3RoZXJQYWdlPXt0aGlzLm90aGVyUGFnZX0gcG9zdEFydGlzdHM9e3RoaXMucG9zdExpa2VkQXJ0aXN0c30gaGFuZGxlSGVhcnRUb2dnbGU9e3RoaXMuaGFuZGxlSGVhcnRUb2dnbGV9IGhhbmRsZUNhcmRDbGljaz17dGhpcy5oYW5kbGVDYXJkQ2xpY2t9IC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL2J1dHRvbkNsaWNrPXt0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrfVxuICAgICAgLy9oYW5kbGUgbGluayBjbGljaz9cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGYXZvcml0ZXNQYWdlIHZhbHVlPXt0aGlzLnN0YXRlfSBvdGhlclBhZ2U9e3RoaXMub3RoZXJQYWdlfSAvPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuLy9tYXBwaW5nIGVhY2ggY2FyZCBpbmRpdmlkdWFsbHkgZnJvbSBhcnRpc3RMaXN0XG5mdW5jdGlvbiBBcnRpc3RzUGFnZShwcm9wcykge1xuICBjb25zb2xlLmxvZygnQXBwIHByb3BzJywgcHJvcHMpO1xuICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cInBhZ2UtdGl0bGVcIj5BcnRpc3RzPC9oMT5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b25cIiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgcHJvcHMub3RoZXJQYWdlKCdmYXZvcml0ZXMnKTtcbiAgICAgICAgICB9fT5cbiAgICAgICAgICBGYXZvcml0ZXNcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtY2FyZHNcIj5cbiAgICAgICAgICB7cHJvcHMudmFsdWUuQXJ0aXN0TGlzdC5tYXAoKGFydGlzdCwgaW5kZXgpID0+XG4gICAgICAgICAgICA8QXJ0aXN0Q2FyZHMgYXJ0aXN0PXsgYXJ0aXN0IH0ga2V5PXsgaW5kZXggfSBoYW5kbGVDYXJkQ2xpY2s9e3Byb3BzLmhhbmRsZUNhcmRDbGlja30gaGFuZGxlSGVhcnRUb2dnbGU9e3Byb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gIClcbn1cblxuZnVuY3Rpb24gQXJ0aXN0Q2FyZHMocHJvcHMpIHtcbiAgY29uc29sZS5sb2coJ3Byb3BzIGZyb20gQXJ0aXN0Q2FyZHMg8J+miicsIHByb3BzKVxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYXJ0aXN0LWNhcmQtZW50cnlcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxpbWcgc3JjPXtwcm9wcy5hcnRpc3QuaW1hZ2VVUkx9PjwvaW1nPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYXJ0LWljb25cIiBvbkNsaWNrPXsoZSkgPT4gKHByb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlKEFydGlzdExpc3QsIHByb3BzLmFydGlzdCkpfT5cbiAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgPEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYUhlYXJ0fSBzaXplPVwiMnhcIiAvPlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbiAgfVxuXG5mdW5jdGlvbiBGYXZvcml0ZXNQYWdlKHByb3BzKSB7IC8vcmVuZGVyIGVhY2ggbGluayBmcm9tIGZhdm9yaXRlc0xpc3Qgdy9tYXAgZnVuY1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICA8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPkZhdm9yaXRlczwvaDE+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvblwiIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgIHByb3BzLm90aGVyUGFnZSgnYXJ0aXN0cycpO1xuICAgICAgICB9fT5cbiAgICAgICAgQXJ0aXN0c1xuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubmVyLWNvbnRhaW5lclwiIGlkPVwiYXJ0aXN0LWxpbmtzXCI+XG4gICAgICAgIHtwcm9wcy5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+e2FydGlzdC5uYW1lLCBhcnRpc3QuYXJ0aXN0TGlua308L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5jb25zdCBBcnRpc3RMaXN0ID0gW1xuICB7XG4gICAgbmFtZTogJ2xldGhhIHdpbHNvbicsXG4gICAgaW1hZ2VVUkw6ICdodHRwczovL3d3dy5sZXRoYXByb2plY3RzLmNvbS92aXN1YWxzL2ltYWdlcy9vdXRkb29ycy9naG9zdG9mYXRyZWUtcmlnaHQtdmlldy5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cHM6Ly93d3cubGV0aGFwcm9qZWN0cy5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2dlbmVzaXMgYmFleicsXG4gICAgaW1hZ2VVUkw6ICdodHRwOi8vbWVkaWEudmlyYmNkbi5jb20vY2RuX2ltYWdlcy9yZXNpemVfMTYwMHgxNjAwLzIzL2FjMTcxOGI3NDU5NjVhZWQtQmFlel8xLmpwZycsXG4gICAgYXJ0aXN0TGluazogXCJodHRwOi8vd3d3LmdlbmVzaXNiYWV6LmNvbS9cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ3NhcmFoLWxvdWlzZSBiYXJiZXR0JyxcbiAgICBpbWFnZVVSTDogJ2h0dHBzOi8vYWlzc2VsbGVzLmZpbGVzLndvcmRwcmVzcy5jb20vMjAxMC8xMi9pbWdfMDAxNi5qcGc/dz0xMTA0JyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHBzOi8vYWlzc2VsbGVzLmZpbGVzLndvcmRwcmVzcy5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2plc3NpY2EgaGFsb25lbicsXG4gICAgaW1hZ2VVUkw6ICdodHRwOi8vd3d3Lmplc3NpY2FoYWxvbmVuLmNvbS9maWxlcy9naW1ncy80NF9zcGxpY2VkLWJyYW5jaC1iYWxsLTEuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHA6Ly93d3cuamVzc2ljYWhhbG9uZW4uY29tXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdsYXVyYSBvd2VucycsXG4gICAgaW1hZ2VVUkw6ICdodHRwczovL3d3dy5vd2Vuc2xhdXJhLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxMy8wMS9IUS0xNkxPOTM1OVAtVW50aXRsZWQuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHBzOi8vd3d3Lm93ZW5zbGF1cmEuY29tXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdkZWJvcmFoIHJvYmVydHMnLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly9pMC53cC5jb20vY29uZmxpY3RvZmludGVyZXN0dHguY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE3LzA3L1RoZS1Qb3dlci1kYW5jZS0zMHgyMi0yMDE3LmpwZWc/dz00NjknLFxuICAgIGFydGlzdExpbms6IFwiaHR0cDovL3d3dy5kZWJvcmFocm9iZXJ0c2FydC5jb20vXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdhbmEgZXN0ZXZlIGxsb3JlbnMnLFxuICAgIGltYWdlVVJMOiAnaHR0cDovL3d3dy5hbmFlc3RldmVsbG9yZW5zLmNvbS9wcm9qZWN0cy9wcm9qZWN0Ni8wNyUyMFF1YXN5JTIwSW5maW5pdGUuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHA6Ly93d3cuYW5hZXN0ZXZlbGxvcmVucy5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2phY2tpZSBmdXJ0YWRvJyxcbiAgICBpbWFnZVVSTDogJ2h0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9hcnRmYXJlLXByb2R1Y3Rpb24tbW9iaWxlL0FydHdvcmtzL0ltYWdlcy9JbWFnZS0xL2ltYWdlLTEtZDY3YjA2MTYtMDc3Yi00ZmVlLTk3YmUtMjc1ZTRkZGU2MTA3LmpwZycsXG4gICAgYXJ0aXN0TGluazogXCJodHRwczovL2phY2tpZWZ1cnRhZG8uY29tL1wiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAndml2aWFuZSBzYXNzZW4nLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly93d3cudml2aWFuZXNhc3Nlbi5jb20vc2l0ZS9hc3NldHMvZmlsZXMvMjk0MC91bWJyYV9uYWJfdnNfMzk0Mi4weDE1MDAuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHBzOi8vd3d3LnZpdmlhbmVzYXNzZW4uY29tXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfVxuXTtcblxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG5cblxuLypcbmNvbXBvbmVudHM6XG4xLiBhcHAgLSBldmVyeXRoaW5nIHdpbGwgYmUgcmVuZGVyZWQsIGhlYXJ0VG9nZ2xlLCBidXR0b25DbGljaywgcG9zdExpa2VkQXJ0aXN0cyB0byBkYlxuMi4gcGFnZXMgLSBjb250YWluZXIgY29tcG9uZW50cywgcmVuZGVyIG90aGVyIGNvbXBvbmVudHMgaW5zaWRlXG4zLiBhcnRpc3QgY2FyZHMgLSBtYXBwaW5nIGVhY2ggY2FyZCBpbmRpdmlkdWFsbHkgZnJvbSBhcnRpc3RMaXN0XG40LiBmYXZvcml0ZXMgLSByZW5kZXIgZWFjaCBsaW5rIGZyb20gZmF2b3JpdGVzTGlzdCB3L21hcCBmdW5jXG5cbnJ1bm5pbmcgb3JkZXI6XG4gIC0gY29uc3RydWN0b3IsIHJlbmRlciwgY29tcG9uZW50RGlkTW91bnRcbiovXG5cbi8vPGkgY2xhc3NOYW1lPVwiZmFzIGZhLWhlYXJ0XCIgc2l6ZT1cIjJ4XCI+PC9pPiAvL3NvbGlkXG4vLzxGb250QXdlc29tZUljb24gaWNvbj17ZmFIZWFydH0gc2l6ZT1cIjJ4XCIgLz4gLy9zb2xpZFxuLy88aSBjbGFzc05hbWU9XCJmYXIgZmEtaGVhcnRcIj48L2k+IC8vb3V0bGluZVxuLy88Rm9udEF3ZXNvbWVJY29uIGljb249e1snZmFyJywgJ2hlYXJ0J119IHNpemU9XCIyeFwiIC8+IC8vb3V0bGluZVxuXG5cblxuLy8gUmVhY3RET00ucmVuZGVyKFxuLy8gICA8QXBwIC8+LFxuLy8gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXG4vLyApO1xuXG5cbi8vIGxldCBBcnRpc3RMaW5rcyA9IChwcm9wcykgPT4ge1xuXG4vLyB9XG5cbnsvKiA8aW5wdXQgb25DbGljaz17dGhpcy5oYW5kbGVDYXJkQ2xpY2t9PlxuICB7cHJvcHMudmFsdWUuaXNDYXJkQ2xpY2tlZCA/ICcnIDogJyd9XG48L2lucHV0PiAqL31cblxuLy90aGlzLnByb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlKHRoaXMucHJvcHMudmFsdWUuaXNIZWFydEZpbGxlZClcbi8vb25DbGljaz17ICgpID0+IHByb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlKHByb3BzLmFydGlzdCkgfVxuXG4vLyBsZXQgQXJ0aXN0Q2FyZHMgPSAocHJvcHMpID0+IChcbi8vICAgPGRpdiBjbGFzc05hbWU9XCJhcnRpc3QtY2FyZC1lbnRyeVwiPlxuLy8gICAgIDxkaXY+XG4vLyAgICAgICA8aW1nIHNyYz17cHJvcHMuYXJ0aXN0LmltYWdlVVJMfT48L2ltZz5cbi8vICAgICA8L2Rpdj5cbi8vICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYXJ0LWljb25cIiBvbkNsaWNrPXsgKCkgPT4gcHJvcHMuaGFuZGxlSGVhcnRUb2dnbGUocHJvcHMuYXJ0aXN0KSB9PlxuLy8gICAgICAgPEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYUhlYXJ0fSBzaXplPVwiMnhcIiAvPlxuLy8gICAgIDwvZGl2PlxuLy8gICA8L2Rpdj5cbi8vICAgKTtcblxuIC8vIGxldCBMaXN0QXJ0aXN0cyA9IChwcm9wcykgPT4gKFxuICAvLyAgIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtY2FyZHNcIj5cbiAgLy8gICAgIHtwcm9wcy52YWx1ZS5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0LCBpbmRleCkgPT5cbiAgLy8gICAgICAgPEFydGlzdENhcmRzIGFydGlzdD17IGFydGlzdCB9IGtleT17IGluZGV4IH0gaGFuZGxlQ2FyZENsaWNrPXt0aGlzLmhhbmRsZUNhcmRDbGlja30gaGFuZGxlSGVhcnRUb2dnbGU9e3RoaXMuaGFuZGxlSGVhcnRUb2dnbGV9IC8+XG4gIC8vICAgICApfVxuICAvLyAgIDwvZGl2PlxuICAvLyApO1xuXG4gIC8vIG9uQ2xpY2s9eyAoKSA9PiBwcm9wcy5oYW5kbGVIZWFydFRvZ2dsZShwcm9wcy5hcnRpc3QpIH0gLy9wcm9wcy52YWx1ZS5pc0hlYXJ0RmlsbGVkXG5cbiAgLy9vbkNsaWNrPXt0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlfVxuXG4gIC8vIDxkaXY+XG4gIC8vICAgICAgICAgICA8aW1nIHNyYz17YXJ0aXN0LmltYWdlVVJMfSBrZXk9eyBpbmRleCB9PjwvaW1nPlxuXG4gIC8vICAgICAgICAgICB7LyogPEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYUhlYXJ0fSBzaXplPVwiMnhcIiAvPiAqL31cbiAgLy8gICAgICAgICAgIDwvZGl2PlxuICAvLyAgICAgICAgIClcbiAgLy8gICAgICAgICApfVxuXG4gIC8vICAgICAgICAgey8qIDxpbnB1dCBvbkNsaWNrPXt0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlfT5cbiAgLy8gICAgICAgICAgIHtwcm9wcy52YWx1ZS5pc0hlYXJ0RmlsbGVkID8gPGRpdiBjbGFzc05hbWU9XCJoZWFydFwiPjxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQgZmEtMnhcIj48L2k+PC9hPjwvZGl2PiA6IDxkaXYgY2xhc3NOYW1lPVwiaGVhcnRcIj48YSBocmVmPVwiI1wiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWhlYXJ0LW8gZmEtMnhcIj48L2k+PC9hPjwvZGl2Pn1cbiAgLy8gICAgICAgICA8L2lucHV0PiAqL31cblxuXG4vLyBnZXRBcnRpc3RzUGFnZSgpIHtcbi8vICAgZmV0Y2goJy8nLCB7XG4vLyAgICAgbWV0aG9kOiAnR0VUJ1xuLy8gICB9KTtcbi8vIH1cbi8vIGdldExpa2VkQXJ0aXN0cygpIHtcbi8vICAgLy9sZXQgZGF0YSA9IHsgbGlrZWRBcnRpc3RzIH07IC8vdGhpcy5zdGF0ZS5saWtlZEFydGlzdHM/XG4vLyAgIC8vY29uc29sZS5sb2coJ2xpa2VkQXJ0aXN0czogJywgbGlrZWRBcnRpc3RzKTtcbi8vICAgZmV0Y2goJy9hcnRpc3RzJywge1xuLy8gICAgIG1ldGhvZDogJ0dFVCdcbi8vICAgfSlcbi8vICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4vLyAgICAgLnRoZW4oZGF0YSA9PiB7XG4vLyAgICAgICB0aGlzLnNldFN0YXRlKHtsaWtlZEFydGlzdHM6IGRhdGF9KVxuLy8gICAgIH0pXG4vLyAgICAgLmNhdGNoKGVyciA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZygnZXJyb3IgZ2V0dGluZyBsaWtlZCBhcnRpc3RzJywgZXJyKTtcbi8vICAgICB9KTtcbi8vIH1cbi8vIGNvbXBvbmVudERpZE1vdW50KCkge1xuLy8gICB0aGlzLnBvc3RMaWtlZEFydGlzdHMoKTtcbi8vIH1cbi8vIHBvc3RMaWtlZEFydGlzdHMoZGF0YSkgeyAvL3Bhc3MgaW4gY2FsbGJhY2ssIHRoZW4gY2FsbCB3L2RhdGEgb3IgZGF0YS5yZXN1bHQgd2hlbiBoYW5kbGluZyByZXM/XG4vLyAgIGZldGNoKCcvYXJ0aXN0cycsIHtcbi8vICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4vLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcbi8vICAgfSlcbi8vICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpICAvL3BhcnNlcyB0aGUgcmVzcG9uc2UgYXMgSlNPTlxuLy8gICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZTogJywgcmVzKTtcbi8vICAgLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZygnc3VjY2VzczogJywgZGF0YSkpXG4vLyAgIC5jYXRjaChlcnIgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKCdlcnJvciBwb3N0aW5nIGxpa2VkIGFydGlzdHM6ICcsIGVycik7XG4vLyAgIH0pO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBUb2dnbGVIZWFydChwcm9wcykge1xuLy8gICByZXR1cm4gKFxuLy8gICAgIC8vb25DbGljaz17dGhpcy5oYW5kbGVIZWFydENsaWNrfVxuLy8gICAgIDxpbnB1dCBvbkNsaWNrPXsoZSkgPT4ge1xuLy8gICAgICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuLy8gICAgICAgcHJvcHMuaXNIZWFydEZpbGxlZCA/ICdmYSBmYS1oZWFydCBmYS0yeCcgOiAnZmEgZmEtaGVhcnQtbyBmYS0yeCc7XG4vLyAgICAgICAvL3B1c2ggYXJ0aXN0cyBpbnRvIGxpa2VkQXJ0aXN0c1xuLy8gICAgICAgLy9wb3N0IHRvIGRiIC0tPiBwYXNzIGluIGFydGlzdHMgd2hvc2UgaGVhcnRzIGFyZSBmaWxsZWQtaW5cbi8vICAgICAgIC8vaWYgKHByb3BzLmlzSGVhcnRGaWxsZWQgPT09IHRydWUpLCAnZmEgZmEtaGVhcnQgZmEtMngnLCBwb3N0XG4vLyAgICAgICBwcm9wcy5wb3N0TGlrZWRBcnRpc3RzKCk7XG4vLyAgICAgfX0+XG4vLyAgICAgPC9pbnB1dD5cbi8vICAgKTtcbi8vIH1cbi8vIGNsYXNzIFRvZ2dsZUhlYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICBzdXBlcihwcm9wcyk7XG4vLyAgICAgdGhpcy5zdGF0ZSA9IHtpc0hlYXJ0RmlsbGVkOiAnZmFsc2UnfTtcbi8vICAgICB0aGlzLmhhbmRsZUhlYXJ0Q2xpY2sgPSB0aGlzLmhhbmRsZUhlYXJ0Q2xpY2suYmluZCh0aGlzKTtcbi8vICAgfVxuLy8gICBoYW5kbGVIZWFydENsaWNrKCkge1xuLy8gICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbi8vICAgICAgIGlzSGVhcnRGaWxsZWQ6ICFzdGF0ZS5pc0hlYXJ0RmlsbGVkXG4vLyAgICAgfSkpO1xuLy8gICB9XG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlSGVhcnRDbGlja30+XG4vLyAgICAgICAgIHt0aGlzLnN0YXRlLmlzSGVhcnRGaWxsZWQgPyAnZmEgZmEtaGVhcnQgZmEtMngnIDogJ2ZhIGZhLWhlYXJ0LW8gZmEtMngnfVxuLy8gICAgICAgPC9pbnB1dD5cbi8vICAgICApO1xuLy8gICB9XG4vLyB9XG5cbi8vIHBvc3RMaWtlZEFydGlzdHMoKSB7IC8vbm90IGZyb250IGVuZCBldmVudCwgc28gY2FuJ3QgdXNlIGVcbi8vICAgLy9lLnByZXZlbnRkZWZhdWx0KCk7XG4vLyAgICAgZmV0Y2goJy9mYXZvcml0ZXMnLCB7XG4vLyAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbi8vICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbi8vICAgICAgICAgQXJ0aXN0TGlzdDogdGhpcy5zdGF0ZS5BcnRpc3RMaXN0XG4vLyAgICAgICB9KVxuLy8gICAgIH0pXG4vLyAgICAgLnRoZW4ocmVzID0+IHtcbi8vICAgICAgIC8vY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnLCByZXMpO1xuLy8gICAgICAgLy9sZXQgcGFyc2VkUmVxID0gSlNPTi5wYXJzZShyZXEuYm9keSk7XG4vLyAgICAgICByZXMuanNvbigpO1xuLy8gICAgICAgLy9KU09OLnBhcnNlIC0tPiBpcyBpdCBhbHJlYWR5IHBhcnNlZCBiZWN1YXNlIG9mIGJvZHlQYXJzZXI/XG4vLyAgICAgfSlcbi8vICAgICAudGhlbihkYXRhID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzOiAnLCBkYXRhKTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaChlcnIgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHBvc3RpbmcgbGlrZWQgYXJ0aXN0czogJywgZXJyKTtcbi8vICAgICB9KVxuLy8gICB9XG5cbi8vIGNsYXNzIEFydGlzdENhcmRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICBzdXBlcihwcm9wcyk7XG4vLyAgICAgdGhpcy5zdGF0ZSA9IHtcbi8vICAgICAgIGlzQ2FyZENsaWNrZWQ6IGZhbHNlLFxuLy8gICAgICAgYXJ0aXN0VVJMOiAnJ1xuLy8gICAgIH07XG4vLyAgICAgdGhpcy5oYW5kbGVDYXJkQ2xpY2sgPSB0aGlzLmhhbmRsZUNhcmRDbGljay5iaW5kKHRoaXMpO1xuLy8gICB9XG4vLyAgIGhhbmRsZUNhcmRDbGljayhlKSB7XG4vLyAgICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuLy8gICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbi8vICAgICAgIGlzQ2FyZENsaWNrZWQ6ICFzdGF0ZS5pc0NhcmRDbGlja2VkXG4vLyAgICAgfSkpO1xuLy8gICB9XG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FyZENsaWNrfT5cbi8vICAgICAgICAge3RoaXMuc3RhdGUuaXNDYXJkQ2xpY2tlZCA/ICcnIDogJyd9XG4vLyAgICAgICA8L2lucHV0PlxuLy8gICAgICk7XG4vLyAgIH1cbi8vIH1cblxuLy8ge3Byb3BzLnZhbHVlLmFydGlzdExpc3QubWFwKGFydGlzdCwgKGFydGlzdCwgaW5kZXgpID0+IHsgLy9lbGVtZW50LCB0aGVuIGZ1bmMgcnVuIG9uIGVhY2ggZWxcbi8vICAgcmV0dXJuIDxhcnRpc3RMaXN0IGFydGlzdD17IGFydGlzdCB9IGtleT17IGluZGV4IH0gaGFuZGxlSGVhcnRUb2dnbGU9e3Byb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlfSAvPjtcbi8vIH0pfVxuXG4vLyB7cHJvcHMuYXJ0aXN0TGlzdC5tYXAoYXJ0aXN0LCAoYXJ0aXN0LCBpbmRleCkgPT4ge1xuLy8gICByZXR1cm4gPEFydGlzdExpc3QgYXJ0aXN0PXsgYXJ0aXN0IH0ga2V5PXsgaW5kZXggfSAvPjtcbi8vIH0pfVxuXG4vL2xldCBwYXJzZWRSZXEgPSBKU09OLnBhcnNlKHJlcS5ib2R5KTtcblxuXG4vLyBmdW5jdGlvbiBXZWxjb21lKHByb3BzKSB7XG4vLyAgIHJldHVybiA8aDE+SGVsbG8sIHtwcm9wcy5uYW1lfTwvaDE+O1xuLy8gfVxuXG4vLyBjb25zdCBlbGVtZW50ID0gPFdlbGNvbWUgbmFtZT1cIlNhcmFcIiAvPjtcblxuXG4vLyBSZWFjdERPTS5yZW5kZXIoXG4vLyAgIGVsZW1lbnQsXG4vLyAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jylcbi8vICk7XG5cblxuey8qIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtY2FyZHNcIj5cbntwcm9wcy52YWx1ZS5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0KSA9PiAgLy9lbGVtZW50LCB0aGVuIGZ1bmMgcnVuIG9uIGVhY2ggZWxcbiAgPGRpdj57YXJ0aXN0LmltYWdlVVJMfTxkaXYvPlxuKX1cbjxpbnB1dCBvbkNsaWNrPXt0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlfT5cbiAge3Byb3BzLnZhbHVlLmlzSGVhcnRGaWxsZWQgPyA8ZGl2IGNsYXNzTmFtZT1cImhlYXJ0XCI+PGEgaHJlZj1cIiNcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFydCBmYS0yeFwiPjwvaT48L2E+PC9kaXY+IDogPGRpdiBjbGFzc05hbWU9XCJoZWFydFwiPjxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQtbyBmYS0yeFwiPjwvaT48L2E+PC9kaXY+fVxuPC9pbnB1dD5cbjwvZGl2PiAqL31cblxuey8qIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtY2FyZHNcIj5cbntwcm9wcy52YWx1ZS5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0LCBpbmRleCkgPT4gKFxuICA8ZGl2PlxuICA8aW1nIHNyYz17YXJ0aXN0LmltYWdlVVJMfSBrZXk9eyBpbmRleCB9PjwvaW1nPlxuXG4gIHsvKiA8Rm9udEF3ZXNvbWVJY29uIGljb249e2ZhSGVhcnR9IHNpemU9XCIyeFwiIC8+ICovfVxuLy8gICA8L2Rpdj5cbi8vIClcbi8vICl9XG5cbnsvKiA8aW5wdXQgb25DbGljaz17dGhpcy5oYW5kbGVIZWFydFRvZ2dsZX0+XG4gIHtwcm9wcy52YWx1ZS5pc0hlYXJ0RmlsbGVkID8gPGRpdiBjbGFzc05hbWU9XCJoZWFydFwiPjxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQgZmEtMnhcIj48L2k+PC9hPjwvZGl2PiA6IDxkaXYgY2xhc3NOYW1lPVwiaGVhcnRcIj48YSBocmVmPVwiI1wiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWhlYXJ0LW8gZmEtMnhcIj48L2k+PC9hPjwvZGl2Pn1cbjwvaW5wdXQ+ICovfVxuLy8gPC9kaXY+ICovfVxuXG4vLyBsZXQgQXJ0aXN0Q2FyZHMgPSAocHJvcHMpID0+IChcbi8vICAgLy9jb25zb2xlLmxvZygncHJvcHMgZnJvbSBBcnRpc3RDYXJkcyDwn6aKJywgcHJvcHMpXG4vLyAgIDxkaXYgY2xhc3NOYW1lPVwiYXJ0aXN0LWNhcmQtZW50cnlcIj5cbi8vICAgICA8ZGl2PlxuLy8gICAgICAgPGltZyBzcmM9e3Byb3BzLmFydGlzdC5pbWFnZVVSTH0+PC9pbWc+XG4vLyAgICAgPC9kaXY+XG4vLyAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFydC1pY29uXCIgb25DbGljaz17cHJvcHMuaGFuZGxlSGVhcnRDbGljayhwcm9wcy5hcnRpc3QpfT5cbi8vICAgICAgIDxGb250QXdlc29tZUljb24gaWNvbj17ZmFIZWFydH0gc2l6ZT1cIjJ4XCIgLz5cbi8vICAgICA8L2Rpdj5cbi8vICAgPC9kaXY+XG4vLyAgICk7XG5cbi8vdmFyaWFibGUgPSB0aGlzLnN0YXRlLkFydGlzdExpc3RcbiAgICAgICAgLy9sZXQgbGlzdFN0YXRlID0gdGhpcy5zdGF0ZS5BcnRpc3RMaXN0O1xuICAgICAgICAvL2xldCBtb2RBcnRpc3RPYmogPSBPYmplY3QuYXNzaWduKHt9LCBhcnRpc3QpO1xuICAgICAgICAvLyBpZiAobW9kQXJ0aXN0T2JqLmlzTGlrZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vICAgbW9kQXJ0aXN0T2JqLmlzTGlrZWQgPSB0cnVlO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgIG1vZEFydGlzdE9iai5pc0xpa2VkID0gZmFsc2U7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9jb3B5TGlzdFttb2RBcnRpc3RPYmpdXG4gICAgICAgIC8vdGhpcy5zdGF0ZS5BcnRpc3RMaXN0XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnIGNvcHlMaXN0MjogJywgY29weUxpc3QpO1xuICAgICAgICAvL21vZEFydGlzdE9iaiA9IHZhcmlhYmxlW2FydGlzdF1cbiAgICAgICAgLy9sZXQgbW9kQXJ0aXN0T2JqID0gY29weUxpc3RbYXJ0aXN0XTtcblxuICAgICAgICAvLyBoYW5kbGVIZWFydFRvZ2dsZShBcnRpc3RMaXN0LCBhcnRpc3QpIHtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZygnIGFydGlzdDogJywgYXJ0aXN0KTtcbiAgICAgICAgLy8gICBpZiAoYXJ0aXN0LmlzTGlrZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vICAgICBhcnRpc3QuaXNMaWtlZCA9IHRydWU7XG4gICAgICAgIC8vICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIGFydGlzdC5pc0xpa2VkID0gZmFsc2U7XG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyAgIC8vbW9kaWZ5IGFydGlzdCBieSBjaGFuZ2luZyBpc0xpa2VkOiB0cnVlXG4gICAgICAgIC8vICAgICAvL2NvcHkgQXJ0aXN0TGlzdCBhcnJheVxuICAgICAgICAvLyAgICAgICAvL25ldyBhcnJheSA9IEFydGlzdExpc3Quc2xpY2UoKVxuICAgICAgICAvLyAgICAgICBsZXQgY29weUxpc3QgPSBBcnRpc3RMaXN0LnNsaWNlKCk7XG4gICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCcgY29weUxpc3Q6ICcsIGNvcHlMaXN0KTtcbiAgICAgICAgLy8gICAgICAgYXJ0aXN0ID0gY29weUxpc3RbYXJ0aXN0XTtcbiAgICAgICAgLy8gICAgICAgLy9tYXAgdGhyb3VnaCBjb3B5TGlzdFxuICAgICAgICAvLyAgICAgICAgIC8vaWYgKGNvcHlMaXN0W2luZGV4XSA9PT0gbW9kQXJ0aXN0T2JqKVxuICAgICAgICAvLyAgIC8vcmVwbGFjZSBhcnRpc3QgdG9nZ2xlZCB3L25ldyBtb2RpZmllZCBhcnRpc3Qgb2JqXG4gICAgICAgIC8vICAgICAvL2FydGlzdCA9IG1vZEFydGlzdE9ialxuICAgICAgICAvLyAgICAgLy9jb3B5TGlzdC5maWx0ZXIoYXJ0aXN0ID0+IGFydGlzdCA9PT0gbW9kQXJ0aXN0T2JqKVxuICAgICAgICAvLyAgICAgLy88QXJ0aXN0TGlzdCBhcnRpc3RPYmo9eyBhcnRpc3QgfSBrZXk9eyBpbmRleCB9IC8+XG4gICAgICAgIC8vICAgICAvLzxBcnRpc3RMaXN0IGFydGlzdE9iaj17IGFydGlzdE9iaiB9IGtleT17IGluZGV4IH0gLz5cbiAgICAgICAgLy8gICAgIC8vbWFwIEFydGlzdExpc3QsIGxvY2F0ZSBhcnRpc3QsIHNldCBhcnRpc3QgPSBtb2RBcnRpc3RPYmpcbiAgICAgICAgLy8gICAgIC8vIGxldCBuZXdMaXN0ID0gY29weUxpc3QubWFwKChhcnRpc3RPYmosIGluZGV4KSA9PiB7XG4gICAgICAgIC8vICAgICAvLyAgIGlmIChjb3B5TGlzdFtpbmRleF0gPT09IG1vZEFydGlzdE9iaikge1xuICAgICAgICAvLyAgICAgLy8gICAgIHJldHVybiBhcnRpc3RPYmo9eyBtb2RBcnRpc3RPYmogfSBrZXk9eyBpbmRleCB9O1xuICAgICAgICAvLyAgICAgLy8gICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgLy8gICAgIHJldHVybiBhcnRpc3RPYmo9eyBhcnRpc3RPYmogfSBrZXk9eyBpbmRleCB9O1xuICAgICAgICAvLyAgICAgLy8gICB9XG4gICAgICAgIC8vICAgICAvLyB9KTtcbiAgICAgICAgLy8gICAgICAvL3RoaXMuc2V0U3RhdGUgdy9uZXcgYXJyYXkgZm9yIEFydGlzdExpc3RcbiAgICAgICAgLy8gICAgIC8vY29uc29sZS5sb2coJ2FydGlzdCBsaXN0IHN0YXRlOiAnLCBBcnRpc3RMaXN0KTtcbiAgICAgICAgLy8gICAgIGZ1bmN0aW9uIGhhbmRsZXIoZSkge1xuICAgICAgICAvLyAgICAgICBlLnByZXZlbnRkZWZhdWx0KCk7XG4gICAgICAgIC8vICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHsgQXJ0aXN0TGlzdDogY29weUxpc3QgfSkpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ2FydGlzdCBsaXN0IGFmdGVyIHN0YXRlOiAnLCBBcnRpc3RMaXN0KTtcbiAgICAgICAgLy8gfSJdfQ==