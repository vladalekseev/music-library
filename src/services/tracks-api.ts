import tracks from '@app/data';
import { Track } from '@models/Track';

const getAsyncTracks = (): Promise<{ data: Track[] }> =>
  new Promise((res) => {
    setTimeout(() => {
      res({
        data: tracks,
      });
    }, 500);
  });

class TracksApi {
  static fetchTracks = async (): Promise<Track[]> => {
    const responseData = await getAsyncTracks();
    return responseData.data;
  };
}

export default TracksApi;
