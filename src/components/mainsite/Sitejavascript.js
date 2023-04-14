export const activelink = () => {
    document.querySelectorAll(
        "header nav .navigation-bar li"
    ).forEach(li =>
    li.addEventListener("click", () => {
        const arr = Array.from(li.parentElement.children);
        arr.forEach(li => li.classList.remove("active"));
        li.classList.add("active");
    })
    );
}

export const closenav=()=>{
    const navToggle = document.querySelector("header nav .toggle"),
    navSpanMiddle = document.querySelector("header nav .toggle .middle"),
    navNavigationBar = document.querySelector("header nav .navigation-bar")
    if(navNavigationBar.classList.contains('show')===true){
        navToggle.classList.toggle("active");
        navSpanMiddle.classList.toggle("hide");
        navNavigationBar.classList.toggle("show");
    }
}

export const hamburgermenu=()=>{
    const navToggle = document.querySelector("header nav .toggle"),
    navSpanMiddle = document.querySelector("header nav .toggle .middle"),
    navNavigationBar = document.querySelector("header nav .navigation-bar")
    // document.querySelector("header nav .toggle").classList.toggle("active")
    // document.querySelector("header nav .toggle .middle").classList.toggle("hide")
    // document.querySelector("header nav .navigation-bar").classList.toggle("show")
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navSpanMiddle.classList.toggle("hide");
        navNavigationBar.classList.toggle("show");
    });
}

export const svgsmoothscroll =()=>{
    // svg-up smooth scroll
    const svgUp = document.querySelector(".copyright .arrow-up"),
    nav = document.querySelector("header nav"),
    logoImage = document.querySelector("header nav .logo img"),
    logotxt = document.querySelector("header nav .logo h3"),
    headerText = document.querySelector("header .text"),
    headerSection = document.querySelector("header"),
    isnav=document.querySelector("header nav .navigation-bar"),
    sections=[document.querySelector('#home'),document.querySelector('#aboutid'),
    document.querySelector('#benifits'),document.querySelector('#featureid'),
    document.querySelector('#contactid')],
    navLi=document.querySelector("header nav .navigation-bar ul").childNodes
svgUp.addEventListener("click", () => {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
});


window.onscroll = function() {

    var current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop ) {
      current = section.getAttribute("id"); }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });

    if(isnav.classList.contains('show')===true){
        closenav()
    }
    // make navbar fixed & change logo color
    if (window.pageYOffset > headerSection.offsetHeight - 75) {
        nav.classList.add("active");
        logotxt.style.color='black'
    } else {
        logotxt.style.color='white'
        nav.classList.remove("active");
    }

    // header welcome fade out and in
    if (window.pageYOffset > 30) {
        headerText.style.opacity = -window.pageYOffset / 400 + 1;
    }
    
};
}

export const scrollClickEvents=()=>{

    const svgDown = document.querySelector("header .arrow-down"),
    aboutSection = document.querySelector(".about-us")
        // svg-down smooth scroll
        svgDown.addEventListener("click", () => {
            window.scroll({
                top: aboutSection.offsetTop - 30,
                behavior: "smooth"
            });
        });
    
           
}