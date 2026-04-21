// ==UserScript==
// @name         Auto off connect block internet
// @namespace    http://tampermonkey.net/
// @downloadURL  https://raw.githubusercontent.com/nguyenthanhoa/tampermonkey-script/refs/heads/main/off-block-internet.js
// @updateURL   https://raw.githubusercontent.com/nguyenthanhoa/tampermonkey-script/refs/heads/main/off-block-internet.js
// @version      2026-04-21
// @description  try to take over the world!
// @author       You
// @match        https://localhost:40001/ui/main/connection
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    // 2. Hàm xử lý chính

    function processElements() {
        // Tìm tất cả các div có attribute data-v-55b02123
        const attr ='data-v-55b02123'
        const allPotentialParents = document.querySelectorAll(`div[${attr}].item-app`);
        if(!allPotentialParents)return;
        allPotentialParents.forEach(parent => {
            if (parent) {
                // Nếu thỏa mãn điều kiện cha-con, tìm tiếp icon
                const icon = parent.querySelector(`i[${attr}].icon-block-network-2`);

                if (icon) {
                    const wrapper = parent.parentElement;
                    if (wrapper) {
                        // Tìm thẻ input có aria-checked="true"
                        const input = wrapper.querySelector('input[aria-checked="true"]');

                        if (input) {
                            // Lấy text từ thẻ font-weight-semi-bold
                            const labelDiv = parent.querySelector(`div[${attr}].font-weight-semi-bold`);
                            const text = labelDiv ? labelDiv.innerText.trim() : "Không rõ tên";

                            // Hiển thị thông báo tự đóng
                            console.log('Ngắt kết nối đến: ' + text);

                            // Click vào input
                            input.click();
                        }}
                }
            }
        });
    }

    //processElements();
    setInterval(processElements, 5000);
})();
