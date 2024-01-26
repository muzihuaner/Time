var lunarData = Lunar.fromDate(new Date()).toFullString()
console.log(Lunar.fromDate(new Date()).toFullString());




function removeBrackets(str) {
    return str.replace(/\(.*?\)/g, '');
}

// 解析数据
function parseLunarData(data) {
    // 根据您的数据格式进行解析
    // 二〇二三年腊月十六 癸卯(兔)年 乙丑(牛)月 己丑(牛)日 巳(蛇)时 纳音[金箔金 海中金 霹雳火 大林木] 星期五 (尾牙) 西方白虎 星宿[娄金狗](吉) 彭祖百忌[己不破券二比并亡 丑不冠带主不还乡] 喜神方位[艮](东北) 阳贵神方位[坎](正北) 阴贵神方位[坤](西南) 福神方位[坎](正北) 财神方位[坎](正北) 冲[(癸未)羊] 煞[东]
    // 这里只是一个示例，您可能需要根据实际格式调整
    var parts = data.split(" ");
    return {
        md: parts[0], // '二〇二三年腊月十六'
        year: parts[1], // '癸卯兔年'
        month: parts[2], // '乙丑月'
        day: parts[3], // '己丑日'
        hour: parts[4], // '巳时'
        // ...其他数据
    };
}

// 将解析后的数据填充到HTML中
function fillLunarDataToHtml(lunarData) {
    var d = Lunar.fromDate(new Date());
    console.log(d.getDayNaYin());
    var parsedData = parseLunarData(lunarData);
    document.getElementById('md').textContent = parsedData.md;
    var iElements = document.querySelectorAll("#ymd i");
    iElements[0].textContent = parsedData.year;
    iElements[1].textContent = removeBrackets(parsedData.month); // 月份
    iElements[2].textContent = removeBrackets(parsedData.day); // 日期
    iElements[3].textContent = removeBrackets(parsedData.hour); // 时
    document.getElementById('nayin').textContent = d.getDayNaYin();//纳音
    document.getElementById('chongsha').textContent = ' 冲' + d.getDayChongDesc() + ' 煞' + d.getDaySha();//冲煞
    document.getElementById('pengzu').textContent = d.getPengZuGan() + '\n' + d.getPengZuZhi();//彭祖
    document.getElementById('xishen').textContent = d.getDayPositionXiDesc();//喜神
    document.getElementById('fushen').textContent = d.getDayPositionFuDesc();//福神
    document.getElementById('caishen').textContent = d.getDayPositionCaiDesc()//财神

    // 获取宜的内容
    var yiList = d.getDayYi();
    var yiHtml = ''; // 用于存储宜的 HTML 字符串
    for (var i = 0; i < yiList.length; i++) {
        yiHtml += '<i>' + yiList[i] + '</i>'; // 创建宜的每个项目的 HTML
    }

    // 获取忌的内容
    var jiList = d.getDayJi();
    var jiHtml = ''; // 用于存储忌的 HTML 字符串
    for (var i = 0; i < jiList.length; i++) {
        jiHtml += '<i>' + jiList[i] + '</i>'; // 创建忌的每个项目的 HTML
    }

    // 选取宜和忌的父元素
    var yiElement = document.getElementById('yi');
    var jiElement = document.getElementById('ji');

    // 更新宜和忌的 HTML 内容
    yiElement.innerHTML = '<b>宜</b> ' + yiHtml;
    jiElement.innerHTML = '<b>忌</b> ' + jiHtml;



    // 获取吉神宜趋的内容
    var jiShenList = d.getDayJiShen();
    var jiShenHtml = ''; // 用于存储吉神的 HTML 字符串
    for (var i = 0; i < jiShenList.length; i++) {
        jiShenHtml += '<i>' + jiShenList[i] + '</i>'; // 创建吉神的每个项目的 HTML
    }

    // 获取凶煞宜忌的内容
    var xiongShaList = d.getDayXiongSha();
    var xiongShaHtml = ''; // 用于存储凶煞的 HTML 字符串
    for (var i = 0; i < xiongShaList.length; i++) {
        xiongShaHtml += '<i>' + xiongShaList[i] + '</i>'; // 创建凶煞的每个项目的 HTML
    }

    // 选取吉神和凶煞的父元素
    var jiShenElement = document.getElementById('jshen');
    var xiongShaElement = document.getElementById('xshen');

    // 更新吉神和凶煞的 HTML 内容
    jiShenElement.innerHTML = '<b>吉神</b> ' + jiShenHtml;
    xiongShaElement.innerHTML = '<b>凶神</b> ' + xiongShaHtml;


}

// 当文档加载完毕时执行
document.addEventListener('DOMContentLoaded', function () {
    fillLunarDataToHtml(lunarData);
});