
/**Service page dropdown**/
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
var serviceId;

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



function getHomeSelectedValue() {
    var selectedValue = "1 BHK";
    console.log(selectedValue);
    document.getElementById("house-type-selected").textContent=selectedValue;
    localStorage.setItem("houseType", selectedValue.slice(0,1));
}
function getAboutSelectedValue() {
    var selectedValue = "2 BHK";
    console.log(selectedValue);
    document.getElementById("house-type-selected").textContent=selectedValue;
    localStorage.setItem("houseType", selectedValue.slice(0,1));
}
function getContactSelectedValue() {
    var selectedValue = "3 BHK";
    console.log(selectedValue);
    document.getElementById("house-type-selected").textContent=selectedValue;
    localStorage.setItem("houseType", selectedValue.slice(0,1));
}

function addToCart(){
  console.log(localStorage.getItem("houseType"));
    $.ajax({
      url: 'https://localhost:3443/cart/'+serviceId,
      type: 'post',
      headers: {
          Authorization: 'bearer ' + localStorage.getItem("webToken"),   //If your header name has spaces or any other char not appropriate
          //"Header Name Two": 'Header Value Two'  //for object property name, use quoted notation shown in second
      },
      dataType: 'json',
      success: function (data) {
          console.info(data);
          console.log("successful");
          window.location.href = "https://localhost:3443/home/cart"

      }
  });
}



document.addEventListener("DOMContentLoaded", loadServicePage);



function loadServicePage(){

   if (localStorage.getItem("webToken")) {
                console.log(localStorage.getItem("webToken"));
            }

  var currLocation = window.location.href;
  console.log(currLocation);
  serviceId = currLocation.slice(28,52);
  console.log(serviceId);

  $.ajaxSetup({
            xhrFields: {
            withCredentials: true
            }
            })

            $.ajax({
             url: "https://localhost:3443/services/"+serviceId,
             dataType: "json",
             type: "GET",
             success: function( data, textStatus, jQxhr ){

                    var extract = data;

                    var serviceHtmlString = "<div class='service-des-left col-sm-6 col-xs-12'><h2>"+extract.name+"</h2><div class='page1_grid'><div class='box'><h1>AA</h1><h3>Reliable Services</h3><p>All our technicians are wel trained and are experienced in keeping the appliances clean</p></div><div class='box'><h1>AB</h1><h3>Convenient</h3><p>Our platform is designed keeping in mind your convenience, so you select the date and time of our visit</p></div><div class='box'><h1>AC</h1><h3>We Provide</h3><p><ul><li>Complete deep cleaning of all areas of the house inlcuding Bathroom, Kitchen, Living Room, Dining Room, Bedroom and balcony.</li><li>Deep Cleaning and cleaning of curtains, sofa set and chairs using Professional grade cleaning solutions, cleaning equipment and vacuum cleaners by professionals cleaning staff</li></ul></p></div></div></div><hr class='visible-xs'><div class='service-des-right col-sm-6 col-xs-12'><div id='service-img'><img src='./images/restaurant-logo.png'></div><p id=service-dynamic-des'>"+extract.description+"</p><div class='dropdown'><button id='house-type-selected' onclick='myFunction()' class='dropbtn'>House Type</button><div id='myDropdown' class='dropdown-content'><a id='homedrp' value='1 BHK'>1 BHK</a><a id='aboutdrp' value='2 BHK'>2 BHK</a><a id='contactdrp' value='3 BHK'>3 BHK</a></div></div><div class='next-button pull-right'><a id='cart-link'>next</a></div></div>"


                    document.getElementById("main-content")
                    .innerHTML = serviceHtmlString;

                    document.getElementById("homedrp").addEventListener("click", getHomeSelectedValue);
                    document.getElementById("aboutdrp").addEventListener("click", getAboutSelectedValue); 
                    document.getElementById("contactdrp").addEventListener("click", getContactSelectedValue);

                    document.getElementById("cart-link").addEventListener("click",addToCart);

                },
                error: function( jqXhr, textStatus, errorThrown ){
                    alert(errorThrown );
                }
          });


}




