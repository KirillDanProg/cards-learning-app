import React from "react"
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import s from "./Profile.module.css"
import {UserAvatar} from "./User/UserAvatar/UserAvatar"
import {UserName} from "./User/UserName/UserName"
import {LogoutBtn} from "./Button/LogoutBtn"
import {useAppSelector} from "../../common/hooks";
import {ReturnComponent} from "../../common/components/returnComponent/ReturnComponent";
import {useChangeNameMutation, useLogoutMutation} from "../auth/authApi";
import {CustomGridContainer} from "../../common/components/CustomGridContainer";


export const Profile = () => {
    const email = useAppSelector(state => state.auth.email)
    const [logout] = useLogoutMutation()
    const [changeName, {}] = useChangeNameMutation()

    const logoutHandler = async () => {
        await logout().unwrap()
    }

    const changeNameHandler = async (newName: string) => {
       await changeName(newName)
    }

    // useRedirectTo(`/${PATH.LOGIN}`, isSuccess, [isLoading])
    return (
        <>
           <ReturnComponent/>
            <CustomGridContainer>
                        <Typography className={s.title}>
                            Personal Information
                        </Typography>
                        <Box marginTop={2} marginBottom={2}>
                            <UserAvatar />
                        </Box>
                        <UserName changeNameCB={changeNameHandler}/>
                        <Typography className={s.email}>
                            {email}
                        </Typography>
                        <br/>
                        <LogoutBtn callBack={logoutHandler}/>
            </CustomGridContainer>
        </>
    );
}
