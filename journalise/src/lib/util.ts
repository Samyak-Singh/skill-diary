import bcryptjs from 'bcryptjs';
import { greeting_texts, userSDiaryUrl } from "@/lib/constants";
import { BCRYPT_SALT_ROUNDS, backendUrl, registerUserUrl } from './constants';

export const generate_greeting_texts = (): string => greeting_texts[Math.floor(Math.random() * greeting_texts.length)]


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

export const createDiaryURL = (userId: string): string => {
}

export const getDiaries = (userId: string) => {
    const diaries = fetch(getUserSDiaryURL(userId), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error(response.statusText)
        }
    }).then(data => {
        console.log(data)
        return data;
    }).catch(error => {
        console.log(error)
    })

    return diaries;
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
        }, {
            id: 4,
            title: "Food",
            description: "Food Diary",
        }, {
            id: 5,
            title: "Health",
            description: "Health Diary",
        }, {
            id: 6,
            title: "Sports",
            description: "Sports Diary",
        }, {
            id: 7,
            title: "Music",
            description: "Music Diary",
        }, {
            id: 8,
            title: "Movies",
            description: "Movies Diary",
        }, {
            id: 9,
            title: "Books",
            description: "Books Diary",
        }, {
            id: 10,
            title: "Games",
            description: "Games Diary",
        }, {
            id: 11,
            title: "Study",
            description: "Study Diary",
        }, {
            id: 12,
            title: "Coding",
            description: "Coding Diary",
        }, {
            id: 13,
            title: "Other",
            description: "Other Diary",
        }
    ]
}