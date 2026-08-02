/* =====================================================
   SHAMA SOFAHUB KAMPALA
   COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   1. DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initThemeToggle();
    initMobileMenu();
    initHeroSlider();
    initProductSystem();
    initFAQ();
    initScrollReveal();
    initBackToTop();
    initSmoothScrolling();
    initContactForm();
    initActiveNavigation();
    initScrollRestoration();
    initCustomFormUpload();
    initFloatingButtons();
    initPWA(); // <-- ADD THIS LINE
});


/* =====================================================
   2. PRELOADER
===================================================== */

function initPreloader() {

    const preloader =
        document.querySelector(".preloader");

    if (!preloader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hidden");

            document.body.classList.add(
                "page-loaded"
            );

        }, 900);

    });

}


/* =====================================================
   3. THEME TOGGLE
===================================================== */

function initThemeToggle() {

    const themeToggle =
        document.querySelector(".theme-toggle");

    if (!themeToggle) return;

    const savedTheme =
        localStorage.getItem(
            "shama-sofahub-theme"
        );

    if (savedTheme) {

        document.documentElement.setAttribute(
            "data-theme",
            savedTheme
        );

    }

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                document.documentElement.getAttribute(
                    "data-theme"
                );

            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            document.documentElement.setAttribute(
                "data-theme",
                newTheme
            );

            localStorage.setItem(
                "shama-sofahub-theme",
                newTheme
            );

        }

    );

}


/* =====================================================
   4. MOBILE MENU (WhatsApp style, click outside to close)
===================================================== */

function initMobileMenu() {

    const menuToggle =
        document.querySelector(
            ".mobile-menu-toggle"
        );

    const mobileNavigation =
        document.querySelector(
            ".mobile-navigation"
        );

    if (
        !menuToggle ||
        !mobileNavigation
    ) return;


    menuToggle.addEventListener(
        "click",
        (e) => {
            e.stopPropagation();
            mobileNavigation.classList.toggle(
                "active"
            );

            const isOpen =
                mobileNavigation.classList.contains(
                    "active"
                );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            const icon =
                menuToggle.querySelector(
                    "i"
                );

            if (icon) {

                icon.className =
                    isOpen
                        ? "fas fa-times"
                        : "fas fa-bars";

            }

        }

    );


    // Exit when clicking anywhere outside the menu
    document.addEventListener("click", (event) => {
        if (
            mobileNavigation.classList.contains("active") &&
            !mobileNavigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            mobileNavigation.classList.remove("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.className = "fas fa-bars";
            }
        }
    });


    const mobileLinks =
        mobileNavigation.querySelectorAll(
            "a"
        );

    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNavigation.classList.remove(
                    "active"
                );

                const icon =
                    menuToggle.querySelector(
                        "i"
                    );

                if (icon) {

                    icon.className =
                        "fas fa-bars";

                }

            }

        );

    });

}


/* =====================================================
   5. HERO SLIDER
===================================================== */

function initHeroSlider() {

    const slides =
        document.querySelectorAll(
            ".hero-slide"
        );

    // 1. CREATE THE INDICATOR DOTS DYNAMICALLY
    const indicatorContainer = document.getElementById("hero-indicators");
    if (indicatorContainer) {
        indicatorContainer.innerHTML = ""; // clear first
        slides.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.className = "hero-indicator";
            dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
            if(i === 0) dot.classList.add("active");
            indicatorContainer.appendChild(dot);
        });
    }

    const indicators =
        document.querySelectorAll(
            ".hero-indicator"
        );

    const nextButton =
        document.querySelector(
            ".hero-next"
        );

    const previousButton =
        document.querySelector(
            ".hero-prev"
        );

    if (!slides.length) return;


    let currentSlide = 0;

    let sliderInterval;


    function showSlide(index) {

        if (
            index >= slides.length
        ) {

            currentSlide = 0;

        }


        if (index < 0) {

            currentSlide =
                slides.length - 1;

        }


        slides.forEach(
            slide => {

                slide.classList.remove(
                    "active"
                );

            }

        );


        indicators.forEach(
            indicator => {

                indicator.classList.remove(
                    "active"
                );

            }

        );


        slides[currentSlide].classList.add(
            "active"
        );


        if (indicators[currentSlide]) {

            indicators[currentSlide].classList.add(
                "active"
            );

        }

    }


    function nextSlide() {

        currentSlide++;

        if (
            currentSlide >= slides.length
        ) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }


    function previousSlide() {

        currentSlide--;

        if (
            currentSlide < 0
        ) {

            currentSlide =
                slides.length - 1;

        }

        showSlide(currentSlide);

    }


    function startSlider() {

        sliderInterval =
            setInterval(
                nextSlide,
                4000
            );

    }


    function resetSlider() {

        clearInterval(
            sliderInterval
        );

        startSlider();

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                nextSlide();

                resetSlider();

            }

        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                previousSlide();

                resetSlider();

            }

        );

    }


    indicators.forEach(
        (indicator, index) => {

            indicator.addEventListener(
                "click",
                () => {

                    currentSlide =
                        index;

                    showSlide(
                        currentSlide
                    );

                    resetSlider();

                }

            );

        }

    );


    showSlide(
        currentSlide
    );

    startSlider();

}


/* =====================================================
   6. PRODUCT SYSTEM & SEAT COLOR CHANGE HANDLER
===================================================== */

const COLOR_MAP = {
    "Black":"#000000","White":"#ffffff","Cream":"#FFFDD0","Ivory":"#FFFFF0","Beige":"#F5F5DC",
    "Brown":"#8B4513","Chocolate":"#D2691E","Coffee":"#6F4E37","Grey":"#808080","Charcoal":"#36454F",
    "Navy Blue":"#000080","Royal Blue":"#4169E1","Sky Blue":"#87CEEB","Olive Green":"#808000",
    "Emerald Green":"#50C878","Forest Green":"#228B22","Wine Red":"#722F37","Maroon":"#800000",
    "Mustard Yellow":"#FFDB58","Orange":"#FFA500","Purple":"#800080"
};

let wishlist = JSON.parse(localStorage.getItem('shama-wishlist')) || [];
let minPrice = 100000;
let maxPrice = 5000000;

const products = [
    // --- SINGLE-SEATER (10 items) ---
    { id: 1, name: "Classic Single Seater Sofa", category: "single-seater", type: "Sofa", oldPrice: "UGX 650,000", price: "UGX 520,000", image: "single1.png", description: "A comfortable and stylish single-seater sofa with free delivery.", colors: Object.keys(COLOR_MAP) },
    { id: 2, name: "Royal Single Seater Velvet", category: "single-seater", type: "Sofa", oldPrice: "UGX 700,000", price: "UGX 550,000", image: "white single.png", description: "Luxurious velvet single seater crafted in Kalerwe.", colors: Object.keys(COLOR_MAP) },
    { id: 3, name: "Executive Single Lounge", category: "single-seater", type: "Sofa", oldPrice: "UGX 750,000", price: "UGX 580,000", image: "bean.png", description: "Modern executive single lounge for home and office.", colors: Object.keys(COLOR_MAP) },
    { id: 4, name: "Compact Single Accent", category: "single-seater", type: "Sofa", oldPrice: "UGX 600,000", price: "UGX 480,000", image: "single seater.png", description: "Compact accent chair built for cozy reading corners.", colors: Object.keys(COLOR_MAP) },
    { id: 5, name: "Plush Single Tub Chair", category: "single-seater", type: "Sofa", oldPrice: "UGX 680,000", price: "UGX 530,000", image: "material.png", description: "Plush tub chair with sturdy wooden frame.", colors: Object.keys(COLOR_MAP) },
    { id: 6, name: "Modern Curve Single", category: "single-seater", type: "Sofa", oldPrice: "UGX 720,000", price: "UGX 560,000", image: "soft single seater.png", description: "Curved single seater offering ergonomic posture support.", colors: Object.keys(COLOR_MAP) },
    { id: 7, name: "Vintage Single Armchair", category: "single-seater", type: "Sofa", oldPrice: "UGX 800,000", price: "UGX 620,000", image: "white single.png", description: "Vintage-inspired armchair with classic button tufting.", colors: Object.keys(COLOR_MAP) },
    { id: 8, name: "Minimalist Single Chair", category: "single-seater", type: "Sofa", oldPrice: "UGX 580,000", price: "UGX 450,000", image: "bean.png", description: "Minimalist aesthetic chair for contemporary apartments.", colors: Object.keys(COLOR_MAP) },
    { id: 9, name: "Deluxe Single Recliner", category: "single-seater", type: "Sofa", oldPrice: "UGX 900,000", price: "UGX 750,000", image: "consult1.png", description: "Deluxe padded single recliner for ultimate relaxation.", colors: Object.keys(COLOR_MAP) },
    { id: 10, name: "Shama Signature Single", category: "single-seater", type: "Sofa", oldPrice: "UGX 750,000", price: "UGX 600,000", image: "material.png", description: "Signature handcrafted single sofa with discount offer.", colors: Object.keys(COLOR_MAP) },

    // --- TWO-SEATER (10 items) ---
    { id: 11, name: "Luxury Double Seater Sofa", category: "two-seater", type: "Sofa", oldPrice: "UGX 1,200,000", price: "UGX 950,000", image: "double-seater-sofa.jpg", description: "A beautifully crafted double-seater sofa designed for comfort.", colors: Object.keys(COLOR_MAP) },
    { id: 12, name: "Fluffy Two Seater Comfort", category: "two-seater", type: "Sofa", oldPrice: "UGX 1,300,000", price: "UGX 1,020,000", image: "fluffy two seater.png", description: "Super fluffy two seater sofa with free delivery in Kampala.", colors: Object.keys(COLOR_MAP) },
    { id: 13, name: "Modern Loveseat Duo", category: "two-seater", type: "Sofa", oldPrice: "UGX 1,150,000", price: "UGX 900,000", image: "double-seater-sofa.jpg", description: "Compact loveseat duo for intimate living spaces.", colors: Object.keys(COLOR_MAP) },
    { id: 14, name: "Velvet Twin Seater", category: "two-seater", type: "Sofa", oldPrice: "UGX 1,400,000", price: "UGX 1,100,000", image: "fluffy two seater.png", description: "Smooth velvet twin seater with premium foam padding.", colors: Object.keys(COLOR_MAP) },
    { id: 15, name: "Executive Two Seater", category: "two-seater", type: "Sofa", oldPrice: "UGX 1,250,000", price: "UGX 980,000", image: "double-seater-sofa.jpg", description: "Executive office and living room two seater sofa.", colors: Object.keys(COLOR_MAP) },
    { id: 16, name: "Classic Tufted Double", category: "two-seater", type: "Sofa", oldPrice: "UGX 1,350,000", price: "UGX 1,050,000", image: "fluffy two seater.png", description: "Handcrafted tufted double sofa with rich fabric.", colors: Object.keys(COLOR_MAP) },
    { id: 17, name: "Urban Two Seater Sofa", category: "two-seater", type: "Sofa", oldPrice: "UGX 1,100,000", price: "UGX 860,000", image: "double-seater-sofa.jpg", description: "Urban style two seater built for modern homes.", colors: Object.keys(COLOR_MAP) },
    { id: 18, name: "Compact Apartment Double", category: "two-seater", type: "Sofa", oldPrice: "UGX 1,050,000", price: "UGX 820,000", image: "fluffy two seater.png", description: "Space-saving apartment double sofa.", colors: Object.keys(COLOR_MAP) },
    { id: 19, name: "Royal Crest Two Seater", category: "two-seater", type: "Sofa", oldPrice: "UGX 1,500,000", price: "UGX 1,200,000", image: "double-seater-sofa.jpg", description: "Royal crest high-end two seater sofa set piece.", colors: Object.keys(COLOR_MAP) },
    { id: 20, name: "Shama Cozy Double", category: "two-seater", type: "Sofa", oldPrice: "UGX 1,200,000", price: "UGX 940,000", image: "fluffy two seater.png", description: "Shama cozy double seater with discount voucher.", colors: Object.keys(COLOR_MAP) },

    // --- THREE-SEATER (10 items) ---
    { id: 21, name: "Premium Three Seater Sofa", category: "three-seater", type: "Sofa", oldPrice: "UGX 1,800,000", price: "UGX 1,450,000", image: "test.png", description: "A spacious three-seater sofa made for family comfort.", colors: Object.keys(COLOR_MAP) },
    { id: 22, name: "Grand Family Three Seater", category: "three-seater", type: "Sofa", oldPrice: "UGX 1,950,000", price: "UGX 1,580,000", image: "l four seater.png", description: "Grand family sofa with deep cushioning and robust support.", colors: Object.keys(COLOR_MAP) },
    { id: 23, name: "Luxury Velvet Trio", category: "three-seater", type: "Sofa", oldPrice: "UGX 2,100,000", price: "UGX 1,700,000", image: "three-seater-sofa.jpg", description: "Luxurious velvet trio sofa for grand living spaces.", colors: Object.keys(COLOR_MAP) },
    { id: 24, name: "Modern Living Three Seater", category: "three-seater", type: "Sofa", oldPrice: "UGX 1,750,000", price: "UGX 1,400,000", image: "l four seater.png", description: "Clean lines and contemporary styling three seater.", colors: Object.keys(COLOR_MAP) },
    { id: 25, name: "Executive Triple Sofa", category: "three-seater", type: "Sofa", oldPrice: "UGX 2,000,000", price: "UGX 1,620,000", image: "three-seater-sofa.jpg", description: "Executive triple sofa designed for professional reception areas.", colors: Object.keys(COLOR_MAP) },
    { id: 26, name: "Classic Chesterfield Trio", category: "three-seater", type: "Sofa", oldPrice: "UGX 2,250,000", price: "UGX 1,850,000", image: "l four seater.png", description: "Classic Chesterfield tufted three seater masterpiece.", colors: Object.keys(COLOR_MAP) },
    { id: 27, name: "Comfort Plus Three Seater", category: "three-seater", type: "Sofa", oldPrice: "UGX 1,650,000", price: "UGX 1,320,000", image: "three-seater-sofa.jpg", description: "Extra padded comfort plus three seater.", colors: Object.keys(COLOR_MAP) },
    { id: 28, name: "Urban Chic Triple", category: "three-seater", type: "Sofa", oldPrice: "UGX 1,700,000", price: "UGX 1,350,000", image: "l four seater.png", description: "Urban chic triple sofa with free Kampala delivery.", colors: Object.keys(COLOR_MAP) },
    { id: 29, name: "Royal Palace Three Seater", category: "three-seater", type: "Sofa", oldPrice: "UGX 2,400,000", price: "UGX 1,950,000", image: "three-seater-sofa.jpg", description: "Royal palace grade three seater sofa set.", colors: Object.keys(COLOR_MAP) },
    { id: 30, name: "Shama Master Trio", category: "three-seater", type: "Sofa", oldPrice: "UGX 1,850,000", price: "UGX 1,500,000", image: "l four seater.png", description: "Shama master trio crafted with precision in Kalerwe.", colors: Object.keys(COLOR_MAP) },

    // --- L-SHAPED (10 items) ---
    { id: 31, name: "Modern L-Shaped Sofa", category: "l-shaped", type: "Sofa", oldPrice: "UGX 2,800,000", price: "UGX 2,300,000", image: "l-shaped-sofa.jpg", description: "A modern L-shaped sofa combining generous seating space.", colors: Object.keys(COLOR_MAP) },
    { id: 32, name: "L-Four Seater Sectional", category: "l-shaped", type: "Sofa", oldPrice: "UGX 3,000,000", price: "UGX 2,450,000", image: "l four seater.png", description: "Spacious L four seater sectional with free delivery.", colors: Object.keys(COLOR_MAP) },
    { id: 33, name: "Deluxe Corner L-Sofa", category: "l-shaped", type: "Sofa", oldPrice: "UGX 3,200,000", price: "UGX 2,600,000", image: "l-shaped-sofa.jpg", description: "Deluxe corner L-sofa crafted for spacious family lounges.", colors: Object.keys(COLOR_MAP) },
    { id: 34, name: "Contemporary L-Sectional", category: "l-shaped", type: "Sofa", oldPrice: "UGX 2,900,000", price: "UGX 2,380,000", image: "l four seater.png", description: "Sleek contemporary L-sectional with chaise lounge.", colors: Object.keys(COLOR_MAP) },
    { id: 35, name: "Executive L-Shape Suite", category: "l-shaped", type: "Sofa", oldPrice: "UGX 3,500,000", price: "UGX 2,850,000", image: "l-shaped-sofa.jpg", description: "Executive L-shape suite for high-end office suites.", colors: Object.keys(COLOR_MAP) },
    { id: 36, name: "Plush Velvet L-Sofa", category: "l-shaped", type: "Sofa", oldPrice: "UGX 3,300,000", price: "UGX 2,700,000", image: "l four seater.png", description: "Plush velvet L-sofa with soft scatter cushions included.", colors: Object.keys(COLOR_MAP) },
    { id: 37, name: "Compact L-Shape Design", category: "l-shaped", type: "Sofa", oldPrice: "UGX 2,500,000", price: "UGX 2,050,000", image: "l-shaped-sofa.jpg", description: "Compact L-shape design tailored for smaller apartments.", colors: Object.keys(COLOR_MAP) },
    { id: 38, name: "Urban L-Shaped Lounge", category: "l-shaped", type: "Sofa", oldPrice: "UGX 2,750,000", price: "UGX 2,250,000", image: "l four seater.png", description: "Urban L-shaped lounge with premium fabric finish.", colors: Object.keys(COLOR_MAP) },
    { id: 39, name: "Grand Imperial L-Sofa", category: "l-shaped", type: "Sofa", oldPrice: "UGX 3,800,000", price: "UGX 3,100,000", image: "l-shaped-sofa.jpg", description: "Grand imperial L-sofa masterpiece for luxurious homes.", colors: Object.keys(COLOR_MAP) },
    { id: 40, name: "Shama Modular L-Shape", category: "l-shaped", type: "Sofa", oldPrice: "UGX 2,950,000", price: "UGX 2,400,000", image: "l four seater.png", description: "Shama modular L-shape with seasonal special discount.", colors: Object.keys(COLOR_MAP) },

    // --- FULL SOFA SETS (10 items) ---
    { id: 41, name: "Complete Luxury Sofa Set", category: "sofa-sets", type: "Sofa", oldPrice: "UGX 4,500,000", price: "UGX 3,700,000", image: "full-sofa-set.jpg", description: "A complete sofa set carefully crafted for elegant homes.", colors: Object.keys(COLOR_MAP) },
    { id: 42, name: "Royal Full Living Set", category: "sofa-sets", type: "Sofa", oldPrice: "UGX 4,800,000", price: "UGX 3,950,000", image: "l four seater.png", description: "Royal full living set with matching center table options.", colors: Object.keys(COLOR_MAP) },
    { id: 43, name: "Executive Complete Suite", category: "sofa-sets", type: "Sofa", oldPrice: "UGX 5,000,000", price: "UGX 4,100,000", image: "full-sofa-set.jpg", description: "Executive complete suite for spacious living rooms.", colors: Object.keys(COLOR_MAP) },
    { id: 44, name: "Classic Family Sofa Set", category: "sofa-sets", type: "Sofa", oldPrice: "UGX 4,200,000", price: "UGX 3,450,000", image: "five seater green.png", description: "Classic family sofa set with robust wooden framework.", colors: Object.keys(COLOR_MAP) },
    { id: 45, name: "Grand Imperial Set", category: "sofa-sets", type: "Sofa", oldPrice: "UGX 5,500,000", price: "UGX 4,500,000", image: "Big 3.png", description: "Grand imperial full set crafted to perfection in Kalerwe.", colors: Object.keys(COLOR_MAP) },
    { id: 46, name: "Modern Living Full Suite", category: "sofa-sets", type: "Sofa", oldPrice: "UGX 4,600,000", price: "UGX 3,800,000", image: "Lth1.png", description: "Modern living full suite with free delivery and setup.", colors: Object.keys(COLOR_MAP) },
    { id: 47, name: "Velvet Elegance Set", category: "sofa-sets", type: "Sofa", oldPrice: "UGX 5,200,000", price: "UGX 4,300,000", image: "full-sofa-set.jpg", description: "Velvet elegance complete set with plush cushions.", colors: Object.keys(COLOR_MAP) },
    { id: 48, name: "Urban Contemporary Set", category: "sofa-sets", type: "Sofa", oldPrice: "UGX 4,400,000", price: "UGX 3,600,000", image: "l four seater.png", description: "Urban contemporary set designed for modern Kampala homes.", colors: Object.keys(COLOR_MAP) },
    { id: 49, name: "Presidential Sofa Suite", category: "sofa-sets", type: "Sofa", oldPrice: "UGX 6,000,000", price: "UGX 4,900,000", image: "full-sofa-set.jpg", description: "Presidential sofa suite for ultimate luxury and prestige.", colors: Object.keys(COLOR_MAP) },
    { id: 50, name: "Shama Signature Set", category: "sofa-sets", type: "Sofa", oldPrice: "UGX 4,700,000", price: "UGX 3,850,000", image: "l four seater.png", description: "Shama signature complete set with special discount package.", colors: Object.keys(COLOR_MAP) },

    // --- OTTOMANS (10 items) ---
    { id: 51, name: "Classic Storage Ottoman", category: "ottomans", type: "Ottoman", oldPrice: "UGX 350,000", price: "UGX 280,000", image: "Ottoman3.png", description: "A stylish storage ottoman built for convenience and comfort.", colors: Object.keys(COLOR_MAP) },
    { id: 52, name: "Velvet Round Ottoman", category: "ottomans", type: "Ottoman", oldPrice: "UGX 400,000", price: "UGX 320,000", image: "Ottoman3.png", description: "Luxurious round velvet ottoman with gold trim base.", colors: Object.keys(COLOR_MAP) },
    { id: 53, name: "Tufted Square Ottoman", category: "ottomans", type: "Ottoman", oldPrice: "UGX 380,000", price: "UGX 300,000", image: "Ottoman3.png", description: "Tufted square ottoman that doubles as coffee table seat.", colors: Object.keys(COLOR_MAP) },
    { id: 54, name: "Compact Footrest Ottoman", category: "ottomans", type: "Ottoman", oldPrice: "UGX 300,000", price: "UGX 240,000", image: "Ottoman3.png", description: "Compact footrest ottoman designed to match any sofa.", colors: Object.keys(COLOR_MAP) },
    { id: 55, name: "Luxury Bench Ottoman", category: "ottomans", type: "Ottoman", oldPrice: "UGX 550,000", price: "UGX 450,000", image: "Lx1.png", description: "Long bench ottoman for bedroom ends and living rooms.", colors: Object.keys(COLOR_MAP) },
    { id: 56, name: "Modern Cylinder Ottoman", category: "ottomans", type: "Ottoman", oldPrice: "UGX 360,000", price: "UGX 290,000", image: "Ottoman3.png", description: "Modern cylinder ottoman with breathable fabric.", colors: Object.keys(COLOR_MAP) },
    { id: 57, name: "Executive Leather Ottoman", category: "ottomans", type: "Ottoman", oldPrice: "UGX 500,000", price: "UGX 400,000", image: "Ottoman3.png", description: "Executive leather-finish ottoman for upscale offices.", colors: Object.keys(COLOR_MAP) },
    { id: 58, name: "Cozy Padded Footstool", category: "ottomans", type: "Ottoman", oldPrice: "UGX 320,000", price: "UGX 260,000", image: "Ottoman3.png", description: "Cozy padded footstool crafted in Kalerwe.", colors: Object.keys(COLOR_MAP) },
    { id: 59, name: "Royal Crown Ottoman", category: "ottomans", type: "Ottoman", oldPrice: "UGX 600,000", price: "UGX 480,000", image: "Ottoman2.png", description: "Royal crown luxury ottoman with button detailing.", colors: Object.keys(COLOR_MAP) },
    { id: 60, name: "High Density Ottoman", category: "ottomans", type: "Ottoman", oldPrice: "UGX 180,000", price: "UGX 145,000", image: "Ottoman.png", description: "special durable ottoman with free delivery.", colors: Object.keys(COLOR_MAP) }
];

function initProductSystem() {
    const grid = document.getElementById("product-grid");
    const searchInput = document.getElementById("product-search");
    const sortSelect = document.getElementById("product-sort");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const emptyState = document.getElementById("product-empty-state");
    const modal = document.getElementById("product-modal");
    const modalClose = document.getElementById("product-modal-close");
    const modalBody = document.getElementById("product-modal-body");

    // PRICE SLIDER ELEMENTS
    const minRange = document.getElementById("price-min");
    const maxRange = document.getElementById("price-max");
    const minValue = document.getElementById("min-value");
    const maxValue = document.getElementById("max-value");

    if (!grid) return;

    let currentCategory = "all";
    let searchQuery = "";
    let currentSort = "default";

    // PRICE SLIDER EVENTS
    if(minRange) {
        minRange.addEventListener("input", e => {
            minPrice = parseInt(e.target.value);
            minValue.textContent = minPrice.toLocaleString();
            renderProducts();
        });
    }
    if(maxRange) {
        maxRange.addEventListener("input", e => {
            maxPrice = parseInt(e.target.value);
            maxValue.textContent = maxPrice.toLocaleString();
            renderProducts();
        });
    }

    function renderProducts() {
        let filtered = products.filter(p => {
            
            const matchesCat = currentCategory === "all" || p.category === currentCategory;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
            const price = parseInt(p.price.replace(/\D/g, ''));
            const matchesPrice = price >= minPrice && price <= maxPrice;
            return matchesCat && matchesSearch && matchesPrice;
             // <-- PRICE NOW INCLUDED
        });

        if (currentSort === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name));
        else if (currentSort === "name-desc") filtered.sort((a, b) => b.name.localeCompare(a.name));
        else if (currentSort === "price-low") filtered.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
        else if (currentSort === "price-high") filtered.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')));

        grid.innerHTML = "";

        if (filtered.length === 0) {
            emptyState.classList.remove("hidden");
            return;
        }
        emptyState.classList.add("hidden");

        filtered.forEach(p => {
            const card = document.createElement("article");
            card.className = "product-card";
            card.innerHTML = `
                <div class="product-card-image animated-product-img">
                    <span class="product-card-badge">${p.type}</span>
                    <img src="${p.image}" alt="${p.name}" loading="lazy">
                    <div class="product-actions">
                        <button class="action-btn wishlist-btn ${wishlist.includes(p.id)?'active':''}" data-id="${p.id}"><i class="fa-${wishlist.includes(p.id)?'solid':'regular'} fa-heart"></i></button>
                    </div>
                </div>
                <div class="product-card-content">
                    <span class="product-card-category">${p.category.replace("-", " ")}</span>
                    <h3>${p.name}</h3>
                    <div class="color-swatches">
                        ${p.colors.slice(0,10).map((c,i) => `<div class="color-swatch ${i===0?'selected':''}" style="background:${COLOR_MAP[c]}" title="${c}"></div>`).join('')}
                    </div>
                    <p>${p.description}</p>
                    <div class="product-card-footer">
                        <span class="product-price">${p.price}</span>
                        <button class="product-view-btn" data-id="${p.id}">View Details</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        // Wishlist + Modal events
        grid.querySelectorAll(".wishlist-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                if(wishlist.includes(id)) {
                    wishlist = wishlist.filter(w => w!== id);
                    btn.classList.remove("active");
                    btn.querySelector("i").className = "fa-regular fa-heart";
                } else {
                    wishlist.push(id);
                    btn.classList.add("active");
                    btn.querySelector("i").className = "fa-solid fa-heart";
                }
                localStorage.setItem('shama-wishlist', JSON.stringify(wishlist));
                showNotification("Wishlist updated");
            });
        });

        grid.querySelectorAll(".product-view-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = parseInt(btn.getAttribute("data-id"));
                openModal(id);
            });
        });
    }

    // ... keep the rest of your openModal, filterBtns, searchInput, sortSelect code the same ...

    renderProducts();
}

/* =====================================================
   7. FAQ ACCORDION
===================================================== */

function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const summary = item.querySelector("summary");
        if (!summary) return;
        summary.addEventListener("click", (e) => {
            // Optional smooth toggle behavior
        });
    });
}


/* =====================================================
   8. SCROLL REVEAL & BACK TO TOP
===================================================== */

function initScrollReveal() {
    // Basic helper
}

function initBackToTop() {
    const backToTopBtn = document.getElementById("back-to-top");
    if (!backToTopBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


/* =====================================================
   9. SMOOTH SCROLLING & ACTIVE NAV
===================================================== */

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

function initActiveNavigation() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".desktop-navigation .nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
}


/* =====================================================
   10. CONTACT & CUSTOM DESIGN FORMS
===================================================== */

function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    const customForm = document.getElementById("custom-design-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("contact-name").value;
            const phone = document.getElementById("contact-phone").value;
            const service = document.getElementById("contact-service").value;
            const message = document.getElementById("contact-message").value;

            const whatsappUrl = `https://wa.me/256764102459?text=Hello%20Shama%20SofaHub,%0A%0AMy%20Name:%20${encodeURIComponent(name)}%0APhone:%20${encodeURIComponent(phone)}%0AService:%20${encodeURIComponent(service)}%0AMessage:%20${encodeURIComponent(message)}`;
            
            showNotification("Redirecting to WhatsApp with your message...");
            setTimeout(() => {
                window.open(whatsappUrl, "_blank");
            }, 800);
        });
    }

    // Set current year in footer
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}


/* =====================================================
   11. NOTIFICATION HELPER
===================================================== */

function showNotification(msg) {
    const notification = document.getElementById("notification");
    const messageSpan = document.getElementById("notification-message");
    if (!notification || !messageSpan) return;

    messageSpan.textContent = msg;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3500);
}


/* =====================================================
   12. SCROLL POSITION PERSISTENCE (Start where you stopped)
===================================================== */

function initScrollRestoration() {
    window.addEventListener("beforeunload", () => {
        localStorage.setItem("shama-sofahub-scroll", window.scrollY);
    });

    window.addEventListener("load", () => {
        const savedScroll = localStorage.getItem("shama-sofahub-scroll");
        if (savedScroll) {
            setTimeout(() => {
                window.scrollTo({
                    top: parseInt(savedScroll, 10),
                    behavior: "smooth"
                });
            }, 400);
        }
    });
}

/* =====================================================
   13. CUSTOM DESIGN FORM WITH IMAGE UPLOAD TO WHATSAPP
   WHAT IT DOES: Takes the form data + tells user to attach image in WhatsApp
===================================================== */
function initCustomFormUpload() {
    const customForm = document.getElementById("custom-design-form");
    if(!customForm) return;

    customForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const type = document.getElementById("custom-type").value;
        const color = document.getElementById("custom-color").value;
        const message = document.getElementById("custom-message").value;
        const fileInput = document.getElementById("custom-image-file");
        const file = fileInput.files[0];

        let whatsappText = `Hello Shama SofaHub, Custom Sofa Request:%0A%0A` +
                           `Type: ${encodeURIComponent(type)}%0A` +
                           `Color: ${encodeURIComponent(color)}%0A` +
                           `Details: ${encodeURIComponent(message)}%0A%0A` +
                           `Location: Kalerwe, Kampala`;

        if(file) {
            whatsappText += `%0A%0A[Customer has an inspiration image to attach]`;
        }

        window.open(`https://wa.me/256764102459?text=${whatsappText}`, "_blank");
        showNotification("Opening WhatsApp. Please attach your image after opening.");
    });
}

/* =====================================================
   14. FLOATING CALL BUTTON
   WHAT IT DOES: Creates a blue phone button that floats on screen
===================================================== */
function initFloatingButtons() {
    // Create Call Button
    const floatingCall = document.createElement('a');
    floatingCall.href = "tel:+256769044625";
    floatingCall.className = "floating-whatsapp";
    floatingCall.style.background = "#1565c0"; // Blue
    floatingCall.style.right = "22px";
    floatingCall.style.bottom = "95px"; // Above WhatsApp
    floatingCall.innerHTML = '<i class="fa-solid fa-phone" style="color: #ffffff;"></i>';
    floatingCall.setAttribute('aria-label', 'Call Shama SofaHub');
    document.body.appendChild(floatingCall);

    // Move WhatsApp button up so they don't overlap
    const whatsappBtn = document.querySelector('.floating-whatsapp[href*="wa.me"]');
    if(whatsappBtn) whatsappBtn.style.bottom = "160px";
}

/* =====================================================
   15. PWA INSTALL + SERVICE WORKER
   WHAT IT DOES: Makes site installable + works offline
===================================================== */
function initPWA() {
    // 1. REGISTER SERVICE WORKER = Save site for offline
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }

    // 2. SHOW "INSTALL APP" BANNER
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const banner = document.createElement('div');
        banner.className = 'pwa-banner show';
        banner.innerHTML = `<span>Install Shama SofaHub App for faster access</span><button id="install-btn">Install</button>`;
        document.body.appendChild(banner);

        document.getElementById('install-btn').onclick = () => {
            deferredPrompt.prompt();
            banner.remove();
        }
    });
}