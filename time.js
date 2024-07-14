const cities = { "东京": 1, "莫斯科": -5, "巴黎": -7, "伦敦": -8, "纽约": -13, "洛杉矶": -16 };

function getSysTime() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://quan.suning.com/getSysTime.do', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var sysTime = response.sysTime2;
      var timeParts = sysTime.split(" ")[1].split(":");
      var hours = timeParts[0];
      var minutes = timeParts[1];
      var seconds = timeParts[2];
      var formattedTime = hours + ":" + minutes + ":" + seconds;
      document.getElementById('clock').textContent = formattedTime; // Update clock with formatted time
      var currentTime = response.sysTime2; // 例如 1627489200000
      // 将 currentTime 转换为 Date 对象
      var currentTimeDate = new Date(currentTime.replace(/-/g, '/'));

      // 获取设备的当前时间
      var deviceTime = new Date();

      // 计算时间差，单位为毫秒
      var timeDifference = deviceTime - currentTimeDate;

      // 将时间差显示在 #time-difference 元素中
      document.getElementById('time-difference').textContent = '您的系统时间慢了: ' + timeDifference + ' 毫秒';




    } else {
      console.error('Request failed. Status:', xhr.status);
      // Handle error if necessary
    }
  };
  xhr.onerror = function () {
    console.error('Request failed. Network error');
    // Handle error if necessary
  };
  xhr.send();
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





