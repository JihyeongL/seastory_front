import ReactPlayer from 'react-player/lazy';

function Main(){
    return(
        <div>
            <ReactPlayer
                className="player"
                url={"https://youtu.be/4y3RqreQZ3g"}
                width={'1000px'}
                height={'64.6vh'}
                playing
                muted
                controls='false'
                style={{display:'fixed'}}
            />
        </div>
    );
}export default Main;