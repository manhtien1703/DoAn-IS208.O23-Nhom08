/**
 * Chuyển đổi một chuỗi thành dạng slug bằng cách loại bỏ các ký tự đặc biệt, khoảng trắng và chuyển các chữ cái thành chữ thường.
 * @param {string} text - Chuỗi cần chuyển đổi thành slug.
 * @returns {string} - Slug tương ứng với chuỗi đầu vào.
 */
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

/**
 * Hàm debounce trì hoãn việc thực thi hàm sau mỗi lần gọi trong khoảng thời gian nhất định.
 * @param {Function} func - Hàm cần được thực thi.
 * @param {number} delay - Khoảng thời gian trễ (ms) giữa các lần gọi.
 * @returns {Function} - Hàm debounce được tạo ra.
 */
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * Lấy ID từ một slug. ID được xem như là phần tử cuối cùng sau dấu "-".
 * @param {string} slug - Slug cần lấy ID.
 * @returns {string} - ID được trích xuất từ slug.
 */
const getIdFromSlug = (slug) => {
  return slug.split("-").pop();
};

/**
 * Chuyển đổi một đối tượng Date thành chuỗi ngày/tháng/năm.
 * @param {Date} date - Đối tượng Date cần chuyển đổi.
 * @returns {string} - Chuỗi ngày/tháng/năm tương ứng với đối tượng Date đầu vào.
 */
const convertDateToString = (date) => {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};

/**
 * Throttle hàm để giới hạn tần suất gọi trong khoảng thời gian nhất định.
 * @param {Function} func - Hàm cần throttle.
 * @param {number} limit - Khoảng thời gian giới hạn (ms) giữa các lần gọi.
 * @returns {Function} - Hàm throttle được tạo ra.
 */
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

export { slugify, debounce, getIdFromSlug, convertDateToString, throttle };
