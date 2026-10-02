/* =========================================================
   GYA ZAHRA AURILIA
   PORTFOLIO WEBSITE
   SCRIPT.JS
========================================================= */


/* =========================================================
   1. PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* =========================================================
   2. ELEMENTS
========================================================= */

const navbar = document.getElementById("navbar");

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section[id]");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const portfolioItems =
    document.querySelectorAll(".portfolio-item");

const lightbox =
    document.getElementById("lightbox");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxImg =
    document.getElementById("lightboxImg");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxDescription =
    document.getElementById("lightboxDescription");


/* =========================================================
   3. NAVBAR SCROLL EFFECT
========================================================= */

function handleNavbar() {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleNavbar,
    { passive: true }
);

handleNavbar();


/* =========================================================
   4. MOBILE MENU
========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.toggle("open");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            document.body.classList.toggle(
                "no-scroll",
                isOpen
            );

        }
    );


    /*
       Tutup menu ketika link diklik
    */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove("open");

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

            }
        );

    });


    /*
       Tutup menu ketika klik di luar
    */

    document.addEventListener(
        "click",
        (event) => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                navMenu.classList.remove("open");

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

            }

        }
    );

}


/* =========================================================
   5. ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 200;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

            });


            const activeLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );


            if (activeLink) {

                activeLink.classList.add(
                    "active"
                );

            }

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================================================
   6. PORTFOLIO FILTER
========================================================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            /*
               Hapus active dari semua button
            */

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            /*
               Aktifkan button yang dipilih
            */

            button.classList.add("active");


            const filter =
                button.dataset.filter;


            /*
               Filter portfolio
            */

            portfolioItems.forEach(item => {

                const category =
                    item.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.classList.remove(
                        "hidden"
                    );

                    /*
                       Animasi masuk
                    */

                    item.style.opacity = "0";

                    item.style.transform =
                        "translateY(15px)";


                    requestAnimationFrame(() => {

                        requestAnimationFrame(() => {

                            item.style.opacity = "1";

                            item.style.transform =
                                "translateY(0)";

                        });

                    });

                } else {

                    item.classList.add(
                        "hidden"
                    );

                }

            });

        }
    );

});


/* =========================================================
   7. PORTFOLIO LIGHTBOX
========================================================= */

portfolioItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const image =
                item.querySelector("img");

            const category =
                item.querySelector(
                    ".portfolio-overlay span"
                );

            const title =
                item.querySelector(
                    ".portfolio-overlay h3"
                );


            if (!image || !title) {
                return;
            }


            /*
               Ambil informasi portfolio
            */

            const imageSrc =
                image.getAttribute("src");

            const imageAlt =
                image.getAttribute("alt");


            /*
               Masukkan ke lightbox
            */

            lightboxImg.src =
                imageSrc;

            lightboxImg.alt =
                imageAlt;


            lightboxCategory.textContent =
                category
                    ? category.textContent
                    : "Portfolio";


            lightboxTitle.textContent =
                title.textContent;


            lightboxDescription.textContent =
                `A selected ${category ? category.textContent.toLowerCase() : "culinary"} work by Gya Zahra Aurilia.`;


            /*
               Buka lightbox
            */

            lightbox.classList.add("open");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "no-scroll"
            );

        }
    );

});


/* =========================================================
   8. CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


/*
   Klik area luar gambar
*/

if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/*
   Tombol ESC
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("open")
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   9. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "show"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(
        element
    );

});


/*
   Karena beberapa elemen HTML kita
   tidak menggunakan class reveal,
   tambahkan animasi ringan otomatis.
*/

const animatedSections =
    document.querySelectorAll(
        ".skill-card, .experience-item"
    );


const cardObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "show"
                    );

                    cardObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


animatedSections.forEach(
    (element, index) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(20px)";

        element.style.transition =
            `opacity 0.7s ease ${index * 0.05}s,
             transform 0.7s cubic-bezier(.22,1,.36,1) ${index * 0.05}s`;

        cardObserver.observe(
            element
        );

    }
);


/* =========================================================
   10. CARD SHOW STATE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
           Tambahkan class show
           ketika observer berhasil
        */

        const style =
            document.createElement("style");

        style.textContent = `

            .skill-card.show,
            .experience-item.show {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

        `;

        document.head.appendChild(
            style
        );

    }
);


/* =========================================================
   11. SMOOTH SCROLL
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


const navbarHeight =
    navbar ? navbar.offsetHeight : 0;

const targetPosition =
    target.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight -
    55;

window.scrollTo({

    top: targetPosition,

    behavior: "smooth"

});

        }
    );

});


/* =========================================================
   12. HERO IMAGE PARALLAX
========================================================= */

const heroImage =
    document.querySelector(
        ".hero-image img"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            !heroImage ||
            window.innerWidth < 701
        ) {

            return;

        }


        const scroll =
            window.scrollY;


        /*
           Batasi efek agar tidak terlalu jauh
        */

        const movement =
            Math.min(
                scroll * 0.08,
                35
            );


        heroImage.style.transform =
            `scale(1.02) translateY(${movement}px)`;

    },
    { passive: true }
);


/* =========================================================
   13. HOVER IMAGE TILT
========================================================= */

const interactiveImages =
    document.querySelectorAll(
        ".portfolio-image, .hero-image"
    );


interactiveImages.forEach(image => {

    image.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 900
            ) {

                return;

            }


            const rect =
                image.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) *
                -2;


            const rotateY =
                ((x - centerX) /
                    centerX) *
                2;


            image.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    image.addEventListener(
        "mouseleave",
        () => {

            image.style.transform =
                "perspective(900px) rotateX(0) rotateY(0)";

        }
    );

});


/* =========================================================
   14. CONTACT LINK INTERACTION
========================================================= */

const contactLinks =
    document.querySelectorAll(
        ".contact-links a"
    );


contactLinks.forEach(link => {

    link.addEventListener(
        "mouseenter",
        () => {

            link.style.setProperty(
                "--contact-hover",
                "1"
            );

        }
    );


    link.addEventListener(
        "mouseleave",
        () => {

            link.style.setProperty(
                "--contact-hover",
                "0"
            );

        }
    );

});


/* =========================================================
   15. PREVENT BROKEN IMAGE LOOK
========================================================= */

const allImages =
    document.querySelectorAll(
        "img"
    );


allImages.forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.style.display =
                "none";

            const placeholder =
                image.parentElement.querySelector(
                    ".image-placeholder"
                );


            if (placeholder) {

                placeholder.style.opacity =
                    "1";

            }

        }
    );

});


/* =========================================================
   16. INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
           Pastikan halaman dimulai
           dari posisi paling atas
        */

        if (
            window.location.hash === ""
        ) {

            window.scrollTo(
                0,
                0
            );

        }

    }
);

/* =========================================================
   17. FINAL NAVIGATION POSITION FIX
   Menyesuaikan posisi section setelah smooth scroll
========================================================= */

document.querySelectorAll(
    '.nav-link[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        () => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            /*
               Beri waktu kepada smooth scroll
               yang sudah ada untuk berjalan.
            */

            setTimeout(() => {

                const navbarHeight =
                    navbar
                        ? navbar.getBoundingClientRect().height
                        : 0;

                const extraSpace = 50;

                const finalPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight -
                    extraSpace;

                window.scrollTo({
                    top: finalPosition,
                    behavior: "smooth"
                });

            }, 450);

        }
    );

});