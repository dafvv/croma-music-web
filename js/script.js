/* =========================================
   SCRIPT.JS - CROMA MUSIC
   Description: Interactivity for Navbar, Scroll, and Animations
========================================= */

// --- 1. PREVENT SCROLL GLITCH ON REFRESH ---
// Memaksa browser kembali ke paling atas saat di-refresh agar animasi header tidak bug
if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

// --- 2. HEADER SCROLL EFFECT ---
// Menambah background putih & blur saat halaman di-scroll ke bawah
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
	if (window.scrollY > 50) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}
});

// --- 3. MOBILE MENU (HAMBURGER) ---
// Logika membuka dan menutup menu di tampilan HP
const mobileToggle = document.getElementById("mobile-toggle");
const navMenu = document.getElementById("nav-menu");
const closeMenu = document.querySelector(".close-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Buka Menu
mobileToggle.addEventListener("click", () => {
	navMenu.classList.add("active");
});

// Tutup Menu (Tombol X)
closeMenu.addEventListener("click", () => {
	navMenu.classList.remove("active");
});

// Tutup Menu Otomatis (Saat link diklik)
navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		navMenu.classList.remove("active");
	});
});

// --- 4. SCROLL ANIMATION (FADE IN) ---
// Menggunakan Intersection Observer API agar elemen muncul saat masuk layar
const observerOptions = {
	threshold: 0.1, // Animasi dimulai saat 10% elemen terlihat
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show-element");
		}
	});
}, observerOptions);

// Mendaftarkan semua elemen dengan class 'hidden-element' ke observer
const hiddenElements = document.querySelectorAll(".hidden-element");
hiddenElements.forEach((el) => observer.observe(el));

// --- 5. MODAL VIDEO POP-UP (AUTOPLAY LOGIC) ---
document.addEventListener("DOMContentLoaded", () => {
	const modal = document.getElementById("video-modal");
	const btnOther = document.getElementById("btn-other-instruments");
	const closeModal = document.querySelector(".close-modal");
	const iframe = document.getElementById("demo-video");

	if (btnOther && modal && iframe) {
		// Simpan URL dasar ke dalam konstanta state
		const baseVideoSrc = iframe.src.split('?')[0]; 

		btnOther.addEventListener("click", (e) => {
			e.preventDefault();
			// Injeksi parameter autoplay saat modal dipanggil
			iframe.src = `${baseVideoSrc}?autoplay=1`;
			modal.classList.add("active");
		});

		// Fungsi modular untuk menghentikan video
		const stopVideo = () => {
			modal.classList.remove("active");
			// Kembalikan ke URL dasar (menghentikan pemutaran secara instan)
			iframe.src = baseVideoSrc; 
		};

		if (closeModal) {
			closeModal.addEventListener("click", stopVideo);
		}

		window.addEventListener("click", (e) => {
			if (e.target === modal) {
				stopVideo();
			}
		});
	}
});

// --- 6. FILTER LOGIC UNTUK MENTOR ---
const filterDropdown = document.getElementById("mentor-filter");
const tutorCards = document.querySelectorAll(".tutor-card");

if (filterDropdown) {
	filterDropdown.addEventListener("change", (e) => {
		const selectedCategory = e.target.value;

		tutorCards.forEach((card) => {
			card.classList.remove("show-element"); // Reset animasi awal
			const cardCategory = card.getAttribute("data-category");

			if (selectedCategory === "all" || cardCategory === selectedCategory) {
				card.style.display = "block";
				// Timeout kecil agar DOM dirender ulang sebelum trigger class animasi CSS
				setTimeout(() => card.classList.add("show-element"), 50);
			} else {
				card.style.display = "none";
			}
		});
	});
}
