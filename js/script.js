document,
  addEventListener('DOMContentLoaded', function () {
    const runningText = document.getElementById('runningText');
    const container = runningText.parentElement;

    const containerWidth = container.offsetWidth;
    const textWidth = runningText.scrollWidth;

    let startPos = container.offsetWidth;
    let endPos = -textWidth;
    let speed = 1;

    function animateText() {
      startPos -= speed;
      if (startPos < endPos) {
        startPos = containerWidth;
      }
      runningText.style.transform = `translateX(${startPos}px)`;
      requestAnimationFrame(animateText);
    }

    animateText();
  });

function realTime() {
  const displayTime = document.getElementById('displayTime');
  const time = new Date();
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  displayTime.textContent = `${hours} : ${minutes} : ${seconds}`;

  document.getElementById('displayTime').style.width = '5.7rem';
}

setInterval(realTime, 1000);
realTime();

function realDate() {
  const realDate = document.getElementById('displayCalendar');
  const now = new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  };

  realDate.textContent = now.toLocaleDateString('id-ID', options);
}

realDate();

document.addEventListener('DOMContentLoaded', function () {
  const notif = document.querySelector('#notification');
  const closeNotifBtn = document.querySelector('#closeNotif');
  const nav = document.querySelector('nav');
  const info = document.querySelector('.info');
  const running = document.querySelector('.running');
  let lastScrollTop = 0;
  let isHidden = false;
  let isNotifClosed = false;

  // Fungsi untuk mengatur transform
  function toggleVisibility(isHidden) {
    const transformValue = isHidden ? 'translateY(-100%)' : 'translateY(0)';
    notif.style.transform = transformValue;
    nav.style.transform = isHidden ? 'translateY(-38.5%)' : 'translateY(0)';
    info.style.transform = isHidden ? 'translateY(-72%)' : 'translateY(0)';
    running.style.transform = isHidden ? 'translateY(-69.5%)' : 'translateY(0)';
  }

  // Fungsi untuk menutup notifikasi saat tombol "X" ditekan
  closeNotifBtn.addEventListener('click', function () {
    notif.style.transform = 'translateY(-100%)';
    isNotifClosed = true; // Menandai bahwa notifikasi sudah ditutup manual
  });

  const throttleScroll = function (callback, delay) {
    let lastCall = 0;
    return function () {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        callback();
      }
    };
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && !isHidden && !isNotifClosed) {
      // Scroll ke bawah, sembunyikan notif (jika belum ditutup dengan "X")
      isHidden = true;
      toggleVisibility(isHidden);
    } else if (scrollTop < lastScrollTop && isHidden && !isNotifClosed) {
      // Scroll ke atas, tampilkan notif kembali (jika belum ditutup dengan "X")
      isHidden = false;
      toggleVisibility(isHidden);
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  };

  window.addEventListener('scroll', throttleScroll(handleScroll, 100));
});
s;
