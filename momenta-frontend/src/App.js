import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Channels from './components/Channels';
import Channel from './components/Channel';

function App() {
  const [channelQuery, setChannelQuery] = useState('');
  const [channelList, setChannelList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [broadcasterId, setBroadcasterId] = useState('');

  // Fetch channels from twitch API when channelQuery changes
  useEffect(() => {
    const fetchChannels = async () => {
      const response = await fetch(`/api/channels/${channelQuery}`);
      if(response?.status === 200) {
        const result = await response.json();
        setChannelList(result.data);
        setPagination(result.pagination);
      } 
    };
    
    if(channelQuery.length > 0) {
      fetchChannels();
    } 
  }, [channelQuery]);

  const isEmptyObject = (obj) => {
    // source: https://stackoverflow.com/a/32108184
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  const fetchChannelsWithPagination = async () => {
    if(isEmptyObject(pagination)) {
      return;
    }

    const cursor = pagination.cursor;
    const response = await fetch(`/api/channels/${channelQuery}/${cursor}`);
    if(response?.status === 200) {
      const result = await response.json();
      setChannelList(channelList.concat(result.data));
      setPagination(result.pagination);
    }
  }

  return (
    <div className="App">
      <SearchBar setChannel={setChannelQuery}/>
      <div className="search-results">
        <div>
          <Channels channelList={channelList} setBroadcasterId={setBroadcasterId}/>
          
          {!isEmptyObject(pagination) &&
            <button id="load-consecutive" onClick={fetchChannelsWithPagination}>
              Load more matches
            </button>
          }
        </div>
        {broadcasterId.length > 0 && <Channel broadcasterId={broadcasterId}/>}
      </div>
    </div>
  );
}

export default App;
