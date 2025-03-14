let clickCount = 0; // Biến đếm số lần nhấn nút
let isSpinning = false; // Biến theo dõi trạng thái quay

document.getElementById('drawButton').addEventListener('click', function() {
    const resultElement = document.getElementById('result');
    const spinSound = document.getElementById('spinSound');
    const resultSound = document.getElementById('resultSound');

    // Ngăn không cho nhấn nút khi đang quay
    if (isSpinning) return;

    clickCount++; // Tăng số lần nhấn nút
    isSpinning = true; // Đánh dấu là đang quay

    // Phát âm thanh quay số
    spinSound.play().catch(error => {
        console.error("Không thể phát âm thanh quay số:", error);
    });

    // Hiệu ứng nhảy số
    let currentNumber = 0;
    let randomNumber;

    // Nếu nhấn lần thứ 3 trở đi, kết quả sẽ luôn là 07
    if (clickCount >= 3) {
        randomNumber = 7; // Kết quả cố định
    } else {
        randomNumber = Math.floor(Math.random() * 99) + 1; // Số ngẫu nhiên từ 1 đến 99
    }

    const totalIterations = 30; // Số lần nhảy
    let iteration = 0;

    const interval = setInterval(() => {
        // Tạo số ngẫu nhiên từ 1 đến 99
        currentNumber = Math.floor(Math.random() * 99) + 1;
        resultElement.innerText = currentNumber < 10 ? '0' + currentNumber : currentNumber;

        // Tăng số lần nhảy
        iteration++;

        // Dừng lại khi đạt số lần nhảy
        if (iteration >= totalIterations) {
            clearInterval(interval);
            // Hiển thị số ngẫu nhiên cuối cùng
            resultElement.innerText = randomNumber < 10 ? '0' + randomNumber : randomNumber;
            // Phát âm thanh khi hiển thị kết quả
            resultSound.play().catch(error => {
                console.error("Không thể phát âm thanh kết quả:", error);
            });
            isSpinning = false; // Đánh dấu là không còn quay nữa

            // Thêm lớp nhấp nháy
            resultElement.classList.add('blink');

            // Xóa lớp nhấp nháy sau 1 giây
            setTimeout(() => {
                resultElement.classList.remove('blink');
            }, 1000);
        }
    }, 100); // Thời gian giữa các lần nhảy (100ms)
});

// Chuyển sang chế độ toàn màn hình khi nhấn phím F
document.addEventListener('keydown', function(event) {
    if (event.key === 'f' || event.key === 'F') {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }
});