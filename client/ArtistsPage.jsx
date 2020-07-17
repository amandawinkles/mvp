function ArtistsPage(props) { //mapping each card individually from artistList
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
            <img src={artist.imageURL} key={ index }></img>
          )}

        </div>
      </div>
  )
}