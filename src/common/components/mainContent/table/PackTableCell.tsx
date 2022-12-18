import React, {FC} from 'react';
import {TableCell, TableRow} from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useAppSelector} from "../../../hooks";
import {selectCurrentUser} from "../../../../features/auth/authSlice";
import {useChangeNamePackMutation, useDeletePackMutation} from "../../../../features/cards/packsApi";
import {PackResponseType} from "../../../../features/cards/packsSlice";

type PropsType = {
    packData: PackResponseType
}

export const PackTableCell: FC<PropsType> = ({packData}) => {
    const [deletePack] = useDeletePackMutation()
    const [changeName] = useChangeNamePackMutation()

    const userId = useAppSelector(selectCurrentUser)
    const packOwner = userId === packData.user_id

    const deletePackHandler = async () => {
        await deletePack(packData._id)
    }

    const editeNameChangeHandler = async () => {
        await changeName({
            name: "Pack's name changed",
            _id: packData._id
        })
    }

    return (
        <TableRow
            key={packData._id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell align="left" style={{cursor: 'pointer'}}>
                {packData.name}
            </TableCell>
            <TableCell align="center">{packData.cardsCount}</TableCell>
            <TableCell align="center">{packData.updated}</TableCell>
            <TableCell align="right">{packData.user_name}</TableCell>
            <TableCell align="right" sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>

                {
                    packOwner
                        ? <>
                            <SchoolOutlinedIcon />
                            <ModeEditIcon onClick={editeNameChangeHandler}/>
                            <DeleteOutlineIcon onClick={deletePackHandler} />
                        </>

                        : <SchoolOutlinedIcon/>
                }
            </TableCell>
        </TableRow>
    );
};
