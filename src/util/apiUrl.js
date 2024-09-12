const REGISTER_USER_API_URL = 'http://localhost:8080/register_user';
const POST_TASKS_API_URL = 'http://localhost:8080/post_tasks';
const GET_TASKS_API_URL = 'http://localhost:8080/get_tasks';

//Mypage 협의서 리스트
const GET_USER_TASKS_API_URL = 'http://localhost:8080/get_UserTasks';

const POST_STATUS_TASKS_API_URL = 'http://localhost:8080/post_status';

const UPDADTE_AGREE_STATUS_API_URL = 'http://localhost:8080/update_status';
const UPDADTE_AGREE_STATUS_COMMENT_API_URL =
  'http://localhost:8080/update_comment_status';
const DELETE_TASKS_API_URL = 'http://localhost:8080/delete_task';

//Mypage 협의서 수정
const UPDATE_USER_AGREE_API_URL = 'http://localhost:8080/update_agree';

//  패키지 카테고리 받아오기
const GET_PACKAGES_CATEGORY_API_URL =
  'http://localhost:8080/get_Category/:text';

export {
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
};
