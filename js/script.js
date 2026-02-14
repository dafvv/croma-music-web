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
