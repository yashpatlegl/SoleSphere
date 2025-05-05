// const forpie=require("./data.json");

// const jsonData=require('./data.json')
// console.log(jsonData)
var negative = 0;
var pos = 0;
var arr = [0, 0, 0];
var ne = 0;
var sum = 0;
var sumpos = 0;
var sumn = 0;
var sumnu = 0;
fetch("/backend/reviews.json")
  .then((res) => res.json())
  .then((js) => {
    Object.values(js).forEach((ele) => {
      ele.forEach((ff) => {
        if (ff["sentimentAnalysis"].score < 0) {
          arr[0]++;
          sum += ff["sentimentAnalysis"].score;
          sumn = sumn + ff["sentimentAnalysis"].score;
        } else if (ff["sentimentAnalysis"].score > 0) {
          arr[1]++;
          sum += ff["sentimentAnalysis"].score;
          sumpos = sumpos + ff["sentimentAnalysis"].score;
        } else {
          arr[2]++;
          sum += ff["sentimentAnalysis"].score;
          sumnu = sumnu + ff["sentimentAnalysis"].score;
        }
      });
    });
  })
  .then(() => {
    let total = arr.reduce((acc, ini) => {
      return (acc += ini);
    }, 0);
    document.getElementById("avgsen").innerHTML = `${Math.round(sum / total)}`;
    document.getElementById("avgpos").innerHTML = `${Math.round(
      sumpos / arr[1],
      2
    )}`;
    document.getElementById("avgneg").innerHTML = `${Math.round(
      sumn / arr[0],
      2
    )}`;
    document.getElementById("avgnu").innerHTML = `${Math.round(
      sumnu / arr[2],
      2
    )}`;
    // console.log(sumn/arr[0]);
    // console.log(sumpos/arr[1])
    // console.log(0)
    // console.log(arr)
  })
  .then(() => {
    const ctx = document.getElementById("myPieChart").getContext("2d");
    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["negative", "neutral", "Positive"],
        datasets: [
          {
            data: [arr[0], arr[2], arr[1]],
            backgroundColor: ["red", "blue", "green"],
          },
        ],
      },
      options: {},
    });
  });
