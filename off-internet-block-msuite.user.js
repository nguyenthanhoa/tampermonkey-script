// ==UserScript==
// @name         Auto off internet block connect
// @namespace    http://tampermonkey.net/
// @downloadURL  https://github.com/nguyenthanhoa/tampermonkey-script/raw/refs/heads/main/off-internet-block-msuite.user.js
// @updateURL    https://github.com/nguyenthanhoa/tampermonkey-script/raw/refs/heads/main/off-internet-block-msuite.user.js
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
    const findDynamicAttribute = () => {
        // 1. Tìm tất cả các div có class chứa 'overflow-auto' (Parent Scope)
        const containers = document.querySelectorAll('div[class*="overflow-auto"]');

        for (const container of containers) {
            // 2. Tìm các div con bên trong container này
            const childDivs = container.querySelectorAll('div');
            
            for (const div of childDivs) {
                // 3. Duyệt qua danh sách attributes của div con
                const attrs = div.attributes;
                for (let i = 0; i < attrs.length; i++) {
                    const attrName = attrs[i].name;
                    // Kiểm tra prefix 'data-v-'
                    if (attrName.startsWith('data-v-')) { 
                        console.log(attrName)
                        return attrName;
                    }
                }
            }
        }
        
        // Trả về null hoặc giá trị mặc định nếu không tìm thấy
        return null;
    };
    function processElements() {
        // Tìm tất cả các div có attribute data-v-55b02123
        const attr =findDynamicAttribute()||'data-v-55b02123'
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
