function openNav() {
  
    if (document.querySelector(".sidebar").style.width ==='260px'){
      document.querySelector(".sidebar").style.width='0px'
    }
    else{
      document.querySelector(".sidebar").style.width='260px'
    }
  }
  
    let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e)=>{
     let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
     arrowParent.classList.toggle("showMenu");
      });
    }