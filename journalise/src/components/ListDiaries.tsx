import { getDeleteUserSDiaryURL, getDiaries } from '@/lib/util';
import { Book, BookOutlined } from '@mui/icons-material';
import { Card, CardMedia, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRouter } from 'next/navigation';
import * as React from 'react';
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
        // sleep for 1.5 seconds to allow the diary to be created before fetching the list of diaries
        setTimeout(() => {
            setDiaryCount(diaryCount + 1);
        }, 1500);
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

    const handleDiaryDelete = (diaryId: any) => {
        const response = fetch(getDeleteUserSDiaryURL(), {
            method: 'DELETE',
            body: JSON.stringify({ "diaryId": diaryId, "userId": userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDiaryCount(diaryCount - 1);
                setSelectedDiary(null);
            }).
            catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <Typography variant='h4' align='center'>
                Diaries <Book />
            </Typography>
            <div className=''>
                {
                    skeleton && (
                        <Card sx={{ height: 72, padding: "8px  16px" }}>
                            <Skeleton component={'div'} variant="rectangular" height={15} />
                            <Skeleton component={'div'} variant="rectangular" height={10} />
                        </Card>
                    )
                }
                {
                    diaries.map((diary: any) => {
                        return (
                            <div key={diary.id}>
                                <List>
                                    <ListItemButton
                                        selected={diary.id === props.selectedDiary}
                                        onClick={() => handleDiaryClick(diary.id)}>
                                        <ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete" onClick={() => handleDiaryDelete(diary.id)}>
                                                    <Tooltip title="Delete Diary">
                                                        <DeleteIcon />
                                                    </Tooltip>
                                                </IconButton>
                                            }
                                            disablePadding
                                        >
                                            <ListItemText
                                                primary={diary.name}
                                                secondary={diary.description}
                                            />
                                        </ListItem>
                                    </ListItemButton>
                                </List>
                            </div>
                        )
                    })
                }

                <List>
                    <ListItemButton onClick={handleOpen}>
                        <ListItem>
                            <ListItemIcon>
                                <BookOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Create New Diary" />
                        </ListItem>
                    </ListItemButton>
                    <CreateNewDiaryModal open={modalOpen} handleClose={handleClose} />
                </List>


                {/* {
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
                */}
                {/* <Card sx={{ height: 140, width: 140, padding: 1, margin: 2 }}>
                        <CardMedia component={"i"} ><BookOutlined /><PlusOne /></CardMedia>
                        <CardContent>
                        <CreateNewDiaryModal open={modalOpen} handleClose={handleClose} />
                        <Button variant='text' size='small' onClick={handleOpen}>Create New Diary</Button>
                    </CardContent>
                </Card>  */}
            </div>
        </>
    )
}
