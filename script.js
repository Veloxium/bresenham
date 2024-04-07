var hasil = document.getElementById("hasil");
var showhasil = document.getElementById("showhasil");
var kosong = document.getElementById("kosong");
var inputx1 = document.getElementById("x1");
var inputy1 = document.getElementById("y1");
var inputx2 = document.getElementById("x2");
var inputy2 = document.getElementById("y2");
var mtext = document.getElementById("mtext");
var submit = document.getElementById("submit");
var result = [];

function hitung() {
  result = [];
  hasil.innerHTML = "";

  if (
    inputx1.value == "" ||
    inputy1.value == "" ||
    inputx2.value == "" ||
    inputy2.value == ""
  ) {
    showhasil.style.display = "none";
    kosong.style.animation = "shake 0.1s infinite alternate";
    kosong.style.display = "inline-flex";
    kosong.innerHTML = "Nilai Tidak Boleh Kosong 🤬";
    setTimeout(function () {
      kosong.style.animation = "none";
    }, 600);
    return;
  }

  if (
    isNaN(inputx1.value) ||
    isNaN(inputy1.value) ||
    isNaN(inputx2.value) ||
    isNaN(inputy2.value)
  ) {
    showhasil.style.display = "none";
    kosong.style.animation = "shake 0.1s infinite alternate";
    kosong.style.display = "inline-flex";
    kosong.innerHTML = "Nilai Hanya Boleh Angka 🤬";
    setTimeout(function () {
      kosong.style.animation = "none";
    }, 600);
    return;
  }

  kosong.style.display = "none";

  var x1 = parseInt(inputx1.value);
  var y1 = parseInt(inputy1.value);
  var x2 = parseInt(inputx2.value);
  var y2 = parseInt(inputy2.value);

  var m = (y2 - y1) / (x2 - x1);
  if (m > 1) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var d1 = 2 * dx;
    var d2 = 2 * (dx - dy);
    var p = d1 - dy;
    var x = x1;
    var y = y1;

    var firstObj = {
      p: p,
      x: x,
      y: y,
    };

    result.push(firstObj);

    for (var y = y1 + 1; y <= y2; y++) {
      if (p >= 0) {
        p = p + d2;
        x = x + 1;
        var obj = {
          p: p,
          x: x,
          y: y,
        };
        result.push(obj);
      } else {
        p = p + d1;
        var obj = {
          p: p,
          x: x,
          y: y,
        };
        result.push(obj);
      }
    }
  } else if (m > 0 && m < 1) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var d1 = 2 * dy;
    var d2 = 2 * (dx - dy);
    var p = d1 - dx;
    var x = x1;
    var y = y1;

    var firstObj = {
      p: p,
      x: x,
      y: y,
    };

    result.push(firstObj);

    for (var x = x1 + 1; x <= x2; x++) {
      if (p >= 0) {
        p = p - d2;
        y = y + 1;
        var obj = {
          p: p,
          x: x,
          y: y,
        };
        result.push(obj);
      } else {
        p = p + d1;
        var obj = {
          p: p,
          x: x,
          y: y,
        };
        result.push(obj);
      }
    }
  }

  mtext.innerHTML = `m = ${m}`;

  result.forEach((item, index) => {
    const isLastIndex = index === result.length - 1;

    const rowClass = isLastIndex
      ? "table-primary table-bordered border-secondary"
      : "";

    hasil.innerHTML += `
    <tr class="${rowClass}">
      <th scope="row">${index + 1}</th>
      <td>${item.p}</td>
      <td>${item.x}</td>
      <td>${item.y}</td>
    </tr>
    `;
  });

  showhasil.style.display = "block";
  chartbuilder();
}

function chartbuilder() {
  var chart = new CanvasJS.Chart("chartContainer", {
    data: [
      {
        type: "line",
        lineThickness: 2,
        dataPoints: result.map((item) => {
          return { x: Math.round(item.x), y: Math.round(item.y) };
        }),
      },
    ],
  });

  chart.render();
}
