// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  //sets current date and time updates every second
  var currentDay = dayjs().format("MMM DD YYYY");
  var amPm = dayjs().format("a");
  var currentHour = dayjs().format("hh");
  $("#currentDay").text("Today is " + currentDay);

  function timeUpdate() {
    var currentTime = dayjs().format("hh:mm:ss");

    $("#currentTime").text("It is currently " + currentTime + " " + amPm);
  }

  setInterval(timeUpdate, 1000);
  // sets class past, present, or future depending on relation with current hour 
  function blockColor() {
    $(".time-block").each(function () {
      var block = parseInt(this.id);
      $(this).toggleClass(".past", block < currentHour);
      $(this).toggleClass(".present", block === currentHour);
      $(this).toggleClass(".future", block > currentHour);
    });
  }
  // updates block color depending on set class 
  function updateBlockColor() {
    $(".time-block").each(function () {
      var block = parseInt(this.id);
      if (block == currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else if (block < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }
  // stores text and corresponding time block id into local storage when save button is pressed 
  function textStorage() {
    $(".saveBtn").on("click", function () {
      var key = $(this).parent().attr("id");
      var value = $(this).siblings(".description").val();
      localStorage.setItem(key, value);
    });
  }
  //displays saved text on corresponding time block from local storage if none is saved time blocks will be blank
  $(".time-block").each(function () {
    var key = $(this).attr("id");
    var value = localStorage.getItem(key);
    $(this).children(".description").val(value);
  });
  // clears local storage and refreshes page when clear btn is pressed 
  function clearLocalStorage() {
    localStorage.clear();
    location.reload();
  }
  $(".clear").on("click", clearLocalStorage);

  //Checks too see how many hours till work or
  //if you are at work how may hours left at work or
  //if you are done with work how many hours left of the day.
  //Displays proper message
  function isItTime() {
    currentHour = dayjs().get("hour");
    console.log(currentHour);
    var morning = 9;
    var work = 17;
    var evening = 23;

    var workStartsIn = morning - currentHour;
    var atWork = work - currentHour;
    var doneWithWork = evening - currentHour;

    console.log(workStartsIn);

    if (currentHour < 9) {
      $("#timeTillWork").text("Work Starts in " + workStartsIn + " hours");
    } else if (currentHour > 9 && currentHour < 17) {
      $("#timeTillWork").text(
        "You are currently at work. You have " +
          atWork +
          " hours left! You're doing great."
      );
    } else {
      $("#timeTillWork").text(
        "You are done with work. You have " + doneWithWork + " hours to relax."
      );
    }
  }
  //runs functions
  isItTime();
  textStorage();
  blockColor();
  updateBlockColor();
});
