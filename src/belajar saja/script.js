const user = localStorage.getItem("loggedIn");

if(Notification.permission!=="granted"){
    Notification.requestPermission();
}

function keyName(nama){
    return user+"_"+nama;
}

window.onload=function(){
    tampilkanJadwalBelajar();
    tampilkanJadwalSekolah();
    updateProgress();
}

function tambahJadwalBelajar(){
    const waktu = studyTime.value;
    const materi = studySubject.value.trim();

    if(!waktu || !materi){
        alert("Isi semua");
        return;
    }

    let data = JSON.parse(localStorage.getItem(keyName("study")) || "[]");

    data.push({
        waktu:waktu,
        materi:materi,
        done:false
    });

    localStorage.setItem(keyName("study"),JSON.stringify(data));

    studySubject.value="";
    tampilkanJadwalBelajar();
}

function tampilkanJadwalBelajar(){
    let data = JSON.parse(localStorage.getItem(keyName("study")) || "[]");

    studyList.innerHTML="";

    data.forEach((item,index)=>{
        studyList.innerHTML += `
<div class="item">
⏰ ${item.waktu} - ${item.materi}
<button onclick="hapusJadwal(${index})">Hapus</button>
</div>
`;
    });
}

function hapusJadwal(index){
    let data = JSON.parse(localStorage.getItem(keyName("study")) || "[]");
    data.splice(index,1);
    localStorage.setItem(keyName("study"),JSON.stringify(data));
    tampilkanJadwalBelajar();
}

function saveSchedule(){
    localStorage.setItem(keyName("school"),scheduleInput.value);
    tampilkanJadwalSekolah();
}

function tampilkanJadwalSekolah(){
    tomorrowSchedule.innerText =
        localStorage.getItem(keyName("school")) || "Belum ada";
}

function updateProgress(){
    let p = localStorage.getItem(keyName("progress")) || 0;
    progressBar.value = p;
    progressText.innerText = p+"%";
}

function tambahProgress(){
    let p = parseInt(localStorage.getItem(keyName("progress")) || 0);
    if(p<100){
        p+=5;
        localStorage.setItem(keyName("progress"),p);
        updateProgress();
    }
}

setInterval(()=>{
    const jam = new Date().toTimeString().slice(0,5);

    let data = JSON.parse(localStorage.getItem(keyName("study")) || "[]");

    data.forEach(item=>{
        if(item.waktu===jam && !item.done){
            showNotification("Waktunya Belajar 📚",item.materi);
            tambahProgress();
            item.done=true;
        }
    });

    localStorage.setItem(keyName("study"),JSON.stringify(data));

    if(jam==="19:00"){
        let sekolah = localStorage.getItem(keyName("school"));
        if(sekolah){
            showNotification("Jadwal Besok",sekolah);
        }
    }

},1000);

function showNotification(judul,isi){
    if(Notification.permission==="granted"){
        new Notification(judul,{body:isi});
    }
}