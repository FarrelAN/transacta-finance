var appName = 'Ezcode - Finance';
var storeUrl = '';
var date = '2023-07-21';
var linkBuy = 'https://rb.gy/9j75q';
var linkFacebook = 'https://www.facebook.com/invoker.lab';
var linkTele = 'https://t.me/brightkieu';
var linkDesign = '';
var linkBannerLeftSide = '';
var linkBannerRightSide = '';
var linkBannerFooter = '';

function onIndexLoad() {
  document.title = appName;
  document.getElementById('storeUrl').href = storeUrl;
}

function onLinkBuyLoad() {
  document.getElementById('link-buy').href = linkBuy;
}

function onLinkFacebook() {
  document.getElementById('link-facebook').href = linkFacebook;
}
function onLinkTele() {
  document.getElementById('link-tele').href = linkTele;
}

function onLinkDesign() {
  document.getElementById('link-design').href = linkDesign;
}

function onBannerSide() {
  document.getElementById('link-banner-side').href = linkBannerLeftSide;
}

function onBannerSideRight() {
  document.getElementById('link-banner-side-right').href = linkBannerRightSide;
}

function onBannerFooter() {
  document.getElementById('link-banner-footer').href = linkBannerFooter;
}

function onPolicyLoad() {
  document.title = appName + ' ' + 'Privacy Policy';
  getData();
}

function onTermLoad() {
  document.getElementById('appName2').innerHTML = appName;
  document.title = appName + ' ' + 'Terms and Conditions';
  getData();
}

function getData() {
  document.getElementById('appName').innerHTML = appName;
  document.getElementById('date').innerHTML = date;
}
