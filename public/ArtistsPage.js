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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NsaWVudC9BcnRpc3RzUGFnZS5qc3giXSwibmFtZXMiOlsiQXJ0aXN0c1BhZ2UiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJlIiwib3RoZXJQYWdlIiwidmFsdWUiLCJBcnRpc3RMaXN0IiwibWFwIiwiYXJ0aXN0IiwiaW5kZXgiLCJpbWFnZVVSTCJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEI7QUFBRTtBQUM1QkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWixFQUF5QkYsS0FBekI7QUFDQSxzQkFDSTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsa0JBQ0U7QUFBSSxJQUFBLFNBQVMsRUFBQztBQUFkLGVBREYsZUFFRTtBQUFRLElBQUEsU0FBUyxFQUFDLFFBQWxCO0FBQTJCLElBQUEsSUFBSSxFQUFDLFFBQWhDO0FBQ0UsSUFBQSxPQUFPLEVBQUdHLENBQUQsSUFBTztBQUNkSCxNQUFBQSxLQUFLLENBQUNJLFNBQU4sQ0FBZ0IsV0FBaEI7QUFDRDtBQUhILGlCQUZGLGVBUUU7QUFBSyxJQUFBLFNBQVMsRUFBQyxpQkFBZjtBQUFpQyxJQUFBLEVBQUUsRUFBQztBQUFwQyxLQUNHSixLQUFLLENBQUNLLEtBQU4sQ0FBWUMsVUFBWixDQUF1QkMsR0FBdkIsQ0FBMkIsQ0FBQ0MsTUFBRCxFQUFTQyxLQUFULGtCQUMxQjtBQUFLLElBQUEsR0FBRyxFQUFFRCxNQUFNLENBQUNFLFFBQWpCO0FBQTJCLElBQUEsR0FBRyxFQUFHRDtBQUFqQyxJQURELENBREgsQ0FSRixDQURKO0FBaUJEIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gQXJ0aXN0c1BhZ2UocHJvcHMpIHsgLy9tYXBwaW5nIGVhY2ggY2FyZCBpbmRpdmlkdWFsbHkgZnJvbSBhcnRpc3RMaXN0XG4gIGNvbnNvbGUubG9nKCdBcHAgcHJvcHMnLCBwcm9wcyk7XG4gIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwicGFnZS10aXRsZVwiPkFydGlzdHM8L2gxPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ1dHRvblwiIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICBwcm9wcy5vdGhlclBhZ2UoJ2Zhdm9yaXRlcycpO1xuICAgICAgICAgIH19PlxuICAgICAgICAgIEZhdm9yaXRlc1xuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbm5lci1jb250YWluZXJcIiBpZD1cImFydGlzdC1jYXJkc1wiPlxuICAgICAgICAgIHtwcm9wcy52YWx1ZS5BcnRpc3RMaXN0Lm1hcCgoYXJ0aXN0LCBpbmRleCkgPT5cbiAgICAgICAgICAgIDxpbWcgc3JjPXthcnRpc3QuaW1hZ2VVUkx9IGtleT17IGluZGV4IH0+PC9pbWc+XG4gICAgICAgICAgKX1cblxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICApXG59Il19