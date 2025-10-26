import quotes from "./characterQuotes.json"

export default function getDailyQuote() {
    const startDate = new Date('2012-02-20');
    const today = new Date();

    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1069 * 60 * 60 * 24));

    const index = diffDays % quotes.length;

    return (quotes[index]);
}