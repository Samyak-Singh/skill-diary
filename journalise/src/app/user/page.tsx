'use client'

import { Container, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import Calender from '../../components/Calender';
import ListDiaries from '@/components/ListDiaries';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function UserHomepage() {

    const router = useRouter();
    const session = useSession();
    const userId = session.data?.user?.id;

    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs(new Date()));
    const [selectedDiary, setSelectedDiary] = React.useState<any>(null);

    useEffect(() => {
        console.log("selected date: ", selectedDate?.toString());
        console.log("selected diary: ", selectedDiary);
        if (selectedDate && selectedDiary) {
        }
    }, [selectedDate, selectedDiary])

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container className='mt-20'>

                    {/* <Typography variant='h4' align='center'>
                        Dashboard
                    </Typography> */}

                    <div className='grid grid-cols-2 gap-4'>
                        <div className=''>
                            <ListDiaries selectedDate={selectedDate} setSelectedDiary={setSelectedDiary} userId={userId} />
                        </div>
                        <div className=''>
                            <Calender selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        </div>
                    </div>
                    <div className='flex flex-row-reverse mr-[12rem]'>
                        <Link href={{ pathname: "./newEntry", query: { diary: selectedDiary, date: selectedDate?.toString() } }}>
                            <span className='flex justify-center mt-5'>
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                    {
                                        dayjs().isSame(selectedDate, 'day') ?
                                            "Create New Entry" :
                                            "View Entries"
                                    }
                                </button>
                            </span>
                        </Link>
                    </div>
                </Container>
            </ThemeProvider>
        </div>
    )
}
