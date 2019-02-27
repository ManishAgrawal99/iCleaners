var totalPrice = 0;

document.addEventListener("DOMContentLoaded",
  function (event){
  	            $.ajaxSetup({
                xhrFields: {
                    withCredentials: true
                }
            });
			$.ajax({
                url : "https://localhost:3443/cart",
                dataType : "json",
                headers:{
                    Authorization: 'bearer ' + localStorage.getItem("webToken")
                },
                type : "get",
                success: function( data, textStatus, jQxhr ){
                	console.log("Inside get success");
                    console.log(data);
                	var cartHtmlString = "";
                    var cartItems = data;
                    console.log(cartItems.cart.length);

                    //We retrieve the num attribute from json
                    console.log("Price array "+ cartItems.cart[1].price.length);
                    for (var i = 0; i < cartItems.cart.length ; i++) {
                    	cartHtmlString = cartHtmlString + "<div><h4 id='cart-service-name'>"+cartItems.cart[i].name+"</h4><h5>Our Service Includes</h5><ul><li>Bathroom, Kitchen, Living Room, Dining Room, Bedroom and Balcony Deep Cleaning</li><li>Dry vacuuming of sofa, curtain and carpets</li><li>Cleaning Time: 4 Hours, Cleaning Staff: 3</li><li>Item Total: Rs "+cartItems.cart[i].price[localStorage.getItem("houseType")]+"</li></ul></div>";
                        totalPrice = totalPrice + cartItems.cart[i].price[localStorage.getItem("houseType")];
                    }
                    document.getElementById("cart-contents")
                    .innerHTML = cartHtmlString;

                    var n = totalPrice.toString();

                    document.getElementById("cart-total-price")
                    .innerHTML = "Total: Rs " + n;

                    document.getElementById("summary-order-total")
                    .innerHTML = "Order Total: Rs " + n;



                },
                error: function( jqXhr, textStatus, errorThrown ){
                    alert(errorThrown );
                }
            })
  });
