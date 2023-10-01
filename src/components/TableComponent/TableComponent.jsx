import { Divider, Radio, Table } from 'antd';
import React from 'react'
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const TableComponent = (props) => {
  const {selectionType = 'checkbox', data = [], isLoading= false, columns = []} = props
 
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  return (
    <LoadingComponent isLoading={isLoading}>
      <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          {...props}
      />
    </LoadingComponent>
  )
}

export default TableComponent