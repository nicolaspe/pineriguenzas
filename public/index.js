var db_verguenza = [];
var response = "";

var mes = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
				"Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

window.addEventListener('load', load_data);
time_functions();

function load_data(){
  // create the xml http request
  let src = window.location.protocol + "//" + window.location.host + "/data";
  http_req = new XMLHttpRequest();
  // set callback function
  http_req.onreadystatechange = grab_data;
  // send request
  http_req.open("GET", src, true);
  http_req.send();
}
// grab data from the XML HTTP request
function grab_data(data){
  try {
    if (http_req.readyState === XMLHttpRequest.DONE) {
      if (http_req.status === 200) {
        // parse responseText
        db_verguenza = JSON.parse(http_req.responseText)
      } else {
        console.log("status problem");
      }
    }
  } catch (e) {
    console.log("Ups! Something's wrong D:\n" +e);
  }
  // display data after getting it
  display_data();
}
// display data in the site
function display_data(){
  flush_historial();
  // get container '.historial'
  let hist = document.getElementsByClassName('historial')[0];
  // for every item in the database, we create a new row
  // in reverse order, most recent item first!
  for (var i = db_verguenza.length-1; i >= 0; i--) {
    // create row
    row = document.createElement("div");
    row.classList.add('hist_row')

    // create cells assign values & append
    // date
    col_fecha = document.createElement("div");
    col_fecha.classList.add('hist_col');
    col_fecha.id = "hist_fecha";

    let p_fecha = document.createElement("p");
    let fecha = new Date (db_verguenza[i].date);
    let fecha_d = fecha.getDate();
    let fecha_m = fecha.getMonth();
    let fecha_y = fecha.getFullYear();
    let fecha_str = fecha_d + "-" + mes[fecha_m] + "-" + fecha_y;
    p_fecha.textContent = fecha_str;
    col_fecha.appendChild(p_fecha);

    // title
    col_title = document.createElement("div");
    col_title.classList.add('hist_col');
    col_title.id = "hist_title";

    let a_title = document.createElement("a");
    let title_text = db_verguenza[i].title;
    let title_link = db_verguenza[i].link;
    a_title.textContent = title_text;
    a_title.href = title_link;
    col_title.appendChild(a_title);

    // append all
    row.appendChild(col_fecha);
    row.appendChild(col_title);
    hist.appendChild(row);
  }
  day_counter();
}
// update the counter display
function day_counter(){
  // get element
  let counter = document.getElementById("conteo");
  // get last action's date
  let last_act = new Date(db_verguenza[db_verguenza.length-1].date);
  // calculate difference in days with now
  let today = new Date();
  let time_dif = Math.abs(last_act.getTime() - today.getTime());
  let days_dif = Math.floor( time_dif/(1000*60*60*24) );
  // overwrite the number
  counter.textContent = " " + days_dif + " ";
}
// delete every "news" item from historial
function flush_historial(){
  // get list of chldren elements
  let hist = document.getElementsByClassName('historial')[0];
  let hist_list = hist.children;
  // loop and destroy, but only from index 1 onwards
  for (var i = 1; i < hist_list.length; i++) {
    hist_list[i].remove();
  }
}

// set refresh functions
function time_functions(){
  // get db data from server every minute
  setInterval(load_data, 1000*60);
}
