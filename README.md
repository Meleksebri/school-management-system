<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://thumbs.dreamstime.com/b/black-school-icon-shadow-logo-design-white-157312165.jpg" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">School Management System</h3>

  <p align="center">
    An awesome school management system web application built with MERN stack and uses Artificial Intelligence!
    <br />
    <a href="https://github.com/Meleksebri/school-management-system"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Meleksebri/school-management-system">View Demo</a>
    ·
    <a href="https://github.com/Meleksebri/school-management-system/issues">Report Bug</a>
    ·
    <a href="https://github.com/Meleksebri/school-management-system/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="https://www.manaarah.com/wp-content/uploads/School-Management-System.webp" alt="Logo">

Managing any educational institute is not a piece of cake. Managing students, staff, timetable, exams, class test, attendance, fees collection, accounts, etc. It does not end here. Parents are always worried about their child's performance and they need satisfaction. They care about their child's academic statics. Moreover, I have seen schools using huge registers to mark the attendance of their students and staff. And I have also seen that schools manage their admission, exams data, class tests data, etc, manually. I know it takes a lot of time and is very difficult to manage.
Well! it's time to put check on these worries. Skooly presents you a free online school management system to make conventional tasks easier. This is the one-stop solution to manage, track and record everything within your school or organization. My free online school management system includes admin, teacher and students panel, exams module, attendance module, class tests management, homework management, students, parents and teachers management, and many more awesome and unique features than any other online school management system in the market like an integrated chat application that allows users to talk to each others easily and interact together to bring teachers and students closer to each other without the need to use third-party messaging application and an Artificial intelligence model that controls profile pictures uploaded by users . This Ai model is a deep learning object detection model that aims to identify single or multiple persons in an image. If the image uploaded by the user contains a person ( face ) the model will give a positive result and the image will be approved however if it is a random image that doesn't have a person in it it will be rejected and that way users can only upload appropriate images. You can read more about the Ai model used in this project <a href="https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd"> here </a>

So why is Skooly the best school management software?
Simply because it is a completely free online school management software, it has more school management features than any other online school management system in the market. It does not end here, this project is still enhancing features. You will be automatically updated as a new feature will be a part of my free school management software. Some main school management features will be given below.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used in this project. Here are a few examples.

* React js
* Material UI ( mui )
* Axios
* Node js
* Express js
* Mongodb
* Socket.io
* Redux toolkit
* Json Web Token ( JWT )

And this section should list any minor frameworks/libraries used in this project. Here are a few examples.

* Fontawesome
* Iconify
* Syncfusion
* React-apex-charts
* React-hook-form
* React-router-dom
* Sweetalert 2
* Toastify
* Tensorflow js
* Bcrypt
* Multer
* Nodemailer
* Mongoose

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how i will give you instructions on setting up the project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

First of all , before installing the project you need to understand the structure of the project. So, the whole project is composed of 3 subfolders , a folder that contains the School Management Platform ( the main server of the project and the front-end of the Platform ) , another folder contains the front-end of the chat application and the final folder contains the landing page of the School management system.
Now, each folder will be found in a seperate branch. Branch master contains the the School Management Platform , branch master1 contains the landing page and branch master2 contains the front of the chat app.

### Installation

_Below is an example of how you can  install and sett up the app.

1. Create a folder in your computer and name it whatever you want 
2. Inside your folder , clone each branch ( master , master1 and master2 ) ( NB : the landing page is not so important in the project so you can skip cloning master1)
   ```sh
   git clone -b master https://github.com/Meleksebri/school-management-system.git Platform
   ```
   
   ```sh
   git clone -b master1 https://github.com/Meleksebri/school-management-system.git LandingPgae
   ```
   
   ```sh
   git clone -b master2 https://github.com/Meleksebri/school-management-system.git ChatApp
   ```
   
   Now after cloning all branches , you should have inside you main folder 3 subfolders ( or 2 if you skipped landing page ) named Platform , LandingPage* and ChatApp
   
3. cd to each folder and install NPM packages ( for the folder Platform , you should additionally cd to folder client and run the same command below)
   ```sh
   npm install
   ```
4. Inside the ChatApp folder , create a .env file and paste the code below inside of it
   ```js
   REACT_APP_LOCALHOST_KEY="chat-app-current-user"
   ```
5. Inside the Platform folder , create a .env and paste the code below inside of it ( don't change the server's port to avoid errors , you can enter your own databse name and jwt secret )
   ```js
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/<YOUR-DATABASE-NAME>
   JWT_SECRET=<YOUR-JWT-SECRET>
   ```
6. In the Platform folder , cd to adminControllers.js file located inside controllers folder inside server folder and configure nodemailer so users can receive emails when admin approves their requests
  ```js
  let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "<YOUR-EMAIL>",
    pass: "<YOUR-PASSWORD>",
  },
  });
  ```
( NB : your password is not the same password you use to connect to your gmail instead it is a secret key , you can find more how to get it <a href="https://community.nodemailer.com/using-gmail/">Here</a>

7. Now you need to run your server , cd to Platform folder and run ( after running the command , in the console make sure your server is running on port 4000 ) 
  ```sh
  npm start
  ```
  
8. Start the react app of the School Management Platform , cd to Platform folder and then inside the client folder run this command : ( make sure the app is running on localhost:3000 )
  ```sh
  npm start
  ```
9. Start the react app of the Chat application , cd to ChatApp folder and then run this command : ( make sure it is running on localhost:3001 )
  ```sh
  npm start
  ```

10. Start the react app of the Landing page ( optional )  , cd to LandingPage folder and then run this command :
  ```sh
  npm start
  ```
  
Now everything should be running perfectly without any errors , you will have a login/register page on the localhost:3000 , a login page on localhost:3001 and the landing page on localhost:3002 and of course the main server is running on port 4000.

To use the application , head to Usage section to get an idea how the project works.
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

-The School Management System has 3 different user roles : admin role , teacher role and student role.

-First of all , to start using the application you need your own admin account so you have to create one and here is how : 
open postman or thunder client in vscode and send a post request to this url : http://localhost:4000/api/v1/admin/newAdmin . Inside the request's body , you should send the account inforamtion in json foramt : 
  ```js
  {
  "firstName" : <YOUR-ADMIN-NAME> ,
  "lastName" : <YOUR-ADMIN-LASTNAME> ,
  "email" :  <YOUR-ADMIN-EMAIL> ,
  "password" : <YOUR-ADMIN-PASSWORD>
  }
  ```
Hit send and you should get a response with a message : "new admin has been created successfully". Now all you need to do use to login with your admin email and password in the login page.

-The admin can manage users' register request , manage students , teachers and parents ( CRUD opertaions ) , manage classes , manage subjects , mark employees attendance.

-For teachers ,students or parents to join the platform and create an account , they can head to register page , fill the register form with their informtion and then they have to wait for admin approval . The admin heads to users section , there he will find all register requests and all he needs to do to add new users is to go to either student , teacher or parent section based on user's role and press add new user and then fill the form with user's info ( user's info found in the table row of the user section ) , however , the admin is the one who choses the user's password (after approval the user will get his password by email after the admin adds him ) . After that the user will have his account ready and can connect to the platform and also to the chat app ( the same email and password will connect the user to the chat app and to the platform ).

-In this platform , the teacher can view his students , manage exams ( CRUD ) , manage homeworks ( homework is like a quizz with 4 options ) , manage student's grades based on each exam , mark his student's attendance and update his profile info

-Now the student can view all his subjects based on the class in which he is enrolled (each class has multiple subjects ), view teacher's list with their corresponding subject ( each teacher has one unique subject ) , view his exams , checks his grades , do his homework online and update his profile info.

-Each user have his own dashboard that gives him specific inforamtions based on his role and his inforamtion.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under specific License. Contact me for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

My name : Melek Sebri
My email : meleksebri25@gmail.com
Github account : https://github.com/Meleksebri

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

I will list resources I find helpful and would like to give credit to. I've included a few of them :

* [GoMycode](https://gomycode.com/TN-FR/home)
* [React](https://reactjs.org/)
* [Nodejs with AI](https://betterprogramming.pub/node-js-implementation-of-image-recognition-using-tensorflow-and-express-js-b006f5609415)
* [Coco ssd model](https://www.npmjs.com/package/@tensorflow-models/coco-ssd)
* [Socket.io](https://socket.io/)
* [Mui](https://mui.com/store/)
* [Iconify](https://icon-sets.iconify.design/)
* [Redux](https://redux-toolkit.js.org/)
* [Nodemailer](https://mailtrap.io/blog/nodemailer-gmail/)
* [Multer](https://www.npmjs.com/package/multer)




<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
