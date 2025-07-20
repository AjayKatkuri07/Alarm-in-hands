let alarmTime = "";
let alarmSongFile = null;
let alarmSet = false;

function setAlarm() {
  const timeInput = document.getElementById("alarmTime").value;
  const songInput = document.getElementById("alarmSong").files[0];

  if (!timeInput || !songInput) {
    alert("Please select both time and song!");
    return;
  }

  alarmTime = timeInput;
  alarmSongFile = songInput;
  alarmSet = true;

  document.getElementById("status").textContent = `✅ Alarm set for ${alarmTime}`;
}

function checkAlarm() {
  if (!alarmSet) return;

  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  const currentTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  if (currentTime === alarmTime) {
    playAlarmSong();
    alarmSet = false; // prevent repeat
  }
}

function playAlarmSong() {
  const audioPlayer = document.getElementById("audioPlayer");
  const songURL = URL.createObjectURL(alarmSongFile);
  audioPlayer.src = songURL;
  audioPlayer.style.display = "block";

  audioPlayer.play().then(() => {
    alert("🎵 Alarm is ringing!");
  }).catch((err) => {
    alert("🔇 Could not autoplay. Tap play manually.");
    console.error(err);
  });
}

// check every 10 seconds
setInterval(checkAlarm, 10000);
