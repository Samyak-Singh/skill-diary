import bcryptjs from 'bcryptjs';
import { createRecordUrl, createUserSDiaryUrl, greeting_texts, userSDiaryUrl } from "@/lib/constants";
import { BCRYPT_SALT_ROUNDS, backendUrl, registerUserUrl } from './constants';

export const generate_greeting_texts = (): string => greeting_texts[Math.floor(Math.random() * greeting_texts.length)]

export const getInitialContent = (greeting_text: string): any => {
    return [
        {
            "type": "paragraph",
            "props": {
                "textColor": "default",
                "backgroundColor": "default",
                "textAlignment": "left"
            },
            "content": [
                {
                    "type": "text",
                    "text": greeting_text,
                    "styles": {}
                }
            ],
            "children": []
        },
        {
            "type": "paragraph",
            "props": {
                "textColor": "default",
                "backgroundColor": "default",
                "textAlignment": "left"
            },
            "content": [],
            "children": []
        }
    ]
}

export const hashPassword = async (password: FormDataEntryValue | null): Promise<string> => {
    const salt = await bcryptjs.genSalt(BCRYPT_SALT_ROUNDS);
    const passwordString = password?.toString() || ""; // if password is null, set it to empty string, to fix typrscript error
    const hash = await bcryptjs.hash(passwordString, salt);
    return hash;
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    const match = await bcryptjs.compare(password, hash);
    return match;
}

export const getRegisterURL = (): string => {
    return `${backendUrl}${registerUserUrl}`;
}

export const getUserSDiaryURL = (userId: string): string => {
    return `${backendUrl}${userSDiaryUrl(userId)}`;
}

export const getCreateDiaryURL = (userId: string): string => {
    return `${backendUrl}${createUserSDiaryUrl(userId)}`;
}

export const getCreateRecordURL = (): string => {
    return `${backendUrl}${createRecordUrl}`;
}

export const getDiaries = async (userId: string) => {
    try {
        const response = await fetch(getUserSDiaryURL(userId), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error fetching diaries: ${errorData.message}`);
            return [];
        }

        const diaries = await response.json();

        return diaries;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getDiariesMock = (userId: any): any => {
    return [
        {
            id: 1,
            title: "Personal",
            description: "Personal Diary",
        }, {
            id: 2,
            title: "Work",
            description: "Work Diary",
        }, {
            id: 3,
            title: "Travel",
            description: "Travel Diary",
        }
    ]
}