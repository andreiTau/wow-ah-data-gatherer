const fs = require("fs");
var toPrint = "";

var url = "https://clutch.co/agencies/social-media-marketing";

toPrint += url + "\n";

var nr = 0;

while (nr <= 499) {
  toPrint += url + "?page=" + nr.toString() + "\n";
  nr += 1;
}

fs.writeFile("pages.csv", toPrint, err => {
  if (err) {
    console.error(err);
  }
});
