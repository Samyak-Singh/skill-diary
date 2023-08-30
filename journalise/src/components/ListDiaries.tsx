import { getDiaries, getDiariesMock } from '@/lib/util';
import { Book, BookOutlined, PlusOne } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ListDiaries(props: any) {

    const router = useRouter();

    const { selectedDate, userId } = props;

    // Mock Data
    const diaries = getDiariesMock(userId);
    // const diaries = getDiaries(userId);

    const handleDiaryClick = (e) => {
        e.preventDefault();
        const diaryId = e.target.id;
        console.log("diary id: ", diaryId)
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
                    diaries.map((diary: any) => {
                        return (
                            <div key={diary.id}>
                                <Card sx={{ height: 140, width: 140, padding: 1, margin: 2 }}>
                                    <CardActionArea id={diary.id} onClick={handleDiaryClick} >
                                        <CardMedia component={"i"} ><BookOutlined /></CardMedia>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5">
                                                {diary.title}
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
                    <CardActionArea >
                        <CardMedia component={"i"} ><BookOutlined /><PlusOne /></CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                Create new Diary
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </>
    )
}
