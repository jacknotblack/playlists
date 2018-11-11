import { connect } from "react-redux";
import SongList from "../../components/songlist";

const mapStateToProps = state => ({
  songs: state.playList.songs
});

const ConnectedSongList = connect(
  mapStateToProps,
  null
)(SongList);

export default ConnectedSongList;
