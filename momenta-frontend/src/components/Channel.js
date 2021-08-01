import { useEffect, useState } from "react";

const Channel = ({broadcasterId}) => {

    const [channelInfo, setChannelInfo] = useState({});
    useEffect(() => {
        
        const getChannelInfo = async () => {
            if(!broadcasterId || broadcasterId.length === 0) {
                return;
            }
            const response = await fetch(`/api/channel/${broadcasterId}`);
            if(response?.status === 200) {
                const result = await response.json();
                if(result.data && result.data.length > 0) {
                    setChannelInfo(result.data[0]);
                } else {
                    setChannelInfo({});
                }
            }
        };
        getChannelInfo(); 
    }, [broadcasterId]);

    const liveComponent = <>
        <div>Playing: {channelInfo.game_name}</div>
        <h4>{channelInfo.title}</h4>
    </>;
    return <div className="channel-info">
        <h3>Username: {channelInfo.broadcaster_name}</h3>
        <div>User ID: {channelInfo.broadcaster_id}</div>
        <div>Language: {channelInfo.broadcaster_language}</div>
        {channelInfo.game_name && liveComponent}
    </div>;
}

export default Channel;