import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

const SunTable = ({ sunData }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sunData.length) : 0;
  const visibleRows = useMemo(() => [...sunData].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [sunData, page, rowsPerPage]);

  useEffect(() => {
    setPage(0);
  }, [sunData]);

  const formatTime = (time) => {
    const [hours, minutes, _seconds] = time.split(':');

    // time.slice(-2) = Gets only the AM/PM part
    return `${hours}:${minutes} ${time.slice(-2)}`;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} elevation={8}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Date</b>
              </TableCell>
              <TableCell>
                <b>Sunrise</b>
              </TableCell>
              <TableCell>
                <b>Sunset</b>
              </TableCell>
              <TableCell>
                <b>Golden hour</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.date}</TableCell>
                <TableCell>{data.sunrise == null ? '--' : formatTime(data.sunrise)}</TableCell>
                <TableCell>{data.sunset == null ? '--' : formatTime(data.sunset)}</TableCell>
                <TableCell>{data.golden_hour == null ? '--' : formatTime(data.golden_hour)}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={sunData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SunTable;
