## 📱 Community App

간단한 커뮤니티 기능을 제공하는 모바일 앱입니다.

Expo · React Native 기반으로 개발되었으며, Supabase를 통해 인증과 데이터 관리를 처리합니다.


IOS 운영체제에 초점을 두고 구현했습니다.


사용자들은 **회원가입/로그인, 피드 작성, 이미지 업로드, 댓글 작성** 등 기본적인 커뮤니티 기능을 이용할 수 있습니다.

---

## 🚀 Features

### 👤 Auth
- 이메일 기반 회원가입 / 로그인
- AsyncStorage 를 통한 세션 유지
- Supabase Auth 연동

### 📝 Feed
- 게시글 목록 조회
- 게시글 상세 보기
- 텍스트 + 이미지 업로드
- 게시물 수정 및 삭제

### 💬 Comment
- 댓글 작성

### 📸 Image Handling
- 이미지 다중 업로드
- Base64 변환 후 Supabase Storage 업로드

### 🎨 UI/UX
- 커뮤니티 UI
- Expo Image, 활용

## 🐈‍⬛  페이지 경로

| 페이지           | 경로                   |
| ---------------- | ---------------------- |
| 로그인           | /auth/login                 |
| 회원가입         | /auth/signup                |
| 메인 화면        | /                      |
| 게시물 작성        | /posting/PostFeed         |
| 게시물 수정 | /posting/EditFeed                |
| 게시물 상세화면       | /posting/[id]           |
| 프로필 화면       | /myProfile           |
| 설정 화면       | /setting        |


## 🛠 Tech Stack

| Category | Stack |
|---------|-------|
| **Framework** | Expo 54, React Native 0.81, React 19, Expo Router 6 |
| **Language** | TypeScript |
| **Navigation** | React Navigation (Native, Bottom Tabs) |
| **State / Data** | TanStack React Query v5, React Hook Form |
| **Backend / Auth** | Supabase (Auth, Storage, DB), AsyncStorage |
| **UI / UX** | @expo/vector-icons, react-native-safe-area-context |
| **Media / File** | Expo Image Picker , Expo File System |
| **Utilities** | expo-constants , react-native-url-polyfill |
| **Dev Tools** | ESLint , eslint-config-expo |

---
