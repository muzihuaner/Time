const cities = { "东京": 1, "莫斯科": -5, "巴黎": -7, "伦敦": -8, "纽约": -13, "洛杉矶": -16 };

function getSysTime() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://quan.suning.com/getSysTime.do', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var sysTime = response.sysTime2;
        // console.log("当前时间：" + sysTime);
        var timeParts = sysTime.split(" ")[1].split(":");
        var hours = timeParts[0];
        var minutes = timeParts[1];
        var seconds = timeParts[2];
        var formattedTime = hours + ":" + minutes + ":" + seconds;
        // console.log("提取的时间：" + formattedTime);
        updateClock(formattedTime);
      }
    };
    xhr.send();
  }
  
  function updateClock(formattedTime) {
    var currentDate = new Date();
    var currentHours = currentDate.getHours();
    var currentMinutes = currentDate.getMinutes();
    var currentSeconds = currentDate.getSeconds();
    var currentTime = currentHours.toString().padStart(2, '0') + ":" + currentMinutes.toString().padStart(2, '0') + ":" + currentSeconds.toString().padStart(2, '0');
    // console.log("本地计算的时间：" + currentTime);
    document.getElementById('clock').textContent = currentTime;
  }
  
  function startClock() {
    getSysTime();
    setInterval(getSysTime, 1000);
  }
  
  startClock();



function updateBeijingTime() {
    const now = new Date();
    const beijingTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 8 * 3600000);
    const timeStr = beijingTime.toTimeString().split(' ')[0];
    document.getElementById('localclock').textContent = timeStr;
    document.getElementById('dd').textContent = `${beijingTime.getFullYear()}年${beijingTime.getMonth() + 1}月${beijingTime.getDate()}日\n星期${'日一二三四五六'.charAt(beijingTime.getDay())}`;
}

function updateGlobalTimes() {
    let content = "";
    for (const [city, diff] of Object.entries(cities)) {
        const cityTime = new Date(new Date().getTime() + diff * 3600000);
        const timeStr = cityTime.toTimeString().split(' ')[0];
        content += `<div class="city-time">
                        <span class="city-name">${city}</span>
                        <span>${timeStr}</span>
                        <span class="time-difference-visual" 
                              style="background-color: ${diff >= 0 ? '#4CAF50' : '#f44336'}">
                              ${diff >= 0 ? '+' : ''}${diff}h
                        </span>
                    </div>`;
    }
    document.getElementById('global-times').innerHTML = content;
}


setInterval(() => {
    updateBeijingTime();
    updateGlobalTimes();
}, 1000);





