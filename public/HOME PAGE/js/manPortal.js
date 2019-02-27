document.addEventListener("DOMContentLoaded",
  function (event){
                $.ajaxSetup({
                xhrFields: {
                    withCredentials: true
                }
            });
      $.ajax({
                url : "data/manager.json",
                dataType : "json",
                type : "get",
                success: function( data, textStatus, jQxhr ){
                  console.log("Inside get success");
                  var details = data;
                  console.log(details);
                  var personalInfoString = "<table><tbody><tr><td class='portal-fields'>Name</td><td id=''>" + details.name + "</td></tr><tr><td class='portal-fields'>Designation</td><td id=''>" + details.designation + "</td></tr><tr><td class='portal-fields'>Phone Number</td><td id=''>" + details.phone+ "</td></tr><tr><td class='portal-fields'>Number Of Employee</td><td id=''>" + details.numEmployees + "</td></tr></tbody></table>";

                  document.getElementById("myInfo")
                    .innerHTML = personalInfoString;
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    alert(errorThrown );
                }
            })
  });
