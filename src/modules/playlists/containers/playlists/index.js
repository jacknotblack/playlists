import { connect } from "react-redux";
import PlayLists from "../../components/playlists";
import { playListActions as actions } from "../../actions";

const mapStateToProps = state => {
  return {
    playLists: state.playList.playLists,
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
