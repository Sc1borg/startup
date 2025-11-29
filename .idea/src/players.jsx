import React from 'react';

import { GameEvent, GameNotifier } from './notifier';

export function Players() {

    const [events, setEvent] = React.useState([]);

    React.useEffect(() => {
        GameNotifier.addHandler(handleGameEvent);

        return () => {
            GameNotifier.removeHandler(handleGameEvent);
        };
    });

    function handleGameEvent(event) {
        setEvent(prevEvents => [...prevEvents, event]);
    }

    function getHighscoreMessage() {
        if (events.length > 0) {
            let message = 'unknown';
            for (const [i, event] of events.entries()) {
                if (event.type === GameEvent.Highscore) {
                    message = `${event.from} got a new highscore of ${event.value}`
                } else if (event.type === GameEvent.System) {
                    message = null;
                }
            }
            return message;
        }
        return null;
    }

    return (
        <div className='players'>
            {getHighscoreMessage() && (<div id='player-message'>{getHighscoreMessage()}</div>)}
        </div>
    );
}