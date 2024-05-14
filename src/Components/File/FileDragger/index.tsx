import React from "react";

import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import FileService from "../../../Services/File";
import { upload } from "../../../Slices/fileSlice";

const { Dragger } = Upload;


const FileDragger: React.FC = () => {
  const dispatch = useDispatch();

  const handleCustomRequest = async (options: any) => {
    console.log('handleCustomRequest', options);
    try {
      console.log("handle file upload", options.file)
      const uploadedFile = await FileService.upload(options.file)
      dispatch(upload({ uploadedFile }))
      options.onSuccess(uploadedFile, options.file);
    } catch (error: any) {
      console.log("failed to upload file", error)
      options.onError(error);
    }
  };

  return (
    <div className="file-file-dragger" style={{ marginTop: "20px" }}>
      <Dragger 
        name="file"
        multiple={false}
        maxCount={1}
        customRequest={handleCustomRequest}
      >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-text">Only support for CSV, or XLSX file</p>
        </Dragger>
    </div>
  );
}

export default FileDragger;