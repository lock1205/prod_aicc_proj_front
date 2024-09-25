# 프로젝트 구성

보유하고 있는 기술을 쉽게 설명하고 B2B, B2C 형태의 기업간 기술협의서를 작성하여 맞춤 솔루션을 의뢰 할 수 있는 서비스

**벡엔드** 
 - git 명 : prod_aicc_proj_back
 - 사용환경 : node.js

**프론트엔드** 
 - git 명 : prod_aicc_proj_front
 - 라이브러리 : react

DB : postgres

## 구성 기능 ##

front/
github/workflows/              # GitHub 워크플로우 설정

cicd.yml                      # CI/CD 파이프라인 설정 파일


public                  

index.html                    # 기본 HTML 템플릿

manifest.json                 # 웹 애플리케이션 설정 파일

robots.txt                   # 검색 엔진 크롤링 설정


src                          # 소스 코드 폴더

ai_info/                     # AI 관련 데이터

data.jsx                     # AI 정보 및 데이터 처리 파일

component/                   # React 컴포넌트 폴더

master/                      # 관리자 관련 컴포넌트

FilterBar.jsx                # 관리자페이지 필터바 컴포넌트

List.jsx                     # 관리자페이지 리스트 컴포넌트

SearchBar.jsx                # 관리자페이지 검색바 컴포넌트

mypage/                      # 마이페이지 관련 컴포넌트

MyAgree.jsx                  # 마이페이지 리스트화면 컴포넌트

public/                      # 공통 관련 컴포넌트

DetailAgree.jsx              # 협의서 세부사항 모달 컴포넌트

ItemBar.jsx                  # 협의서 아이템바 컴포넌트

AgreeFinish.jsx              # 협의서 완료후 화면 컴포넌트

AgreeMasterList.jsx          # 관리자 협의서 관리리스트 컴포넌트

AlermModal.jsx               # 알림 모달 컴포넌트

ColaboAgreement.jsx          # 협의서 작성 컴포넌트

ContentsPage.jsx             # 콘텐츠 body 컴포넌트

LoginForm.jsx                # 로그인 폼 컴포넌트

MainPage.jsx                 # 메인 페이지 컴포넌트

Modal.jsx                    # 모달 컴포넌트

NavBar.jsx                   # 네비게이션 바 컴포넌트

Recommend.jsx                # 추천 패키지 컴포넌트

SignupForm.jsx               # 회원가입 폼 컴포넌트

TechInfo.jsx                 # 보유 기술소개 컴포넌트



design/                      # 디자인 관련 CSS 파일들

agreeFinsh.css               # 어그리 완료 디자인

AgreeMasterList.css          # 어그리 마스터 리스트 디자인

AlermModal.css               # 알림 모달 디자인

bg.css                       # 배경 디자인

DetailAgree.css              # 어그리 세부 사항 디자인

LoginForm.css                # 로그인 폼 디자인

MainPage.css                 # 메인 페이지 디자인

MyPage.css                   # 마이페이지 디자인

Recommend.css                # 추천 디자인

SignupForm.css               # 회원가입 폼 디자인

TechInfo.css                 # 기술 정보 디자인

img/                         # 이미지 파일 폴더

Main/                        # 메인 폴더

.vscode/                     # VSCode 설정

css/                         # CSS 파일

redux/slice/                 # Redux 슬라이스 관리

apiSlice.js                  # API 관련 슬라이스

authSlice.js                 # 로그인 인증 관련 슬라이스

modalSlice.js                # 모달 관련 슬라이스

tempSlice.js                 # 임시저장 쿠키 관련 슬라이스

store.js                     # Redux 스토어 설정

util/                        # 유틸리티 함수 폴더

apiUrl.js                    # API URL 관련 유틸리티 파일

requestMethods.js            # 질의 관련 메소드 파일

## 사용법 ##
1.클론을 받은 뒤
 - git clone https://github.com/lock1205/prod_aicc_proj_front.git

2.npm install 
 - node_module을 설치

3.env 파일 생성
 - REACT_APP_MY_DOMAIN 생성

## 디버그 사항 ##
1. 사용자 로그인 에러처리
   - 원인 : 로그인 시 response.status에 따른 에러처리 안됨
   - 해결 : Axios의 경우 200번대가 아닌 status 값은 모두 error 처리를 하기 때문에 try~catch문에서  catch문에 status 코드에 따른 에러처리를 해줘야 함.
  
2. 사용자 임시저장 후 confirm 로드 불가 오류
   - 원인 : 임시저장 후 협의서 입력화면이 로드된 후 confirm 여부로 임시저장을 불러오거나 삭제할 수 없는 오류
   - 해결 : Confirm 여부는 협의서 입력 컴포넌트가 마운트된 후에 발생하기 때문에 이미 입력화면의 state가 로드된 후에 나타남. 다른 컴포넌트에서 협의서 입력 컴포넌트를 불러오기 전에
            confirm을 외부 컴포넌트에서 로드 하게끔 바꿔서 임시저장내용의 로드 여부로 redux state 값을 컨트롤 할 수 있게 변경

3. 관리자 코멘트와 상태변경 오류
   - 원인 : 관리자가  협의문서 코멘트를 넣고 상태를 변경할때 바로 저장이 안되고 두번째 클릭때 저장되는 오류
   - 해결 : 협의문서 값을 저장한 useState의 비동기적 렌더링으로 인해 일반적인 onclick 함수로 useState를 변경할 경우 첫번째 클릭때는 값이 안 들어감. 상태 값과 코멘트 값 변경에 대해서
            useEffect를 사용하여 동기화 시켜줌
     
4. 관리자 리스트 상태변화 리렌더링 오류
   - 원인 : 관리자가  모달창에서 상태변화를 시켰을 때 리스트가 리렌더링이 바로 되지 않는 오류
   - 해결 : 모달에서 값을 저장하고 모달창이 닫혔을 때 부모컴포넌트에서는 자식컴포넌트의 변화에 대해서는 리렌더링이 되지 않음. 그렇기 때문에 모달을 닫았을 때
            모달슬라이스의 isOpen 값의 변화를 useEffect에 추가하여 리렌더링 시켜줌


## 도메인과 Git 연결 ##
- 추후 velog 링크를 추가할 예정
