import React from "react";
import { useSelector } from "react-redux";

import { Flex } from "antd";

import FileDragger from "../../../Components/File/FileDragger";
import FileDataTable from "../../../Components/File/FileDataTable";
import DownloadButton from "../../../Components/File/DownloadButton";


const FileUploadPage: React.FC = () => {
  return (
    <div className="file-upload-page">
      <h1>Upload Page</h1>
      <Flex vertical>
        <FileDragger />
        <Flex justify="flex-end" style={{ marginTop: "20px" }}>
          <DownloadButton />
        </Flex>
        <FileDataTable />
      </Flex>
    </div>
  );
};

export default FileUploadPage;
