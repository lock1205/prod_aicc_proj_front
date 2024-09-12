import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  REGISTER_USER_API_URL,
  POST_TASKS_API_URL,
  GET_TASKS_API_URL,
  GET_USER_TASKS_API_URL,
  UPDATE_USER_AGREE_API_URL,
  UPDADTE_AGREE_STATUS_API_URL,
  UPDADTE_AGREE_STATUS_COMMENT_API_URL,
  DELETE_TASKS_API_URL,
  POST_STATUS_TASKS_API_URL,
  GET_PACKAGES_CATEGORY_API_URL,
} from '../../util/apiUrl';

import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from '../../util/requestMethods';

const postItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postData) => {
    console.log(postData);
    const options = {
      body: JSON.stringify(postData), //표준 json 문자열로 변환
    };
    return await postRequest(apiURL, options);
  });
};

// post_tasks협의서
const postTasksFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postTasks) => {
    console.log(postTasks);
    const options = {
      body: JSON.stringify(postTasks), //표준 json 문자열로 변환
    };
    return await postRequest(apiURL, options);
  });
};

// 관리자 get_tasks협의서
const getTasksFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (getTasks) => {
    console.log(getTasks);
    const options = {
      body: JSON.stringify(getTasks), //표준 json 문자열로 변환
    };
    return await getRequest(apiURL, options);
  });
};
//My page get_tasks 협의서
const getUserItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (user_key) => {
    console.log(apiURL, user_key);
    const fullPath = `${apiURL}/${user_key}`;
    return await getRequest(fullPath);
  });
};

const updateItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (updateData) => {
    console.log(updateData);
    const options = {
      body: JSON.stringify(updateData), // 표준 json 문자열로 변환
    };
    return await putRequest(apiURL, options);
  });
};

const deleteItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (arg_num) => {
    const options = {
      method: 'DELETE',
    };
    const fullPath = `${apiURL}/${arg_num}`;
    return await deleteRequest(fullPath, options);
  });
};

// 패키지 카데고리 받아오기
const getPackagesCategoryFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (getGategory) => {
    console.log(getGategory);
    const options = {
      body: JSON.stringify(getGategory), //표준 json 문자열로 변환
    };
    return await getRequest(apiURL, options);
  });
};

//유저 실제 데이터를 db에 넣을 수 있는 함수
export const fetchPostItemData = postItemFetchThunk(
  'fetchPostItem',
  REGISTER_USER_API_URL
);

//post_tasks협의서 실제 데이터를 db에 넣을 수 있는 함수
export const fetchPostTasksData = postTasksFetchThunk(
  'fetchPostTasks',
  POST_TASKS_API_URL
);

//get_tasks 관리자 협의서 리스트
export const fetchGetTasksData = getTasksFetchThunk(
  'fetchGetTasks',
  GET_TASKS_API_URL
);

//Mypage에서 유저 협의서 리스트
export const fetchGetUserTasksData = getUserItemFetchThunk(
  'fetchGetUserTasks',
  GET_USER_TASKS_API_URL
);
//Mypage에서 유저 협의서 리스트 update
export const fetchUpdateAgreeTasksData = updateItemFetchThunk(
  'fetchUpdateAgreeTasks',
  UPDATE_USER_AGREE_API_URL
);
export const fetchUpdateStatusTasksData = updateItemFetchThunk(
  'fetchUpdateStatusTasks',
  UPDADTE_AGREE_STATUS_API_URL
);
export const fetchUpdateStatusCommentTasksData = updateItemFetchThunk(
  'fetchUpdateStatusCommentTasks',
  UPDADTE_AGREE_STATUS_COMMENT_API_URL
);

export const fetchDeleteItemData = deleteItemFetchThunk(
  'fetchDeleteItem',
  DELETE_TASKS_API_URL
);

export const fetchStatusTasksData = postTasksFetchThunk(
  'fetchPostStatusTasks',
  POST_STATUS_TASKS_API_URL
);

// 패키지 카데고리 프론트에서 데이터가 보여지는 것
export const fetchPackagesCategory = getPackagesCategoryFetchThunk(
  'fetchGetPackagesCategory',
  GET_PACKAGES_CATEGORY_API_URL
);

//create slice에서 사용하는 상태 체크
const handleFullfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload;
};
const handleRejected = (state, action) => {
  state.isError = true;
};

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    postItemData: null,
    fetchPostTasks: null,
    fetchGetTasks: null,
    fetchGetUserTasks: null,
    fetchUpdateAgreeTasks: null,
    fetchUpdateStatusTasks: null,
    fetchUpdateStatusCommentTasks: null,
    fetchDeleteItem: null,
    fetchPostStatusTasks: null,
    fetchGetPackagesCategory: null,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder

      .addCase(fetchPostItemData.fulfilled, handleFullfilled('postItemData'))
      .addCase(fetchPostItemData.rejected, handleRejected)
      .addCase(fetchPostTasksData.fulfilled, handleFullfilled('fetchPostTasks'))
      .addCase(fetchPostTasksData.rejected, handleRejected)
      .addCase(fetchGetTasksData.fulfilled, handleFullfilled('fetchGetTasks'))
      .addCase(fetchGetTasksData.rejected, handleRejected)
      .addCase(
        fetchGetUserTasksData.fulfilled,
        handleFullfilled('fetchGetUserTasks')
      )
      .addCase(fetchGetUserTasksData.rejected, handleRejected)
      .addCase(
        fetchUpdateAgreeTasksData.fulfilled,
        handleFullfilled('fetchUpdateAgreeTasks')
      )
      .addCase(fetchUpdateAgreeTasksData.rejected, handleRejected)

      .addCase(
        fetchUpdateStatusTasksData.fulfilled,
        handleFullfilled('fetchUpdateStatusTasks')
      )
      .addCase(fetchUpdateStatusTasksData.rejected, handleRejected)

      .addCase(
        fetchUpdateStatusCommentTasksData.fulfilled,
        handleFullfilled('fetchUpdateStatusCommentTasks')
      )
      .addCase(fetchUpdateStatusCommentTasksData.rejected, handleRejected)

      .addCase(
        fetchDeleteItemData.fulfilled,
        handleFullfilled('fetchDeleteItem')
      )
      .addCase(fetchDeleteItemData.rejected, handleRejected)

      .addCase(
        fetchStatusTasksData.fulfilled,
        handleFullfilled('fetchPostStatusTasks')
      )
      .addCase(fetchStatusTasksData.rejected, handleRejected)

      .addCase(
        fetchPackagesCategory.fulfilled,
        handleFullfilled('fetchGetPackagesCategory')
      )
      .addCase(fetchPackagesCategory.rejected, handleRejected);
  },
});

export default apiSlice.reducer;
