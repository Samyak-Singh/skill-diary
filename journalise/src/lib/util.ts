import { greeting_texts } from "@/constants/constants";
import { JsonObjectExpression } from "typescript";

async function postJSON(url: URL, data: JsonObjectExpression) {
    try {
        const response = await fetch(url, {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return new Promise(result);

    } catch (error: any) {
        return new Promise(error);
    }
}

export const generate_greeting_texts = (): string => greeting_texts[Math.floor(Math.random() * greeting_texts.length)]