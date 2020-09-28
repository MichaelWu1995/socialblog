var currentPage = "";
var totalPage = 0;
var length = 0;
var pathName =
  window.location.pathname === "/" ? "/all" : window.location.pathname;

switch (pathName) {
  case "/all":
    totalPage = getPageNumber(0);
    break;
  case "/sports":
    totalPage = getPageNumber(1);
    break;
  case "/diet":
    totalPage = getPageNumber(2);
    break;
  case "/movie":
    totalPage = getPageNumber(3);
    break;
  case "/tourism":
    totalPage = getPageNumber(4);
    break;
  case "/others":
    totalPage = getPageNumber(5);
    break;
}

function getPageNumber(num) {
  var length = parseInt($(".myList a span").eq(num).text());
  if (length % 5 === 0) {
    totalPage = length / 5;
  } else {
    totalPage = parseInt(length / 5) + 1;
  }
  return totalPage;
}

function drawPagination(numOfPages) {
  $("#page ul").empty();
  currentPage = parseInt(getQueryString("page")) || 1;

  $.get(`${pathName}`, { page: currentPage });
  $("#page ul").append(
    `<li class="page-item disabled prev"><a class="page-link" href="${pathName}?page=${
      currentPage - 1 == 0 ? 1 : currentPage - 1
    }">Previous</a></li>`
  );
  for (var i = 1; i <= numOfPages; i++) {
    if (i === 1) {
      $("#page ul").append(
        `<li class="page-item"><a class="page-link" href="${pathName}?page=1">1</a></li>`
      );
    } else {
      $("#page ul").append(
        `<li class="page-item"><a class="page-link" href="${pathName}?page=${i}">${i}</a></li>`
      );
    }
  }
  $("#page ul").append(
    `<li class="page-item next"><a class="page-link" href="${pathName}?page=${
      currentPage + 1 > totalPage ? totalPage : currentPage + 1
    }">Next</a></li>`
  );

  $(".pagination li.active").removeClass("active");
  $(".pagination li").eq(currentPage).addClass("active");

  if (totalPage === 1) {
    $(".pagination li.prev").addClass("disabled");
    $(".pagination li.next").addClass("disabled");
  } else if (currentPage === 1) {
    $(".pagination li.prev").addClass("disabled");
    $(".pagination li.next").removeClass("disabled");
  } else if (currentPage === totalPage) {
    $(".pagination li.next").addClass("disabled");
    $(".pagination li.prev").removeClass("disabled");
  } else {
    $(".pagination li.prev").removeClass("disabled");
    $(".pagination li.next").removeClass("disabled");
  }
}

drawPagination(totalPage);

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  var context = "";
  if (r != null) context = r[2];
  reg = null;
  r = null;
  return context == null || context == "" || context == "undefined"
    ? ""
    : context;
}
