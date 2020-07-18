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
      //isHeartFilled: 'false',
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
  } // handleHeartToggle(ArtistList, artist) { //isLiked
  //   //e.preventdefault();
  //   //ifArtistIsLiked(ArtistList, artist);
  //   this.setState(state => ({
  //     //isHeartFilled: !state.isHeartFilled
  //   }));
  //   //if isHeartFilled === true, postLikedArtists, else delete artist
  // }


  handleHeartToggle(ArtistList, artist) {
    console.log('🦋 artist: ', artist);

    if (artist.isLiked === false) {
      artist.isLiked = true;
    } else {
      artist.isLiked = false;
    } //modify artist by changing isLiked: true
    //copy ArtistList array
    //new array = ArtistList.slice()


    let copyList = ArtistList.slice();
    console.log('🐯 copyList: ', copyList);
    artist = copyList[artist]; //map through copyList
    //if (copyList[index] === modArtistObj)
    //replace artist toggled w/new modified artist obj
    //artist = modArtistObj
    //copyList.filter(artist => artist === modArtistObj)
    //<ArtistList artistObj={ artist } key={ index } />
    //<ArtistList artistObj={ artistObj } key={ index } />
    //map ArtistList, locate artist, set artist = modArtistObj
    // let newList = copyList.map((artistObj, index) => {
    //   if (copyList[index] === modArtistObj) {
    //     return artistObj={ modArtistObj } key={ index };
    //   } else {
    //     return artistObj={ artistObj } key={ index };
    //   }
    // });
    //this.setState w/new array for ArtistList
    //console.log('artist list state: ', ArtistList);

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
    //return <Heart/>
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

function ArtistCards(props) {
  console.log('props from ArtistCards 🦊', props);
  return /*#__PURE__*/React.createElement("div", {
    className: "artist-card-entry"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: props.artist.imageURL
  })), /*#__PURE__*/React.createElement("div", {
    className: "heart-icon",
    onClick: e => props.handleHeartToggle(ArtistList, props.artist)
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faHeart,
    size: "2x"
  })));
} //ifArtistIsLiked
//props.value.ArtistList


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

const ArtistList = [//artist[key].isLiked = true
{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9BcHAuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiZmFIZWFydCIsImZhckhlYXJ0IiwiRm9udEF3ZXNvbWVJY29uIiwiQXBwIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwicGFnZSIsIkFydGlzdExpc3QiLCJpc0NhcmRDbGlja2VkIiwibGlrZWRBcnRpc3RzIiwiaGFuZGxlQnV0dG9uQ2xpY2siLCJiaW5kIiwib3RoZXJQYWdlIiwiaGFuZGxlQ2FyZENsaWNrIiwiaGFuZGxlSGVhcnRUb2dnbGUiLCJwb3N0TGlrZWRBcnRpc3RzIiwiZSIsInByZXZlbnRkZWZhdWx0Iiwic2V0U3RhdGUiLCJwcmV2U3RhdGUiLCJhcnRpc3QiLCJjb25zb2xlIiwibG9nIiwiaXNMaWtlZCIsImNvcHlMaXN0Iiwic2xpY2UiLCJoYW5kbGVyIiwiZ2V0QXJ0aXN0c1BhZ2UiLCJmZXRjaCIsIm1ldGhvZCIsImNvbXBvbmVudERpZE1vdW50IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJjYXRjaCIsImVyciIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlbmRlciIsIkFydGlzdHNQYWdlIiwidmFsdWUiLCJtYXAiLCJpbmRleCIsIkFydGlzdENhcmRzIiwiaW1hZ2VVUkwiLCJGYXZvcml0ZXNQYWdlIiwibmFtZSIsImFydGlzdExpbmsiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxTQUFTQyxPQUFULFFBQXdCLG1DQUF4QjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIscUNBQXpCO0FBQ0EsU0FBU0MsZUFBVCxRQUFnQyxnQ0FBaEM7QUFFQTs7Ozs7Ozs7OztBQVdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1DLEdBQU4sU0FBa0JKLEtBQUssQ0FBQ0ssU0FBeEIsQ0FBa0M7QUFDaENDLEVBQUFBLFdBQVcsQ0FBQ0MsS0FBRCxFQUFRO0FBQ2pCLFVBQU1B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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUFDOzs7Ozs7OztBQU9TO0FBRVY7QUFBQzs7Ozs7QUFLcUQsQyxDQUN0RDtBQUNBO0FBQ0E7O0FBRUE7QUFBQzs7O0FBRVcsQyxDQUNaO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ1E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZhSGVhcnQgfSBmcm9tIFwiQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zXCI7XG5pbXBvcnQgeyBmYXJIZWFydCB9IGZyb20gXCJAZm9ydGF3ZXNvbWUvZnJlZS1yZWd1bGFyLXN2Zy1pY29uc1wiO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVJY29uIH0gZnJvbSBcIkBmb3J0YXdlc29tZS9yZWFjdC1mb250YXdlc29tZVwiO1xuXG4vKlxuY29tcG9uZW50czpcbjEuIGFwcCAtIGV2ZXJ5dGhpbmcgd2lsbCBiZSByZW5kZXJlZCwgaGVhcnRUb2dnbGUsIGJ1dHRvbkNsaWNrLCBwb3N0TGlrZWRBcnRpc3RzIHRvIGRiXG4yLiBwYWdlcyAtIGNvbnRhaW5lciBjb21wb25lbnRzLCByZW5kZXIgb3RoZXIgY29tcG9uZW50cyBpbnNpZGVcbjMuIGFydGlzdCBjYXJkcyAtIG1hcHBpbmcgZWFjaCBjYXJkIGluZGl2aWR1YWxseSBmcm9tIGFydGlzdExpc3RcbjQuIGZhdm9yaXRlcyAtIHJlbmRlciBlYWNoIGxpbmsgZnJvbSBmYXZvcml0ZXNMaXN0IHcvbWFwIGZ1bmNcblxucnVubmluZyBvcmRlcjpcbiAgLSBjb25zdHJ1Y3RvciwgcmVuZGVyLCBjb21wb25lbnREaWRNb3VudFxuKi9cblxuLy88aSBjbGFzc05hbWU9XCJmYXMgZmEtaGVhcnRcIiBzaXplPVwiMnhcIj48L2k+IC8vc29saWRcbi8vPEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYUhlYXJ0fSBzaXplPVwiMnhcIiAvPiAvL3NvbGlkXG4vLzxpIGNsYXNzTmFtZT1cImZhciBmYS1oZWFydFwiPjwvaT4gLy9vdXRsaW5lXG4vLzxGb250QXdlc29tZUljb24gaWNvbj17WydmYXInLCAnaGVhcnQnXX0gc2l6ZT1cIjJ4XCIgLz4gLy9vdXRsaW5lXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwYWdlOiAnYXJ0aXN0cycsXG4gICAgICAvL2lzSGVhcnRGaWxsZWQ6ICdmYWxzZScsXG4gICAgICBBcnRpc3RMaXN0OiBBcnRpc3RMaXN0LFxuICAgICAgaXNDYXJkQ2xpY2tlZDogZmFsc2UsXG4gICAgICAvL2xpa2VkQXJ0aXN0cyAtLT4ge25hbWUsIGltYWdlVVJMLCBhcnRpc3RMaW5rLCBpc0xpa2VkfVxuICAgICAgbGlrZWRBcnRpc3RzOiBbXVxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVCdXR0b25DbGljayA9IHRoaXMuaGFuZGxlQnV0dG9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm90aGVyUGFnZSA9IHRoaXMub3RoZXJQYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVDYXJkQ2xpY2sgPSB0aGlzLmhhbmRsZUNhcmRDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSGVhcnRUb2dnbGUgPSB0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wb3N0TGlrZWRBcnRpc3RzID0gdGhpcy5wb3N0TGlrZWRBcnRpc3RzLmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlQnV0dG9uQ2xpY2soZSkge1xuICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+ICh7XG4gICAgICBwYWdlOiAhc3RhdGUucGFnZVxuICAgIH0pKTtcbiAgfVxuICBvdGhlclBhZ2Uob3RoZXJQYWdlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShwcmV2U3RhdGUgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFnZTogb3RoZXJQYWdlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBoYW5kbGVDYXJkQ2xpY2soZSkge1xuICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+ICh7XG4gICAgICBpc0NhcmRDbGlja2VkOiAhc3RhdGUuaXNDYXJkQ2xpY2tlZFxuICAgIH0pKTtcbiAgfVxuICAvLyBoYW5kbGVIZWFydFRvZ2dsZShBcnRpc3RMaXN0LCBhcnRpc3QpIHsgLy9pc0xpa2VkXG5cbiAgLy8gICAvL2UucHJldmVudGRlZmF1bHQoKTtcbiAgLy8gICAvL2lmQXJ0aXN0SXNMaWtlZChBcnRpc3RMaXN0LCBhcnRpc3QpO1xuICAvLyAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbiAgLy8gICAgIC8vaXNIZWFydEZpbGxlZDogIXN0YXRlLmlzSGVhcnRGaWxsZWRcbiAgLy8gICB9KSk7XG4gIC8vICAgLy9pZiBpc0hlYXJ0RmlsbGVkID09PSB0cnVlLCBwb3N0TGlrZWRBcnRpc3RzLCBlbHNlIGRlbGV0ZSBhcnRpc3RcbiAgLy8gfVxuICBoYW5kbGVIZWFydFRvZ2dsZShBcnRpc3RMaXN0LCBhcnRpc3QpIHtcbiAgICBjb25zb2xlLmxvZygn8J+miyBhcnRpc3Q6ICcsIGFydGlzdCk7XG4gICAgaWYgKGFydGlzdC5pc0xpa2VkID09PSBmYWxzZSkge1xuICAgICAgYXJ0aXN0LmlzTGlrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnRpc3QuaXNMaWtlZCA9IGZhbHNlO1xuICAgIH1cbiAgICAvL21vZGlmeSBhcnRpc3QgYnkgY2hhbmdpbmcgaXNMaWtlZDogdHJ1ZVxuICAgICAgLy9jb3B5IEFydGlzdExpc3QgYXJyYXlcbiAgICAgICAgLy9uZXcgYXJyYXkgPSBBcnRpc3RMaXN0LnNsaWNlKClcbiAgICAgICAgbGV0IGNvcHlMaXN0ID0gQXJ0aXN0TGlzdC5zbGljZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygn8J+QryBjb3B5TGlzdDogJywgY29weUxpc3QpO1xuICAgICAgICBhcnRpc3QgPSBjb3B5TGlzdFthcnRpc3RdO1xuICAgICAgICAvL21hcCB0aHJvdWdoIGNvcHlMaXN0XG4gICAgICAgICAgLy9pZiAoY29weUxpc3RbaW5kZXhdID09PSBtb2RBcnRpc3RPYmopXG4gICAgLy9yZXBsYWNlIGFydGlzdCB0b2dnbGVkIHcvbmV3IG1vZGlmaWVkIGFydGlzdCBvYmpcbiAgICAgIC8vYXJ0aXN0ID0gbW9kQXJ0aXN0T2JqXG4gICAgICAvL2NvcHlMaXN0LmZpbHRlcihhcnRpc3QgPT4gYXJ0aXN0ID09PSBtb2RBcnRpc3RPYmopXG4gICAgICAvLzxBcnRpc3RMaXN0IGFydGlzdE9iaj17IGFydGlzdCB9IGtleT17IGluZGV4IH0gLz5cbiAgICAgIC8vPEFydGlzdExpc3QgYXJ0aXN0T2JqPXsgYXJ0aXN0T2JqIH0ga2V5PXsgaW5kZXggfSAvPlxuICAgICAgLy9tYXAgQXJ0aXN0TGlzdCwgbG9jYXRlIGFydGlzdCwgc2V0IGFydGlzdCA9IG1vZEFydGlzdE9ialxuICAgICAgLy8gbGV0IG5ld0xpc3QgPSBjb3B5TGlzdC5tYXAoKGFydGlzdE9iaiwgaW5kZXgpID0+IHtcbiAgICAgIC8vICAgaWYgKGNvcHlMaXN0W2luZGV4XSA9PT0gbW9kQXJ0aXN0T2JqKSB7XG4gICAgICAvLyAgICAgcmV0dXJuIGFydGlzdE9iaj17IG1vZEFydGlzdE9iaiB9IGtleT17IGluZGV4IH07XG4gICAgICAvLyAgIH0gZWxzZSB7XG4gICAgICAvLyAgICAgcmV0dXJuIGFydGlzdE9iaj17IGFydGlzdE9iaiB9IGtleT17IGluZGV4IH07XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pO1xuICAgICAgIC8vdGhpcy5zZXRTdGF0ZSB3L25ldyBhcnJheSBmb3IgQXJ0aXN0TGlzdFxuICAgICAgLy9jb25zb2xlLmxvZygnYXJ0aXN0IGxpc3Qgc3RhdGU6ICcsIEFydGlzdExpc3QpO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlcihlKSB7XG4gICAgICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiAoeyBBcnRpc3RMaXN0OiBjb3B5TGlzdCB9KSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygnYXJ0aXN0IGxpc3QgYWZ0ZXIgc3RhdGU6ICcsIEFydGlzdExpc3QpO1xuICB9XG4gIGdldEFydGlzdHNQYWdlKCkge1xuICAgIGZldGNoKCcvJywge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pO1xuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGZldGNoKCcvYXJ0aXN0cycsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfwn5GYIGRhdGEgaW4gR0VUOiAnLCBkYXRhKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bGlrZWRBcnRpc3RzOiBkYXRhfSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIGdldHRpbmcgbGlrZWQgYXJ0aXN0cycsIGVycik7XG4gICAgICB9KTtcbiAgfVxuICBwb3N0TGlrZWRBcnRpc3RzKGRhdGEpIHsgLy9wYXNzIGluIGNhbGxiYWNrLCB0aGVuIGNhbGwgdy9kYXRhIG9yIGRhdGEucmVzdWx0IHdoZW4gaGFuZGxpbmcgcmVzP1xuICAgIGNvbnNvbGUubG9nKCfwn6e2IGRhdGEgaW4gUE9TVDogJywgZGF0YSk7XG4gICAgZGF0YSA9IHtsaWtlZEFydGlzdHM6IHRoaXMuc3RhdGUubGlrZWRBcnRpc3RzfTtcbiAgICBmZXRjaCgnL2FydGlzdHMnLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgfSlcbiAgICAvLyAudGhlbihyZXMgPT4gcmVzLmpzb24oKSkgIC8vcGFyc2VzIHRoZSByZXNwb25zZSBhcyBKU09OXG4gICAgLy8gICBjb25zb2xlLmxvZygncmVzcG9uc2U6ICcsIHJlcyk7XG4gICAgLy8gLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZygnc3VjY2VzczogJywgZGF0YSkpXG4gICAgLy8gLmNhdGNoKGVyciA9PiB7XG4gICAgLy8gICBjb25zb2xlLmxvZygnZXJyb3IgcG9zdGluZyBsaWtlZCBhcnRpc3RzOiAnLCBlcnIpO1xuICAgIC8vIH0pO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICAvL3JldHVybiA8SGVhcnQvPlxuICAgIGlmICh0aGlzLnN0YXRlLnBhZ2UgPT09ICdhcnRpc3RzJykge1xuICAgICAgLy9idXR0b25DbGljaz17dGhpcy5oYW5kbGVCdXR0b25DbGlja31cbiAgICAgIHJldHVybiAoXG4gICAgICAgICAgPEFydGlzdHNQYWdlIHZhbHVlPXt0aGlzLnN0YXRlfSBvdGhlclBhZ2U9e3RoaXMub3RoZXJQYWdlfSBwb3N0QXJ0aXN0cz17dGhpcy5wb3N0TGlrZWRBcnRpc3RzfSBoYW5kbGVIZWFydFRvZ2dsZT17dGhpcy5oYW5kbGVIZWFydFRvZ2dsZX0gaGFuZGxlQ2FyZENsaWNrPXt0aGlzLmhhbmRsZUNhcmRDbGlja30gLz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vYnV0dG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9uQ2xpY2t9XG4gICAgICAvL2hhbmRsZSBsaW5rIGNsaWNrP1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEZhdm9yaXRlc1BhZ2UgdmFsdWU9e3RoaXMuc3RhdGV9IG90aGVyUGFnZT17dGhpcy5vdGhlclBhZ2V9IC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vcmV0dXJuIDxkaXY+aGVsbG88L2Rpdj5cbiAgfVxufVxuXG5mdW5jdGlvbiBBcnRpc3RzUGFnZShwcm9wcykgeyAvL21hcHBpbmcgZWFjaCBjYXJkIGluZGl2aWR1YWxseSBmcm9tIGFydGlzdExpc3RcbiAgY29uc29sZS5sb2coJ0FwcCBwcm9wcycsIHByb3BzKTtcbiAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9XCJwYWdlLXRpdGxlXCI+QXJ0aXN0czwvaDE+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgIHByb3BzLm90aGVyUGFnZSgnZmF2b3JpdGVzJyk7XG4gICAgICAgICAgfX0+XG4gICAgICAgICAgRmF2b3JpdGVzXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubmVyLWNvbnRhaW5lclwiIGlkPVwiYXJ0aXN0LWNhcmRzXCI+XG4gICAgICAgICAge3Byb3BzLnZhbHVlLkFydGlzdExpc3QubWFwKChhcnRpc3QsIGluZGV4KSA9PlxuICAgICAgICAgICAgPEFydGlzdENhcmRzIGFydGlzdD17IGFydGlzdCB9IGtleT17IGluZGV4IH0gaGFuZGxlQ2FyZENsaWNrPXtwcm9wcy5oYW5kbGVDYXJkQ2xpY2t9IGhhbmRsZUhlYXJ0VG9nZ2xlPXtwcm9wcy5oYW5kbGVIZWFydFRvZ2dsZX0gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICApXG59XG5cbmZ1bmN0aW9uIEFydGlzdENhcmRzKHByb3BzKSB7XG4gIGNvbnNvbGUubG9nKCdwcm9wcyBmcm9tIEFydGlzdENhcmRzIPCfpoonLCBwcm9wcylcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFydGlzdC1jYXJkLWVudHJ5XCI+XG4gICAgICA8ZGl2PlxuICAgICAgICA8aW1nIHNyYz17cHJvcHMuYXJ0aXN0LmltYWdlVVJMfT48L2ltZz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFydC1pY29uXCIgb25DbGljaz17KGUpID0+IChwcm9wcy5oYW5kbGVIZWFydFRvZ2dsZShBcnRpc3RMaXN0LCBwcm9wcy5hcnRpc3QpKX0+XG4gICAgICAgIDxGb250QXdlc29tZUljb24gaWNvbj17ZmFIZWFydH0gc2l6ZT1cIjJ4XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuICB9XG5cbiAgLy9pZkFydGlzdElzTGlrZWRcbiAgLy9wcm9wcy52YWx1ZS5BcnRpc3RMaXN0XG5cbmZ1bmN0aW9uIEZhdm9yaXRlc1BhZ2UocHJvcHMpIHsgLy9yZW5kZXIgZWFjaCBsaW5rIGZyb20gZmF2b3JpdGVzTGlzdCB3L21hcCBmdW5jXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgIDxoMSBjbGFzc05hbWU9XCJwYWdlLXRpdGxlXCI+RmF2b3JpdGVzPC9oMT5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgcHJvcHMub3RoZXJQYWdlKCdhcnRpc3RzJyk7XG4gICAgICAgIH19PlxuICAgICAgICBBcnRpc3RzXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtbGlua3NcIj5cbiAgICAgICAge3Byb3BzLkFydGlzdExpc3QubWFwKChhcnRpc3QpID0+IHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj57YXJ0aXN0Lm5hbWUsIGFydGlzdC5hcnRpc3RMaW5rfTwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmNvbnN0IEFydGlzdExpc3QgPSBbIC8vYXJ0aXN0W2tleV0uaXNMaWtlZCA9IHRydWVcbiAge1xuICAgIG5hbWU6ICdsZXRoYSB3aWxzb24nLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly93d3cubGV0aGFwcm9qZWN0cy5jb20vdmlzdWFscy9pbWFnZXMvb3V0ZG9vcnMvZ2hvc3RvZmF0cmVlLXJpZ2h0LXZpZXcuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHBzOi8vd3d3LmxldGhhcHJvamVjdHMuY29tXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdnZW5lc2lzIGJhZXonLFxuICAgIGltYWdlVVJMOiAnaHR0cDovL21lZGlhLnZpcmJjZG4uY29tL2Nkbl9pbWFnZXMvcmVzaXplXzE2MDB4MTYwMC8yMy9hYzE3MThiNzQ1OTY1YWVkLUJhZXpfMS5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cDovL3d3dy5nZW5lc2lzYmFlei5jb20vXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdzYXJhaC1sb3Vpc2UgYmFyYmV0dCcsXG4gICAgaW1hZ2VVUkw6ICdodHRwczovL2Fpc3NlbGxlcy5maWxlcy53b3JkcHJlc3MuY29tLzIwMTAvMTIvaW1nXzAwMTYuanBnP3c9MTEwNCcsXG4gICAgYXJ0aXN0TGluazogXCJodHRwczovL2Fpc3NlbGxlcy5maWxlcy53b3JkcHJlc3MuY29tXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdqZXNzaWNhIGhhbG9uZW4nLFxuICAgIGltYWdlVVJMOiAnaHR0cDovL3d3dy5qZXNzaWNhaGFsb25lbi5jb20vZmlsZXMvZ2ltZ3MvNDRfc3BsaWNlZC1icmFuY2gtYmFsbC0xLmpwZycsXG4gICAgYXJ0aXN0TGluazogXCJodHRwOi8vd3d3Lmplc3NpY2FoYWxvbmVuLmNvbVwiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnbGF1cmEgb3dlbnMnLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly93d3cub3dlbnNsYXVyYS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTMvMDEvSFEtMTZMTzkzNTlQLVVudGl0bGVkLmpwZycsXG4gICAgYXJ0aXN0TGluazogXCJodHRwczovL3d3dy5vd2Vuc2xhdXJhLmNvbVwiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnZGVib3JhaCByb2JlcnRzJyxcbiAgICBpbWFnZVVSTDogJ2h0dHBzOi8vaTAud3AuY29tL2NvbmZsaWN0b2ZpbnRlcmVzdHR4LmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNy8wNy9UaGUtUG93ZXItZGFuY2UtMzB4MjItMjAxNy5qcGVnP3c9NDY5JyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHA6Ly93d3cuZGVib3JhaHJvYmVydHNhcnQuY29tL1wiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAnYW5hIGVzdGV2ZSBsbG9yZW5zJyxcbiAgICBpbWFnZVVSTDogJ2h0dHA6Ly93d3cuYW5hZXN0ZXZlbGxvcmVucy5jb20vcHJvamVjdHMvcHJvamVjdDYvMDclMjBRdWFzeSUyMEluZmluaXRlLmpwZycsXG4gICAgYXJ0aXN0TGluazogXCJodHRwOi8vd3d3LmFuYWVzdGV2ZWxsb3JlbnMuY29tXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdqYWNraWUgZnVydGFkbycsXG4gICAgaW1hZ2VVUkw6ICdodHRwczovL3MzLmFtYXpvbmF3cy5jb20vYXJ0ZmFyZS1wcm9kdWN0aW9uLW1vYmlsZS9BcnR3b3Jrcy9JbWFnZXMvSW1hZ2UtMS9pbWFnZS0xLWQ2N2IwNjE2LTA3N2ItNGZlZS05N2JlLTI3NWU0ZGRlNjEwNy5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cHM6Ly9qYWNraWVmdXJ0YWRvLmNvbS9cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ3ZpdmlhbmUgc2Fzc2VuJyxcbiAgICBpbWFnZVVSTDogJ2h0dHBzOi8vd3d3LnZpdmlhbmVzYXNzZW4uY29tL3NpdGUvYXNzZXRzL2ZpbGVzLzI5NDAvdW1icmFfbmFiX3ZzXzM5NDIuMHgxNTAwLmpwZycsXG4gICAgYXJ0aXN0TGluazogXCJodHRwczovL3d3dy52aXZpYW5lc2Fzc2VuLmNvbVwiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH1cbl07XG5cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cblxuXG5cblxuLy8gUmVhY3RET00ucmVuZGVyKFxuLy8gICA8QXBwIC8+LFxuLy8gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpXG4vLyApO1xuXG5cbi8vIGxldCBBcnRpc3RMaW5rcyA9IChwcm9wcykgPT4ge1xuXG4vLyB9XG5cbnsvKiA8aW5wdXQgb25DbGljaz17dGhpcy5oYW5kbGVDYXJkQ2xpY2t9PlxuICB7cHJvcHMudmFsdWUuaXNDYXJkQ2xpY2tlZCA/ICcnIDogJyd9XG48L2lucHV0PiAqL31cblxuLy90aGlzLnByb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlKHRoaXMucHJvcHMudmFsdWUuaXNIZWFydEZpbGxlZClcbi8vb25DbGljaz17ICgpID0+IHByb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlKHByb3BzLmFydGlzdCkgfVxuXG4vLyBsZXQgQXJ0aXN0Q2FyZHMgPSAocHJvcHMpID0+IChcbi8vICAgPGRpdiBjbGFzc05hbWU9XCJhcnRpc3QtY2FyZC1lbnRyeVwiPlxuLy8gICAgIDxkaXY+XG4vLyAgICAgICA8aW1nIHNyYz17cHJvcHMuYXJ0aXN0LmltYWdlVVJMfT48L2ltZz5cbi8vICAgICA8L2Rpdj5cbi8vICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYXJ0LWljb25cIiBvbkNsaWNrPXsgKCkgPT4gcHJvcHMuaGFuZGxlSGVhcnRUb2dnbGUocHJvcHMuYXJ0aXN0KSB9PlxuLy8gICAgICAgPEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYUhlYXJ0fSBzaXplPVwiMnhcIiAvPlxuLy8gICAgIDwvZGl2PlxuLy8gICA8L2Rpdj5cbi8vICAgKTtcblxuIC8vIGxldCBMaXN0QXJ0aXN0cyA9IChwcm9wcykgPT4gKFxuICAvLyAgIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtY2FyZHNcIj5cbiAgLy8gICAgIHtwcm9wcy52YWx1ZS5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0LCBpbmRleCkgPT5cbiAgLy8gICAgICAgPEFydGlzdENhcmRzIGFydGlzdD17IGFydGlzdCB9IGtleT17IGluZGV4IH0gaGFuZGxlQ2FyZENsaWNrPXt0aGlzLmhhbmRsZUNhcmRDbGlja30gaGFuZGxlSGVhcnRUb2dnbGU9e3RoaXMuaGFuZGxlSGVhcnRUb2dnbGV9IC8+XG4gIC8vICAgICApfVxuICAvLyAgIDwvZGl2PlxuICAvLyApO1xuXG4gIC8vIG9uQ2xpY2s9eyAoKSA9PiBwcm9wcy5oYW5kbGVIZWFydFRvZ2dsZShwcm9wcy5hcnRpc3QpIH0gLy9wcm9wcy52YWx1ZS5pc0hlYXJ0RmlsbGVkXG5cbiAgLy9vbkNsaWNrPXt0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlfVxuXG4gIC8vIDxkaXY+XG4gIC8vICAgICAgICAgICA8aW1nIHNyYz17YXJ0aXN0LmltYWdlVVJMfSBrZXk9eyBpbmRleCB9PjwvaW1nPlxuXG4gIC8vICAgICAgICAgICB7LyogPEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYUhlYXJ0fSBzaXplPVwiMnhcIiAvPiAqL31cbiAgLy8gICAgICAgICAgIDwvZGl2PlxuICAvLyAgICAgICAgIClcbiAgLy8gICAgICAgICApfVxuXG4gIC8vICAgICAgICAgey8qIDxpbnB1dCBvbkNsaWNrPXt0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlfT5cbiAgLy8gICAgICAgICAgIHtwcm9wcy52YWx1ZS5pc0hlYXJ0RmlsbGVkID8gPGRpdiBjbGFzc05hbWU9XCJoZWFydFwiPjxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQgZmEtMnhcIj48L2k+PC9hPjwvZGl2PiA6IDxkaXYgY2xhc3NOYW1lPVwiaGVhcnRcIj48YSBocmVmPVwiI1wiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWhlYXJ0LW8gZmEtMnhcIj48L2k+PC9hPjwvZGl2Pn1cbiAgLy8gICAgICAgICA8L2lucHV0PiAqL31cblxuXG4vLyBnZXRBcnRpc3RzUGFnZSgpIHtcbi8vICAgZmV0Y2goJy8nLCB7XG4vLyAgICAgbWV0aG9kOiAnR0VUJ1xuLy8gICB9KTtcbi8vIH1cbi8vIGdldExpa2VkQXJ0aXN0cygpIHtcbi8vICAgLy9sZXQgZGF0YSA9IHsgbGlrZWRBcnRpc3RzIH07IC8vdGhpcy5zdGF0ZS5saWtlZEFydGlzdHM/XG4vLyAgIC8vY29uc29sZS5sb2coJ2xpa2VkQXJ0aXN0czogJywgbGlrZWRBcnRpc3RzKTtcbi8vICAgZmV0Y2goJy9hcnRpc3RzJywge1xuLy8gICAgIG1ldGhvZDogJ0dFVCdcbi8vICAgfSlcbi8vICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4vLyAgICAgLnRoZW4oZGF0YSA9PiB7XG4vLyAgICAgICB0aGlzLnNldFN0YXRlKHtsaWtlZEFydGlzdHM6IGRhdGF9KVxuLy8gICAgIH0pXG4vLyAgICAgLmNhdGNoKGVyciA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZygnZXJyb3IgZ2V0dGluZyBsaWtlZCBhcnRpc3RzJywgZXJyKTtcbi8vICAgICB9KTtcbi8vIH1cbi8vIGNvbXBvbmVudERpZE1vdW50KCkge1xuLy8gICB0aGlzLnBvc3RMaWtlZEFydGlzdHMoKTtcbi8vIH1cbi8vIHBvc3RMaWtlZEFydGlzdHMoZGF0YSkgeyAvL3Bhc3MgaW4gY2FsbGJhY2ssIHRoZW4gY2FsbCB3L2RhdGEgb3IgZGF0YS5yZXN1bHQgd2hlbiBoYW5kbGluZyByZXM/XG4vLyAgIGZldGNoKCcvYXJ0aXN0cycsIHtcbi8vICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4vLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcbi8vICAgfSlcbi8vICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpICAvL3BhcnNlcyB0aGUgcmVzcG9uc2UgYXMgSlNPTlxuLy8gICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZTogJywgcmVzKTtcbi8vICAgLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZygnc3VjY2VzczogJywgZGF0YSkpXG4vLyAgIC5jYXRjaChlcnIgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKCdlcnJvciBwb3N0aW5nIGxpa2VkIGFydGlzdHM6ICcsIGVycik7XG4vLyAgIH0pO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBUb2dnbGVIZWFydChwcm9wcykge1xuLy8gICByZXR1cm4gKFxuLy8gICAgIC8vb25DbGljaz17dGhpcy5oYW5kbGVIZWFydENsaWNrfVxuLy8gICAgIDxpbnB1dCBvbkNsaWNrPXsoZSkgPT4ge1xuLy8gICAgICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuLy8gICAgICAgcHJvcHMuaXNIZWFydEZpbGxlZCA/ICdmYSBmYS1oZWFydCBmYS0yeCcgOiAnZmEgZmEtaGVhcnQtbyBmYS0yeCc7XG4vLyAgICAgICAvL3B1c2ggYXJ0aXN0cyBpbnRvIGxpa2VkQXJ0aXN0c1xuLy8gICAgICAgLy9wb3N0IHRvIGRiIC0tPiBwYXNzIGluIGFydGlzdHMgd2hvc2UgaGVhcnRzIGFyZSBmaWxsZWQtaW5cbi8vICAgICAgIC8vaWYgKHByb3BzLmlzSGVhcnRGaWxsZWQgPT09IHRydWUpLCAnZmEgZmEtaGVhcnQgZmEtMngnLCBwb3N0XG4vLyAgICAgICBwcm9wcy5wb3N0TGlrZWRBcnRpc3RzKCk7XG4vLyAgICAgfX0+XG4vLyAgICAgPC9pbnB1dD5cbi8vICAgKTtcbi8vIH1cbi8vIGNsYXNzIFRvZ2dsZUhlYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICBzdXBlcihwcm9wcyk7XG4vLyAgICAgdGhpcy5zdGF0ZSA9IHtpc0hlYXJ0RmlsbGVkOiAnZmFsc2UnfTtcbi8vICAgICB0aGlzLmhhbmRsZUhlYXJ0Q2xpY2sgPSB0aGlzLmhhbmRsZUhlYXJ0Q2xpY2suYmluZCh0aGlzKTtcbi8vICAgfVxuLy8gICBoYW5kbGVIZWFydENsaWNrKCkge1xuLy8gICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbi8vICAgICAgIGlzSGVhcnRGaWxsZWQ6ICFzdGF0ZS5pc0hlYXJ0RmlsbGVkXG4vLyAgICAgfSkpO1xuLy8gICB9XG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlSGVhcnRDbGlja30+XG4vLyAgICAgICAgIHt0aGlzLnN0YXRlLmlzSGVhcnRGaWxsZWQgPyAnZmEgZmEtaGVhcnQgZmEtMngnIDogJ2ZhIGZhLWhlYXJ0LW8gZmEtMngnfVxuLy8gICAgICAgPC9pbnB1dD5cbi8vICAgICApO1xuLy8gICB9XG4vLyB9XG5cbi8vIHBvc3RMaWtlZEFydGlzdHMoKSB7IC8vbm90IGZyb250IGVuZCBldmVudCwgc28gY2FuJ3QgdXNlIGVcbi8vICAgLy9lLnByZXZlbnRkZWZhdWx0KCk7XG4vLyAgICAgZmV0Y2goJy9mYXZvcml0ZXMnLCB7XG4vLyAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbi8vICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbi8vICAgICAgICAgQXJ0aXN0TGlzdDogdGhpcy5zdGF0ZS5BcnRpc3RMaXN0XG4vLyAgICAgICB9KVxuLy8gICAgIH0pXG4vLyAgICAgLnRoZW4ocmVzID0+IHtcbi8vICAgICAgIC8vY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnLCByZXMpO1xuLy8gICAgICAgLy9sZXQgcGFyc2VkUmVxID0gSlNPTi5wYXJzZShyZXEuYm9keSk7XG4vLyAgICAgICByZXMuanNvbigpO1xuLy8gICAgICAgLy9KU09OLnBhcnNlIC0tPiBpcyBpdCBhbHJlYWR5IHBhcnNlZCBiZWN1YXNlIG9mIGJvZHlQYXJzZXI/XG4vLyAgICAgfSlcbi8vICAgICAudGhlbihkYXRhID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzOiAnLCBkYXRhKTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaChlcnIgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHBvc3RpbmcgbGlrZWQgYXJ0aXN0czogJywgZXJyKTtcbi8vICAgICB9KVxuLy8gICB9XG5cbi8vIGNsYXNzIEFydGlzdENhcmRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICBzdXBlcihwcm9wcyk7XG4vLyAgICAgdGhpcy5zdGF0ZSA9IHtcbi8vICAgICAgIGlzQ2FyZENsaWNrZWQ6IGZhbHNlLFxuLy8gICAgICAgYXJ0aXN0VVJMOiAnJ1xuLy8gICAgIH07XG4vLyAgICAgdGhpcy5oYW5kbGVDYXJkQ2xpY2sgPSB0aGlzLmhhbmRsZUNhcmRDbGljay5iaW5kKHRoaXMpO1xuLy8gICB9XG4vLyAgIGhhbmRsZUNhcmRDbGljayhlKSB7XG4vLyAgICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuLy8gICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbi8vICAgICAgIGlzQ2FyZENsaWNrZWQ6ICFzdGF0ZS5pc0NhcmRDbGlja2VkXG4vLyAgICAgfSkpO1xuLy8gICB9XG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FyZENsaWNrfT5cbi8vICAgICAgICAge3RoaXMuc3RhdGUuaXNDYXJkQ2xpY2tlZCA/ICcnIDogJyd9XG4vLyAgICAgICA8L2lucHV0PlxuLy8gICAgICk7XG4vLyAgIH1cbi8vIH1cblxuLy8ge3Byb3BzLnZhbHVlLmFydGlzdExpc3QubWFwKGFydGlzdCwgKGFydGlzdCwgaW5kZXgpID0+IHsgLy9lbGVtZW50LCB0aGVuIGZ1bmMgcnVuIG9uIGVhY2ggZWxcbi8vICAgcmV0dXJuIDxhcnRpc3RMaXN0IGFydGlzdD17IGFydGlzdCB9IGtleT17IGluZGV4IH0gaGFuZGxlSGVhcnRUb2dnbGU9e3Byb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlfSAvPjtcbi8vIH0pfVxuXG4vLyB7cHJvcHMuYXJ0aXN0TGlzdC5tYXAoYXJ0aXN0LCAoYXJ0aXN0LCBpbmRleCkgPT4ge1xuLy8gICByZXR1cm4gPEFydGlzdExpc3QgYXJ0aXN0PXsgYXJ0aXN0IH0ga2V5PXsgaW5kZXggfSAvPjtcbi8vIH0pfVxuXG4vL2xldCBwYXJzZWRSZXEgPSBKU09OLnBhcnNlKHJlcS5ib2R5KTtcblxuXG4vLyBmdW5jdGlvbiBXZWxjb21lKHByb3BzKSB7XG4vLyAgIHJldHVybiA8aDE+SGVsbG8sIHtwcm9wcy5uYW1lfTwvaDE+O1xuLy8gfVxuXG4vLyBjb25zdCBlbGVtZW50ID0gPFdlbGNvbWUgbmFtZT1cIlNhcmFcIiAvPjtcblxuXG4vLyBSZWFjdERPTS5yZW5kZXIoXG4vLyAgIGVsZW1lbnQsXG4vLyAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jylcbi8vICk7XG5cblxuey8qIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtY2FyZHNcIj5cbntwcm9wcy52YWx1ZS5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0KSA9PiAgLy9lbGVtZW50LCB0aGVuIGZ1bmMgcnVuIG9uIGVhY2ggZWxcbiAgPGRpdj57YXJ0aXN0LmltYWdlVVJMfTxkaXYvPlxuKX1cbjxpbnB1dCBvbkNsaWNrPXt0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlfT5cbiAge3Byb3BzLnZhbHVlLmlzSGVhcnRGaWxsZWQgPyA8ZGl2IGNsYXNzTmFtZT1cImhlYXJ0XCI+PGEgaHJlZj1cIiNcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFydCBmYS0yeFwiPjwvaT48L2E+PC9kaXY+IDogPGRpdiBjbGFzc05hbWU9XCJoZWFydFwiPjxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQtbyBmYS0yeFwiPjwvaT48L2E+PC9kaXY+fVxuPC9pbnB1dD5cbjwvZGl2PiAqL31cblxuey8qIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtY2FyZHNcIj5cbntwcm9wcy52YWx1ZS5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0LCBpbmRleCkgPT4gKFxuICA8ZGl2PlxuICA8aW1nIHNyYz17YXJ0aXN0LmltYWdlVVJMfSBrZXk9eyBpbmRleCB9PjwvaW1nPlxuXG4gIHsvKiA8Rm9udEF3ZXNvbWVJY29uIGljb249e2ZhSGVhcnR9IHNpemU9XCIyeFwiIC8+ICovfVxuLy8gICA8L2Rpdj5cbi8vIClcbi8vICl9XG5cbnsvKiA8aW5wdXQgb25DbGljaz17dGhpcy5oYW5kbGVIZWFydFRvZ2dsZX0+XG4gIHtwcm9wcy52YWx1ZS5pc0hlYXJ0RmlsbGVkID8gPGRpdiBjbGFzc05hbWU9XCJoZWFydFwiPjxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQgZmEtMnhcIj48L2k+PC9hPjwvZGl2PiA6IDxkaXYgY2xhc3NOYW1lPVwiaGVhcnRcIj48YSBocmVmPVwiI1wiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWhlYXJ0LW8gZmEtMnhcIj48L2k+PC9hPjwvZGl2Pn1cbjwvaW5wdXQ+ICovfVxuLy8gPC9kaXY+ICovfVxuXG4vLyBsZXQgQXJ0aXN0Q2FyZHMgPSAocHJvcHMpID0+IChcbi8vICAgLy9jb25zb2xlLmxvZygncHJvcHMgZnJvbSBBcnRpc3RDYXJkcyDwn6aKJywgcHJvcHMpXG4vLyAgIDxkaXYgY2xhc3NOYW1lPVwiYXJ0aXN0LWNhcmQtZW50cnlcIj5cbi8vICAgICA8ZGl2PlxuLy8gICAgICAgPGltZyBzcmM9e3Byb3BzLmFydGlzdC5pbWFnZVVSTH0+PC9pbWc+XG4vLyAgICAgPC9kaXY+XG4vLyAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFydC1pY29uXCIgb25DbGljaz17cHJvcHMuaGFuZGxlSGVhcnRDbGljayhwcm9wcy5hcnRpc3QpfT5cbi8vICAgICAgIDxGb250QXdlc29tZUljb24gaWNvbj17ZmFIZWFydH0gc2l6ZT1cIjJ4XCIgLz5cbi8vICAgICA8L2Rpdj5cbi8vICAgPC9kaXY+XG4vLyAgICk7XG5cbi8vdmFyaWFibGUgPSB0aGlzLnN0YXRlLkFydGlzdExpc3RcbiAgICAgICAgLy9sZXQgbGlzdFN0YXRlID0gdGhpcy5zdGF0ZS5BcnRpc3RMaXN0O1xuICAgICAgICAvL2xldCBtb2RBcnRpc3RPYmogPSBPYmplY3QuYXNzaWduKHt9LCBhcnRpc3QpO1xuICAgICAgICAvLyBpZiAobW9kQXJ0aXN0T2JqLmlzTGlrZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vICAgbW9kQXJ0aXN0T2JqLmlzTGlrZWQgPSB0cnVlO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgIG1vZEFydGlzdE9iai5pc0xpa2VkID0gZmFsc2U7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9jb3B5TGlzdFttb2RBcnRpc3RPYmpdXG4gICAgICAgIC8vdGhpcy5zdGF0ZS5BcnRpc3RMaXN0XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZygnIGNvcHlMaXN0MjogJywgY29weUxpc3QpO1xuICAgICAgICAvL21vZEFydGlzdE9iaiA9IHZhcmlhYmxlW2FydGlzdF1cbiAgICAgICAgLy9sZXQgbW9kQXJ0aXN0T2JqID0gY29weUxpc3RbYXJ0aXN0XTsiXX0=