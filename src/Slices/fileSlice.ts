import { createSlice } from '@reduxjs/toolkit';


interface FileState {
  id: number | null
  isProcessing: boolean
  canDownload: boolean
  processedData: Array<any> | []
}

const initialState: FileState = {
  id: null,
  isProcessing: false,
  canDownload: false,
  processedData: []
}

const fileSlice = createSlice({
  name: 'file',
  initialState: initialState,
  reducers: {
    upload(state, action) {
      console.log('upload action', action)
      state.id = action.payload.uploadedFile.id;
      state.isProcessing = true;
    },
    setCanDownload(state) {
      state.canDownload = true;
    },
    setProcessedData(state, action) {
      console.log(action)
      state.processedData = action.payload;
    },
    reset(state) {
      state.id = null;
      state.isProcessing = false;
      state.canDownload = false;
      state.processedData = [];
    },
  },
});


export const { upload, setCanDownload, setProcessedData, reset } = fileSlice.actions;
export const selectFile = (state: any) => state.file;
export default fileSlice.reducer;