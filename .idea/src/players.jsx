import React from 'react';

import { GameEvent, GameNotifier } from './notifier';

export function Players(props) {
    const userName = props.userName;

    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        GameNotifier.addHandler(handleGameEvent);

        return () => {
            GameNotifier.removeHandler(handleGameEvent);
        };
    }, []);

    function handleGameEvent(event) {
        setEvent(prevEvents => [...prevEvents, event]);
    }

    function getHighscoreMessage() {
        if (events.length > 0) {
            const entry = events[events.length - 1];
            let message = null;
            if (entry.type === GameEvent.Highscore) {
                return (
                    <span>
                        {entry.from.split('@')[0]} got a new highscore of {entry.value.score}
                    </span>
                )
            }
        }
        return null;
    }

    return (
        <div className='players'>
            {getHighscoreMessage() && (<div id='player-message'>{getHighscoreMessage()}</div>)}
        </div>
    );
}