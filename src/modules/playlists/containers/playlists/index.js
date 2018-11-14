import { connect } from "react-redux";
import PlayLists from "../../components/playlists";
import { playListActions as actions } from "../../actions";
import { range, deepCopy } from "../../../../tools";

const getSongsByIDs = (IDs, songs) => {
  const idList = deepCopy(IDs);
  const indexArray = range(0, idList.length - 1);
  let res = [];
  let count = 0;
  let index;
  for (let i = 0; i < songs.length; i++) {
    index = idList.findIndex(id => songs[i].id === id);
    if (index > -1) {
      res[indexArray[index]] = songs[i];
      idList.splice(index, 1);
      indexArray.splice(index, 1);
      count += 1;
      if (count === idList.length) break;
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
