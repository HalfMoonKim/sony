// html 을 렌더링할때 실행
$(document).ready(function () {
    // modal close
    $('.modal').click(function () {
        $(this).fadeOut();
    });

    $(window).scroll(function () {
        let scY = $(window).scrollTop();
        let go_top = $('.go-top')
        if (scY >= 400) {
            go_top.addClass('go-top-active');
        } else {
            go_top.removeClass('go-top-active');
        }

        // Sony Site Close
        if (sony_site.hasClass('sony-site-active')) {
            sony_site.stop().removeClass('sony-site-active');
            sony_site.attr('site-open', 'hide');
            site.removeAttr('style');
        }
    });

    // Go Top
    $('.go-top').click(function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
    });

    //  Sub-Menu
    const menu = $('.menu-list > li:nth-child(2) > a');
    const depth2 = $('.depth2');
    let depth2_timer;

    menu.mouseenter(function () {
        clearTimeout(depth2_timer);
        depth2.stop().slideDown(400);
    });

    menu.mouseleave(function () {
        depth2_timer = setTimeout(depth2Out, 50);
    });

    depth2.mouseenter(function () {
        clearTimeout(depth2_timer);
    });

    depth2.mouseleave(function () {
        depth2_timer = setTimeout(depth2Out, 50);
    });

    function depth2Out() {
        depth2.stop().slideUp(400);
    }

    // Sony Site
    const site = $('.site');
    const sony_site = $('.sony-site');
    const sony_site_bt = $('.sony-site-bt');

    sony_site.attr('site-open', 'hide');

    site.click(function (event) {
        event.preventDefault();
        let temp = sony_site.attr('site-open');
        if (temp == 'hide') {
            sony_site.stop().addClass('sony-site-active');
            sony_site.attr('site-open', 'show');
            $(this).css({
                background: '#504d56',
                border: '2px solid #5d58f5',
            });
        } else {
            sony_site.stop().removeClass('sony-site-active');
            sony_site.attr('site-open', 'hide');
            $(this).removeAttr('style')
        }
    });

    sony_site_bt.click(function (event) {
        event.preventDefault();
        sony_site.stop().removeClass('sony-site-active');
        sony_site.attr('site-open', 'hide');
        site.removeAttr('style')
    });

    // Prod-Search
    const search = $('.search');
    const icon_up_dir = $('.icon-up-dir');
    const search_wrap = $('.search-wrap');
    const search_txt = $('#search-txt');
    const form_cancel = $('.form-cancel');

    search_wrap.attr('open-state', 'hide');

    search_wrap.click(function (event) {
        event.stopPropagation();
    });

    search.click(function (event) {
        event.stopPropagation();
        let temp = search_wrap.attr('open-state');
        if (temp == 'hide') {
            icon_up_dir.stop().fadeIn(100);
            search_wrap.stop().slideDown();
            search_wrap.attr('open-state', 'show');
            $(this).css('background', '#5d58f4');
        } else {
            icon_up_dir.stop().fadeOut(100);
            search_wrap.stop().fadeOut(100);
            search_wrap.attr('open-state', 'hide');
            $(this).removeAttr('style')
        }
    });

    $('body').click(function () {
        icon_up_dir.stop().fadeOut(100);
        search_wrap.stop().fadeOut(100);
        search_wrap.attr('open-state', 'hide');
        search.removeAttr('style')
    });

    search_txt.keyup(function () {
        let temp = $(this).val();
        if (temp == '') {
            form_cancel.hide();
        } else {
            form_cancel.show();
        }
    });
    form_cancel.click(function () {
        search_txt.val('');
        $(this).hide();
    });

    // Latest Slide
    let sw_latest = new Swiper('.sw-latest', {
        slidesPerView: "auto",
        // spaceBetween: 25,
        slidesPerGroup: 3,
        pagination: {
            el: '.sw-latest-pg',
            clickable: true,
        },
        navigation: {
            prevEl: '.sw-latest-prev',
            nextEl: '.sw-latest-next',
        },
        on: {
            slideChange: function () {}
        },
    });

    // 버튼 보이고, 숨기기
    $('.sw-latest').mouseenter(function () {
        $('.sw-latest-prev').stop().fadeIn(300);
        $('.sw-latest-next').stop().fadeIn(300);
    });
    $('.sw-latest').mouseleave(function () {
        $('.sw-latest-prev').stop().fadeOut(300);
        $('.sw-latest-next').stop().fadeOut(300);
    });

    // heart 관련
    $('.hot-box-img .icon-heart').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('icon-heart-active');
    });

    // 뉴스 슬라이더
    let sw_news = new Swiper('.sw-news', {
        slidesPerView: 3,
        spaceBetween: 52,
        allowTouchMove: false,
        // touchRatio: 0,
    });

    // 더보기 버튼
    const addon_bt = $('.addon-bt');
    const addon_main = $('.addon-main');
    const addon_bt_icon = addon_bt.find('>i');

    addon_bt.click(function () {
        addon_main.slideToggle();
        addon_bt_icon.toggleClass('icon-up-micro');
        addon_bt_icon.toggleClass('icon-down-micro');
    });

    // SNS
    const sns_box = $('.sns-box');
    const sns_cont = $('.sns-cont');
    const sns_atag = $('.footer-sns a');
    const sns_box_close = $('.sns-box-close');
    const sns_stx = 240; // 최초 sns-box의 위치
    const sns_space = 40; // 아이콘 오버시 sns-box 간의 간격
    const sns_box_attr = 'data-sns'; // 오버시 보여줄 대상 attr
    const sns_atag_total = sns_atag.length;

    let sns_pos_arr = [];
    for (let i = 0; i < sns_atag_total; i++) {
        sns_pos_arr[i] = sns_stx + (sns_space * i);
    }

    // 보여야할 sns-cont 저장
    let sns_cont_box;

    function snsPos(_who, _num) {
        sns_cont.hide();

        let box = _who.attr(sns_box_attr);
        sns_cont_box = $(box);
        sns_cont_box.show();

        sns_box.css({
            left: _num
        });
        sns_box.stop().fadeIn();
    }

    sns_box_close.click(function () {
        // sns_cont.hide();
        sns_box.stop().fadeOut(500);
    });

    sns_box.mouseenter(function () {
        sns_cont.hide();
        sns_cont_box.show();
        $(this).show();
    });
    sns_box.mouseleave(function () {
        $(this).hide();
    });

    function snsHide() {
        sns_cont.hide();
        sns_box.hide();
    }

    $.each(sns_atag, function (index, item) {
        $(this).mouseenter(function () {
            snsPos($(this), sns_pos_arr[index]);
        });

        $(this).mouseleave(function () {
            snsHide();
        });
    });
});

// image, video, audio 등 리소스를 불러들였을 때 실행 
window.onload = function () {};