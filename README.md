
<!-- ![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png) -->
# RQ-A


Revolutionize road inspections with our app that detects road defects with ease!




## Screenshots

![App Screenshot](https://github.com/atultyagi612/RQ-A/blob/5989fe6c934ebc393e8ad296e9997d9ee5dc5b28/chrome-capture-2023-3-14.gif)

By analysing photographs or videos of roads to identify various objects and categorise flaws that can impair road quality, this app uses object detection techniques that can produce reports on the condition of the roads. Generated reports with details on the position and seriousness of discovered objects can aid in prioritising road upkeep, repairs, and long-term monitoring of road conditions. This software can be modified to find particular kinds of flaws, and these findings can be easily shared with the appropriate parties for efficient maintenance, such as road inspectors, maintenance workers, and decision-makers.
## Live Application URL

https://rq-a.netlify.app/

This URL has the application deployed on netlify


## Features

- User authentication
- Object detection using YOLOv7 model
- Image and video processing
- Database management with Firestore
- Cloud storage with Firebase Cloud Storage
- User-friendly interface
- Reporting and analytics
- Report sharing
- Report downloading as a PDF
- Open-To-All Dashboard
- Phone number verification using Twilio
- Scalability and reliability with Firebase backend
- User management functionalities


## Cloning and Running the Application in local

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install all the npm packages.

```bash
  npm install
```

#### Environment Variables

To run this project, first Obtain Firebase access, set up Firebase configuration in the project in
```
Firebase.js

```
file , and then add your personal TWILIO API key for phone number authentication.


In order to run the application Type the following command

```bash
  npm start
```


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

```bash
  npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


```bash
  npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

    
