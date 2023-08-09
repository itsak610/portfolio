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

$('.icon1').click(function() {
    $('.activeicon').toggleClass('activeicon');
    $('.icon1').toggleClass('activeicon');
    $('.activecontent').toggleClass('activecontent');
    $('.content1').toggleClass('activecontent');
    $('.content1').style.opacity = '1';
})

$('.icon2').click(function() {
    $('.activeicon').toggleClass('activeicon');
    $('.icon2').toggleClass('activeicon');
    $('.activecontent').toggleClass('activecontent');
    $('.content2').toggleClass('activecontent');
})

$('.icon3').click(function() {
    $('.activeicon').toggleClass('activeicon');
    $('.icon3').toggleClass('activeicon');
    $('.activecontent').toggleClass('activecontent');
    $('.content3').toggleClass('activecontent');
})

$('.icon4').click(function() {
    $('.activeicon').toggleClass('activeicon');
    $('.icon4').toggleClass('activeicon');
    $('.activecontent').toggleClass('activecontent');
    $('.content4').toggleClass('activecontent');
})

$('.icon5').click(function() {
    $('.activeicon').toggleClass('activeicon');
    $('.icon5').toggleClass('activeicon');
    $('.activecontent').toggleClass('activecontent');
    $('.content5').toggleClass('activecontent');
})

$('.icon6').click(function() {
    $('.activeicon').toggleClass('activeicon');
    $('.icon6').toggleClass('activeicon');
    $('.activecontent').toggleClass('activecontent');
    $('.content6').toggleClass('activecontent');
})

$('.icon7').click(function() {
    $('.activeicon').toggleClass('activeicon');
    $('.icon7').toggleClass('activeicon');
    $('.activecontent').toggleClass('activecontent');
    $('.content7').toggleClass('activecontent');
})

$('.icon8').click(function() {
    $('.activeicon').toggleClass('activeicon');
    $('.icon8').toggleClass('activeicon');
    $('.activecontent').toggleClass('activecontent');
    $('.content8').toggleClass('activecontent');
})

$('.icon9').click(function() {
    $('.activeicon').toggleClass('activeicon');
    $('.icon9').toggleClass('activeicon');
    $('.activecontent').toggleClass('activecontent');
    $('.content9').toggleClass('activecontent');
})