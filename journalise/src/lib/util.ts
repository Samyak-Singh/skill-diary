import bcryptjs from 'bcryptjs';
import { greeting_texts } from "@/lib/constants";
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