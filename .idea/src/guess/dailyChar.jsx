import React, { useState, useEffect } from 'react';

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

export default function getDailyChar() {
    const startDate = new Date('2012-02-20');
    const today = new Date();

    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const index = diffDays % characters.length;

    return (characters[index]);
}