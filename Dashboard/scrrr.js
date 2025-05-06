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

  var arrre=[]

fetch("/backend/reviews.json").then((res)=>{
  return res.json()
}).then((ff)=>{
  Object.values(ff).forEach((mm)=>{

mm.forEach((oo)=>{
 console.log(oo['review'])
 arrre.push(oo['review'])
  // arrre.push[oo['review']]
  // console.log(arrre)
  
})
  //  mm.forEach((bb)=>{
  //   const ss= document.querySelectorAll('.box h4')
  // Array.from(ss).forEach((ee)=>{
  //   ee.innerHTML=bb['review']
  // })
    
  // console.log()
  //  })
  })
}).then(()=>{
  console.log(arrre)
}).then(()=>{
Array.from(document.querySelectorAll('.fa-trash-can')).forEach((ele)=>{
  ele.remove()
})

  const head=document.querySelectorAll('.box h4')
  Array.from(head).forEach((ele, index)=>{
    ele.innerHTML=arrre[index]
    
  })
})

