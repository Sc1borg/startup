import React, { useState } from "react";
import characters from './character_data.json'

function CharSearch({ onGuess }) {
    const names = characters.map(character => character.name);
    const [searchTerm, setSearchTerm] = useState('')
    const filteredCharacters = names.filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClickName = (name) => {
        console.log("Clicked name:", name);
        setSearchTerm(name);
        onGuess(name);
    }

    return (
        <div style={{ width: '800px' }}>
            <input
                type="text"
                placeholder="Input character name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onGuess(searchTerm);
                    }
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    borderRadius: "25px",
                    background: 'transparent',
                    padding: '8px',
                    textAlign: 'center',
                }}
            />
            {searchTerm && (
                <ul
                    style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        border: '1px solid #ccc',
                        maxHeight: '150px',
                        overflowY: 'auto',
                        borderRadius: "8px",
                        position: 'absolute',
                        width: '800px',
                        backgroundColor: 'black',
                        color: 'white',
                        zIndex: 1,
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