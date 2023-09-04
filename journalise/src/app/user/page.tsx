'use client'

import { Container, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import Calender from '../../components/Calender';
import ListDiaries from '@/components/ListDiaries';
import { useSession } from 'next-auth/react';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function UserHomepage() {

    const session = useSession();
    const userId = session.data?.user?.id;

    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs(new Date()));
    const [selectedDiary, setSelectedDiary] = React.useState<any>(null);

    useEffect(() => {
        console.log("selected date: ", selectedDate?.toString());
        console.log("selected diary: ", selectedDiary);
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
                </Container>
            </ThemeProvider>
        </div>
    )
}
