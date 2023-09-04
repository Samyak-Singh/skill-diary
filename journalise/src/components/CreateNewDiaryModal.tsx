import { getCreateDiaryURL } from '@/lib/util';
import { Backdrop, Box, Button, Fade, Grid, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useSession } from 'next-auth/react';
import React from 'react'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    open: boolean,
    handleClose: () => void
}

const CreateNewDiaryModal: React.FC<Props> = ({ open, handleClose }) => {

    const session = useSession();

    const closeAndCreateDiary = (e) => {
        e.preventDefault();
        const userId = session.data?.user?.id;
        console.log("user id: ", userId)

        const data = new FormData(e.currentTarget)

        console.log("diary name: ", data.get("diaryName"))
        console.log("diary desc: ", data.get("diaryDesc"))

        if (userId && data.get("diaryName") && data.get("diaryDesc")) {
            fetch(getCreateDiaryURL(userId), {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    diaryName: data.get("diaryName"),
                    diaryDesc: data.get("diaryDesc")
                }),
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }
        handleClose();
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Create New Diary"
                aria-describedby="Enter Diary Name and Description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style} component={'form'} noValidate onSubmit={closeAndCreateDiary}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="diaryName"
                                    required
                                    fullWidth
                                    id="diaryName"
                                    label="Diary Name"
                                    autoComplete='off'
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='off'
                                    fullWidth
                                    id="diaryDesc"
                                    label="Diary Description"
                                    name="diaryDesc"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button variant='outlined' type='submit'>Create</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default CreateNewDiaryModal;

