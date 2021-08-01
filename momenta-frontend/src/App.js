import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import Channels from './components/Channels';
import Channel from './components/Channel';

function App() {
  const [channelQuery, setChannelQuery] = useState('boxbox');
  const [channelList, setChannelList] = useState([]);
  const [pagination, setPagination] = useState('');
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

  return (
    <div className="App">
      <SearchBar setChannel={setChannelQuery}/>
      <div className="search-results">
        <Channels channelList={channelList} setBroadcasterId={setBroadcasterId}/>
        {broadcasterId.length > 0 && <Channel broadcasterId={broadcasterId}/>}
      </div>
    </div>
  );
}

export default App;
