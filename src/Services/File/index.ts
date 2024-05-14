import axios from "axios";

import AuthService from "../../Services/Auth";


const API_URL = process.env.REACT_APP_API_URL + '/file';


const upload = async (file: File): Promise<any> => {
  console.log('upload file', file)
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const headers: any = AuthService.getHeader();
    headers['Content-Type'] = 'multipart/form-data'

    const response = await axios.post(
      API_URL + "/upload",
      formData,
      { headers },
    );

    if (response.status != 201) {
      throw new Error('Upload file failed');
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

const download = async (fileId: string, fileTag: string): Promise<any> => {
  let fileName = 'validated_data.csv';
  let query_params = "to_download=true";
  query_params += "&download_file_tag=" + fileTag;
  try {
    const response = await fetch(
      API_URL + "/" + fileId + "/results" + "?" + query_params,
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    if (response.status !== 200) {
      throw new Error('Failed to download file');
    }
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}

const getAnalysis = async (fileId: string): Promise<any> => {

}

const getProcessedData = async (fileId: number, currentPage: number = 1, pageSize: number = 10): Promise<any> => {
  try {
    const response = await axios.get(
      API_URL + "/" + fileId + "/results",
      {
        params: {
          page: currentPage,
          page_size: pageSize,
        }
      },
    );
    return response.data
  } catch (error: any) {
    throw new Error(error.message);
  }
}

const listFiles = async (): Promise<any> => {

}


const FileService = {
  upload,
  download,
  getProcessedData,
}

export default FileService;