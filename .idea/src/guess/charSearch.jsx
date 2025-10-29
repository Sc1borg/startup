import React, { useState } from "react";
import characters from './character_data.json'

function CharSearch({ onGuess }) {
    const names = characters.map(character => character.name);
    const [searchTerm, setSearchTerm] = useState('')
    const filteredCharacters = names.filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClickName = (name) => {
        setSearchTerm("");
        onGuess(name);
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (filteredCharacters.length > 0) {
                const topMatch = filteredCharacters[0];
                setSearchTerm("");
                onGuess(topMatch);
            } else {
                onGuess(searchTerm);
            }
        }
    };

    return (
        <div style={{width:"100%"}}>
            <input
                type="text"
                list="character-names"
                placeholder="Input character name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    padding: '8px',
                    textAlign: 'center',
                    width: '100%'
                }}
            />
            {searchTerm && filteredCharacters.length > 0 && (
                <ul
                    style={{
                        listStyle: 'none',
                        margin: 'auto',
                        marginLeft: '.5%',
                        padding: 0,
                        border: '1px solid #ccc',
                        maxHeight: '150px',
                        overflowY: 'auto',
                        borderRadius: "8px",
                        width: '49%',
                        position: 'absolute',
                        backgroundColor: 'black',
                        color: 'white'
                    }}
                >
                    {filteredCharacters.length > 0 ? (
                        filteredCharacters.map((name, index) => (
                            <li
                                key={index}
                                style={{
                                    padding: '8px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleClickName(name)}
                            >
                                {name}
                            </li>
                        ))
                    ) : (
                        <li style={{ padding: '8px' }}>No matches found</li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default CharSearch;