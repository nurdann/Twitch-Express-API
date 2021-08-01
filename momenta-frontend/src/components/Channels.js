const Channels = ({channelList, setBroadcasterId}) => {
    const ON = (channel) => channel.is_live ? 'ON' : 'OFF';
    const liveComponent = (channel) => <>
        <div>Playing: {channel.game_name}</div>
        <h5>{channel.title}</h5>
        <img src={channel.thumbnail_url} alt="stream thumbnail" />
    </>;

    return <ul>
        {channelList.map((channel, key) =>
            <li key={key} className={ON(channel)} onClick={() => setBroadcasterId(channel.id)}>
                <h4>Username: {channel.display_name}</h4>
                <div>Live: {ON(channel)}</div>
                {channel.is_live && liveComponent(channel)}
            </li>
        )}
    </ul>
};

export default Channels;