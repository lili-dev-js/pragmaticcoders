import { Table, Button, HStack, Box, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export type TableProps<T> = {
  headers: string[];
  data: T[] | unknown;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
  };
};

const DefaultTable = <T extends Record<string, string | ReactNode>>({
  headers,
  data,
  pagination,
}: TableProps<T>) => {
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;

  return (
    <Box
      color="gray.600"
      overflowX="auto"
      borderWidth="1px"
      borderRadius="lg"
      w="100%"
    >
      {data && Array.isArray(data) ? (
        <Table.Root size="md">
          <Table.Header>
            <Table.Row bgColor="gray.100">
              {headers.map((header, idx) => (
                <Table.ColumnHeader key={idx} color="gray.600">
                  {header}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row, rowIndex) => (
              <Table.Row key={rowIndex} bgColor="gray.100">
                {Object.keys(row).map((key, colIndex) => {
                  const thisCell = row[key];
                  if (thisCell && typeof thisCell === 'object') {
                    return <Table.Cell key={colIndex}>{thisCell}</Table.Cell>;
                  }

                  return (
                    <Table.Cell key={colIndex}>{`${thisCell}`}</Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Box>load</Box>
      )}

      {pagination && (
        <HStack justify="space-between" mt={4}>
          <Button
            onClick={() => pagination.onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </Button>

          <Text>
            Page {pagination.page} of {totalPages}
          </Text>

          <Button
            onClick={() => pagination.onPageChange(pagination.page + 1)}
            disabled={pagination.page >= totalPages}
          >
            Next
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default DefaultTable;
