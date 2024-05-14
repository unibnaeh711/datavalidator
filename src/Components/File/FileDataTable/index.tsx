import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { message, Table, Tag } from "antd";

import FileService from "../../../Services/File";
import { setCanDownload, setProcessedData } from "../../../Slices/fileSlice";

const columns = [
  {
    title: "Name",
    dataIndex: "full_name",
    key: "name",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: string) => {
      let color;
      switch (type) {
        case "unique":
          color = "green";
          break;
        case "invalid":
          color = "red";
          break;
        case "duplicated_in_file":
          color = "yellow";
          break;
        case "duplicated_in_database":
          color = "blue";
          break;
        default:
          color = "gray";
          break;
      }
      return (
        <Tag color={color} key={type}>
          {type.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Order Date",
    dataIndex: "order_date",
    key: "order_date",
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
  },
];

const FileDataTable = () => {
  const dispatch = useDispatch();
  const file = useSelector((state: any) => state.file);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  }

  const getProcessedData = async (
    fileId: number, 
    currentPage: number, 
    pageSize: number, 
    retryCount: number = 10, 
    timeOut: number = 1000
  ) => {
    try {
      const response = await FileService.getProcessedData(fileId, currentPage, pageSize);
      console.log("getProcessedData", response.data);
      if (response.data.length === 0) {
        if (retryCount > 0) {
          setTimeout(function () {
            timeOut = Math.min(timeOut * 2, 5000);
            message.info('This file is processing, please wait in a few seconds.')
            return getProcessedData(fileId, currentPage, pageSize, retryCount - 1, timeOut);
          }, timeOut);
        } else {
          message.error('Failed to fetch data: Empty response');
        }
      } else {
        console.log('Data fetched successfully');
        dispatch(setProcessedData(response.data));
        dispatch(setCanDownload());
      }
    } catch (error: any) {
      message.error('Failed to fetch data: ' + error.message);
    }
  }

  if (file.isProcessing && file.id) {
    getProcessedData(file.id, currentPage, pageSize)
  }

  return (
    <div className="file-data-table" style={{marginTop: "20px"}}>
      <Table
        bordered
        dataSource={file.processedData}
        columns={columns}
        scroll={{ y: 240 }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: handlePageChange,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ["10", "20", "50"],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
      />
    </div>
  );
};

export default FileDataTable;
