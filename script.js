/* --- 0. FORCE SCROLL TO TOP ON REFRESH --- */
// Matikan fitur browser yang mengingat posisi scroll lama
if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}

// Paksa layar ke paling atas saat halaman dimuat ulang
window.scrollTo(0, 0);

// 1. Header Scroll Effect
// Mengubah background header saat user scroll ke bawah
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
	if (window.scrollY > 50) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}
});

// 2. Mobile Menu Logic
// Menangani buka/tutup menu di tampilan HP
const mobileToggle = document.getElementById("mobile-toggle");
const navMenu = document.getElementById("nav-menu");
const closeMenu = document.querySelector(".close-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Buka menu
mobileToggle.addEventListener("click", () => {
	navMenu.classList.add("active");
});

// Tutup menu (tombol X)
closeMenu.addEventListener("click", () => {
	navMenu.classList.remove("active");
});

// Tutup menu otomatis saat salah satu link diklik
navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		navMenu.classList.remove("active");
	});
});

// 3. Scroll Animation (Intersection Observer)
// Efek fade-in saat elemen masuk ke layar
const observerOptions = {
	threshold: 0.1, // Animasi mulai saat 10% elemen terlihat
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show-element");
		}
	});
}, observerOptions);

// Target semua elemen dengan class 'hidden-element'
const hiddenElements = document.querySelectorAll(".hidden-element");
hiddenElements.forEach((el) => observer.observe(el));
