
import characters from "./character_data.json";

export default function getDailyChar() {
    const startDate = new Date('2012-02-20');
    const today = new Date();

    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const index = diffDays % characters.length;

    return (characters[index]);
}