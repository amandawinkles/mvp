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