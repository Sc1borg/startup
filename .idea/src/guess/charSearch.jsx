import React, { useState } from "react";

const characters = [
    "Shoyo Hinata",
    "Ryonosuke Tanaka",
    "Daichi Sawamura",
    "Koshi Sugawara",
    "Yu Nishinoya",
    "Chikara Ennoshita",
    "Hisashi Kinoshita",
    "Kazuhito Narita",
    "Tobio Kageyama",
    "Kei Tsukishima",
    "Tadashi Yamaguchi"
];

function CharSearch() {
    const [searchTerm, setSearchTerm] = useState('')
    const filteredCharacters = characters.filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ width: '800px' }}>
            <input
                type="text"
                placeholder="Input character name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                                onClick={() => setSearchTerm(name)} // optional
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