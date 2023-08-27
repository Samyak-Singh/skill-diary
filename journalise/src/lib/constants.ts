export const BCRYPT_SALT_ROUNDS = 11
export const backendUrl = process.env.NODE_ENV === "development" ? 'http://localhost:2023/' : ""

// UI routes
export const homeUrl = '/'
export const loginUrl = '/api/auth/signin/credentials'
export const logoutUrl = '/api/auth/signout'
export const signupUrl = '/register'

export const registerUserUrl = 'api/v1/users/register/'

export const greeting_texts: string[] = [
    "Hey there! How's your day treating you?",
    "Good day! How has your day been unfolding?",
    "Hello! How's everything going in your corner of the world today?",
    "Hi, friend! How's your day been so far?",
    "Greetings! How's life treating you on this fine day?",
    "Hey, sunshine! How's your day shining along?",
    "Warmest salutations! How's your day been shaping up?",
    "Aloha! How's your day flowing in the rhythm of the island breeze?",
    "Top of the day to you! How's your journey through the hours going?",
    "Hola amigo! How's your day progressing on your side of the world?",
    "Bonjour! How has your day been painting its canvas?",
    "Hey you! How's your day writing its story?",
    "Namaste! How's your day unfolding in the realm of existence?",
    "G'day mate! How's your day down under been treating you?",
    "Howdy partner! How's your day on the frontier of experiences?"
]