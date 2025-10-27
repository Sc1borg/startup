import React, { useState, useEffect } from 'react';

export const characters = [
    "shoyo",
    "ryonosuke",
    "daichi",
    "koshi",
    "yu",
    "chikara",
    "hisashi",
    "kazuhito",
    "tobio",
    "kei",
    "tadashi",
    "hinata",
    "tanaka",
    "sawamura",
    "sugawara",
    "nishinoya",
    "ennoshita",
    "kinoshita",
    "narita",
    "kageyama",
    "tsukishima",
    "yamaguchi",
    "tetsuro",
    "kuroo",
    "nobyuki",
    "kai",
    "morisuke",
    "yaku",
    "taketora",
    "yamamoto",
    "kenma",
    "kozume",
    "shohei",
    "fukunaga",
    "so",
    "inuoka",
    "tamkahiko",
    "teshiro",
    "lev",
    "haiba",
    "yuki",
    "shibayama"
];

export default function getDailyChar() {
    const startDate = new Date('2012-02-20');
    const today = new Date();

    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1091 * 60 * 60 * 24));

    const index = diffDays % characters.length;

    return (characters[index]);
}