"use client"

import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { style } from "./journalInputStyles"
import { Input, InputAdornment } from '@mui/material';

export default function JournalInput() {

    const greeting_texts = [
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

    const [entry, setEntry] = React.useState("")

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEntry(event.target.value)
    }

    return (
        <div className='flex-col'>
            <p className='font-sans italic '>
                {new Date()
                    .toLocaleString("en-GB",
                        {
                            year: "numeric", month: "short", day: "numeric",
                            // hour: "2-digit", minute: "numeric", hour12: true
                        })
                }
            </p>

            <Input
                startAdornment={<InputAdornment position='start' className='font-sans italic'>{new Date()
                    .toLocaleString("en-GB",
                        {
                            // year: "numeric", month: "short", day: "numeric",
                            hour: "2-digit", minute: "numeric", hour12: true
                        })
                }</InputAdornment>}
                multiline
                className={'mt-2'}
                style={style}
                disableUnderline
                minRows={1}
                placeholder={greeting_texts[Math.floor(Math.random() * greeting_texts.length)]}
                onChange={handleChange}
            />
        </div>
    )

}