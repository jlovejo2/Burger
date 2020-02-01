// Make sure we wait to attach our handlers until the DOM is fully loaded.
//Document.ready function but for jquery
$(function() {

  //This code is declaring my sound variables that I will play() 
  //in certain onclick functions
  const vomit_sound = $("#vomit_sound")[0];
  const eatSound = $("#eat_sound")[0];

    //This the beginning of the click event for the changing eaten status button 
    $(".change-eaten").on("click", function(event) {
      const id = $(this).data("id");
      const newEaten = $(this).data("neweaten");
      const newEatenState = {
        eaten: newEaten,
      };

      //This set of if statement runs the desired sound effect based on the eaten value
      //The first time it changes the burger is being eaten
      //The second time they change it they are "un-eating it"
      if(newEaten) {
        console.log("eat");
      eatSound.play();
      } else {
        console.log("throw up");
        vomit_sound.play()
      }
    
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newEatenState
      }).then(
        function() {
          console.log("changed eaten to", newEaten);
         
          //This is a function call that delays the reload of the page for the sound effect to finish
          delayReload();
      }
      );
    });
    
    //This is the on click that starts the code to create a new burger
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
        
      if($("#burger_name").val().trim() === '') {
        $('.order').modal('show');

        //this line of code grabs the modal div and opens it
        $("#orderSomething").modal('open');
      }

      const newBurger= {
        name: $("#burger_name").val().trim(),
        eaten: 0,
        vomit_amt: 0,
        // $("[name=eaten]:checked").val().trim()
      }

      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-burger").on("click", function(event) {
      var id = $(this).data("id");

      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          openGrossModal();     
        }
      );
    });

    //This is an on-clik on the modal that shows up when you try to eat vomitted burger
    //It will reload the page so the deleted burger is no longer shown.
    //It was already deleted in earlier step of clicking on eat it button for vomitted burger
    $(".delete-gross").on("click", function (event){
      location.reload();
    })

  });
  

  function openGrossModal() {
    $('.gross-delete').modal('show');

    //this line of code grabs the modal div and opens it
    $("#gross").modal('open');
  }

function delayReload() {
    setTimeout(function(){ location.reload()}, 4000);
  }

