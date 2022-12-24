import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {CardTableCell} from './CardTableCell';
import {useGetCardsQuery} from 'features/cards/cardsApi/cardsApi';
import TableSortLabel from '@mui/material/TableSortLabel';
import {CardResponseType, IGetCardsResponse} from 'features/cards/cardsApi/cardsSlice';
import {EmptyList} from 'common/components';
import {getUrlParams, sortToggle} from '../../../utils';
import {Preloader} from '../../Preloader';
import {useQueryParams} from 'common/hooks';
import {ReturnComponent} from '../../returnComponent/ReturnComponent';
import { TableSkeleton } from "common/components/skeletons/TableSkeleton";


export const TableCards = () => {

    const [searchParams, setParam] = useQueryParams()

    const paramsObject = getUrlParams(searchParams);

    const {data = {} as IGetCardsResponse, isLoading} = useGetCardsQuery(paramsObject);

    let sortCards = searchParams.get('sortCards') || '';

    const sortToggleUpdateHandler = () => {
        sortToggle(sortCards, 'updated', setParam, 'sortCards');
    };

    const cards = data.cards;

  return (
    <TableContainer component={Paper}>

      {
        isLoading
          ? <TableSkeleton />
          : <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow hover style={{ backgroundColor: "#EFEFEF" }}>
                <TableCell align="left">Question</TableCell>
                <TableCell align="center">Answer</TableCell>
                <TableCell align="center">
                  <TableSortLabel direction={sortCards === `0updated` ? `asc` : `desc`}
                                  onClick={sortToggleUpdateHandler}>
                    Last Updated
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">Grade</TableCell>
              </TableRow>
            </TableHead>

                            <TableBody>
                                {
                                    cards.length > 0
                                        ? cards.map((card: CardResponseType) => (
                                            <CardTableCell key={card._id}
                                                           cardData={card}/>
                                        ))
                                        : <EmptyList/>
                                }
                            </TableBody>

                        </Table>
                }

            </TableContainer>
        </>
    );
};