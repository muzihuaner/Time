const cities = { "东京": 1, "莫斯科": -5, "巴黎": -7, "伦敦": -8, "纽约": -13, "洛杉矶": -16 };

async function getBeijingTime() {
  try {
      let response = await fetch('https://f.m.suning.com/api/ct.do');
      if (response.ok) {
          let data = await response.json();
          // 苏宁API返回的时间戳是毫秒格式，直接创建Date对象
          let beijingTime = new Date(data.currentTime);
          return beijingTime;
      } else {
          throw new Error('Network response was not ok');
      }
  } catch (error) {
      console.error('Fetch error:', error);
      // 如果API请求失败，返回本地时间作为后备方案
      return new Date();
  }
}

async function startClock() {
  try {
      let beijingTime = await getBeijingTime();
      
      // 设置初始时分秒
      updateClock(beijingTime);
      
      // 每秒更新一次时分秒
      setInterval(() => {
          beijingTime.setSeconds(beijingTime.getSeconds() + 1);
          updateClock(beijingTime);
      }, 1000);
      
  } catch (error) {
      console.error('Error starting clock:', error);
  }
}

function updateClock(beijingTime) {
  // 在页面上显示时分秒
  document.getElementById('clock').textContent = beijingTime.toLocaleTimeString([], {hour12: false});
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





