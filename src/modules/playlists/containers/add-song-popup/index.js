import { connect } from "react-redux";
import AddSongPopup from "../../components/add-song-popup";
import { playListActions as actions } from "../../actions";

const mapStateToProps = state => {
  return { playLists: state.playList.playLists };
};

const mapDispatchToProps = dispatch => ({
  addSongToList: (listID, songID) => {
    dispatch(actions.addSongToList(listID, songID));
  }
});

const ConnectedAddSongPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSongPopup);

export default ConnectedAddSongPopup;
