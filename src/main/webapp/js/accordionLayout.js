(function(i,s,o,g,r,a,m){
    i['GoogleAnalyticsObject']=r;
    i[r] = i[r] || function(){
        (i[r].q=i[r].q||[]).push(arguments)
    };
    i[r].l = 1*new Date();
    a=s.createElement(o),m=s.getElementsByTagName(o)[0];
    a.async=1;
    a.src=g;
    m.parentNode.insertBefore(a,m);
})
(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-69051795-1', 'auto');
ga('send', 'pageview');
$(document).ready(function($) {
   $('#accordion').find('.accordion-toggle').click(function(){
       //Expand or collapse this panel
       $(this).next().slideToggle("fast");
       //Hide the other panels
       $(".accordion-content").not($(this).next()).slideUp('fast');
       $(".text").toggle(50);
   });
   $('#accordion').find('.accordion-toggle1').click(function(){
       //Expand or collapse this panel
       $(this).next().slideToggle("fast");
       //Hide the other panels
       $(".accordion-content").not($(this).next()).slideUp('fast');
       $(".text1").toggle(50);
   });
   $('#accordion').find('.accordion-toggle2').click(function(){
       //Expand or collapse this panel
       $(this).next().slideToggle("fast");
       //Hide the other panels
       $(".accordion-content").not($(this).next()).slideUp('fast');
       $(".text2").toggle(50);
   });
   $('#accordion').find('.accordion-toggle3').click(function(){
       //Expand or collapse this panel
       $(this).next().slideToggle("fast");
       //Hide the other panels
       $(".accordion-content").not($(this).next()).slideUp('fast');
       $(".text3").toggle(50);
   });
   $('#accordion').find('.accordion-toggle4').click(function(){
       //Expand or collapse this panel
       $(this).next().slideToggle("fast");
       //Hide the other panels
       $(".accordion-content").not($(this).next()).slideUp('fast');
       $(".text4").toggle(50);
   });
   $('#accordion').find('.accordion-toggle5').click(function(){
       //Expand or collapse this panel
       $(this).next().slideToggle("fast");
       //Hide the other panels
       $(".accordion-content").not($(this).next()).slideUp('fast');
       $(".text5").toggle(50);
   });
});

