import * as React from 'react';
import { getDiaries, getDiariesMock } from '@/lib/util';
import { Book, BookOutlined, PlusOne } from '@mui/icons-material';
import { Button, Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import CreateNewDiaryModal from './CreateNewDiaryModal';

export default function ListDiaries(props: any) {

    const router = useRouter();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [diaries, setDiaries] = React.useState([]);
    const [skeleton, setSkeleton] = React.useState(true);
    const [diaryCount, setDiaryCount] = React.useState(0);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => {
        setModalOpen(false);
        setDiaryCount(diaryCount + 1);
    }

    const { userId, setSelectedDiary } = props;


    React.useEffect(() => {
        userId && getDiaries(userId)
            .then((data) => {
                const formattedDiaries = data.map((diary: any) => ({
                    id: diary._id,
                    name: diary.name,
                    description: diary.description,
                }));
                setSkeleton(false);
                setDiaries(formattedDiaries);
                setDiaryCount(formattedDiaries.length);
            })
            .catch((error) => {
                setSkeleton(false);
                console.error('Error:', error);
            });
    }, [userId, diaryCount]);


    // Mock Data
    // const diaries = getDiariesMock(userId);

    const handleDiaryClick = (diaryId: any) => {
        setSelectedDiary(diaryId)
        // get dairy id from event and fetch list of entries for that diary corrensponding to the selected date and user
        // and redirect to the page with the list of entries using router
        // fetch(getDiaryRecordsByDate(selectedDate, diaryId), {
        //     method: 'GET'
        // }).then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         router.push('/api/v1/diaries/' + diaryId + '/entries');
        //     }
        //     )
    }

    return (
        <>
            <Typography variant='h4' align='center'>
                Diaries <Book />
            </Typography>
            <div className='flex flex-wrap justify-evenly align-baseline'>
                {
                    skeleton && (
                        <Card sx={{ height: 140, width: 140, padding: 1, margin: 2 }}>
                            <CardMedia component={"i"}><BookOutlined /></CardMedia>
                            <CardContent>
                                <Skeleton component={'div'} variant="rectangular" width={100} height={10} />
                                <Typography gutterBottom variant="body2" component={'div'}>
                                    fetching diaries...
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                }
                {
                    diaries.map((diary: any) => {
                        return (
                            <div key={diary.id}>
                                <Card sx={{ width: 140, maxHeight: 200, maxWidth: 200, padding: 1, margin: 2 }}>
                                    <CardActionArea id={diary.id} onClick={() => handleDiaryClick(diary.id)} >
                                        <CardMedia component={"i"} title={diary.name}><BookOutlined /></CardMedia>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component={'div'}>
                                                {diary.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {diary.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        )
                    })
                }
                <Card sx={{ height: 140, width: 140, padding: 1, margin: 2 }}>
                        <CardMedia component={"i"} ><BookOutlined /><PlusOne /></CardMedia>
                        <CardContent>
                        <CreateNewDiaryModal open={modalOpen} handleClose={handleClose} />
                        <Button variant='text' size='small' onClick={handleOpen}>Create New Diary</Button>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
