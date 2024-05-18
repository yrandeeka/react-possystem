import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({heads,rows,dataColumns}) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                <TableCell>{heads[0]}</TableCell>
                {heads.map((column)=>(
                     <TableCell align="right">{column}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
             <>
                {/* {dataColumns.map((key)=>(
                             <TableRow
                             key={key==="id"?row.dataColumns[0]}
                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                           >
                             <TableCell component="th" scope="row">
                               {row.dataColumns[0]}
                             </TableCell>
                             {row.map((column)=>(
                                 <TableCell align="right">{row.calories}</TableCell>
                             ))}
                           </TableRow>
                ))} */}
             </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }