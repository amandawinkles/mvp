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
      }
    })
  }
  handleCardClick(e) {
    e.preventdefault();
    this.setState(state => ({
      isCardClicked: !state.isCardClicked
    }));
  }
  handleHeartToggle(ArtistList, artist) {
    console.log('🦋 artist: ', artist);
    //if artist.isLiked === true, postLikedArtists, else delete artist
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
      this.setState(state => ({ ArtistList: copyList }));
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
    })
      .then(response => response.json())
      .then(data => {
        console.log('👘 data in GET: ', data);
        this.setState({likedArtists: data})
      })
      .catch(err => {
        console.log('error getting liked artists', err);
      });
  }
  postLikedArtists(data) { //pass in callback, then call w/data or data.result when handling res?
    console.log('🧶 data in POST: ', data);
    data = {likedArtists: this.state.likedArtists};
    fetch('/artists', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    // .then(res => res.json())  //parses the response as JSON
    //   console.log('response: ', res);
    // .then(data => console.log('success: ', data))
    // .catch(err => {
    //   console.log('error posting liked artists: ', err);
    // });
  }
  render() {
    if (this.state.page === 'artists') {
      //buttonClick={this.handleButtonClick}
      return (
          <ArtistsPage value={this.state} otherPage={this.otherPage} postArtists={this.postLikedArtists} handleHeartToggle={this.handleHeartToggle} handleCardClick={this.handleCardClick} />
      );
    } else {
      //buttonClick={this.handleButtonClick}
      //handle link click?
      return (
        <FavoritesPage value={this.state} otherPage={this.otherPage} />
      );
    }
  }
}

//mapping each card individually from artistList
function ArtistsPage(props) {
  console.log('App props', props);
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
          {props.value.ArtistList.map((artist, index) =>
            <ArtistCards artist={ artist } key={ index } handleCardClick={props.handleCardClick} handleHeartToggle={props.handleHeartToggle} />
          )}
        </div>
      </div>
  )
}

function ArtistCards(props) {
  console.log('props from ArtistCards 🦊', props)
  return (
    <div className="artist-card-entry">
      <div>
        <img src={props.artist.imageURL}></img>
      </div>
      <div className="heart-icon" onClick={(e) => (props.handleHeartToggle(ArtistList, props.artist))}>
        <a href="#">
        <FontAwesomeIcon icon={faHeart} size="2x" />
        </a>
      </div>
    </div>
  );
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
        {props.ArtistList.map((artist) => {
          return (
            <div>{artist.name, artist.artistLink}</div>
          );
        })}
      </div>
    </div>
  );
}

const ArtistList = [
  {
    name: 'letha wilson',
    imageURL: 'https://www.lethaprojects.com/visuals/images/outdoors/ghostofatree-right-view.jpg',
    artistLink: "https://www.lethaprojects.com",
    isLiked: false
  },
  {
    name: 'genesis baez',
    imageURL: 'http://media.virbcdn.com/cdn_images/resize_1600x1600/23/ac1718b745965aed-Baez_1.jpg',
    artistLink: "http://www.genesisbaez.com/",
    isLiked: false
  },
  {
    name: 'sarah-louise barbett',
    imageURL: 'https://aisselles.files.wordpress.com/2010/12/img_0016.jpg?w=1104',
    artistLink: "https://aisselles.files.wordpress.com",
    isLiked: false
  },
  {
    name: 'jessica halonen',
    imageURL: 'http://www.jessicahalonen.com/files/gimgs/44_spliced-branch-ball-1.jpg',
    artistLink: "http://www.jessicahalonen.com",
    isLiked: false
  },
  {
    name: 'laura owens',
    imageURL: 'https://www.owenslaura.com/wp-content/uploads/2013/01/HQ-16LO9359P-Untitled.jpg',
    artistLink: "https://www.owenslaura.com",
    isLiked: false
  },
  {
    name: 'deborah roberts',
    imageURL: 'https://i0.wp.com/conflictofinteresttx.com/wp-content/uploads/2017/07/The-Power-dance-30x22-2017.jpeg?w=469',
    artistLink: "http://www.deborahrobertsart.com/",
    isLiked: false
  },
  {
    name: 'ana esteve llorens',
    imageURL: 'http://www.anaestevellorens.com/projects/project6/07%20Quasy%20Infinite.jpg',
    artistLink: "http://www.anaestevellorens.com",
    isLiked: false
  },
  {
    name: 'jackie furtado',
    imageURL: 'https://s3.amazonaws.com/artfare-production-mobile/Artworks/Images/Image-1/image-1-d67b0616-077b-4fee-97be-275e4dde6107.jpg',
    artistLink: "https://jackiefurtado.com/",
    isLiked: false
  },
  {
    name: 'viviane sassen',
    imageURL: 'https://www.vivianesassen.com/site/assets/files/2940/umbra_nab_vs_3942.0x1500.jpg',
    artistLink: "https://www.vivianesassen.com",
    isLiked: false
  }
];


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

{/* <input onClick={this.handleCardClick}>
  {props.value.isCardClicked ? '' : ''}
</input> */}

//this.props.handleHeartToggle(this.props.value.isHeartFilled)
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


{/* <div className="inner-container" id="artist-cards">
{props.value.ArtistList.map((artist) =>  //element, then func run on each el
  <div>{artist.imageURL}<div/>
)}
<input onClick={this.handleHeartToggle}>
  {props.value.isHeartFilled ? <div className="heart"><a href="#"><i className="fa fa-heart fa-2x"></i></a></div> : <div className="heart"><a href="#"><i className="fa fa-heart-o fa-2x"></i></a></div>}
</input>
</div> */}

{/* <div className="inner-container" id="artist-cards">
{props.value.ArtistList.map((artist, index) => (
  <div>
  <img src={artist.imageURL} key={ index }></img>

  {/* <FontAwesomeIcon icon={faHeart} size="2x" /> */}
//   </div>
// )
// )}

{/* <input onClick={this.handleHeartToggle}>
  {props.value.isHeartFilled ? <div className="heart"><a href="#"><i className="fa fa-heart fa-2x"></i></a></div> : <div className="heart"><a href="#"><i className="fa fa-heart-o fa-2x"></i></a></div>}
</input> */}
// </div> */}

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