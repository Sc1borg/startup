import React, { useState, useEffect } from 'react';

export const characters = [
    "Shoyo",
    "Ryonosuke",
    "Daichi",
    "Koshi",
    "Yu",
    "Chikara",
    "Hisashi",
    "Kazuhito",
    "Tobio",
    "Kei",
    "Tadashi",
    "Hinata",
    "Tanaka",
    "Sawamura",
    "Sugawara",
    "Nishinoya",
    "Ennoshita",
    "Kinoshita",
    "Narita",
    "Kageyama",
    "Tsukishima",
    "Yamaguchi",
    "Tetsuro",
    "Kuroo",
    "Nobyuki",
    "Kai",
    "Morisuke",
    "Yaku",
    "Taketora",
    "Yamamoto",
    "Kenma",
    "Kozume",
    "Shohei",
    "Fukunaga",
    "So",
    "Inuoka",
    "Tamkahiko",
    "Teshiro",
    "Lev",
    "Haiba",
    "Yuki",
    "Shibayama"
];

export default function getDailyChar() {
    const startDate = new Date('2012-02-20');
    const today = new Date();

    const diffTime = today - startDate;
    const diffDays = 23 * Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const index = diffDays % characters.length;

    return (characters[index]);
}