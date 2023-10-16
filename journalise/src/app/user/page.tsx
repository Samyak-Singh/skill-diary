'use client'

import { Container, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import Calender from '../../components/Calender';
import ListDiaries from '@/components/ListDiaries';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

export default function UserHomepage() {

    const router = useRouter();
    const session = useSession();
    const userId = session.data?.user?.id;

    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
    const [selectedDiary, setSelectedDiary] = React.useState<any>(null);

    useEffect(() => {
        console.log("selected date: ", selectedDate?.format());
        console.log("selected diary: ", selectedDiary);
        if (selectedDate && selectedDiary) {
            // fetch records for the selected date and diary
        }
    }, [selectedDate, selectedDiary])

    return (
            <ThemeProvider theme={theme}>
            <Container className='mt-[4.2rem] mb-0  px-1 mx-auto' maxWidth={'xl'}>

                    {/* <Typography variant='h4' align='center'>
                        Dashboard
                    </Typography> */}

                    <div className='grid grid-cols-2 gap-4'>
                    <div className="grid grid-cols-2 gap-0 overflow-hidden">
                        <div className=' w-max h-fit'>
                            <Calender selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        </div>
                        <div className='overflow-y-auto'>
                            <ListDiaries selectedDate={selectedDate} selectedDiary={selectedDiary} setSelectedDiary={setSelectedDiary} userId={userId} />
                        </div>
                    </div>
                    <div className=" p-4 overflow-hidden">
                        <Editor selectedDate={selectedDate} selectedDiary={selectedDiary} />
                    </div>
                </div>
                </Container>
        </ThemeProvider>
    )
}
