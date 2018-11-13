import { connect } from "react-redux";
import PlayLists from "../../components/playlists";
import { playListActions as actions } from "../../actions";

const getSongsByIDs = (IDs, songs) => {
  let res = [];
  let count = 0;
  let index;
  for (let i = 0; i < songs.length; i++) {
    index = IDs.findIndex(id => songs[i].id === id);
    if (index > -1) {
      res[index] = songs[i];
      count += 1;
      if (count === IDs.length) break;
    }
  }
  return res;
};

const mapStateToProps = state => {
  return {
    playLists: state.playList.playLists.map(playList => ({
      ...playList,
      songs: getSongsByIDs(playList.songs, state.playList.songs)
    })),
    songs: state.playList.songs
  };
};

const mapDispatchToProps = dispatch => ({
  getInitPlayLists: () => {
    dispatch(actions.getInitPlayLists());
  },
  addList: name => {
    dispatch(actions.addList(name));
  }
});

const ConnectedPlayLists = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayLists);

export default ConnectedPlayLists;
