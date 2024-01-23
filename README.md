#### 2023 KAIST MadCamp Week3
###### 이화여자대학교 컴퓨터공학과 황재령, 성균관대학교 컬쳐앤테크놀로지융합전공 최지민
# 반응형 Website
## *HAVEN*
 **H**olding memories close,<br>
 **A**ngels in our hearts,<br>
 **V**oices echoing in silence,<br>
 **E**ternal love unbroken,<br>
 **N**ever forgotten. <br>
납골당까지 가지 못해도, 개인적으로 세상을 떠난 주변 사람들과의 추억을 공유하고, 계속해서 기억할 수 있도록 만든 웹사이트

## 프로젝트 소개
- Frondend : React
- 프론트 관련 정보는 [여기](https://github.com/jiminjr/Madcamp-Third-Week-FE)에서 확인해주세요!
- Backend : Django, Python, MySQL, AWS

![haven_main](https://github.com/Hwang-Jaeryeong/madcamp_week3_BE/assets/113423770/62f2771f-fc01-46ae-985b-5ed686bb6450)
<br>
고정 글씨 뒤에 화면들은 슬로우 화면으로 매번 바뀜 

### 기능
***
#### 1) 로그인, 로그아웃, 회원가입
이건 기본적인 기능이니 별다른 설명은 하지 않겠다.
로그인 시 access token과 refresh token을 발급해 고유의 회원을 만들고, 이 회원마다 가지고 있는 정보를 id 값으로 데이터베이스에 외래 키 사용해 분리하였다.
암호는 해시화하였다.



#### 2) 추모 대상 등록

추모대상의 영정 사진과, 이름, 세상을 떠난 날짜, 좌우명 등을 입력하고 등록할 수 있다.

이를 통해 등록하면 로그인한 home에 그 사용자의 영정 사진과 함께 프로필 카드가 생성되고, 등록된 사람의 프로필에는 반응형으로 기일, 좌우명, 나에게 어떤 사람이었는지에 대한 설명이 번갈아가며 나오게 된다.
![readme_home](https://github.com/Hwang-Jaeryeong/madcamp_week3_BE/assets/113423770/2255b754-57c2-4e49-b80f-d774bb88e904)
*로그인한 사용자마다 등록된 프로필 카드는 당연히 다르게 로드된다.*
![register_readme](https://github.com/Hwang-Jaeryeong/madcamp_week3_BE/assets/113423770/e3e71227-17c6-4313-91c5-de72cfc6b903)
*등록 팝업*
![readme_profile](https://github.com/Hwang-Jaeryeong/madcamp_week3_BE/assets/113423770/9b0c6e12-0183-4aa9-bdcd-4aff16cefd36)
*선택한 프로필 카드*


#### 3) 갤러리
위의 프로필 카드에서 gallery를 클릭하면 내가 등록한 사진들을 볼 수 있는 탭으로 이동한다.<br>
사진을 등록할 때 간단한 메세지를 등록하여 그 사람과의 추억의 순간을 잊지 않도록 메모를 남길 수 있도록 하였다.<br>
그 메모는 해당 사진과 함께 묶어 저장하였으며, 해당 사진에 마우스를 올렸을 때 반투명한 카드와 함께 보이게 된다.<br>
또한 위에 색깔 바꾸는 버튼을 이용해 화면의 색깔을 black/white로 적용할 수 있어, 자기가 원하는 분위기로 볼 수 있다. 이는 모든 화면에 적용된다.


![readme_gallery(black)](https://github.com/Hwang-Jaeryeong/madcamp_week3_BE/assets/113423770/4a837c7f-8951-4521-a513-4565211ddec0)
*검은화면 예시*
![readme_gallery(white)](https://github.com/Hwang-Jaeryeong/madcamp_week3_BE/assets/113423770/5b6fa390-bc73-4741-9b79-901617250975)

*밝은화면 예시*
![readme_galleryclick](https://github.com/Hwang-Jaeryeong/madcamp_week3_BE/assets/113423770/dafc73bf-899a-4259-853e-bcb569db9388)
*해당 사진의 메모*


#### 4) 편지

편지를 남기는 사람은 자신이 원하는 이름으로 등록할 수 있도록 models.py에는 access token값을 author로 받아오는 것이 아닌 사용자 입력값으로 받아올 수 있도록 하였다.
편지를 등록하면 다음과 같이 로드된다.
![readme_letter](https://github.com/Hwang-Jaeryeong/madcamp_week3_BE/assets/113423770/666de6f5-3f2b-46b1-b96f-3d17117cdaa0)



#### 5) 포토 부스
신청받은 고인의 사진을 webcam에 함께 추가하여 네 컷 사진을 남길 수 있도록 만들었다.<br>
예를 들어, 돌아가신 할머니와 생전 함께 사진을 남기지 못한 사람들이 많다. 신청받은 사진을 통해 프레임을 생성하여 고인과 함께 사진 촬영을 할 수 있고,
사진 저장도 가능하게 구현했다. <br>
함께 마지막 사진을 남겨보자 !<br>


<img width="1201" alt="pho" src="https://github.com/Hwang-Jaeryeong/madcamp_week3_BE/assets/113423770/b0fa894c-60f7-4823-9a91-7a488c1bf2f4">
<img width="1223" alt="pho2" src="https://github.com/Hwang-Jaeryeong/madcamp_week3_BE/assets/113423770/077a817e-037e-4b5d-b422-5f89de06051a">
