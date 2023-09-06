"use client"

import * as React from 'react';
import { style } from "./journalInputStyles"
import { Button, Input, InputAdornment } from '@mui/material';
import { generate_greeting_texts } from '@/lib/util';
import { useSession } from 'next-auth/react';

export default function JournalInput(props: any) {

    const [entry, setEntry] = React.useState("")
    const [entryDate, entryTime] = (new Date().toLocaleString("en-GB", {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "numeric", hour12: true
    })).split(', ')

    const { userId } = props; 


    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEntry(event.target.value)
    }

    const handleClick = () => {
        const payload = {
            'userId': userId,
            'date': entryDate,
            'time': entryTime,
            'entry': entry
        }

    }

    return (
        <>
        <div className='flex-col'>
                <p className='font-sans italic '>{entryDate}</p>

                <Input startAdornment={<InputAdornment position='start' className='font-sans italic'>{entryTime}</InputAdornment>}
                multiline
                className={'mt-2'}
                style={style}
                disableUnderline
                minRows={1}
                    placeholder={generate_greeting_texts()}
                onChange={handleChange}
                />

                <div className='flex justify-center mt-5'>
                    <Button variant="outlined" onClick={handleClick}>
                        Save
                    </Button>
                </div>
            </div>
        </>
    )

}