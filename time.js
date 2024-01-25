const cities = { "东京": 1, "莫斯科": -5, "巴黎": -7, "伦敦": -8, "纽约": -13, "洛杉矶": -16 };

function updateBeijingTime() {
    const now = new Date();
    const beijingTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 8 * 3600000);
    const timeStr = beijingTime.toTimeString().split(' ')[0];
    document.getElementById('clock').textContent = timeStr;
    document.getElementById('dd').textContent = `${beijingTime.getFullYear()}年${beijingTime.getMonth() + 1}月${beijingTime.getDate()}日星期${'日一二三四五六'.charAt(beijingTime.getDay())}`;
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