let menu, menu_hidden;
window.addEventListener('load', onLoad);


function onLoad() {
  // variable init
  menu = document.getElementById('menu_content');
  menu_hidden = false;
  click_menu();
  console.log("loaded!");

  $( "#menu_sym" ).click(function() {
    click_menu();
  });
}



function click_menu(){
  if(!menu_hidden){
    menu.style.display = "none"
  } else {
    menu.style.display = "block"
  }
  menu_hidden = !menu_hidden;
}
