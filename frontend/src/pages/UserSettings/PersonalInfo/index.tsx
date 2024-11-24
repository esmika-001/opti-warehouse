import { Avatar, Box, Button, Divider, FormGroup, FormLabel, Grid, InputBase, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store/store';
import styles from './PersonalInfo.module.css';
import { deleteUserImage, fetchUserData, patchUserImage } from '../../../features/user/user.action';

type data = {
    name?: string,
    city?: string,
    country?: string,
    state?: string,
    phone_no?: string,
    pincode?: string,
};

type e = any;
type props = {
    setReqData: any;
};

const PersonalInfo = (props: props) => {
    const dispatch = useAppDispatch();
    const init = useRef<true | false>(true);
    const [data, setData] = useState<data>({});

    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            handleUplaodImage(formData);
        }
    }, [image]);

    const handleUplaodImage = async (formData: FormData) => {
        const resp = await dispatch(patchUserImage(formData));
        if (resp)
            window.location.reload();
    }
    const user = useAppSelector((state: RootState) => state.persistedReducer?.user);

    useEffect(() => {
        props.setReqData(data);
    }, [data]);

    useEffect(() => {
        if (init.current) {
            init.current = false;
            (async () => {
                await dispatch(fetchUserData('.'));
            })();
        }
        setData({ ...user, pincode: user?.pincode?.toString() });
    }, [user]);

    const deleteImage = async () => {
        const resp = await dispatch(deleteUserImage('.'))
        if (resp)
            window.location.reload();
    };

    return (
        <Box className={styles.root}>
            
            <Box className={styles.profileWrap}>
                <Typography className={styles.ptofileTitle}>Profile Picture</Typography>
                <Box className={styles.profile}>
                    <Avatar className={styles.avatar} src={user.image ? `${process.env.REACT_APP_BACKEND_URL}/${user.image}` : ""} />
                    <input type='file' id='profilePicInput' onChange={(e: any) => { setImage(e?.target?.files[0]) }} hidden={true} aria-hidden={true} />
                    <Box className={styles.profileTextWrap}>
                        <Typography className={styles.name}>{user.name} </Typography>
                        <Typography className={styles.oth}>{user.email}</Typography>
                        <Typography className={styles.oth}>{user.username}</Typography>
                    </Box>
                    <Box className={styles.btns}>
                        {/* <Button className={styles.btn1} onClick={() => document.getElementById('profilePicInput')?.click()}> Change</Button>
                        <Button className={styles.btn2} onClick={() => deleteImage()}> Delete</Button> */}
                    </Box>
                </Box>
            </Box>
            <Box className={styles.form}>
                <Grid container columns={12} columnSpacing={4} >
                    <Grid item xs={6}>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Name</FormLabel>
                                <InputBase disabled onChange={(e: e) => { setData((pre: data) => ({ ...pre, name: e.target.value })) }} value={data?.name} placeholder='Name' type='text' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Phone Number</FormLabel>
                                <InputBase
                                    inputProps={{ maxLength: 10, minLength: 10 }}
                                    onChange={(e: e) => {
                                        const value = e.target.value;
                                        if (value.length <= 10) {
                                            setData((pre: data) => ({ ...pre, phone_no: value }));
                                        }
                                    }}
                                    value={data?.phone_no}
                                    placeholder='Phone no'
                                    type='number'
                                    className={`${styles.inputBox}`}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Pincode / Zip-code</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, pincode: e.target.value })) }} value={data?.pincode} placeholder='Pincode / zip-code' type='number' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid item xs={12} className={styles.inputWraper} >
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>Country</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, country: e.target.value })) }} value={data?.country} placeholder='Country' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper} >
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>State</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, state: e.target.value })) }} value={data?.state} placeholder='State' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} className={styles.inputWraper}>
                            <FormGroup>
                                <FormLabel className={styles.formLabel}>City</FormLabel>
                                <InputBase onChange={(e: e) => { setData((pre: data) => ({ ...pre, city: e.target.value })) }} value={data?.city} placeholder='City' className={`${styles.inputBox}`} />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default PersonalInfo;

