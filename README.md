<div align="center">
<h1> In연.ZIP Application </h1>
</div>

### **목적** 
**당신의 소중한 인연들과의 추억들을 모아줍니다!

### **개발 동기** 



### **주요 기능**
- `연락처 등록, 상세보기, 수정, 삭제, 검색` 
  - 실제 연락처들과 최대한 유사하게 구현
- `이미지들을 인스타그램 아이디들과 함께 등록`
  - 

<br>

<div align="center">
<h2>구현</h2>
</div>

<br>

### ⛭ **기술 스택**
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white"> <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=Supabase&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=Prisma&logoColor=white">  
<img src="https://img.shields.io/badge/AndroidStudio-000000?style=for-the-badge&logo=AndroidStudio&logoColor=white"><img src="https://img.shields.io/badge/Kotlin-000000?style=for-the-badge&logo=Kotlin&logoColor=white">

### **탭 1**

![스크린샷 2024-12-31 오후 8 23 08](https://github.com/user-attachments/assets/3bcc8233-1073-49a7-9a99-142251f0b658)![스크린샷 2024-12-31 오후 8 23 23](https://github.com/user-attachments/assets/1755f1c6-2a19-489c-aaaf-3e9f1cac2313)![스크린샷 2024-12-31 오후 8 23 38](https://github.com/user-attachments/assets/e0dd7fa3-1408-46c1-bc2b-5fc8500e43ce)![스크린샷 2024-12-31 오후 8 23 49](https://github.com/user-attachments/assets/389f457d-12fe-490f-bb6e-2770ac7d6773)

탭1에서는 연락처를 리스트뷰로 보여주었고 연락처 정보 자세히보기, 연락처 수정, 연락처 삭제, 연락처 추가, 연락처 검색 기능을 구현하였습니다.<br/>
연락처는 확장성 측면을 감안하여 nestjs로 서버를 구축하고 배포하여 supabase 라는 db와 연결하여 사용하였습니다.<br/>
각자 기능별로 api를 만들어서 GCP에 배포 후 연락처 Get,Post,Patch,Delete Api들을 구현하여 프론트에서 가져와서 기능 구현을 하였습니다.<br/>
특히 삭제 처리의 경우 탭 2, 탭 3에 있을 작업들을 위해 soft delete 처리로 진행하였습니다. 유저가 삭제되면 다른 탭에서도 반영하기 위하여<br/>
SharedViewModel을 사용하여 탭 1의 연락처 삭제 기능과 탭 2, 3의 이미지 데이터를 동기화했습니다. Contact 탭에서 연락처가 삭제되면 SharedViewModel을 통해 이벤트를 발생시키고, Images 탭과 Album 탭에서는 이 이벤트를 구독하여 자신들의 이미지 데이터를 새로고침하는 방식으로 구현했습니다. 이를 통해 사용자가 연락처를 삭제할 때 관련된 이미지 데이터가 모든 탭에서 즉시 업데이트되어 일관된 상태를 유지할 수 있게 하였습니다.<br/>



### **탭 2**

![스크린샷 2025-01-01 오후 1 19 23](https://github.com/user-attachments/assets/02fea3ea-0dcb-4fc1-b3c0-8adab14ba50d)![스크린샷 2025-01-01 오후 1 18 53](https://github.com/user-attachments/assets/cfc7d155-3c3a-4f20-beaf-b428ecd58239)![스크린샷 2025-01-01 오후 1 19 11](https://github.com/user-attachments/assets/649168bb-7b0a-4b1a-9314-776ddeab31e8)![스크린샷 2025-01-01 오후 1 19 36](https://github.com/user-attachments/assets/a47dbd91-c66c-4f1a-8480-ab90cbe60aac)

탭2에서는 이미지를 날짜, instagram id들과 함께 POST 할 수 있도록 하였습니다. 뒤에 있을 탭3의 기능을 위해 앞에 contact에 존재하는 instagramid들을 같이 함께 적을 수 있게 하였고, 여기서도 SharedViewModel을 통해 탭3와 부분적으로 동기화 시켜 image post가 tab3에도 즉각적으로 반영되게 하였습니다. 이미지를 클릭하면 getImage로 이미지 자세히 보게 하였고 그 속에는 POST 할 때 작성하였던 Instagram ID들과 선택한 날짜가 보이게 하였습니다.<br/> 
탭2에서 기술적으로 가장 많이 생각했던 부분은 이미지 업로드 부분입니다. <br/>
최초에는 그냥 백엔드 서버에 multer,fileinterceptor를 가지고 이미지를 저장하여 서버 저장 경로의 직접적인 url을 DB에 저장하는 방식을 택했지만, 이미지를 많이 저장한다면 서버 성능 저하가 우려되고 사실 조금이라도 프로젝트가 커진다면 절대 불가능한 방식이라는 생각이 들어 클라우드에 이미지를 업로드 하는 방식을 택했습니다. 
클라우드에 이미지를 업로드 하기 위해 Amazon aws console 에 접속하여 s3 storage에 access 키를 받아 이미지를 업로드 하는 방법을 사용하기로 했습니다. 여기에서도 근데 이미지를 업로드 하는 로직은 백엔드 환경에서 multer,fileinterceptor로 구현되어 있어서 다소 비효율적이고 현업에서는 절대 쓰이지 않는 방식이라는 것을 깨닫고 프론트에서 이미지를 받고 백엔드에서 presigned url을 요청하여(access key 보안상 백에서 처리) 그 url과 함께 한꺼번에 Post를 하는 제가 아는 한 가장 서버에 부담이 적고 이상적인 방법으로 구현하고자 하였고 성공해냈습니다.
<img width="654" alt="스크린샷 2025-01-01 오후 2 56 46" src="https://github.com/user-attachments/assets/3184328a-31bb-4f1b-aee0-4a86f97b66c7" />







### **탭 3**
<img width="309" alt="스크린샷 2025-01-01 오후 3 00 34" src="https://github.com/user-attachments/assets/5df293d1-c0bf-4d95-9932-3d8957afc7c6" /><img width="314" alt="스크린샷 2025-01-01 오후 3 00 46" src="https://github.com/user-attachments/assets/b17c25d2-9cdb-4a26-a36d-8b2fee56a9fa" />


탭 3에서는 인스타그램 ID 별로 태그된 사진들을 묶어 공유된 기억들에 대한 사진을 사람별로 모아주는 기능을 구현했습니다.












## 👪 공동 작업자



- **Minji Kim**  
  [![GitHub Badge](https://img.shields.io/badge/GitHub-181717?&logo=GitHub&logoColor=white&style=for-the-badge&link=https://github.com/mjth1s1s)](https://github.com/mjth1s1s)
- **Youngmin Kim**  
  [![GitHub Badge](https://img.shields.io/badge/GitHub-181717?&logo=GitHub&logoColor=white&style=for-the-badge&link=https://github.com/zeromin03)](https://github.com/zeromin03)














