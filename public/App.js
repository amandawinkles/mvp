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
//<i class="fas fa-heart"></i> //solid
//<FontAwesomeIcon icon={faHeart} size="2x" /> //solid
//<i class="far fa-heart"></i> //outline
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
        handleCardClick: this.handleCardClick,
        handleHeartToggle: this.handleHeartToggle,
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
  }, props.value.ArtistList.map((artist, index) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: artist.imageURL,
    key: index
  })))));
}

function Heart() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faHeart,
    size: "2x"
  }));
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
} // getArtistsPage() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9BcHAuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiZmFIZWFydCIsImZhckhlYXJ0IiwiRm9udEF3ZXNvbWVJY29uIiwiQXBwIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwicGFnZSIsImlzSGVhcnRGaWxsZWQiLCJBcnRpc3RMaXN0IiwiaXNDYXJkQ2xpY2tlZCIsImxpa2VkQXJ0aXN0cyIsImhhbmRsZUJ1dHRvbkNsaWNrIiwiYmluZCIsIm90aGVyUGFnZSIsImhhbmRsZUNhcmRDbGljayIsImhhbmRsZUhlYXJ0VG9nZ2xlIiwicG9zdExpa2VkQXJ0aXN0cyIsImUiLCJwcmV2ZW50ZGVmYXVsdCIsInNldFN0YXRlIiwicHJldlN0YXRlIiwiZ2V0QXJ0aXN0c1BhZ2UiLCJmZXRjaCIsIm1ldGhvZCIsImNvbXBvbmVudERpZE1vdW50IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnIiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW5kZXIiLCJBcnRpc3RzUGFnZSIsInZhbHVlIiwibWFwIiwiYXJ0aXN0IiwiaW5kZXgiLCJpbWFnZVVSTCIsIkhlYXJ0IiwiRmF2b3JpdGVzUGFnZSIsIm5hbWUiLCJhcnRpc3RMaW5rIiwiaXNMaWtlZCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsbUNBQXhCO0FBQ0EsU0FBU0MsUUFBVCxRQUF5QixxQ0FBekI7QUFDQSxTQUFTQyxlQUFULFFBQWdDLGdDQUFoQztBQUVBOzs7Ozs7Ozs7O0FBV0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTUMsR0FBTixTQUFrQkosS0FBSyxDQUFDSyxTQUF4QixDQUFrQztBQUNoQ0MsRUFBQUEsV0FBVyxDQUFDQyxLQUFELEVBQVE7QUFDakIsVUFBTUEsS0FBTjtBQUNBLFNBQUtDLEtB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Ozs7OztBQU9TIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZhSGVhcnQgfSBmcm9tIFwiQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zXCI7XG5pbXBvcnQgeyBmYXJIZWFydCB9IGZyb20gXCJAZm9ydGF3ZXNvbWUvZnJlZS1yZWd1bGFyLXN2Zy1pY29uc1wiO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVJY29uIH0gZnJvbSBcIkBmb3J0YXdlc29tZS9yZWFjdC1mb250YXdlc29tZVwiO1xuXG4vKlxuY29tcG9uZW50czpcbjEuIGFwcCAtIGV2ZXJ5dGhpbmcgd2lsbCBiZSByZW5kZXJlZCwgaGVhcnRUb2dnbGUsIGJ1dHRvbkNsaWNrLCBwb3N0TGlrZWRBcnRpc3RzIHRvIGRiXG4yLiBwYWdlcyAtIGNvbnRhaW5lciBjb21wb25lbnRzLCByZW5kZXIgb3RoZXIgY29tcG9uZW50cyBpbnNpZGVcbjMuIGFydGlzdCBjYXJkcyAtIG1hcHBpbmcgZWFjaCBjYXJkIGluZGl2aWR1YWxseSBmcm9tIGFydGlzdExpc3RcbjQuIGZhdm9yaXRlcyAtIHJlbmRlciBlYWNoIGxpbmsgZnJvbSBmYXZvcml0ZXNMaXN0IHcvbWFwIGZ1bmNcblxucnVubmluZyBvcmRlcjpcbiAgLSBjb25zdHJ1Y3RvciwgcmVuZGVyLCBjb21wb25lbnREaWRNb3VudFxuKi9cblxuLy88aSBjbGFzcz1cImZhcyBmYS1oZWFydFwiPjwvaT4gLy9zb2xpZFxuLy88Rm9udEF3ZXNvbWVJY29uIGljb249e2ZhSGVhcnR9IHNpemU9XCIyeFwiIC8+IC8vc29saWRcbi8vPGkgY2xhc3M9XCJmYXIgZmEtaGVhcnRcIj48L2k+IC8vb3V0bGluZVxuLy88Rm9udEF3ZXNvbWVJY29uIGljb249e1snZmFyJywgJ2hlYXJ0J119IHNpemU9XCIyeFwiIC8+IC8vb3V0bGluZVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgcGFnZTogJ2FydGlzdHMnLFxuICAgICAgaXNIZWFydEZpbGxlZDogJ2ZhbHNlJyxcbiAgICAgIC8vYXJ0aXN0TGlzdDogdGhpcy5wcm9wcy5hcnRpc3RMaXN0LFxuICAgICAgQXJ0aXN0TGlzdDogQXJ0aXN0TGlzdCxcbiAgICAgIGlzQ2FyZENsaWNrZWQ6IGZhbHNlLFxuICAgICAgLy9saWtlZEFydGlzdHMgLS0+IHtuYW1lLCBpbWFnZVVSTCwgYXJ0aXN0TGluaywgaXNMaWtlZH1cbiAgICAgIGxpa2VkQXJ0aXN0czogW11cbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlQnV0dG9uQ2xpY2sgPSB0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vdGhlclBhZ2UgPSB0aGlzLm90aGVyUGFnZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQ2FyZENsaWNrID0gdGhpcy5oYW5kbGVDYXJkQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlID0gdGhpcy5oYW5kbGVIZWFydFRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMucG9zdExpa2VkQXJ0aXN0cyA9IHRoaXMucG9zdExpa2VkQXJ0aXN0cy5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZUJ1dHRvbkNsaWNrKGUpIHtcbiAgICBlLnByZXZlbnRkZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiAoe1xuICAgICAgcGFnZTogIXN0YXRlLnBhZ2VcbiAgICB9KSk7XG4gIH1cbiAgb3RoZXJQYWdlKG90aGVyUGFnZSkge1xuICAgIHRoaXMuc2V0U3RhdGUocHJldlN0YXRlID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhZ2U6IG90aGVyUGFnZVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgaGFuZGxlQ2FyZENsaWNrKGUpIHtcbiAgICBlLnByZXZlbnRkZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSA9PiAoe1xuICAgICAgaXNDYXJkQ2xpY2tlZDogIXN0YXRlLmlzQ2FyZENsaWNrZWRcbiAgICB9KSk7XG4gIH1cbiAgaGFuZGxlSGVhcnRUb2dnbGUoZSkgeyAvL2lmIGlzSGVhcnRGaWxsZWQgPT09IHRydWUsIHBvc3RMaWtlZEFydGlzdHMsIGVsc2UgZGVsZXRlIGFydGlzdFxuICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+ICh7XG4gICAgICBpc0hlYXJ0RmlsbGVkOiAhc3RhdGUuaXNIZWFydEZpbGxlZFxuICAgIH0pKTtcbiAgfVxuICBnZXRBcnRpc3RzUGFnZSgpIHtcbiAgICBmZXRjaCgnLycsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBmZXRjaCgnL2FydGlzdHMnLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnXG4gICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn8J+RmCBkYXRhIGluIEdFVDogJywgZGF0YSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xpa2VkQXJ0aXN0czogZGF0YX0pXG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBnZXR0aW5nIGxpa2VkIGFydGlzdHMnLCBlcnIpO1xuICAgICAgfSk7XG4gIH1cbiAgcG9zdExpa2VkQXJ0aXN0cyhkYXRhKSB7IC8vcGFzcyBpbiBjYWxsYmFjaywgdGhlbiBjYWxsIHcvZGF0YSBvciBkYXRhLnJlc3VsdCB3aGVuIGhhbmRsaW5nIHJlcz9cbiAgICBjb25zb2xlLmxvZygn8J+ntiBkYXRhIGluIFBPU1Q6ICcsIGRhdGEpO1xuICAgIGRhdGEgPSB7bGlrZWRBcnRpc3RzOiB0aGlzLnN0YXRlLmxpa2VkQXJ0aXN0c307XG4gICAgZmV0Y2goJy9hcnRpc3RzJywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgIH0pXG4gICAgLy8gLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpICAvL3BhcnNlcyB0aGUgcmVzcG9uc2UgYXMgSlNPTlxuICAgIC8vICAgY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnLCByZXMpO1xuICAgIC8vIC50aGVuKGRhdGEgPT4gY29uc29sZS5sb2coJ3N1Y2Nlc3M6ICcsIGRhdGEpKVxuICAgIC8vIC5jYXRjaChlcnIgPT4ge1xuICAgIC8vICAgY29uc29sZS5sb2coJ2Vycm9yIHBvc3RpbmcgbGlrZWQgYXJ0aXN0czogJywgZXJyKTtcbiAgICAvLyB9KTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgLy9yZXR1cm4gPEhlYXJ0Lz5cbiAgICBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSAnYXJ0aXN0cycpIHtcbiAgICAgIC8vYnV0dG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9uQ2xpY2t9XG4gICAgICByZXR1cm4gKFxuICAgICAgICAgIDxBcnRpc3RzUGFnZSB2YWx1ZT17dGhpcy5zdGF0ZX0gb3RoZXJQYWdlPXt0aGlzLm90aGVyUGFnZX0gaGFuZGxlQ2FyZENsaWNrPXt0aGlzLmhhbmRsZUNhcmRDbGlja30gaGFuZGxlSGVhcnRUb2dnbGU9e3RoaXMuaGFuZGxlSGVhcnRUb2dnbGV9IHBvc3RBcnRpc3RzPXt0aGlzLnBvc3RMaWtlZEFydGlzdHN9IC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL2J1dHRvbkNsaWNrPXt0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrfVxuICAgICAgLy9oYW5kbGUgbGluayBjbGljaz9cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGYXZvcml0ZXNQYWdlIHZhbHVlPXt0aGlzLnN0YXRlfSBvdGhlclBhZ2U9e3RoaXMub3RoZXJQYWdlfSAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvL3JldHVybiA8ZGl2PmhlbGxvPC9kaXY+XG4gIH1cbn1cblxuZnVuY3Rpb24gQXJ0aXN0c1BhZ2UocHJvcHMpIHsgLy9tYXBwaW5nIGVhY2ggY2FyZCBpbmRpdmlkdWFsbHkgZnJvbSBhcnRpc3RMaXN0XG4gIGNvbnNvbGUubG9nKCdBcHAgcHJvcHMnLCBwcm9wcyk7XG4gIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPkFydGlzdHM8L2gxPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvblwiIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICBwcm9wcy5vdGhlclBhZ2UoJ2Zhdm9yaXRlcycpO1xuICAgICAgICAgIH19PlxuICAgICAgICAgIEZhdm9yaXRlc1xuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbm5lci1jb250YWluZXJcIiBpZD1cImFydGlzdC1jYXJkc1wiPlxuICAgICAgICAgIHtwcm9wcy52YWx1ZS5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxpbWcgc3JjPXthcnRpc3QuaW1hZ2VVUkx9IGtleT17IGluZGV4IH0+PC9pbWc+XG5cbiAgICAgICAgICAgIHsvKiA8Rm9udEF3ZXNvbWVJY29uIGljb249e2ZhSGVhcnR9IHNpemU9XCIyeFwiIC8+ICovfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKVxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlSGVhcnRUb2dnbGV9PlxuICAgICAgICAgICAge3Byb3BzLnZhbHVlLmlzSGVhcnRGaWxsZWQgPyA8ZGl2IGNsYXNzTmFtZT1cImhlYXJ0XCI+PGEgaHJlZj1cIiNcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFydCBmYS0yeFwiPjwvaT48L2E+PC9kaXY+IDogPGRpdiBjbGFzc05hbWU9XCJoZWFydFwiPjxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQtbyBmYS0yeFwiPjwvaT48L2E+PC9kaXY+fVxuICAgICAgICAgIDwvaW5wdXQ+ICovfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICApXG59XG5cbmZ1bmN0aW9uIEhlYXJ0KCkge1xuICByZXR1cm4gKFxuICA8ZGl2PlxuICAgIDxGb250QXdlc29tZUljb24gaWNvbj17ZmFIZWFydH0gc2l6ZT1cIjJ4XCIgLz5cbiAgPC9kaXY+XG5cbiAgKVxufVxuXG5mdW5jdGlvbiBGYXZvcml0ZXNQYWdlKHByb3BzKSB7IC8vcmVuZGVyIGVhY2ggbGluayBmcm9tIGZhdm9yaXRlc0xpc3Qgdy9tYXAgZnVuY1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICA8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPkZhdm9yaXRlczwvaDE+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvblwiIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgIHByb3BzLm90aGVyUGFnZSgnYXJ0aXN0cycpO1xuICAgICAgICB9fT5cbiAgICAgICAgQXJ0aXN0c1xuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubmVyLWNvbnRhaW5lclwiIGlkPVwiYXJ0aXN0LWxpbmtzXCI+XG4gICAgICAgIHtwcm9wcy5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+e2FydGlzdC5uYW1lLCBhcnRpc3QuYXJ0aXN0TGlua308L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5jb25zdCBBcnRpc3RMaXN0ID0gW1xuICB7XG4gICAgbmFtZTogJ2xldGhhIHdpbHNvbicsXG4gICAgaW1hZ2VVUkw6ICdodHRwczovL3d3dy5sZXRoYXByb2plY3RzLmNvbS92aXN1YWxzL2ltYWdlcy9vdXRkb29ycy9naG9zdG9mYXRyZWUtcmlnaHQtdmlldy5qcGcnLFxuICAgIGFydGlzdExpbms6IFwiaHR0cHM6Ly93d3cubGV0aGFwcm9qZWN0cy5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2dlbmVzaXMgYmFleicsXG4gICAgaW1hZ2VVUkw6ICdodHRwOi8vbWVkaWEudmlyYmNkbi5jb20vY2RuX2ltYWdlcy9yZXNpemVfMTYwMHgxNjAwLzIzL2FjMTcxOGI3NDU5NjVhZWQtQmFlel8xLmpwZycsXG4gICAgYXJ0aXN0TGluazogXCJodHRwOi8vd3d3LmdlbmVzaXNiYWV6LmNvbS9cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ3NhcmFoLWxvdWlzZSBiYXJiZXR0JyxcbiAgICBpbWFnZVVSTDogJ2h0dHBzOi8vYWlzc2VsbGVzLmZpbGVzLndvcmRwcmVzcy5jb20vMjAxMC8xMi9pbWdfMDAxNi5qcGc/dz0xMTA0JyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHBzOi8vYWlzc2VsbGVzLmZpbGVzLndvcmRwcmVzcy5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2plc3NpY2EgaGFsb25lbicsXG4gICAgaW1hZ2VVUkw6ICdodHRwOi8vd3d3Lmplc3NpY2FoYWxvbmVuLmNvbS9maWxlcy9naW1ncy80NF9zcGxpY2VkLWJyYW5jaC1iYWxsLTEuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHA6Ly93d3cuamVzc2ljYWhhbG9uZW4uY29tXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdsYXVyYSBvd2VucycsXG4gICAgaW1hZ2VVUkw6ICdodHRwczovL3d3dy5vd2Vuc2xhdXJhLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxMy8wMS9IUS0xNkxPOTM1OVAtVW50aXRsZWQuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHBzOi8vd3d3Lm93ZW5zbGF1cmEuY29tXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdkZWJvcmFoIHJvYmVydHMnLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly9pMC53cC5jb20vY29uZmxpY3RvZmludGVyZXN0dHguY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDE3LzA3L1RoZS1Qb3dlci1kYW5jZS0zMHgyMi0yMDE3LmpwZWc/dz00NjknLFxuICAgIGFydGlzdExpbms6IFwiaHR0cDovL3d3dy5kZWJvcmFocm9iZXJ0c2FydC5jb20vXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdhbmEgZXN0ZXZlIGxsb3JlbnMnLFxuICAgIGltYWdlVVJMOiAnaHR0cDovL3d3dy5hbmFlc3RldmVsbG9yZW5zLmNvbS9wcm9qZWN0cy9wcm9qZWN0Ni8wNyUyMFF1YXN5JTIwSW5maW5pdGUuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHA6Ly93d3cuYW5hZXN0ZXZlbGxvcmVucy5jb21cIixcbiAgICBpc0xpa2VkOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbmFtZTogJ2phY2tpZSBmdXJ0YWRvJyxcbiAgICBpbWFnZVVSTDogJ2h0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9hcnRmYXJlLXByb2R1Y3Rpb24tbW9iaWxlL0FydHdvcmtzL0ltYWdlcy9JbWFnZS0xL2ltYWdlLTEtZDY3YjA2MTYtMDc3Yi00ZmVlLTk3YmUtMjc1ZTRkZGU2MTA3LmpwZycsXG4gICAgYXJ0aXN0TGluazogXCJodHRwczovL2phY2tpZWZ1cnRhZG8uY29tL1wiLFxuICAgIGlzTGlrZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAndml2aWFuZSBzYXNzZW4nLFxuICAgIGltYWdlVVJMOiAnaHR0cHM6Ly93d3cudml2aWFuZXNhc3Nlbi5jb20vc2l0ZS9hc3NldHMvZmlsZXMvMjk0MC91bWJyYV9uYWJfdnNfMzk0Mi4weDE1MDAuanBnJyxcbiAgICBhcnRpc3RMaW5rOiBcImh0dHBzOi8vd3d3LnZpdmlhbmVzYXNzZW4uY29tXCIsXG4gICAgaXNMaWtlZDogZmFsc2VcbiAgfVxuXTtcblxuXG4vLyBSZWFjdERPTS5yZW5kZXIoXG4vLyAgIDxBcHAgLz4sXG4vLyAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jylcbi8vICk7XG5cblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cbi8vIGxldCBBcnRpc3RMaW5rcyA9IChwcm9wcykgPT4ge1xuXG4vLyB9XG5cbnsvKiA8aW5wdXQgb25DbGljaz17dGhpcy5oYW5kbGVDYXJkQ2xpY2t9PlxuICB7cHJvcHMudmFsdWUuaXNDYXJkQ2xpY2tlZCA/ICcnIDogJyd9XG48L2lucHV0PiAqL31cblxuXG4vLyBnZXRBcnRpc3RzUGFnZSgpIHtcbi8vICAgZmV0Y2goJy8nLCB7XG4vLyAgICAgbWV0aG9kOiAnR0VUJ1xuLy8gICB9KTtcbi8vIH1cbi8vIGdldExpa2VkQXJ0aXN0cygpIHtcbi8vICAgLy9sZXQgZGF0YSA9IHsgbGlrZWRBcnRpc3RzIH07IC8vdGhpcy5zdGF0ZS5saWtlZEFydGlzdHM/XG4vLyAgIC8vY29uc29sZS5sb2coJ2xpa2VkQXJ0aXN0czogJywgbGlrZWRBcnRpc3RzKTtcbi8vICAgZmV0Y2goJy9hcnRpc3RzJywge1xuLy8gICAgIG1ldGhvZDogJ0dFVCdcbi8vICAgfSlcbi8vICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4vLyAgICAgLnRoZW4oZGF0YSA9PiB7XG4vLyAgICAgICB0aGlzLnNldFN0YXRlKHtsaWtlZEFydGlzdHM6IGRhdGF9KVxuLy8gICAgIH0pXG4vLyAgICAgLmNhdGNoKGVyciA9PiB7XG4vLyAgICAgICBjb25zb2xlLmxvZygnZXJyb3IgZ2V0dGluZyBsaWtlZCBhcnRpc3RzJywgZXJyKTtcbi8vICAgICB9KTtcbi8vIH1cbi8vIGNvbXBvbmVudERpZE1vdW50KCkge1xuLy8gICB0aGlzLnBvc3RMaWtlZEFydGlzdHMoKTtcbi8vIH1cbi8vIHBvc3RMaWtlZEFydGlzdHMoZGF0YSkgeyAvL3Bhc3MgaW4gY2FsbGJhY2ssIHRoZW4gY2FsbCB3L2RhdGEgb3IgZGF0YS5yZXN1bHQgd2hlbiBoYW5kbGluZyByZXM/XG4vLyAgIGZldGNoKCcvYXJ0aXN0cycsIHtcbi8vICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4vLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcbi8vICAgfSlcbi8vICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpICAvL3BhcnNlcyB0aGUgcmVzcG9uc2UgYXMgSlNPTlxuLy8gICAgIGNvbnNvbGUubG9nKCdyZXNwb25zZTogJywgcmVzKTtcbi8vICAgLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZygnc3VjY2VzczogJywgZGF0YSkpXG4vLyAgIC5jYXRjaChlcnIgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKCdlcnJvciBwb3N0aW5nIGxpa2VkIGFydGlzdHM6ICcsIGVycik7XG4vLyAgIH0pO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBUb2dnbGVIZWFydChwcm9wcykge1xuLy8gICByZXR1cm4gKFxuLy8gICAgIC8vb25DbGljaz17dGhpcy5oYW5kbGVIZWFydENsaWNrfVxuLy8gICAgIDxpbnB1dCBvbkNsaWNrPXsoZSkgPT4ge1xuLy8gICAgICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuLy8gICAgICAgcHJvcHMuaXNIZWFydEZpbGxlZCA/ICdmYSBmYS1oZWFydCBmYS0yeCcgOiAnZmEgZmEtaGVhcnQtbyBmYS0yeCc7XG4vLyAgICAgICAvL3B1c2ggYXJ0aXN0cyBpbnRvIGxpa2VkQXJ0aXN0c1xuLy8gICAgICAgLy9wb3N0IHRvIGRiIC0tPiBwYXNzIGluIGFydGlzdHMgd2hvc2UgaGVhcnRzIGFyZSBmaWxsZWQtaW5cbi8vICAgICAgIC8vaWYgKHByb3BzLmlzSGVhcnRGaWxsZWQgPT09IHRydWUpLCAnZmEgZmEtaGVhcnQgZmEtMngnLCBwb3N0XG4vLyAgICAgICBwcm9wcy5wb3N0TGlrZWRBcnRpc3RzKCk7XG4vLyAgICAgfX0+XG4vLyAgICAgPC9pbnB1dD5cbi8vICAgKTtcbi8vIH1cbi8vIGNsYXNzIFRvZ2dsZUhlYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICBzdXBlcihwcm9wcyk7XG4vLyAgICAgdGhpcy5zdGF0ZSA9IHtpc0hlYXJ0RmlsbGVkOiAnZmFsc2UnfTtcbi8vICAgICB0aGlzLmhhbmRsZUhlYXJ0Q2xpY2sgPSB0aGlzLmhhbmRsZUhlYXJ0Q2xpY2suYmluZCh0aGlzKTtcbi8vICAgfVxuLy8gICBoYW5kbGVIZWFydENsaWNrKCkge1xuLy8gICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbi8vICAgICAgIGlzSGVhcnRGaWxsZWQ6ICFzdGF0ZS5pc0hlYXJ0RmlsbGVkXG4vLyAgICAgfSkpO1xuLy8gICB9XG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlSGVhcnRDbGlja30+XG4vLyAgICAgICAgIHt0aGlzLnN0YXRlLmlzSGVhcnRGaWxsZWQgPyAnZmEgZmEtaGVhcnQgZmEtMngnIDogJ2ZhIGZhLWhlYXJ0LW8gZmEtMngnfVxuLy8gICAgICAgPC9pbnB1dD5cbi8vICAgICApO1xuLy8gICB9XG4vLyB9XG5cbi8vIHBvc3RMaWtlZEFydGlzdHMoKSB7IC8vbm90IGZyb250IGVuZCBldmVudCwgc28gY2FuJ3QgdXNlIGVcbi8vICAgLy9lLnByZXZlbnRkZWZhdWx0KCk7XG4vLyAgICAgZmV0Y2goJy9mYXZvcml0ZXMnLCB7XG4vLyAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbi8vICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbi8vICAgICAgICAgQXJ0aXN0TGlzdDogdGhpcy5zdGF0ZS5BcnRpc3RMaXN0XG4vLyAgICAgICB9KVxuLy8gICAgIH0pXG4vLyAgICAgLnRoZW4ocmVzID0+IHtcbi8vICAgICAgIC8vY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnLCByZXMpO1xuLy8gICAgICAgLy9sZXQgcGFyc2VkUmVxID0gSlNPTi5wYXJzZShyZXEuYm9keSk7XG4vLyAgICAgICByZXMuanNvbigpO1xuLy8gICAgICAgLy9KU09OLnBhcnNlIC0tPiBpcyBpdCBhbHJlYWR5IHBhcnNlZCBiZWN1YXNlIG9mIGJvZHlQYXJzZXI/XG4vLyAgICAgfSlcbi8vICAgICAudGhlbihkYXRhID0+IHtcbi8vICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzOiAnLCBkYXRhKTtcbi8vICAgICB9KVxuLy8gICAgIC5jYXRjaChlcnIgPT4ge1xuLy8gICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHBvc3RpbmcgbGlrZWQgYXJ0aXN0czogJywgZXJyKTtcbi8vICAgICB9KVxuLy8gICB9XG5cbi8vIGNsYXNzIEFydGlzdENhcmRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICBzdXBlcihwcm9wcyk7XG4vLyAgICAgdGhpcy5zdGF0ZSA9IHtcbi8vICAgICAgIGlzQ2FyZENsaWNrZWQ6IGZhbHNlLFxuLy8gICAgICAgYXJ0aXN0VVJMOiAnJ1xuLy8gICAgIH07XG4vLyAgICAgdGhpcy5oYW5kbGVDYXJkQ2xpY2sgPSB0aGlzLmhhbmRsZUNhcmRDbGljay5iaW5kKHRoaXMpO1xuLy8gICB9XG4vLyAgIGhhbmRsZUNhcmRDbGljayhlKSB7XG4vLyAgICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuLy8gICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbi8vICAgICAgIGlzQ2FyZENsaWNrZWQ6ICFzdGF0ZS5pc0NhcmRDbGlja2VkXG4vLyAgICAgfSkpO1xuLy8gICB9XG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FyZENsaWNrfT5cbi8vICAgICAgICAge3RoaXMuc3RhdGUuaXNDYXJkQ2xpY2tlZCA/ICcnIDogJyd9XG4vLyAgICAgICA8L2lucHV0PlxuLy8gICAgICk7XG4vLyAgIH1cbi8vIH1cblxuLy8ge3Byb3BzLnZhbHVlLmFydGlzdExpc3QubWFwKGFydGlzdCwgKGFydGlzdCwgaW5kZXgpID0+IHsgLy9lbGVtZW50LCB0aGVuIGZ1bmMgcnVuIG9uIGVhY2ggZWxcbi8vICAgcmV0dXJuIDxhcnRpc3RMaXN0IGFydGlzdD17IGFydGlzdCB9IGtleT17IGluZGV4IH0gaGFuZGxlSGVhcnRUb2dnbGU9e3Byb3BzLmhhbmRsZUhlYXJ0VG9nZ2xlfSAvPjtcbi8vIH0pfVxuXG4vLyB7cHJvcHMuYXJ0aXN0TGlzdC5tYXAoYXJ0aXN0LCAoYXJ0aXN0LCBpbmRleCkgPT4ge1xuLy8gICByZXR1cm4gPEFydGlzdExpc3QgYXJ0aXN0PXsgYXJ0aXN0IH0ga2V5PXsgaW5kZXggfSAvPjtcbi8vIH0pfVxuXG4vL2xldCBwYXJzZWRSZXEgPSBKU09OLnBhcnNlKHJlcS5ib2R5KTtcblxuXG4vLyBmdW5jdGlvbiBXZWxjb21lKHByb3BzKSB7XG4vLyAgIHJldHVybiA8aDE+SGVsbG8sIHtwcm9wcy5uYW1lfTwvaDE+O1xuLy8gfVxuXG4vLyBjb25zdCBlbGVtZW50ID0gPFdlbGNvbWUgbmFtZT1cIlNhcmFcIiAvPjtcblxuXG4vLyBSZWFjdERPTS5yZW5kZXIoXG4vLyAgIGVsZW1lbnQsXG4vLyAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jylcbi8vICk7XG5cblxuey8qIDxkaXYgY2xhc3NOYW1lPVwiaW5uZXItY29udGFpbmVyXCIgaWQ9XCJhcnRpc3QtY2FyZHNcIj5cbntwcm9wcy52YWx1ZS5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0KSA9PiAgLy9lbGVtZW50LCB0aGVuIGZ1bmMgcnVuIG9uIGVhY2ggZWxcbiAgPGRpdj57YXJ0aXN0LmltYWdlVVJMfTxkaXYvPlxuKX1cbjxpbnB1dCBvbkNsaWNrPXt0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlfT5cbiAge3Byb3BzLnZhbHVlLmlzSGVhcnRGaWxsZWQgPyA8ZGl2IGNsYXNzTmFtZT1cImhlYXJ0XCI+PGEgaHJlZj1cIiNcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFydCBmYS0yeFwiPjwvaT48L2E+PC9kaXY+IDogPGRpdiBjbGFzc05hbWU9XCJoZWFydFwiPjxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQtbyBmYS0yeFwiPjwvaT48L2E+PC9kaXY+fVxuPC9pbnB1dD5cbjwvZGl2PiAqL31cblxuIl19