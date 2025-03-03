import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
  TablePagination,
  IconButton,
} from '@mui/material';
import React, { ReactNode, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';

export interface Column<T> {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: any, item: T) => ReactNode;
}

export interface Action<T> {
  label: string;
  onClick: (item: T) => void;
  icon?: ReactNode;
  disabled?: (item: T) => boolean;
  hidden?: (item: T) => boolean;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'text' | 'outlined' | 'contained';
}

interface CustomTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  keyExtractor: (item: T) => string | number;
  actions?: Action<T>[];
  actionsLabel?: string;
  onRefresh?: () => void;
  emptyMessage?: string;
  pagination?: boolean;
  defaultPageSize?: number;
  renderActions?: (item: T) => ReactNode;
}

const CustomTable = <T,>({
  title,
  columns,
  data,
  loading = false,
  keyExtractor,
  actions,
  actionsLabel = 'Actions',
  onRefresh,
  emptyMessage = 'No data available',
  pagination = true,
  defaultPageSize = 10,
  renderActions,
}: CustomTableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const hasActions = actions?.length || renderActions;

  // Function to determine if we should show pagination
  const shouldShowPagination = pagination && data.length > 0;

  // Calculate displayed rows based on pagination
  const displayedRows = pagination
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : data;
  //  a helper function that safely converts any value to a ReactNode
const renderCellValue = (value: any): ReactNode => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object' && !React.isValidElement(value)) return JSON.stringify(value);
  return String(value);
};
  return (
    <Card>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">{title}</Typography>
          {onRefresh && (
            <IconButton onClick={onRefresh} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          )}
        </Box>

        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    style={{ minWidth: column.minWidth || 'auto' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                {hasActions && <TableCell align="right">{actionsLabel}</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (hasActions ? 1 : 0)}
                    align="center"
                    sx={{ py: 5 }}
                  >
                    <CircularProgress size={40} />
                  </TableCell>
                </TableRow>
              ) : displayedRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (hasActions ? 1 : 0)}
                    align="center"
                    sx={{ py: 5 }}
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                displayedRows.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={keyExtractor(row)}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof T];
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {column.format ? column.format(value, row) : renderCellValue(value)}
                        </TableCell>
                      );
                    })}

                    {hasActions && (
                      <TableCell align="right">
                        {renderActions ? (
                          renderActions(row)
                        ) : (
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            {actions?.map((action, index) => {
                              if (action.hidden && action.hidden(row)) {
                                return null;
                              }

                              const Button = action.variant === 'text' ? 'button' : 'button';
                              const isDisabled = action.disabled && action.disabled(row);

                              return (
                                <IconButton
                                  key={index}
                                  onClick={() => action.onClick(row)}
                                  disabled={isDisabled}
                                  color={action.color || 'primary'}
                                  size="small"
                                >
                                  {action.icon}
                                </IconButton>
                              );
                            })}
                          </Box>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {shouldShowPagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </Card>
  );
};

export default CustomTable;
