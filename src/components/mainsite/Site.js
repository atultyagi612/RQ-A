import React, { useEffect,useState } from 'react'
import './site.css'
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import {useNavigate } from "react-router-dom";
import { UseUserAuth } from "../../context/UserAuthContext";
import Lightbox from "yet-another-react-lightbox";
import {PhotoAlbum ,RenderPhotoProps} from "react-photo-album";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import { toast, Toaster } from "react-hot-toast";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {activelink,hamburgermenu,svgsmoothscroll,scrollClickEvents,closenav} from './Sitejavascript'
import KickURL from '../KickURL';



const Site = () => {
    const {user,googleSignIn,authenticationdone} = UseUserAuth();
    const [lightboxindex, setlightboxIndex] = useState(-1);

  const photos = [
    { src: "/images/services-offered4.png", width: 708, height: 472 },
    { src: "/images/services-offered1.png", width: 472, height: 708 },
    { src: "/images/services-offered3.png", width: 472, height: 708 },
    { src: "/images/services-offered5.png", width: 708, height: 472 },
    { src: "/images/services-offered6.png", width: 708, height: 472 },
    { src: "/images/services-offered2.png", width: 472, height: 708 },
    { src: "/images/services-offered7.png", width: 1536, height: 720 },
    { src: "/images/services-offered8.png", width: 992, height: 892 },
];
const slides = photos.map(({ src, key, width, height, images }) => ({
  src,
  key,
  width,
  height,
  srcSet: images?.map((image) => ({
    src: image.src,
    width: image.width,
    height: image.height
  }))
}));
    const navigate = useNavigate();
      const handleGoogleSignIn = async () => {
          
          if (!user){
            try {
                await googleSignIn();
                navigate('/app')
              } catch (error) {
                console.log(error.message);
              }
          }else{
            navigate('/app')
          }
        
        };

useEffect(()=>{
  setTimeout(() => {
    // showonlylogin()
  }, 3000);
},[])

useEffect(()=>{
  activelink()
  hamburgermenu()
  svgsmoothscroll()
  scrollClickEvents()
},[])

useEffect(() => {
  gsap.registerPlugin(CustomEase);

  const customEaseIn = CustomEase.create(
    "custom-ease-in",
    "0.52, 0.00, 0.48, 1.00"
  );
  const fourtyFrames = 1.3333333;
  const fiftyFrames = 1.66666;
  const twoFrames = 0.666666;
  const fourFrames = 0.133333;
  const sixFrames = 0.2;

  const navbar = document.querySelector('.navigation-bar');
  const firstslide = document.querySelector("#firstslide span");
  const secondslide = document.querySelector("#secondslide span");
  const thirdslide = document.querySelector("#thirdslide span");
  const fourthslide = document.querySelector("#fourthslide span");
  const fifthslide = document.querySelector("#fifthslide span");
  const sixthslide = document.querySelector("#sixthslide span");
  const seventhslide = document.querySelector("#seventhslide span");
  const eightslide = document.querySelector("#eightslide span");
  const hideElements = () => {
    const timeline = gsap.timeline();
    timeline
          .fromTo(firstslide,{ x: "0rem" },{ x: "38.7rem", duration: fiftyFrames, ease: customEaseIn },0)
          .fromTo(thirdslide,{ x: "0rem" },{ x: "38.1rem", duration: fiftyFrames, ease: customEaseIn },twoFrames)
          .fromTo(sixthslide,{ x: "0rem" },{ x: "-28.2rem", duration: fiftyFrames, ease: customEaseIn },twoFrames)
          .fromTo(eightslide,{ x: "0rem" },{ x: "-28.2rem", duration: fiftyFrames, ease: customEaseIn },twoFrames)
          .fromTo(secondslide,{ x: "0rem" },{ x: "-38rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)
          .fromTo(fourthslide,{ x: "0rem" },{ x: "-22.1rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)
          .fromTo(fifthslide,{ x: "0rem" },{ x: "28.3rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)
          .fromTo(seventhslide,{ x: "0rem" },{ x: "32.9rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)
    return timeline;
  }
  const showElements = () => {
    const timeline = gsap.timeline();
    timeline
      .fromTo(firstslide,{ x: "58.7rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },0)
      .fromTo(thirdslide,{ x: "58.1rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },twoFrames)
      .fromTo(sixthslide,{ x: "-48.2rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },twoFrames)
      .fromTo(eightslide,{ x: "-48.2rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },twoFrames)
      .fromTo(secondslide,{ x: "-58rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)
      .fromTo(fourthslide,{ x: "-42.1rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)
      .fromTo(fifthslide,{ x: "58.3rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)
      .fromTo(seventhslide,{ x: "42.9rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)

    return timeline;
  };
  const showElementnav = () => {
    const timeline = gsap.timeline();
    timeline
      .fromTo(firstslide,{ x: "58.7rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },0)
      .fromTo(navbar, {y: '-5.5rem'}, {y: '0rem', duration: fourtyFrames, ease: customEaseIn}, 0)
      .fromTo(thirdslide,{ x: "58.1rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },twoFrames)
      .fromTo(sixthslide,{ x: "-48.2rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },twoFrames)
      .fromTo(eightslide,{ x: "-48.2rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },twoFrames)
      .fromTo(secondslide,{ x: "-58rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)
      .fromTo(fourthslide,{ x: "-42.1rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)
      .fromTo(fifthslide,{ x: "48.3rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)
      .fromTo(seventhslide,{ x: "52.9rem" },{ x: "0rem", duration: fiftyFrames, ease: customEaseIn },fourFrames)

    return timeline;
  };
const mainmessage=[
// ["Pot","holes"," ","?","No","t","Anym","ore!"],
// ["you","r","r","oad","comp","anion","a","pp"],
["dr","iving","wit","h","d","ata","insigh","ts"],
["pa","ving","t","he","w","ay","s","marter"],
["visua","lize","roa","d","con","ditions","anywh","er"],
["r","oad","i","nsights","a","t","fing","ertips"]
]
const messagelstlength=4
var currtxt=0

const changetxt=()=>{
  let x = Math.floor((Math.random() * messagelstlength) + 1)-1
  if(x===currtxt){
    if(x===(messagelstlength-1)){
      x=x-1
    }
    else if(x===0){
      x=x+1
    }
    else{
      x=x-1
    }
  }
  currtxt=x
    hideElements()
    setTimeout(()=>{firstslide.children[0].innerText=mainmessage[x][0]
      secondslide.children[0].innerText=mainmessage[x][1]
      thirdslide.children[0].innerText=mainmessage[x][2]
      fourthslide.children[0].innerText=mainmessage[x][3]
      fifthslide.children[0].innerText=mainmessage[x][4]
      sixthslide.children[0].innerText=mainmessage[x][5]
      seventhslide.children[0].innerText=mainmessage[x][6]
      eightslide.children[0].innerText=mainmessage[x][7]
      showElements()
    },2000)
}
showElementnav();
  setInterval(()=>{
    changetxt()
  },12000)
  
}, []);



        const showlogin=()=>{
            if (!user && authenticationdone){
              toast((t) => (
                <div className="login-container">
                  <button type="button" className="btn-close" style={{    position: "absolute",right: "0px",paddingRight: "35px"}} aria-label="Close" onClick={() => toast.dismiss(t.id)}></button>
  <div className="login-form">
    <div className="login-form-inner">
      <div className="logo"><svg height="512" viewBox="0 0 192 192" width="512" xmlns="http://www.w3.org/2000/svg">
          <path d="m155.109 74.028a4 4 0 0 0 -3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0 -7.373-2.614l-63.724 111.642a4 4 0 0 0 3.407 6.095h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z" />
        </svg></div>
      <h1 style={{color:"black",letterSpacing: "0px"}}>Login</h1>
      <p className="body-text">Need to login to visit app!</p>

      <a href="#" className="rounded-button google-login-button" onClick={()=>{handleGoogleSignIn();}}>
        <span className="google-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z" fill="#fbbb00" />
            <path d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z" fill="#518ef8" />
            <path d="M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z" fill="#28b446" />
            <path d="M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z" fill="#f14336" />
          </svg></span>
        <span>Sign in with google</span>
      </a>
</div>
  </div>
  </div>
              ));
            }
            else{
                navigate('/app')
            }
        }
  return (
    <>
    <div className='parentclass' style={{overflowX: "hidden"}}>
<Toaster toastOptions={{ duration: 5000 }} />



 {/* <!--Start Header--> */}
  <header id='home' style={{ overflow:"hidden"}}>
    {/* <div className='imagesss'></div> */}
    <video className="hero-video" autoPlay muted loop style={{filter:"blur(30px)",transform: "scale(2.1)" ,backgroundColor:"black"   , height: "100%",objectFit: "cover"}}>
      <source src="/images/back.mp4" type="video/mp4"/>
    </video>
      <nav>
          <div className="logo">
              {/* <a href="#!"><img src="/images/blacklogo.png" alt='alternativeimag' style={{width:"86px"}}/></a> */}
              <h3 style={{letterSpacing: "2.4px",cursor:"default"}}>RQ-A</h3>
          </div>
          <div className="toggle">
              <span className="first"></span>
              <span className="middle"></span>
              <span className="last"></span>
          </div>
          <div className="navigation-bar">
              <ul>
                  <li className="active home"><a onClick={closenav} href="#home">Home<span className="underline"></span></a></li>
                  <li className='aboutid'><a href="#aboutid" onClick={closenav}>About<span className="underline"></span></a></li>
                  <li className='benifits'><a href="#benifits" onClick={closenav}>Services<span className="underline"></span></a></li>
                  <li className='featureid'><a href="#featureid" onClick={closenav}>Insights<span className="underline"></span></a></li>
                  <li><button type="button" onClick={()=>{closenav();showlogin()}} className="btn btn-outline-dark"> VISIT&nbsp;APP! </button></li>
                  <li className='contactid'><a href="#contactid" onClick={closenav}>Contact<span className="underline"></span></a></li>
              </ul>
          </div>
      </nav>
      <div className="text" style={{    backdropFilter: "blur(2px)" , paddingBlock: "50px"
}}>

<div className="headingmain">
          {/* <h1 className='first'>SAFER ROADS</h1>
        <h1 className='second'>FASTER REPAIR</h1> */}
        {/* "Drive Smoothly, Know Roads"
"Safer Roads, Clear Reports"
"Potholes? Not Anymore!"
"Visualize Road Conditions Anywhere"
"Smooth travels ahead."
"Driving with data insights."
"Safer roads, informed journeys."
"Smart roads, smarter driving."
"Drive safe, stay informed."
"Road insights at fingertips."
"Smart tech, smooth ride."
"Paving the Way Smarter"
"Visualize, Analyze, Drive Better"
"Your Road Companion App"
"Upgrade Your Commute Today" */}


      <div className="maintext">
      <div className="title-block">
        <div className="title-h1">
          <div className="title-row title-row-1">
            
            <div className='title-four-slides'>
            <div className="title-charts-cont" id="firstslide"><span><h1>p</h1></span></div>
            <div className="title-charts-cont" id="secondslide"><span><h1>aving</h1></span></div>
            </div>
            <div className='title-four-slides'>
            <div className="title-charts-cont" id="thirdslide"><span><h1>th</h1></span></div>
            <div className="title-charts-cont" id="fourthslide"><span><h1>e</h1></span></div>
            </div>
          </div>
          <div className="title-row title-row-2">
            <div className='title-four-slides'>
            <div className="title-charts-cont" id="fifthslide"><span><h1>wa</h1></span></div>
            <div className="title-charts-cont" id="sixthslide"><span><h1>y</h1></span></div>
            </div>
            <div className='title-four-slides'>
            <div className="title-charts-cont" id="seventhslide"><span><h1>sm</h1></span></div>
            <div className="title-charts-cont" id="eightslide"><span><h1>arter</h1></span></div>
            </div>
          </div>
        </div>
      </div>
  </div>
        </div>
          <hr style={{color: "white",marginInline: "19%"}}></hr>
          <span style={{paddingInline:"40px"}}>Revolutionize road inspections with our app that detects road defects with ease!</span>

          <button id='hiddenmodalbutton' data-mdb-toggle="modal" data-mdb-target="#exampleModallogin" style={{visibility:"hidden" , display: "none"}}></button>
          <br/>
          <button type="button" className="btn btn-outline-primary    " data-mdb-ripple-color="#000000" style={{backgroundColor:"transparent",color:"#ffffff",borderColor:"#ffffff"}} onClick={showlogin}> EXPLORE </button>
      </div>
      <div className="arrow-down">
      <i className="fas fa-angle-down fa-1x" ></i>
      </div>
      <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style=
                {{opacity: "1",
                width: "110%",
                height: "120px",
                fill: "rgb(238, 238, 238)",
                transform: "rotateX(180deg)",
    position: "absolute",
    bottom: "-10px"}}>
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
        </svg>
  </header>
  
  {/* <!--End Header--> */}

  {/* <!--start About Us--> */}
  <div className="menu mt-3 mb-5" id="aboutid" >
      <div className="menu-image-containerh" style={{alignSelf: "center",    color: "var(--darkblue)",fontFamily: "Reforma 1918, sans-serif",fontWeight: "600",fontSize: "xx-large"}}>
        {/* With the Right Software, Great Things Can Happen */}
        Make Magic Happen with the Right Software Solutions
      </div>
      <div className="text">
          <p className='paragraph'>We can make magic happen on the roads by implementing the appropriate software solutions, such as this app that creates reports about the condition of the road based on object detection techniques. This technology has the potential to increase overall transportation quality while also saving lives and lowering road maintenance costs. We can improve the efficiency and inventiveness of the transportation industry and our daily journey with the use of digital solutions. Local government entities, transportation agencies, or even private users who want to alert the appropriate authorities about problems with the quality of the roads might benefit from this app.
          {/* Using advanced computer vision algorithms, the app can analyze images or videos of roads to detect different objects that can affect road quality. 
          The app can then generate reports that include information about the location and severity of detected objects, which can help authorities to prioritize road maintenance and repair work.  */}
          {/* This app can be useful for local authorities, transportation departments, or even individuals who want to report road quality issues to the relevant authorities. */}
          {/* Overall, the development of software solutions like the app that generates reports about road quality can bring significant positive changes to the transportation sector and make our daily commutes safer and more comfortable. */}
          </p>
      </div>
  </div>
  

  <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
                opacity: "1",
                width: "100%",
                height: "100px",
                fill: "white",
                transform:" rotateX(180deg)"}}>
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
        </svg>
        <div className="about-us" style={{backgroundColor:"white", paddingBottom: "10rem"}}>
      <div className="text">
          <h2>ABOUT</h2>
          <h3>THIS</h3>
          <div><i className="fas fa-asterisk"></i></div>
          <p className='paragraph'>By analysing photographs or videos of roads to identify various objects and categorise flaws that can impair road quality, this app uses object detection techniques that can produce reports on the condition of the roads. Generated reports with details on the position and seriousness of discovered objects can aid in prioritising road upkeep, repairs, and long-term monitoring of road conditions. This software can be modified to find particular kinds of flaws, and these findings can be easily shared with the appropriate parties for efficient maintenance, such as road inspectors, maintenance workers, and decision-makers.</p>
          <div><a className="a-CTA" href="#aboutdevelopersid">KNOW THE DEVELOPERS</a></div>
      </div>
      <div className="image-container">
          <div className="image image1">
              <img className='borderpadding'  src="https://firebasestorage.googleapis.com/v0/b/temp-fbe64.appspot.com/o/output%2Foutput1677572970.651426?alt=media&token=d260eeb7-ed53-4458-bb54-418a48210a7f" alt="pothole"/>
          </div>
          <div className="image image2">
          <video className="w-100 borderpadding" autoPlay loop muted >
  <source src="https://firebasestorage.googleapis.com/v0/b/temp-fbe64.appspot.com/o/output%2Fstreet1678788599.9324212.webm?alt=media&token=cc774a7b-1f81-489c-ae16-7c4a1a0c92a0" type="video/mp4" />
</video></div>
      </div>
  </div>
  {/* <!--End About Us--> */}

  {/* <!--start benifits--> */}
  <div className="servicess" id='benifits'>
    <div className='servicesimage'></div>
      <div className="image"></div>
      <div className="text">
          <h1>WHAT WE DO?</h1> 
          {/* services / findings , benifits */}
          {/* <h3>OFFERED</h3> */}
      </div>
  </div>

 {/* services start  */}
  <div className="menu" id="serviceid" style={{backgroundColor:"white"}}>
      <div className="box-model">
          <i className="fas fa-times fa-2x close"></i>
          <div className="arrow">
              <div className="arrow arrow-right"></div>
              <div className="arrow arrow-left"></div>
          </div>
          <div className="box-image-container">
              <div className="box-image">
                  <img src=""  alt="imagalternative"/>
              </div>
          </div>
      </div>
      <div className="menu-image-container" style={{display:"block"}}>

      <PhotoAlbum
        // layout="masonry"
        layout="columns"
        columns={3}
        photos={photos}
        onClick={({ index }) => setlightboxIndex(index)}
        padding={10}
        // columns={3}
        spacing={15}
        renderPhoto={({
          imageProps: { alt, style, ...rest }
        }: RenderPhotoProps) => (
          <img
            alt={alt}
            style={{
              ...style,
              borderRadius: "2px",
              boxShadow:
                "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
              transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            }}
            {...rest}
          />
        )}
      />
      <Lightbox
        open={lightboxindex >= 0}
        close={() => setlightboxIndex(-1)}
        index={lightboxindex}
        slides={slides}
        plugins={[Thumbnails]}
      />

      </div>
      <div className="text">
          <h2>OFFERED</h2>
          <h3>SERVICES</h3>
          <div><i className="fas fa-asterisk"></i></div>
          <p className='paragraph'>Our app offers a range of services to help municipalities and organizations assess and maintain road quality. Our object detection technology allows for fast and accurate detection and classification of road defects, such as potholes and cracks, providing detailed reports that can be used to prioritize repairs.

We also offer customization services to ensure that the app meets the specific needs of our clients. This includes training the app to detect specific types of defects, as well as integrating it with other software systems for streamlined maintenance and repair.

In addition, we provide ongoing support and maintenance services to ensure that the app is always up-to-date and functioning at optimal levels.

Overall, our services are designed to make road inspections and evaluations faster, more accurate, and more cost-effective, ultimately leading to safer and more reliable transportation infrastructure.</p>
          <div><a className="a-CTA" href="#!" onClick={showlogin}>VISIT APP!</a></div>
      </div>
  </div>
  <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style=
                {{opacity: "1",
                width: "100%",
                height: "120px",
                fill: "white",
                transform: "rotateY(180deg)"}}>
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
        </svg>
 {/* services end  */}


  {/* features  */}

<section className='features mb-5 mt-5' style={{padding: "50px"}}>
  <div className="row d-flex justify-content-center">
    <div className="col-md-10 col-xl-8 text-center">
      <h3 className="mb-4" style={{color:"black"}}>THE FEATURES</h3>
      <p className="mb-4 pb-2 mb-md-5 pb-md-0">
      Coupled with powerful object detection technology and customizable features, our app provides a comprehensive solution for road inspections and evaluations that is both efficient and effective..
      </p>
    </div>
  </div>

  <Carousel showArrows={true} showStatus={false} infiniteLoop={true} useKeyboardArrows={true} autoPlay={true} swipeable ={true}
  emulateTouch={true}  interval={3000} transitionTime={1000}>
                
                <div>
                    <img src="/images/services4.png" />
                    <p className="legend">~ Record Live videos ...</p>
                </div>
                <div>
                    <img src="/images/services5.png" />
                    <p className="legend">~ User can upload pre-captured Images</p>
                </div>
                <div>
                    <img src="/images/services6.png" />
                    <p className="legend">~ User can upload pre-captured Videos</p>
                </div>
                <div>
                    <img src="/images/services7.png" />
                    <p className="legend">~ Google-Map for capture accurate location</p>
                </div>
                <div>
                    <img src="/images/services8.png" />
                    <p className="legend">~ Address Fields with additional message for accurately identify locaiton</p>
                </div>
                <div>
                    <img src="/images/services9.png" />
                    <p className="legend">~ Feature rich Open-to all dashboard for exploration</p>
                </div>
                <div>
                    <img src="/images/services10.png" />
                    <p className="legend">~ Inbuild comment feature </p>
                </div>
            </Carousel>

  </section>

{/* features end  */}
  {/* <!--End benifits--> */}


<div className="featuresimagesection" id='featureid'>
<div className='featuresafter' style={{transform: "scale(1.2)"  ,   width: "123%",left: "-50px" ,position: "absolute"}}></div>
      <div className="text">
          {/* <h2>The Perfect</h2> */}
          <h1>INSIGHTS</h1>
      </div>
  </div>

{/* about developers  */}
<div className='visionparent'>
  <div className='visionupper'>
<div className='visionsection'>
  <div className='linevision'>
        <p>VISION</p>
        <div className='sublinevision'>
        <p>Creating a world where transportation is safer</p>
        </div>
        <p>empowering users to contribute to the maintenance and improvement of their local roads, our App can foster a sense of community and civic engagement. This can lead to a more connected and engaged society, where people are invested in the well-being of their neighborhoods and communities.</p>
        </div>
        </div>
        <div className='vectorclass' >
        <img src='../../images/map.png'></img>
          {/* <Vectors/> */}
        </div>
        </div>
        </div>

<div className='visionparent' style={{backgroundColor: "#EEEEEE" ,    marginBottom: "-190px"}}>
  <div className='visionupper'>
<div className='visionsection' style={{backgroundColor: "#EEEEEE"}}>
  <div className='linevision'>
        <p>All-In-One</p>
        <div className='sublinevision'>
        <p>All-In-One solution</p>
        </div>
        <p>With AI at its core, this app's goal is to offer a comprehensive solution for producing a report on road quality. Provide a thorough report that includes advice on repairs or upkeep.This programme is a must-have for everybody involved in road maintenance, from governmental organisations to independent contractors, thanks to its user-friendly layout.</p>
        </div>
        </div>
        <div className='vectorclass' >
        <img src='../../images/allinone.png'></img>
          {/* <Secondvector/> */}
        </div>
        </div>
        </div>



        <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
                opacity: "1",
                width: "100%",
                height: "80px",
                fill: 'rgb(238,238,238)',
                transform: "rotateY(0deg)",
                position: "relative",
    bottom: "-80px"}}>
            <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"></path>
        </svg>
        <div className='visionparent pt-5' style={{backgroundColor: "white"}}>
  <div className='visionupper'>
<div className='visionsection' style={{backgroundColor: "white"}}>
  <div className='linevision'>
        {/* <p>All-In-One</p> */}
        <div className='sublinevision'>
        <p>OPEN - TO ALL DASHBOARD</p>
        </div>
        <p>An intuitive dashboard is like a window into your app's soul - it provides a transparent view of what's happening, making it easy for all users to see what's going on and how to make the most of the app's features. </p>
        <button type="button" className="btn btn-outline-dark    " data-mdb-ripple-color="#000000" onClick={()=>{navigate('/dashboard')}}> OPEN TO ALL </button>
        </div>
        </div>
        <div className='vectorclass' >
          <img src='../../images/dashboard.png'></img>
          {/* <Fourthsvg/> */}
        </div>
        </div>
        </div>
<div className=' pt-5' style={{    marginTop: "-200px",textAlign: "center" , backgroundColor:'black' ,position:"relative",    bottom: "-10rem",paddingBottom: "14rem"}}>
  <div>
  <h1 style={{color:"white" ,    fontFamily: "Raleway, sans-serif",fontWeight: "900",letterSpacing: "0", textAlign: "center"}}>The right platform makes anything possible.</h1>
  <button type="button" className="btn btn-outline-light mt-5" data-mdb-ripple-color="#000000" onClick={showlogin}> Try This </button>
  </div>
  </div>


<div style={{position: "relative"}}>
<svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{
                opacity: "1",
                width: "100%",
                height: "100px",
                fill: "white",
                transform:" rotateX(180deg)"}}>
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
        </svg>



<section className='aboutdevelopers' id='aboutdevelopersid' style={{backgroundColor:'white'}}>
  <div className="row d-flex justify-content-center aboutdevelopersheading">
    <div className="col-md-10 col-xl-8 text-center">
      <h3 className="mb-4" style={{color:"black"}}>THE DEVELOPERS</h3>
      <p className="mb-4 pb-2 mb-md-5 pb-md-0">
      Our talented team of developers, all 4th year students, have worked tirelessly to create an app that utilizes the latest in machine learning technology to provide a cutting-edge solution for road inspections and evaluations.
      </p>
    </div>
  </div>

  <div className="row text-center d-flex align-items-stretch aboutdeveloperscard">
    <div className="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
      <div className="card testimonial-card">
        <div className="card-up" style={{backgroundColor: "#9d789b"}}></div>
        <div className="avatar mx-auto bg-white">
          <img src="/images/pic1.jpg"
            className="rounded-circle img-fluid" />
        </div>
        <div className="card-body">
          <h4 className="mb-4">ATUL TYAGI</h4>
          <hr />
          <p className="dark-grey-text mt-4">
            <i className="fas fa-quote-left pe-2"></i>Creating innovative solutions with web development and machine learning to solve complex problems and improve user experiences.
          </p>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
      <div className="card testimonial-card">
        <div className="card-up" style={{backgroundColor: "#7a81a8"}}></div>
        <div className="avatar mx-auto bg-white">
          <img src="/images/rock.jpg"
            className="rounded-circle img-fluid" />
        </div>
        <div className="card-body">
          <h4 className="mb-4">SANCHIT GULIA</h4>
          <hr />
          <p className="dark-grey-text mt-4">
            <i className="fas fa-quote-left pe-2"></i>Whether it's detecting rocks or other road defects, our app's object detection technology ensures that even the smallest details are captured, providing a comprehensive picture of road quality and enabling timely repairs for safer transportation.
          </p>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-0 d-flex align-items-stretch">
      <div className="card testimonial-card">
        <div className="card-up" style={{backgroundColor: "#6d5b98"}}></div>
        <div className="avatar mx-auto bg-white">
          <img src="/images/osama.jpg"
            className="rounded-circle img-fluid" />
        </div>
        <div className="card-body">
          <h4 className="mb-4">RAGHAV ANAND</h4>
          <hr />
          <p className="dark-grey-text mt-4">
            <i className="fas fa-quote-left pe-2"></i>"Raghav anand urff `Bin Laden` was the face of terror." - Sanchit gulia.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
{/* end about developers  */}











  {/* <!--Start Footer--> */}
  <div style={{overflowX:'hidden'}} id='contactid'>
  <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style=
                {{opacity: "1",
                width: "100%",
                height: "800px",
                zIndex:'-10',
                fill: "white",
                transform: "rotateY(180deg)",
                position: "absolute"}}>
                  <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
             </svg>
  <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style=
                {{opacity: "1",
                width: "790%",
                height: "220px",
                fill: "#121212",
                transform: "rotateX(180deg)"}}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
        </div>
  <footer>

      <div className="text"  style={{maxWidth:"100%" , paddingINline:"20%"}}>
          <h2>ABOUT RQ-A</h2>
          <div><i className="fas fa-asterisk" style={{color: "white"}}></i></div>
          <p>The app is an object detection-based tool that analyzes images and videos of roads to detect and classify defects such as potholes, cracks, and other types of damage. It can be customized to prioritize the detection of specific types of defects based on the needs of the users. The app generates reports on road quality, which can be easily shared with relevant stakeholders, including road inspectors, maintenance crews, and decision-makers. The reports can help prioritize repairs, monitor road conditions over time, and streamline the maintenance process. Overall, this app is a valuable tool for efficient and effective road maintenance.</p>
      </div>
      <div className="contact-container">
        <div className="social-media">
            <h3>Follow Along</h3>
            <div className="links">
                <a href="#!"><i className="fab fa-twitter"></i></a>
                <a href="#!"><i className="fab fa-facebook-square"></i></a>
                <a href="#!"><i className="fab fa-pinterest"></i></a>
                <a href="#!"><i className="fab fa-linkedin-in"></i></a>
            </div>
        </div>
          
      </div>
  </footer>
{/* <!--End Footer--> */}

{/* <!--Start Copy-Right--> */}
  <div className="copyright" >
  
       <i className="fas fa-angle-double-up arrow-up"></i>
      <ul className="info">
          <li>&copy; R-QA - 2023</li>
          <li>srm ~ SONIPAT</li>
          <li>Tel: XXXXXXXXXX</li>
          {/* <li>Handcrafted with love by <a href="#!">Pixelgrade</a> Team</li> */}
      </ul>
      <ul className="CTA">
          <li><a href="#!">PERMISSIONS AND COPYRIGHT</a></li>
          <li><a href="mailto:atultyagi.at.612@gmail.com">CONTACT THE TEAM</a></li>
      </ul>
  </div>

  </div>

    </>
  )
}

export default Site