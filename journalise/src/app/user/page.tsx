'use client'

import { Container, ThemeProvider, Typography, createTheme } from '@mui/material'
import React from 'react'
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

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container className='mt-20'>

                    {/* <Typography variant='h4' align='center'>
                        Dashboard
                    </Typography> */}

                    <div className='grid grid-cols-2 gap-4'>
                        <div className=''>
                            <Calender selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        </div>
                        <div className=''>
                            <ListDiaries selectedDate={selectedDate} userId={userId} />
                        </div>

                    </div>
                </Container>
            </ThemeProvider>
        </div>
    )
}
