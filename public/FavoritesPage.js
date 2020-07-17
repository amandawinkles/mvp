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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9GYXZvcml0ZXNQYWdlLmpzeCJdLCJuYW1lcyI6WyJGYXZvcml0ZXNQYWdlIiwicHJvcHMiLCJlIiwib3RoZXJQYWdlIiwiQXJ0aXN0TGlzdCIsIm1hcCIsImFydGlzdCIsIm5hbWUiLCJhcnRpc3RMaW5rIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxhQUFULENBQXVCQyxLQUF2QixFQUE4QjtBQUFFO0FBQzlCLHNCQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixrQkFDRTtBQUFJLElBQUEsU0FBUyxFQUFDO0FBQWQsaUJBREYsZUFFRTtBQUFRLElBQUEsU0FBUyxFQUFDLFFBQWxCO0FBQTJCLElBQUEsSUFBSSxFQUFDLFFBQWhDO0FBQ0UsSUFBQSxPQUFPLEVBQUdDLENBQUQsSUFBTztBQUNkRCxNQUFBQSxLQUFLLENBQUNFLFNBQU4sQ0FBZ0IsU0FBaEI7QUFDRDtBQUhILGVBRkYsZUFRRTtBQUFLLElBQUEsU0FBUyxFQUFDLGlCQUFmO0FBQWlDLElBQUEsRUFBRSxFQUFDO0FBQXBDLEtBQ0dGLEtBQUssQ0FBQ0csVUFBTixDQUFpQkMsR0FBakIsQ0FBc0JDLE1BQUQsSUFBWTtBQUNoQyx3QkFDRSxrQ0FBTUEsTUFBTSxDQUFDQyxJQUFQLEVBQWFELE1BQU0sQ0FBQ0UsVUFBMUIsRUFERjtBQUdELEdBSkEsQ0FESCxDQVJGLENBREY7QUFrQkQiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBGYXZvcml0ZXNQYWdlKHByb3BzKSB7IC8vcmVuZGVyIGVhY2ggbGluayBmcm9tIGZhdm9yaXRlc0xpc3Qgdy9tYXAgZnVuY1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICA8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPkZhdm9yaXRlczwvaDE+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvblwiIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgIHByb3BzLm90aGVyUGFnZSgnYXJ0aXN0cycpO1xuICAgICAgICB9fT5cbiAgICAgICAgQXJ0aXN0c1xuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubmVyLWNvbnRhaW5lclwiIGlkPVwiYXJ0aXN0LWxpbmtzXCI+XG4gICAgICAgIHtwcm9wcy5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+e2FydGlzdC5uYW1lLCBhcnRpc3QuYXJ0aXN0TGlua308L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufSJdfQ==