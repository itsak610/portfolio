document.getElementsByClassName('one')[0].scrollIntoView()
var preloader = document.querySelector("#preloader");
var loader = document.querySelector("#loader");

function hideit() {
    preloader.style.display = 'none'
}

function loadFunction() {
    preloader.className += " hidden";
}

function outroFunction() {
    preloader.className += " outro"
}

setTimeout(function() {
    var loader = document.querySelector('#preloader');
    loader.classList.add('fade-out-scale-down');
    document.getElementsByClassName('hidden-content')[0].style.display = 'block'
}, 6000);

window.addEventListener("load", function() {
    setTimeout(outroFunction, 10000);
    setTimeout(loadFunction, 10000);
    setTimeout(hideit, 10000);

});
// CURSOR
var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),

    init: function() {
        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;

        this.setupEventListeners();
        this.animateDotOutline();
    },

    //     updateCursor: function(e) {
    //         var self = this;

    //         console.log(e)

    //         // Show the cursor
    //         self.cursorVisible = true;
    //         self.toggleCursorVisibility();

    //         // Position the dot
    //         self.endX = e.pageX;
    //         self.endY = e.pageY;
    //         self.$dot.style.top = self.endY + 'px';
    //         self.$dot.style.left = self.endX + 'px';
    //     },

    setupEventListeners: function() {
        var self = this;

        // Anchor hovering
        document.querySelectorAll('.icon,a,.open-overlay').forEach(function(el) {
            el.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
                self.$dot.style.opacity = 0;
            });
            el.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
                self.$dot.style.opacity = 1;
            });
        });

        // Click events
        document.addEventListener('mousedown', function() {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function() {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });


        document.addEventListener('mousemove', function(e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + 'px';
            self.$dot.style.left = self.endX + 'px';
        });

        // Hide/show cursor
        document.addEventListener('mouseenter', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        });

        document.addEventListener('mouseleave', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        });
    },

    animateDotOutline: function() {
        var self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';

        requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function() {
        var self = this;

        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorVisibility: function() {
        var self = this;

        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    },
    toggleDotVisibility: function() {
        var self = this;

        if (self.cursorVisible) {
            self.$dot.style.opacity = 0;
        } else {
            self.$dot.style.opacity = 1;
        }
    }
}

cursor.init();
// NAV
$('.open-overlay').click(function() {
    $('.open-overlay').css('pointer-events', 'none');
    var overlay_navigation = $('.overlay-navigation'),
        top_bar = $('.bar-top'),
        middle_bar = $('.bar-middle'),
        bottom_bar = $('.bar-bottom');

    overlay_navigation.toggleClass('overlay-active');
    if (overlay_navigation.hasClass('overlay-active')) {

        top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar');
        middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar');
        bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar');
        overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down')
        overlay_navigation.velocity('transition.slideLeftIn', {
            duration: 300,
            delay: 0,
            begin: function() {
                $('nav ul li').velocity('transition.perspectiveLeftIn', {
                    stagger: 150,
                    delay: 0,
                    complete: function() {
                        $('nav ul li a').velocity({
                            opacity: [1, 0],
                        }, {
                            delay: 10,
                            duration: 140
                        });
                        $('.open-overlay').css('pointer-events', 'auto');
                    }
                })
            }
        })

    } else {
        $('.open-overlay').css('pointer-events', 'none');
        top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
        middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
        bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
        overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
        $('nav ul li').velocity('transition.perspectiveRightOut', {
            stagger: 150,
            delay: 0,
            complete: function() {
                overlay_navigation.velocity('transition.fadeOut', {
                    delay: 0,
                    duration: 300,
                    complete: function() {
                        $('nav ul li a').velocity({
                            opacity: [0, 1],
                        }, {
                            delay: 0,
                            duration: 50
                        });
                        $('.open-overlay').css('pointer-events', 'auto');
                    }
                });
            }
        })
    }
})

$('.overlay-navigation ul li a').click(function() {
    $('.open-overlay').css('pointer-events', 'none');
    var overlay_navigation = $('.overlay-navigation'),
        top_bar = $('.bar-top'),
        middle_bar = $('.bar-middle'),
        bottom_bar = $('.bar-bottom');

    overlay_navigation.toggleClass('overlay-active');
    if (overlay_navigation.hasClass('overlay-active')) {

        top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar');
        middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar');
        bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar');
        overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down')
        overlay_navigation.velocity('transition.slideLeftIn', {
            duration: 300,
            delay: 0,
            begin: function() {
                $('nav ul li').velocity('transition.perspectiveLeftIn', {
                    stagger: 150,
                    delay: 0,
                    complete: function() {
                        $('nav ul li a').velocity({
                            opacity: [1, 0],
                        }, {
                            delay: 10,
                            duration: 140
                        });
                        $('.open-overlay').css('pointer-events', 'auto');
                    }
                })
            }
        })

    } else {
        $('.open-overlay').css('pointer-events', 'none');
        top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
        middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
        bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
        overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
        $('nav ul li').velocity('transition.perspectiveRightOut', {
            stagger: 150,
            delay: 0,
            complete: function() {
                overlay_navigation.velocity('transition.fadeOut', {
                    delay: 0,
                    duration: 300,
                    complete: function() {
                        $('nav ul li a').velocity({
                            opacity: [0, 1],
                        }, {
                            delay: 0,
                            duration: 50
                        });
                        $('.open-overlay').css('pointer-events', 'auto');
                    }
                });
            }
        })
    }
})

for (let i = 1; i <= 9; i++) {
    $(`.icon${i}`).click(function() {
        $('.activeicon').toggleClass('activeicon');
        $(`.icon${i}`).toggleClass('activeicon');
        $('.activecontent').toggleClass('activecontent');
        $(`.content${i}`).toggleClass('activecontent');

        if (i === 1) {
            $('.content1').css('opacity', '1');
        }
    });
}

function hideOtherLists(activeItem) {
    $('.listcontainer').not(activeItem).each(function() {
        $(this).closest('li').removeClass('active');
        $(this).closest('li').find('.listcontainer').addClass('inactivelist');
    });
}

for (let i = 1; i <= 5; i++) {
    $(`.listitem${i}`).click(function() {
        const $item = $(`.item${i}`);

        if ($item.hasClass('inactivelist')) {
            hideOtherLists($item);
            $item.closest('li').addClass('active');
            $item.removeClass('inactivelist');
        } else {
            $item.closest('li').removeClass('active');
            $item.addClass('inactivelist');
        }
    });
}






const unis = document.querySelectorAll("[id^='uni-']");
const four = document.querySelector(".four");

unis.forEach(uni => {
    uni.addEventListener("mouseenter", function() {
        const image = this.getAttribute("data-image");
        four.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image}) center/cover no-repeat`;
    });

    uni.addEventListener("mouseleave", function() {
        four.style.background = "none";
    });
});

VanillaTilt.init(document.querySelectorAll(".image-card"), {
    max: 25,
    speed: 400,
    easing: "cubic-bezier(.05,.80,.60,.99)",
    perspective: 500,
    transition: true
});
const pages = document.querySelectorAll('.page');
const overlayNavigation = document.querySelector('.overlay-navigation');
const navLinks = overlayNavigation.querySelectorAll('a');

// Function to update URL based on scroll position
function updateURL() {
    pages.forEach((page, index) => {
        const rect = page.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            const id = page.getAttribute('id');
            history.replaceState({}, '', id);
        }
    });
}

// Event listener for scroll
window.addEventListener('scroll', updateURL);

// Attach event listeners to navigation links
navLinks.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const targetPage = pages[index];
        targetPage.scrollIntoView();
        history.replaceState({}, '', targetPage.getAttribute('id'));
        overlayNavigation.classList.remove('active'); // Close overlay
    });
});

function handleDirectURLAccess() {
    const targetSectionId = window.location.hash.substring(1);
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
        targetSection.scrollIntoView();
    }
}

// Event listener for initial page load
window.addEventListener('load', () => {
    handleDirectURLAccess();
    updateURL(); // Update URL on initial load
});