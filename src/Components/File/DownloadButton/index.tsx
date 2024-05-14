import { useSelector } from "react-redux";

import { Button,Dropdown, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import FileService from "../../../Services/File";


const DownloadButton = () => {
  const file = useSelector((state: any) => state.file);

  const handleDownloadFile: MenuProps['onClick'] = (e) => {
    if (file.canDownload) {
      switch (e.key) {
        case "csv":
          FileService.download(file.id, 'csv');
          break;
        case "xlsx":
          FileService.download(file.id, 'xlsx');
          break;
        default:
          FileService.download(file.id, 'csv');
          break;
      }
    }
  }

  const items: MenuProps['items'] = [
    {
      label: 'Download as CSV',
      key: 'csv',
    },
    {
      label: 'Download as XLSX',
      key: 'xlsx',
    },
  ]
  const menuProps = {
    items,
    disabled: !file.canDownload,
    onClick: handleDownloadFile,
  };

  return (
    <Dropdown menu={menuProps}>
      <Button type="primary">
        <Space>
          Download
          <DownloadOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default DownloadButton;
