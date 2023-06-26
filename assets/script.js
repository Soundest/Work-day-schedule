$(document).ready(function () {
  var currentDate = dayjs().format("dddd, MMMM D");
  
  $("#currentDay").text(currentDate);

  loadEvents();

  $(".saveBtn").on("click", function () {
    var eventText = $(this).siblings(".description").val();
    var eventHour = $(this).siblings(".hour").text();
    localStorage.setItem(eventHour, eventText);
  });

  function loadEvents() {
    $(".time-block").each(function () {
      var eventHour = $(this).find(".hour").text();
      var eventText = localStorage.getItem(eventHour);
      if (eventText) {
        $(this).find(".description").val(eventText);
      }
    });
  }

  function updateTimeBlocks() {
    var currentHour = dayjs().format("H");
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).find(".hour").text().replace(/[^0-9]/g, ""));
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  updateTimeBlocks();

  setInterval(updateTimeBlocks, 60000);
});