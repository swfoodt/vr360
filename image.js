const sky = document.getElementById("image");
const skytemp = document.getElementById("imageTemp");
const camera = document.getElementById("camera");
const image = document.getElementById("imgInput");

let hasChanged = false;
let imgCurrent = 0;

function imageLoop() {
  let imgs = [];
  imgs[0] = "./images/img00001.jpg";
  imgs[1] = "./images/img00002.jpg";
  imgs[2] = "./images/img00003.jpg";

  if (++imgCurrent > 2) {
    imgCurrent = 0;
  }

  return imgs[imgCurrent];
}

function initChange() {
  skytemp.setAttribute("material", "opacity", 1);
  sky.setAttribute("material", "opacity", 0);
  sky.setAttribute("src", imageLoop());
  console.log(sky.getAttribute("src"));
}

function changing() {
  var opacity1 = 1;
  var opacity2 = 0;
  var posZ = 0;
  var fadeOutInterval = setInterval(function () {
    console.log(camera.getAttribute("position"));
    posZ -= 3;
    camera.setAttribute("position", { x: 0, y: 1.6, z: posZ });
    opacity1 -= 0.05;
    opacity2 += 0.05;
    skytemp.setAttribute("material", "opacity", opacity1);
    sky.setAttribute("material", "opacity", opacity2);
    if (opacity1 <= 0) {
      clearInterval(fadeOutInterval);
    }
  }, 100);
}

function finishChange() {
  setTimeout(() => {
    skytemp.setAttribute("src", sky.getAttribute("src"));
  }, 2000);
}

document.onkeydown = function (e) {
  var keyNum = window.event ? e.key : "";
  if (keyNum === "z" || keyNum === "Z") {
    if (hasChanged) {
      alert("所上传的图片不存在图像序列");
      return;
    }
    initChange();
    changing();
    finishChange();
  }
};

image.addEventListener("change", (eve) => {
  const selected = eve.target.files[0];
  hasChanged = true;
  const reader = new FileReader();
  reader.readAsDataURL(selected);
  reader.onload = (e) => {
    sky.setAttribute("src", e.target.result);
  };
});
