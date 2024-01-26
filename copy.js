function oCopy(element) {
    // 选中文本
    element.select();

    // 对于iOS设备，需要设置一个临时的范围进行选中
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        var editable = element.contentEditable;
        var readOnly = element.readOnly;

        element.contentEditable = true;
        element.readOnly = false;

        var range = document.createRange();
        range.selectNodeContents(element);

        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        element.setSelectionRange(0, 999999);
        element.contentEditable = editable;
        element.readOnly = readOnly;
    }

    // 尝试执行复制操作
    try {
        var successful = document.execCommand('copy');
        if (successful) {
            alert('复制成功')
        } else {
            alert('复制失败，请手动复制')
        }
    } catch (err) {
        console.log('Oops, unable to copy');
    }
}
