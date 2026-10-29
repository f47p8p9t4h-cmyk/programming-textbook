const sheets = [...document.querySelectorAll('.sheet')];
const totalPages = 19;
let current = 1;

sheets.forEach((sheet, i) => {
  sheet.style.zIndex = sheets.length - i;
});

function updateStatus(){
  document.getElementById('pageNow').textContent = Math.min(current,totalPages);
}

function nextPage(){
  if(current >= totalPages) return;
  const sheetIndex = Math.floor((current-1)/2);
  if(sheets[sheetIndex]){
    sheets[sheetIndex].style.transform = 'rotateY(-180deg)';
    sheets[sheetIndex].style.zIndex = sheetIndex + 1;
  }
  current++;
  updateStatus();
}

function prevPage(){
  if(current <= 1) return;
  const sheetIndex = Math.floor((current-2)/2);
  if(sheets[sheetIndex]){
    sheets[sheetIndex].style.transform = 'rotateY(0deg)';
    sheets[sheetIndex].style.zIndex = sheets.length - sheetIndex;
  }
  current--;
  updateStatus();
}

document.getElementById('book').addEventListener('click',(e)=>{
  const rect=e.currentTarget.getBoundingClientRect();
  const x=e.clientX-rect.left;
  if(x>rect.width/2) nextPage(); else prevPage();
});

document.addEventListener('keydown',(e)=>{
  if(e.key==='ArrowRight'||e.key==='PageDown') nextPage();
  if(e.key==='ArrowLeft'||e.key==='PageUp') prevPage();
});

updateStatus();
