
(function($){
	"use strict";
	
	//Loader	
	$(window).on('load', function () {
		$('.Loader').delay(350).fadeOut('slow');
		$('body').delay(350).css({ 'overflow': 'visible' });
	})

    // Navigation
	! function(n, e, i, a) {
		n.navigation = function(t, s) {
			var o = {
					responsive: !0,
					mobileBreakpoint:992,
					showDuration: 300,
					hideDuration: 300,
					showDelayDuration: 0,
					hideDelayDuration: 0,
					submenuTrigger: "hover",
					effect: "fade",
					submenuIndicator: !0,
					hideSubWhenGoOut: !0,
					visibleSubmenusOnMobile: !1,
					fixed: !1,
					overlay: !0,
					overlayColor: "rgba(0, 0, 0, 0.5)",
					hidden: !1,
					offCanvasSide: "left",
					onInit: function() {},
					onShowOffCanvas: function() {},
					onHideOffCanvas: function() {}
				},
				u = this,
				r = Number.MAX_VALUE,
				d = 1,
				f = "click.nav touchstart.nav",
				l = "mouseenter.nav",
				c = "mouseleave.nav";
			u.settings = {};
			var t = (n(t), t);
			n(t).find(".nav-menus-wrapper").prepend("<span class='nav-menus-wrapper-close-button'>âœ•</span>"), n(t).find(".nav-search").length > 0 && n(t).find(".nav-search").find("form").prepend("<span class='nav-search-close-button'>âœ•</span>"), u.init = function() {
				u.settings = n.extend({}, o, s), "right" == u.settings.offCanvasSide && n(t).find(".nav-menus-wrapper").addClass("nav-menus-wrapper-right"), u.settings.hidden && (n(t).addClass("navigation-hidden"), u.settings.mobileBreakpoint = 99999), v(), u.settings.fixed && n(t).addClass("navigation-fixed"), n(t).find(".nav-toggle").on("click touchstart", function(n) {
					n.stopPropagation(), n.preventDefault(), u.showOffcanvas(), s !== a && u.callback("onShowOffCanvas")
				}), n(t).find(".nav-menus-wrapper-close-button").on("click touchstart", function() {
					u.hideOffcanvas(), s !== a && u.callback("onHideOffCanvas")
				}), n(t).find(".nav-search-button").on("click touchstart", function(n) {
					n.stopPropagation(), n.preventDefault(), u.toggleSearch()
				}), n(t).find(".nav-search-close-button").on("click touchstart", function() {
					u.toggleSearch()
				}), n(t).find(".megamenu-tabs").length > 0 && y(), n(e).resize(function() {
					m(), C()
				}), m(), s !== a && u.callback("onInit")
			};
			var v = function() {
				n(t).find("li").each(function() {
					n(this).children(".nav-dropdown,.megamenu-panel").length > 0 && (n(this).children(".nav-dropdown,.megamenu-panel").addClass("nav-submenu"), u.settings.submenuIndicator && n(this).children("a").append("<span class='submenu-indicator'><span class='submenu-indicator-chevron'></span></span>"))
				})
			};
			u.showSubmenu = function(e, i) {
				g() > u.settings.mobileBreakpoint && n(t).find(".nav-search").find("form").slideUp(), "fade" == i ? n(e).children(".nav-submenu").stop(!0, !0).delay(u.settings.showDelayDuration).fadeIn(u.settings.showDuration) : n(e).children(".nav-submenu").stop(!0, !0).delay(u.settings.showDelayDuration).slideDown(u.settings.showDuration), n(e).addClass("nav-submenu-open")
			}, u.hideSubmenu = function(e, i) {
				"fade" == i ? n(e).find(".nav-submenu").stop(!0, !0).delay(u.settings.hideDelayDuration).fadeOut(u.settings.hideDuration) : n(e).find(".nav-submenu").stop(!0, !0).delay(u.settings.hideDelayDuration).slideUp(u.settings.hideDuration), n(e).removeClass("nav-submenu-open").find(".nav-submenu-open").removeClass("nav-submenu-open")
			};
			var h = function() {
					n("body").addClass("no-scroll"), u.settings.overlay && (n(t).append("<div class='nav-overlay-panel'></div>"), n(t).find(".nav-overlay-panel").css("background-color", u.settings.overlayColor).fadeIn(300).on("click touchstart", function(n) {
						u.hideOffcanvas()
					}))
				},
				p = function() {
					n("body").removeClass("no-scroll"), u.settings.overlay && n(t).find(".nav-overlay-panel").fadeOut(400, function() {
						n(this).remove()
					})
				};
			u.showOffcanvas = function() {
				h(), "left" == u.settings.offCanvasSide ? n(t).find(".nav-menus-wrapper").css("transition-property", "left").addClass("nav-menus-wrapper-open") : n(t).find(".nav-menus-wrapper").css("transition-property", "right").addClass("nav-menus-wrapper-open")
			}, u.hideOffcanvas = function() {
				n(t).find(".nav-menus-wrapper").removeClass("nav-menus-wrapper-open").on("webkitTransitionEnd moztransitionend transitionend oTransitionEnd", function() {
					n(t).find(".nav-menus-wrapper").css("transition-property", "none").off()
				}), p()
			}, u.toggleOffcanvas = function() {
				g() <= u.settings.mobileBreakpoint && (n(t).find(".nav-menus-wrapper").hasClass("nav-menus-wrapper-open") ? (u.hideOffcanvas(), s !== a && u.callback("onHideOffCanvas")) : (u.showOffcanvas(), s !== a && u.callback("onShowOffCanvas")))
			}, u.toggleSearch = function() {
				"none" == n(t).find(".nav-search").find("form").css("display") ? (n(t).find(".nav-search").find("form").slideDown(), n(t).find(".nav-submenu").fadeOut(200)) : n(t).find(".nav-search").find("form").slideUp()
			};
			var m = function() {
					u.settings.responsive ? (g() <= u.settings.mobileBreakpoint && r > u.settings.mobileBreakpoint && (n(t).addClass("navigation-portrait").removeClass("navigation-landscape"), D()), g() > u.settings.mobileBreakpoint && d <= u.settings.mobileBreakpoint && (n(t).addClass("navigation-landscape").removeClass("navigation-portrait"), k(), p(), u.hideOffcanvas()), r = g(), d = g()) : k()
				},
				b = function() {
					n("body").on("click.body touchstart.body", function(e) {
						0 === n(e.target).closest(".navigation").length && (n(t).find(".nav-submenu").fadeOut(), n(t).find(".nav-submenu-open").removeClass("nav-submenu-open"), n(t).find(".nav-search").find("form").slideUp())
					})
				},
				g = function() {
					return e.innerWidth || i.documentElement.clientWidth || i.body.clientWidth
				},
				w = function() {
					n(t).find(".nav-menu").find("li, a").off(f).off(l).off(c)
				},
				C = function() {
					if (g() > u.settings.mobileBreakpoint) {
						var e = n(t).outerWidth(!0);
						n(t).find(".nav-menu").children("li").children(".nav-submenu").each(function() {
							n(this).parent().position().left + n(this).outerWidth() > e ? n(this).css("right", 0) : n(this).css("right", "auto")
						})
					}
				},
				y = function() {
					function e(e) {
						var i = n(e).children(".megamenu-tabs-nav").children("li"),
							a = n(e).children(".megamenu-tabs-pane");
						n(i).on("click.tabs touchstart.tabs", function(e) {
							e.stopPropagation(), e.preventDefault(), n(i).removeClass("active"), n(this).addClass("active"), n(a).hide(0).removeClass("active"), n(a[n(this).index()]).show(0).addClass("active")
						})
					}
					if (n(t).find(".megamenu-tabs").length > 0)
						for (var i = n(t).find(".megamenu-tabs"), a = 0; a < i.length; a++) e(i[a])
				},
				k = function() {
					w(), n(t).find(".nav-submenu").hide(0), navigator.userAgent.match(/Mobi/i) || navigator.maxTouchPoints > 0 || "click" == u.settings.submenuTrigger ? n(t).find(".nav-menu, .nav-dropdown").children("li").children("a").on(f, function(i) {
						if (u.hideSubmenu(n(this).parent("li").siblings("li"), u.settings.effect), n(this).closest(".nav-menu").siblings(".nav-menu").find(".nav-submenu").fadeOut(u.settings.hideDuration), n(this).siblings(".nav-submenu").length > 0) {
							if (i.stopPropagation(), i.preventDefault(), "none" == n(this).siblings(".nav-submenu").css("display")) return u.showSubmenu(n(this).parent("li"), u.settings.effect), C(), !1;
							if (u.hideSubmenu(n(this).parent("li"), u.settings.effect), "_blank" == n(this).attr("target") || "blank" == n(this).attr("target")) e.open(n(this).attr("href"));
							else {
								if ("#" == n(this).attr("href") || "" == n(this).attr("href")) return !1;
								e.location.href = n(this).attr("href")
							}
						}
					}) : n(t).find(".nav-menu").find("li").on(l, function() {
						u.showSubmenu(this, u.settings.effect), C()
					}).on(c, function() {
						u.hideSubmenu(this, u.settings.effect)
					}), u.settings.hideSubWhenGoOut && b()
				},
				D = function() {
					w(), n(t).find(".nav-submenu").hide(0), u.settings.visibleSubmenusOnMobile ? n(t).find(".nav-submenu").show(0) : (n(t).find(".nav-submenu").hide(0), n(t).find(".submenu-indicator").removeClass("submenu-indicator-up"), u.settings.submenuIndicator ? n(t).find(".submenu-indicator").on(f, function(e) {
						return e.stopPropagation(), e.preventDefault(), u.hideSubmenu(n(this).parent("a").parent("li").siblings("li"), "slide"), u.hideSubmenu(n(this).closest(".nav-menu").siblings(".nav-menu").children("li"), "slide"), "none" == n(this).parent("a").siblings(".nav-submenu").css("display") ? (n(this).addClass("submenu-indicator-up"), n(this).parent("a").parent("li").siblings("li").find(".submenu-indicator").removeClass("submenu-indicator-up"), n(this).closest(".nav-menu").siblings(".nav-menu").find(".submenu-indicator").removeClass("submenu-indicator-up"), u.showSubmenu(n(this).parent("a").parent("li"), "slide"), !1) : (n(this).parent("a").parent("li").find(".submenu-indicator").removeClass("submenu-indicator-up"), void u.hideSubmenu(n(this).parent("a").parent("li"), "slide"))
					}) : k())
				};
			u.callback = function(n) {
				s[n] !== a && s[n].call(t)
			}, u.init()
		}, n.fn.navigation = function(e) {
			return this.each(function() {
				if (a === n(this).data("navigation")) {
					var i = new n.navigation(this, e);
					n(this).data("navigation", i)
				}
			})
		}
	}
	(jQuery, window, document), $(document).ready(function() {
		$("#navigation").navigation()
	});
	
	// Count
	$(window).on('load', function() {
		$('.count-facts h4').counterUp({
			delay: 100,
			time: 800
		});
	});
	
	$(window).scroll(function() {    
		var scroll = $(window).scrollTop();

		if (scroll >= 50) {
			$(".header").addClass("header-fixed");
		} else {
			$(".header").removeClass("header-fixed");
		}
	});
	
	// Jobs
	$("#job-slide").owlCarousel({
		loop:true,
		autoplay:true,
		nav:false,
		dots:false,
		margin:0,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
				nav:false
			},
			600:{
				items:2,
				nav:false
			},
			1000:{
				items:3,
				nav:false,
				loop:false
			}
		}
	})
	
	// Jobs
	$("#testimonial-3-slide").owlCarousel({
		loop:true,
		autoplay:true,
		nav:false,
		dots:true,
		margin:0,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
				nav:false
			},
			600:{
				items:1,
				nav:false
			},
			1000:{
				items:1,
				nav:false,
				loop:false
			}
		}
	})
	
	// Jobs
	$("#agency-slide").owlCarousel({
		loop:true,
		autoplay:true,
		nav:false,
		dots:true,
		margin:0,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
				nav:false
			},
			600:{
				items:2,
				nav:false
			},
			1000:{
				items:3,
				nav:false,
				loop:false
			}
		}
	})
	
	// RL List
	$("#rl-list").owlCarousel({
		loop:true,
		autoplay:true,
		nav:false,
		dots:true,
		margin:0,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
				nav:false
			},
			600:{
				items:1,
				nav:false
			},
			1000:{
				items:2,
				nav:false,
				loop:false
			}
		}
	})
	
	
	// Testimonials 2
	$("#testimonials-two").owlCarousel({
		nav:true,
		dots:false,
		items: 1,
		center:false,
		loop: !0,
		navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
		responsive: {
			0: {items:1,
				stagePadding: 0,
				margin: 0
			},
			768: {items:2,
				stagePadding:0,
				margin:10
			},
			1025: {items:3,
				stagePadding:0,
				margin:10
			},
			1700: {items:3,
				stagePadding:0,
				margin:10
			}
		}
	})
	
	// Employers
	$("#brands").owlCarousel({
		loop:true,
		autoplay:true,
		nav:false,
		dots:false,
		margin:0,
		responsiveClass:true,
		responsive:{
			0:{
				items:2,
				nav:false
			},
			600:{
				items:3,
				nav:false
			},
			1000:{
				items:5,
				nav:false,
				loop:false
			}
		}
	})
	
	// All Select Category
	$('#category').select2({
		placeholder: "Choose Category...",
		allowClear: true
	});
	
	// All Select Category
	$('#category-side').select2({
		placeholder: "Choose Category...",
		allowClear: true
	});
	
	// All Select Category
	$('#category-2').select2({
		placeholder: "Choose Category...",
		allowClear: true
	});
	
	// Filter Sidebar Category
	$('#category-3').select2({
		placeholder: "Choose Category...",
		allowClear: true
	});
	
	// All Search
	$('#search-allow').select2({
		placeholder: "Search Allow",
		allowClear: true
	});
	
	// Job type
	$('#jb-type').select2({
		placeholder: "Job type",
		allowClear: true
	});
	
	// Career  Lavel
	$('#career-lavel').select2({
		placeholder: "Career Level",
		allowClear: true
	});
	
	// Offerd Salary
	$('#offerd-sallery').select2({
		placeholder: "Offerd Salary",
		allowClear: true
	});
	
	// SignUp As
	$('#signup-as').select2({
		placeholder: "Sign Up As",
		allowClear: true
	});
	
	// Experience
	$('#experience').select2({
		placeholder: "Please Select",
		allowClear: true
	});
	
	// Gender
	$('#gender').select2({
		placeholder: "Please Select",
		allowClear: true
	});	
	
	// Industry
	$('#industry').select2({
		placeholder: "Please Select",
		allowClear: true
	});	
	
	// Qualification
	$('#qualification').select2({
		placeholder: "Please Select",
		allowClear: true
	});	
	
	
	// Business Type
	$('#business-type').select2({
		placeholder: "Search Allow",
		allowClear: true
	});
	
	// Search Page Tag & Skill 
	$(".tag-skill").select2({
	  tags: true
	});
	
	// Specialisms 
	$("#specialisms").select2({
		placeholder: "Specialisms"
	});

	// Editor 
	$('#summernote').summernote({
		height: 150
	});
	
	// Editor 
	$('#resume-info').summernote({
		height: 120
	});
	
	// Job Description
	$('#jb-description').summernote({
		height: 150
	});
	
	// CV 
	$('#cv-cover').summernote({
		height: 150
	});
	
	// File upload
	$(".custom-file-input").on("change", function() {
	  var fileName = $(this).val().split("\\").pop();
	  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
	});
	
	/****----- Counter ---------*/
	$('.count').on('each', function () {
		$(this).prop('Counter',0).animate({
			Counter: $(this).text()
		}, {
			duration: 4000,
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
		});
	});
	
	
})(jQuery);