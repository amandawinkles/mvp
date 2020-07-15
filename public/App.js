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

  postLikedArtists(e) {
    e.preventdefault();
    fetch('/favorites', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        artists: this.state.artists
      })
    }).then(res => {
      //res.json?
      res.json(); //json.parse
      //console.log('response: ', res);
    }).then(data => {
      console.log('success: ', data);
    }).catch(err => {
      console.log('error posting liked artists: ', err);
    });
  }

  componentDidMount() {
    this.postLikedArtists();
  }

  render() {
    if (this.state.page === 'artists') {
      //buttonClick={this.handleButtonClick}
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ArtistsPage, {
        value: this.state,
        otherPage: this.otherPage,
        handleCardClick: this.handleCardClick,
        handleHeartToggle: this.handleHeartToggle,
        postArtists: this.postLikedArtists
      }));
    }

    if (this.state.page === 'favorites') {
      //buttonClick={this.handleButtonClick}
      //handle link click?
      return /*#__PURE__*/React.createElement(FavoritesPage, {
        value: this.state,
        otherPage: this.otherPage
      });
    }
  }

}

function ArtistsPage(props) {
  //mapping each card individually from artistList
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
  }, props.artists.map((artist, index) => {
    return /*#__PURE__*/React.createElement(ArtistLinks, {
      artist: artist,
      key: index,
      handleHeartToggle: props.handleHeartToggle
    });
  }), /*#__PURE__*/React.createElement("input", {
    onClick: this.handleHeartToggle
  }, this.state.isHeartFilled ? /*#__PURE__*/React.createElement("div", {
    classname: "heart"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-heart fa-2x"
  }))) : /*#__PURE__*/React.createElement("div", {
    classname: "heart"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-heart-o fa-2x"
  })))), /*#__PURE__*/React.createElement("input", {
    onClick: this.handleCardClick
  }, this.state.isCardClicked ? '' : '')));
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
  }, props.artists.map((artist, index) => {
    return /*#__PURE__*/React.createElement(ArtistLinks, {
      artist: artist,
      key: index
    });
  })));
}

let ArtistLinks = props => {};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root')); // function ToggleHeart(props) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9BcHAuanN4Il0sIm5hbWVzIjpbIkFwcCIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwicGFnZSIsImlzSGVhcnRGaWxsZWQiLCJhcnRpc3RzIiwiYXJ0aXN0TGlzdCIsImlzQ2FyZENsaWNrZWQiLCJsaWtlZEFydGlzdHMiLCJoYW5kbGVCdXR0b25DbGljayIsImJpbmQiLCJvdGhlclBhZ2UiLCJoYW5kbGVDYXJkQ2xpY2siLCJoYW5kbGVIZWFydFRvZ2dsZSIsInBvc3RMaWtlZEFydGlzdHMiLCJlIiwicHJldmVudGRlZmF1bHQiLCJzZXRTdGF0ZSIsInByZXZTdGF0ZSIsImdldEFydGlzdHNQYWdlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnIiLCJjb21wb25lbnREaWRNb3VudCIsInJlbmRlciIsIkFydGlzdHNQYWdlIiwibWFwIiwiYXJ0aXN0IiwiaW5kZXgiLCJGYXZvcml0ZXNQYWdlIiwiQXJ0aXN0TGlua3MiLCJSZWFjdERPTSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBV0EsTUFBTUEsR0FBTixTQUFrQkMsS0FBSyxDQUFDQyxTQUF4QixDQUFrQztBQUNoQ0MsRUFBQUEsV0FBVyxDQUFDQyxLQUFELEVBQVE7QUFDakIsVUFBTUEsS0FBTjtBQUNBLFNBQUtDLEtBQUwsR0FBYTtBQUNYQyxNQUFBQSxJQUFJLEVBQUUsU0FESztBQUVYQyxNQUFBQSxhQUFhLEVBQUUsT0FGSjtBQUdYQyxNQUFBQSxPQUFPLEVBQUVDLFVBSEU7QUFJWEMsTUFBQUEsYUFBYSxFQUFFLEtBSko7QUFLWDtBQUNBQyxNQUFBQSxZQUFZLEVBQUU7QUFOSCxLQUFiO0FBUUEsU0FBS0MsaUJBQUwsR0FB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QUFRLENBQUNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FGRixFLENBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuY29tcG9uZW50czpcbjEuIGFwcCAtIGV2ZXJ5dGhpbmcgd2lsbCBiZSByZW5kZXJlZCwgaGVhcnRUb2dnbGUsIGJ1dHRvbkNsaWNrLCBwb3N0TGlrZWRBcnRpc3RzIHRvIGRiXG4yLiBwYWdlcyAtIGNvbnRhaW5lciBjb21wb25lbnRzLCByZW5kZXIgb3RoZXIgY29tcG9uZW50cyBpbnNpZGVcbjMuIGFydGlzdCBjYXJkcyAtIG1hcHBpbmcgZWFjaCBjYXJkIGluZGl2aWR1YWxseSBmcm9tIGFydGlzdExpc3RcbjQuIGZhdm9yaXRlcyAtIHJlbmRlciBlYWNoIGxpbmsgZnJvbSBmYXZvcml0ZXNMaXN0IHcvbWFwIGZ1bmNcblxucnVubmluZyBvcmRlcjpcbiAgLSBjb25zdHJ1Y3RvciwgcmVuZGVyLCBjb21wb25lbnREaWRNb3VudFxuKi9cblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHBhZ2U6ICdhcnRpc3RzJyxcbiAgICAgIGlzSGVhcnRGaWxsZWQ6ICdmYWxzZScsXG4gICAgICBhcnRpc3RzOiBhcnRpc3RMaXN0LFxuICAgICAgaXNDYXJkQ2xpY2tlZDogZmFsc2UsXG4gICAgICAvL2xpa2VkQXJ0aXN0cyAtLT4ge25hbWUsIGltYWdlVVJMLCBhcnRpc3RMaW5rLCBpc0xpa2VkfVxuICAgICAgbGlrZWRBcnRpc3RzOiBbXVxuICAgIH07XG4gICAgdGhpcy5oYW5kbGVCdXR0b25DbGljayA9IHRoaXMuaGFuZGxlQnV0dG9uQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLm90aGVyUGFnZSA9IHRoaXMub3RoZXJQYWdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVDYXJkQ2xpY2sgPSB0aGlzLmhhbmRsZUNhcmRDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlSGVhcnRUb2dnbGUgPSB0aGlzLmhhbmRsZUhlYXJ0VG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wb3N0TGlrZWRBcnRpc3RzID0gdGhpcy5wb3N0TGlrZWRBcnRpc3RzLmJpbmQodGhpcyk7XG4gIH1cbiAgaGFuZGxlQnV0dG9uQ2xpY2soZSkge1xuICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+ICh7XG4gICAgICBwYWdlOiAhc3RhdGUucGFnZVxuICAgIH0pKTtcbiAgfVxuICBvdGhlclBhZ2Uob3RoZXJQYWdlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZShwcmV2U3RhdGUgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFnZTogb3RoZXJQYWdlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBoYW5kbGVDYXJkQ2xpY2soZSkge1xuICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICB0aGlzLnNldFN0YXRlKHN0YXRlID0+ICh7XG4gICAgICBpc0NhcmRDbGlja2VkOiAhc3RhdGUuaXNDYXJkQ2xpY2tlZFxuICAgIH0pKTtcbiAgfVxuICBoYW5kbGVIZWFydFRvZ2dsZShlKSB7XG4gICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbiAgICAgIGlzSGVhcnRGaWxsZWQ6ICFzdGF0ZS5pc0hlYXJ0RmlsbGVkXG4gICAgfSkpO1xuICB9XG4gIGdldEFydGlzdHNQYWdlKCkge1xuICAgIGZldGNoKCcvJywge1xuICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgIH0pO1xuICB9XG4gIHBvc3RMaWtlZEFydGlzdHMoZSkge1xuICAgIGUucHJldmVudGRlZmF1bHQoKTtcbiAgICBmZXRjaCgnL2Zhdm9yaXRlcycsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBhcnRpc3RzOiB0aGlzLnN0YXRlLmFydGlzdHNcbiAgICAgIH0pXG4gICAgfSlcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgLy9yZXMuanNvbj9cbiAgICAgIHJlcy5qc29uKCk7XG4gICAgICAvL2pzb24ucGFyc2VcbiAgICAgIC8vY29uc29sZS5sb2coJ3Jlc3BvbnNlOiAnLCByZXMpO1xuICAgIH0pXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc3VjY2VzczogJywgZGF0YSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBwb3N0aW5nIGxpa2VkIGFydGlzdHM6ICcsIGVycik7XG4gICAgfSlcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnBvc3RMaWtlZEFydGlzdHMoKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSAnYXJ0aXN0cycpIHtcbiAgICAgLy9idXR0b25DbGljaz17dGhpcy5oYW5kbGVCdXR0b25DbGlja31cbiAgICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxBcnRpc3RzUGFnZSB2YWx1ZT17dGhpcy5zdGF0ZX0gb3RoZXJQYWdlPXt0aGlzLm90aGVyUGFnZX0gaGFuZGxlQ2FyZENsaWNrPXt0aGlzLmhhbmRsZUNhcmRDbGlja30gaGFuZGxlSGVhcnRUb2dnbGU9e3RoaXMuaGFuZGxlSGVhcnRUb2dnbGV9IHBvc3RBcnRpc3RzPXt0aGlzLnBvc3RMaWtlZEFydGlzdHN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgKTtcbiAgIH1cbiAgIGlmICh0aGlzLnN0YXRlLnBhZ2UgPT09ICdmYXZvcml0ZXMnKSB7XG4gICAgIC8vYnV0dG9uQ2xpY2s9e3RoaXMuaGFuZGxlQnV0dG9uQ2xpY2t9XG4gICAgIC8vaGFuZGxlIGxpbmsgY2xpY2s/XG4gICAgIHJldHVybiA8RmF2b3JpdGVzUGFnZSB2YWx1ZT17dGhpcy5zdGF0ZX0gb3RoZXJQYWdlPXt0aGlzLm90aGVyUGFnZX0gLz5cbiAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBBcnRpc3RzUGFnZShwcm9wcykgeyAvL21hcHBpbmcgZWFjaCBjYXJkIGluZGl2aWR1YWxseSBmcm9tIGFydGlzdExpc3RcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgPGgxIGNsYXNzTmFtZT1cInBhZ2UtdGl0bGVcIj5BcnRpc3RzPC9oMT5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgcHJvcHMub3RoZXJQYWdlKCdmYXZvcml0ZXMnKTtcbiAgICAgICAgfX0+XG4gICAgICAgIEZhdm9yaXRlc1xuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubmVyLWNvbnRhaW5lclwiIGlkPVwiYXJ0aXN0LWNhcmRzXCI+XG4gICAgICAgIHtwcm9wcy5hcnRpc3RzLm1hcCgoYXJ0aXN0LCBpbmRleCkgPT4ge1xuICAgICAgICAgIHJldHVybiA8QXJ0aXN0TGlua3MgYXJ0aXN0PXsgYXJ0aXN0IH0ga2V5PXsgaW5kZXggfSBoYW5kbGVIZWFydFRvZ2dsZT17cHJvcHMuaGFuZGxlSGVhcnRUb2dnbGV9IC8+O1xuICAgICAgICB9KX1cbiAgICAgICAgPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlSGVhcnRUb2dnbGV9PlxuICAgICAgICAgIHt0aGlzLnN0YXRlLmlzSGVhcnRGaWxsZWQgPyA8ZGl2IGNsYXNzbmFtZT1cImhlYXJ0XCI+PGEgaHJlZj1cIiNcIj48aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFydCBmYS0yeFwiPjwvaT48L2E+PC9kaXY+IDogPGRpdiBjbGFzc25hbWU9XCJoZWFydFwiPjxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtaGVhcnQtbyBmYS0yeFwiPjwvaT48L2E+PC9kaXY+fVxuICAgICAgICA8L2lucHV0PlxuICAgICAgICA8aW5wdXQgb25DbGljaz17dGhpcy5oYW5kbGVDYXJkQ2xpY2t9PlxuICAgICAgICAgIHt0aGlzLnN0YXRlLmlzQ2FyZENsaWNrZWQgPyAnJyA6ICcnfVxuICAgICAgICA8L2lucHV0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZnVuY3Rpb24gRmF2b3JpdGVzUGFnZShwcm9wcykgeyAvL3JlbmRlciBlYWNoIGxpbmsgZnJvbSBmYXZvcml0ZXNMaXN0IHcvbWFwIGZ1bmNcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgPGgxIGNsYXNzTmFtZT1cInBhZ2UtdGl0bGVcIj5GYXZvcml0ZXM8L2gxPlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidXR0b25cIiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICBwcm9wcy5vdGhlclBhZ2UoJ2FydGlzdHMnKTtcbiAgICAgICAgfX0+XG4gICAgICAgIEFydGlzdHNcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbm5lci1jb250YWluZXJcIiBpZD1cImFydGlzdC1saW5rc1wiPlxuICAgICAgICB7cHJvcHMuYXJ0aXN0cy5tYXAoKGFydGlzdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICByZXR1cm4gPEFydGlzdExpbmtzIGFydGlzdD17IGFydGlzdCB9IGtleT17IGluZGV4IH0gLz47XG4gICAgICAgIH0pfVxuXG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5sZXQgQXJ0aXN0TGlua3MgPSAocHJvcHMpID0+IHtcblxufVxuXG5cblJlYWN0RE9NLnJlbmRlcihcbiAgPEFwcCAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuKTtcblxuXG4vLyBmdW5jdGlvbiBUb2dnbGVIZWFydChwcm9wcykge1xuLy8gICByZXR1cm4gKFxuLy8gICAgIC8vb25DbGljaz17dGhpcy5oYW5kbGVIZWFydENsaWNrfVxuLy8gICAgIDxpbnB1dCBvbkNsaWNrPXsoZSkgPT4ge1xuLy8gICAgICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuLy8gICAgICAgcHJvcHMuaXNIZWFydEZpbGxlZCA/ICdmYSBmYS1oZWFydCBmYS0yeCcgOiAnZmEgZmEtaGVhcnQtbyBmYS0yeCc7XG4vLyAgICAgICAvL3B1c2ggYXJ0aXN0cyBpbnRvIGxpa2VkQXJ0aXN0c1xuLy8gICAgICAgLy9wb3N0IHRvIGRiIC0tPiBwYXNzIGluIGFydGlzdHMgd2hvc2UgaGVhcnRzIGFyZSBmaWxsZWQtaW5cbi8vICAgICAgIC8vaWYgKHByb3BzLmlzSGVhcnRGaWxsZWQgPT09IHRydWUpLCAnZmEgZmEtaGVhcnQgZmEtMngnLCBwb3N0XG4vLyAgICAgICBwcm9wcy5wb3N0TGlrZWRBcnRpc3RzKCk7XG4vLyAgICAgfX0+XG4vLyAgICAgPC9pbnB1dD5cbi8vICAgKTtcbi8vIH1cbi8vIGNsYXNzIFRvZ2dsZUhlYXJ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICBzdXBlcihwcm9wcyk7XG4vLyAgICAgdGhpcy5zdGF0ZSA9IHtpc0hlYXJ0RmlsbGVkOiAnZmFsc2UnfTtcbi8vICAgICB0aGlzLmhhbmRsZUhlYXJ0Q2xpY2sgPSB0aGlzLmhhbmRsZUhlYXJ0Q2xpY2suYmluZCh0aGlzKTtcbi8vICAgfVxuLy8gICBoYW5kbGVIZWFydENsaWNrKCkge1xuLy8gICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbi8vICAgICAgIGlzSGVhcnRGaWxsZWQ6ICFzdGF0ZS5pc0hlYXJ0RmlsbGVkXG4vLyAgICAgfSkpO1xuLy8gICB9XG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlSGVhcnRDbGlja30+XG4vLyAgICAgICAgIHt0aGlzLnN0YXRlLmlzSGVhcnRGaWxsZWQgPyAnZmEgZmEtaGVhcnQgZmEtMngnIDogJ2ZhIGZhLWhlYXJ0LW8gZmEtMngnfVxuLy8gICAgICAgPC9pbnB1dD5cbi8vICAgICApO1xuLy8gICB9XG4vLyB9XG5cbi8vIGNsYXNzIEFydGlzdENhcmRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbi8vICAgY29uc3RydWN0b3IocHJvcHMpIHtcbi8vICAgICBzdXBlcihwcm9wcyk7XG4vLyAgICAgdGhpcy5zdGF0ZSA9IHtcbi8vICAgICAgIGlzQ2FyZENsaWNrZWQ6IGZhbHNlLFxuLy8gICAgICAgYXJ0aXN0VVJMOiAnJ1xuLy8gICAgIH07XG4vLyAgICAgdGhpcy5oYW5kbGVDYXJkQ2xpY2sgPSB0aGlzLmhhbmRsZUNhcmRDbGljay5iaW5kKHRoaXMpO1xuLy8gICB9XG4vLyAgIGhhbmRsZUNhcmRDbGljayhlKSB7XG4vLyAgICAgZS5wcmV2ZW50ZGVmYXVsdCgpO1xuLy8gICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUgPT4gKHtcbi8vICAgICAgIGlzQ2FyZENsaWNrZWQ6ICFzdGF0ZS5pc0NhcmRDbGlja2VkXG4vLyAgICAgfSkpO1xuLy8gICB9XG4vLyAgIHJlbmRlcigpIHtcbi8vICAgICByZXR1cm4gKFxuLy8gICAgICAgPGlucHV0IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FyZENsaWNrfT5cbi8vICAgICAgICAge3RoaXMuc3RhdGUuaXNDYXJkQ2xpY2tlZCA/ICcnIDogJyd9XG4vLyAgICAgICA8L2lucHV0PlxuLy8gICAgICk7XG4vLyAgIH1cbi8vIH1cblxuXG5cbi8vIGZ1bmN0aW9uIFdlbGNvbWUocHJvcHMpIHtcbi8vICAgcmV0dXJuIDxoMT5IZWxsbywge3Byb3BzLm5hbWV9PC9oMT47XG4vLyB9XG5cbi8vIGNvbnN0IGVsZW1lbnQgPSA8V2VsY29tZSBuYW1lPVwiU2FyYVwiIC8+O1xuXG5cbi8vIFJlYWN0RE9NLnJlbmRlcihcbi8vICAgZWxlbWVudCxcbi8vICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuLy8gKTsiXX0=