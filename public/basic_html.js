let menu, menu_hidden;
window.addEventListener('load', onLoad);


function onLoad() {
  // variable init
  menu = document.getElementById('menu_content');
  hide_menu();
  menu_hidden = true;
  console.log("loaded!");

  // $( "#menu_sym" ).click(function() {
  //   click_menu();
  // });
}


// menu show-hide
function click_menu(){
  if(!menu_hidden){
    hide_menu();
  } else {
    show_menu();
  }
  menu_hidden = !menu_hidden;
}
function hide_menu(){
  menu.style.display = "none"
}
function show_menu(){
  menu.style.display = "block"
}
