import { createGlobalStyle } from "styled-components";
import lessToJs from "less-vars-to-js";
import paletteLess from "../../assets/antd-custom.less";

function toCamelCase(str) {
    return str
        .toLowerCase()
        .replace(/[-_]+/g, " ")
        .replace(/[^\w\s]/g, "")
        .replace(/ (.)/g, function($1) {
            return $1.toUpperCase();
        })
        .replace(/ /g, "");
}

const objectToCamelCase = origObj => {
    return Object.keys(origObj).reduce(function(newObj, key) {
        let val = origObj[key];
        let newVal = typeof val === "object" ? objectToCamelCase(val) : val;
        newObj[toCamelCase(key)] = newVal;
        return newObj;
    }, {});
};

const lessVariables = lessToJs(paletteLess, {
        resolveVariables: true,
        stripPrefix: true
    }),
    camelCasedVariables = objectToCamelCase(lessVariables),
    theme = {
        ...camelCasedVariables
    };

const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: inherit;
  }

  #__next > .ant-spin-nested-loading > .ant-spin-blur:after {
    opacity: .8;
  }

  html {
    box-sizing: border-box;
    font-size: 14px;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  body {
    background-color: ${theme.backgroundColor};
    -ms-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering:optimizeLegibility;
  }

  #nprogress .bar {
    background: ${theme.primaryColor};
  }
  #nprogress .peg {
    box-shadow: 0 0 10px ${theme.primaryColor}, 0 0 5px ${theme.primaryColor};
  }
  #nprogress .spinner-icon {
    border-top-color: ${theme.primaryColor};
    border-left-color: ${theme.primaryColor};
  }

  .weakColor{
    -webkit-filter:invert(80%);
    filter:invert(80%)
  }

  .weakColor img {
    -webkit-filter:invert(100%);
    filter:invert(100%)
  }

  a:hover {
    text-decoration: none;
  }

  svg {
    overflow: hidden;
    vertical-align: middle;
  }
  .brand {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    font-size: 1.25rem;
    white-space: nowrap;
    color: ${theme.primaryColor};
    justify-content: center;
  }
  .brand > svg {
    fill: ${theme.primaryColor};
  }
  .anticon {
    vertical-align: middle
  }

  b, strong {
    font-weight: 600;
  }

  h1, h2, h3, h4, h5, h6,
  .h1, .h2, .h3, .h4, .h5, .h6 {
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.2;
  }

  h1, .h1 {
    font-size: 2.5rem;
  }

  h2, .h2 {
    font-size: 2rem;
  }

  h3, .h3 {
    font-size: 1.75rem;
  }

  h4, .h4 {
    font-size: 1.5rem;
  }

  h5, .h5 {
    font-size: 1.25rem;
  }

  h6, .h6 {
    font-size: 1rem;
  }

  .clearfix::after {
  display: block;
  clear: both;
  content: "";
}

  .list-unstyled {
    padding-left: 0;
    list-style: none;
  }

  .overflow-hidden {
    overflow: hidden;
  }

  .scroll-y {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .scroll-x {
    overflow-x: auto!important;
  }

  .fill-workspace {
    height: calc(100vh - 105px);
  }

  .full-workspace {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:0;
    overflow: hidden;
  }

  .bg-primary {
    background-color: ${theme.primaryColor} !important;
  }

  .bg-normal {
    background-color: ${theme.normalColor} !important;
  }

  .bg-success {
    background-color: ${theme.successColor} !important;
  }

  .bg-info {
    background-color: ${theme.infoColor} !important;
  }

  .bg-warning {
    background-color: ${theme.warningColor} !important;
  }

  .bg-error {
    background-color: ${theme.errorColor} !important;
  }

  .bg-dark {
    background-color: ${theme.darkColor} !important;
  }

  .bg-white {
    background-color: #fff !important;
  }

  .bg-transparent {
    background-color: transparent !important;
  }

  .border {
    border: 1px solid ${theme.borderColorBase} !important;
  }

  .border-top {
    border-top: 1px solid ${theme.borderColorBase} !important;
  }

  .border-right {
    border-right: 1px solid ${theme.borderColorBase} !important;
  }

  .border-bottom {
    border-bottom: 1px solid ${theme.borderColorBase} !important;
  }

  .border-left {
    border-left: 1px solid ${theme.borderColorBase} !important;
  }

  .border-0 {
    border: 0 !important;
  }

  .border-top-0 {
    border-top: 0 !important;
  }

  .border-right-0 {
    border-right: 0 !important;
  }

  .border-bottom-0 {
    border-bottom: 0 !important;
  }

  .border-left-0 {
    border-left: 0 !important;
  }

  .border-primary {
    border-color: ${theme.primaryColor} !important;
  }

  .border-normal {
    border-color: ${theme.normalColor} !important;
  }

  .border-success {
    border-color: ${theme.successColor} !important;
  }

  .border-info {
    border-color: ${theme.infoColor} !important;
  }

  .border-warning {
    border-color: ${theme.warningColor} !important;
  }

  .border-error {
    border-color: ${theme.errorColor} !important;
  }

  .border-white {
    border-color: #fff !important;
  }

  .rounded {
    border-radius: ${theme.borderRadiusBase} !important;
  }

  .rounded-top {
    border-top-left-radius: ${theme.borderRadiusBase} !important;
    border-top-right-radius: ${theme.borderRadiusBase} !important;
  }

  .rounded-right {
    border-top-right-radius: ${theme.borderRadiusBase} !important;
    border-bottom-right-radius: ${theme.borderRadiusBase} !important;
  }

  .rounded-bottom {
    border-bottom-right-radius: ${theme.borderRadiusBase} !important;
    border-bottom-left-radius: ${theme.borderRadiusBase} !important;
  }

  .rounded-left {
    border-top-left-radius: ${theme.borderRadiusBase} !important;
    border-bottom-left-radius: ${theme.borderRadiusBase} !important;
  }

  .rounded-circle {
    border-radius: 50% !important;
  }

  .rounded-0 {
    border-radius: 0 !important;
  }

  .shadow-sm {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  }

  .shadow {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }

  .shadow-lg {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  }

  .shadow-none, .shadow-0 {
    box-shadow: none !important;
  }

  .m-0 {
    margin: 0 !important;
  }

  .mt-0,
  .my-0 {
    margin-top: 0 !important;
  }

  .mr-0,
  .mx-0 {
    margin-right: 0 !important;
  }

  .mb-0,
  .my-0 {
    margin-bottom: 0 !important;
  }

  .ml-0,
  .mx-0 {
    margin-left: 0 !important;
  }

  .m-1 {
    margin: 0.25rem !important;
  }

  .mt-1,
  .my-1 {
    margin-top: 0.25rem !important;
  }

  .mr-1,
  .mx-1 {
    margin-right: 0.25rem !important;
  }

  .mb-1,
  .my-1 {
    margin-bottom: 0.25rem !important;
  }

  .ml-1,
  .mx-1 {
    margin-left: 0.25rem !important;
  }

  .m-2 {
    margin: 0.5rem !important;
  }

  .mt-2,
  .my-2 {
    margin-top: 0.5rem !important;
  }

  .mr-2,
  .mx-2 {
    margin-right: 0.5rem !important;
  }

  .mb-2,
  .my-2 {
    margin-bottom: 0.5rem !important;
  }

  .ml-2,
  .mx-2 {
    margin-left: 0.5rem !important;
  }

  .m-3 {
    margin: 1rem !important;
  }

  .mt-3,
  .my-3 {
    margin-top: 1rem !important;
  }

  .mr-3,
  .mx-3 {
    margin-right: 1rem !important;
  }

  .mb-3,
  .my-3 {
    margin-bottom: 1rem !important;
  }

  .ml-3,
  .mx-3 {
    margin-left: 1rem !important;
  }

  .m-4 {
    margin: 1.5rem !important;
  }

  .mt-4,
  .my-4 {
    margin-top: 1.5rem !important;
  }

  .mr-4,
  .mx-4 {
    margin-right: 1.5rem !important;
  }

  .mb-4,
  .my-4 {
    margin-bottom: 1.5rem !important;
  }

  .ml-4,
  .mx-4 {
    margin-left: 1.5rem !important;
  }

  .m-5 {
    margin: 3rem !important;
  }

  .mt-5,
  .my-5 {
    margin-top: 3rem !important;
  }

  .mr-5,
  .mx-5 {
    margin-right: 3rem !important;
  }

  .mb-5,
  .my-5 {
    margin-bottom: 3rem !important;
  }

  .ml-5,
  .mx-5 {
    margin-left: 3rem !important;
  }

  .p-0 {
    padding: 0 !important;
  }

  .pt-0,
  .py-0 {
    padding-top: 0 !important;
  }

  .pr-0,
  .px-0 {
    padding-right: 0 !important;
  }

  .pb-0,
  .py-0 {
    padding-bottom: 0 !important;
  }

  .pl-0,
  .px-0 {
    padding-left: 0 !important;
  }

  .p-1 {
    padding: 0.25rem !important;
  }

  .pt-1,
  .py-1 {
    padding-top: 0.25rem !important;
  }

  .pr-1,
  .px-1 {
    padding-right: 0.25rem !important;
  }

  .pb-1,
  .py-1 {
    padding-bottom: 0.25rem !important;
  }

  .pl-1,
  .px-1 {
    padding-left: 0.25rem !important;
  }

  .p-2 {
    padding: 0.5rem !important;
  }

  .pt-2,
  .py-2 {
    padding-top: 0.5rem !important;
  }

  .pr-2,
  .px-2 {
    padding-right: 0.5rem !important;
  }

  .pb-2,
  .py-2 {
    padding-bottom: 0.5rem !important;
  }

  .pl-2,
  .px-2 {
    padding-left: 0.5rem !important;
  }

  .p-3 {
    padding: 1rem !important;
  }

  .pt-3,
  .py-3 {
    padding-top: 1rem !important;
  }

  .pr-3,
  .px-3 {
    padding-right: 1rem !important;
  }

  .pb-3,
  .py-3 {
    padding-bottom: 1rem !important;
  }

  .pl-3,
  .px-3 {
    padding-left: 1rem !important;
  }

  .p-4 {
    padding: 1.5rem !important;
  }

  .pt-4,
  .py-4 {
    padding-top: 1.5rem !important;
  }

  .pr-4,
  .px-4 {
    padding-right: 1.5rem !important;
  }

  .pb-4,
  .py-4 {
    padding-bottom: 1.5rem !important;
  }

  .pl-4,
  .px-4 {
    padding-left: 1.5rem !important;
  }

  .p-5 {
    padding: 3rem !important;
  }

  .pt-5,
  .py-5 {
    padding-top: 3rem !important;
  }

  .pr-5,
  .px-5 {
    padding-right: 3rem !important;
  }

  .pb-5,
  .py-5 {
    padding-bottom: 3rem !important;
  }

  .pl-5,
  .px-5 {
    padding-left: 3rem !important;
  }

  .m-auto {
    margin: auto !important;
  }

  .mt-auto,
  .my-auto {
    margin-top: auto !important;
  }

  .mr-auto,
  .mx-auto {
    margin-right: auto !important;
  }

  .mb-auto,
  .my-auto {
    margin-bottom: auto !important;
  }

  .ml-auto,
  .mx-auto {
    margin-left: auto !important;
  }

  @media (min-width: 576px) {
    .m-sm-0 {
      margin: 0 !important;
    }
    .mt-sm-0,
    .my-sm-0 {
      margin-top: 0 !important;
    }
    .mr-sm-0,
    .mx-sm-0 {
      margin-right: 0 !important;
    }
    .mb-sm-0,
    .my-sm-0 {
      margin-bottom: 0 !important;
    }
    .ml-sm-0,
    .mx-sm-0 {
      margin-left: 0 !important;
    }
    .m-sm-1 {
      margin: 0.25rem !important;
    }
    .mt-sm-1,
    .my-sm-1 {
      margin-top: 0.25rem !important;
    }
    .mr-sm-1,
    .mx-sm-1 {
      margin-right: 0.25rem !important;
    }
    .mb-sm-1,
    .my-sm-1 {
      margin-bottom: 0.25rem !important;
    }
    .ml-sm-1,
    .mx-sm-1 {
      margin-left: 0.25rem !important;
    }
    .m-sm-2 {
      margin: 0.5rem !important;
    }
    .mt-sm-2,
    .my-sm-2 {
      margin-top: 0.5rem !important;
    }
    .mr-sm-2,
    .mx-sm-2 {
      margin-right: 0.5rem !important;
    }
    .mb-sm-2,
    .my-sm-2 {
      margin-bottom: 0.5rem !important;
    }
    .ml-sm-2,
    .mx-sm-2 {
      margin-left: 0.5rem !important;
    }
    .m-sm-3 {
      margin: 1rem !important;
    }
    .mt-sm-3,
    .my-sm-3 {
      margin-top: 1rem !important;
    }
    .mr-sm-3,
    .mx-sm-3 {
      margin-right: 1rem !important;
    }
    .mb-sm-3,
    .my-sm-3 {
      margin-bottom: 1rem !important;
    }
    .ml-sm-3,
    .mx-sm-3 {
      margin-left: 1rem !important;
    }
    .m-sm-4 {
      margin: 1.5rem !important;
    }
    .mt-sm-4,
    .my-sm-4 {
      margin-top: 1.5rem !important;
    }
    .mr-sm-4,
    .mx-sm-4 {
      margin-right: 1.5rem !important;
    }
    .mb-sm-4,
    .my-sm-4 {
      margin-bottom: 1.5rem !important;
    }
    .ml-sm-4,
    .mx-sm-4 {
      margin-left: 1.5rem !important;
    }
    .m-sm-5 {
      margin: 3rem !important;
    }
    .mt-sm-5,
    .my-sm-5 {
      margin-top: 3rem !important;
    }
    .mr-sm-5,
    .mx-sm-5 {
      margin-right: 3rem !important;
    }
    .mb-sm-5,
    .my-sm-5 {
      margin-bottom: 3rem !important;
    }
    .ml-sm-5,
    .mx-sm-5 {
      margin-left: 3rem !important;
    }
    .p-sm-0 {
      padding: 0 !important;
    }
    .pt-sm-0,
    .py-sm-0 {
      padding-top: 0 !important;
    }
    .pr-sm-0,
    .px-sm-0 {
      padding-right: 0 !important;
    }
    .pb-sm-0,
    .py-sm-0 {
      padding-bottom: 0 !important;
    }
    .pl-sm-0,
    .px-sm-0 {
      padding-left: 0 !important;
    }
    .p-sm-1 {
      padding: 0.25rem !important;
    }
    .pt-sm-1,
    .py-sm-1 {
      padding-top: 0.25rem !important;
    }
    .pr-sm-1,
    .px-sm-1 {
      padding-right: 0.25rem !important;
    }
    .pb-sm-1,
    .py-sm-1 {
      padding-bottom: 0.25rem !important;
    }
    .pl-sm-1,
    .px-sm-1 {
      padding-left: 0.25rem !important;
    }
    .p-sm-2 {
      padding: 0.5rem !important;
    }
    .pt-sm-2,
    .py-sm-2 {
      padding-top: 0.5rem !important;
    }
    .pr-sm-2,
    .px-sm-2 {
      padding-right: 0.5rem !important;
    }
    .pb-sm-2,
    .py-sm-2 {
      padding-bottom: 0.5rem !important;
    }
    .pl-sm-2,
    .px-sm-2 {
      padding-left: 0.5rem !important;
    }
    .p-sm-3 {
      padding: 1rem !important;
    }
    .pt-sm-3,
    .py-sm-3 {
      padding-top: 1rem !important;
    }
    .pr-sm-3,
    .px-sm-3 {
      padding-right: 1rem !important;
    }
    .pb-sm-3,
    .py-sm-3 {
      padding-bottom: 1rem !important;
    }
    .pl-sm-3,
    .px-sm-3 {
      padding-left: 1rem !important;
    }
    .p-sm-4 {
      padding: 1.5rem !important;
    }
    .pt-sm-4,
    .py-sm-4 {
      padding-top: 1.5rem !important;
    }
    .pr-sm-4,
    .px-sm-4 {
      padding-right: 1.5rem !important;
    }
    .pb-sm-4,
    .py-sm-4 {
      padding-bottom: 1.5rem !important;
    }
    .pl-sm-4,
    .px-sm-4 {
      padding-left: 1.5rem !important;
    }
    .p-sm-5 {
      padding: 3rem !important;
    }
    .pt-sm-5,
    .py-sm-5 {
      padding-top: 3rem !important;
    }
    .pr-sm-5,
    .px-sm-5 {
      padding-right: 3rem !important;
    }
    .pb-sm-5,
    .py-sm-5 {
      padding-bottom: 3rem !important;
    }
    .pl-sm-5,
    .px-sm-5 {
      padding-left: 3rem !important;
    }
    .m-sm-auto {
      margin: auto !important;
    }
    .mt-sm-auto,
    .my-sm-auto {
      margin-top: auto !important;
    }
    .mr-sm-auto,
    .mx-sm-auto {
      margin-right: auto !important;
    }
    .mb-sm-auto,
    .my-sm-auto {
      margin-bottom: auto !important;
    }
    .ml-sm-auto,
    .mx-sm-auto {
      margin-left: auto !important;
    }
  }

  @media (min-width: 768px) {
    .m-md-0 {
      margin: 0 !important;
    }
    .mt-md-0,
    .my-md-0 {
      margin-top: 0 !important;
    }
    .mr-md-0,
    .mx-md-0 {
      margin-right: 0 !important;
    }
    .mb-md-0,
    .my-md-0 {
      margin-bottom: 0 !important;
    }
    .ml-md-0,
    .mx-md-0 {
      margin-left: 0 !important;
    }
    .m-md-1 {
      margin: 0.25rem !important;
    }
    .mt-md-1,
    .my-md-1 {
      margin-top: 0.25rem !important;
    }
    .mr-md-1,
    .mx-md-1 {
      margin-right: 0.25rem !important;
    }
    .mb-md-1,
    .my-md-1 {
      margin-bottom: 0.25rem !important;
    }
    .ml-md-1,
    .mx-md-1 {
      margin-left: 0.25rem !important;
    }
    .m-md-2 {
      margin: 0.5rem !important;
    }
    .mt-md-2,
    .my-md-2 {
      margin-top: 0.5rem !important;
    }
    .mr-md-2,
    .mx-md-2 {
      margin-right: 0.5rem !important;
    }
    .mb-md-2,
    .my-md-2 {
      margin-bottom: 0.5rem !important;
    }
    .ml-md-2,
    .mx-md-2 {
      margin-left: 0.5rem !important;
    }
    .m-md-3 {
      margin: 1rem !important;
    }
    .mt-md-3,
    .my-md-3 {
      margin-top: 1rem !important;
    }
    .mr-md-3,
    .mx-md-3 {
      margin-right: 1rem !important;
    }
    .mb-md-3,
    .my-md-3 {
      margin-bottom: 1rem !important;
    }
    .ml-md-3,
    .mx-md-3 {
      margin-left: 1rem !important;
    }
    .m-md-4 {
      margin: 1.5rem !important;
    }
    .mt-md-4,
    .my-md-4 {
      margin-top: 1.5rem !important;
    }
    .mr-md-4,
    .mx-md-4 {
      margin-right: 1.5rem !important;
    }
    .mb-md-4,
    .my-md-4 {
      margin-bottom: 1.5rem !important;
    }
    .ml-md-4,
    .mx-md-4 {
      margin-left: 1.5rem !important;
    }
    .m-md-5 {
      margin: 3rem !important;
    }
    .mt-md-5,
    .my-md-5 {
      margin-top: 3rem !important;
    }
    .mr-md-5,
    .mx-md-5 {
      margin-right: 3rem !important;
    }
    .mb-md-5,
    .my-md-5 {
      margin-bottom: 3rem !important;
    }
    .ml-md-5,
    .mx-md-5 {
      margin-left: 3rem !important;
    }
    .p-md-0 {
      padding: 0 !important;
    }
    .pt-md-0,
    .py-md-0 {
      padding-top: 0 !important;
    }
    .pr-md-0,
    .px-md-0 {
      padding-right: 0 !important;
    }
    .pb-md-0,
    .py-md-0 {
      padding-bottom: 0 !important;
    }
    .pl-md-0,
    .px-md-0 {
      padding-left: 0 !important;
    }
    .p-md-1 {
      padding: 0.25rem !important;
    }
    .pt-md-1,
    .py-md-1 {
      padding-top: 0.25rem !important;
    }
    .pr-md-1,
    .px-md-1 {
      padding-right: 0.25rem !important;
    }
    .pb-md-1,
    .py-md-1 {
      padding-bottom: 0.25rem !important;
    }
    .pl-md-1,
    .px-md-1 {
      padding-left: 0.25rem !important;
    }
    .p-md-2 {
      padding: 0.5rem !important;
    }
    .pt-md-2,
    .py-md-2 {
      padding-top: 0.5rem !important;
    }
    .pr-md-2,
    .px-md-2 {
      padding-right: 0.5rem !important;
    }
    .pb-md-2,
    .py-md-2 {
      padding-bottom: 0.5rem !important;
    }
    .pl-md-2,
    .px-md-2 {
      padding-left: 0.5rem !important;
    }
    .p-md-3 {
      padding: 1rem !important;
    }
    .pt-md-3,
    .py-md-3 {
      padding-top: 1rem !important;
    }
    .pr-md-3,
    .px-md-3 {
      padding-right: 1rem !important;
    }
    .pb-md-3,
    .py-md-3 {
      padding-bottom: 1rem !important;
    }
    .pl-md-3,
    .px-md-3 {
      padding-left: 1rem !important;
    }
    .p-md-4 {
      padding: 1.5rem !important;
    }
    .pt-md-4,
    .py-md-4 {
      padding-top: 1.5rem !important;
    }
    .pr-md-4,
    .px-md-4 {
      padding-right: 1.5rem !important;
    }
    .pb-md-4,
    .py-md-4 {
      padding-bottom: 1.5rem !important;
    }
    .pl-md-4,
    .px-md-4 {
      padding-left: 1.5rem !important;
    }
    .p-md-5 {
      padding: 3rem !important;
    }
    .pt-md-5,
    .py-md-5 {
      padding-top: 3rem !important;
    }
    .pr-md-5,
    .px-md-5 {
      padding-right: 3rem !important;
    }
    .pb-md-5,
    .py-md-5 {
      padding-bottom: 3rem !important;
    }
    .pl-md-5,
    .px-md-5 {
      padding-left: 3rem !important;
    }
    .m-md-auto {
      margin: auto !important;
    }
    .mt-md-auto,
    .my-md-auto {
      margin-top: auto !important;
    }
    .mr-md-auto,
    .mx-md-auto {
      margin-right: auto !important;
    }
    .mb-md-auto,
    .my-md-auto {
      margin-bottom: auto !important;
    }
    .ml-md-auto,
    .mx-md-auto {
      margin-left: auto !important;
    }
  }

  @media (min-width: 992px) {
    .m-lg-0 {
      margin: 0 !important;
    }
    .mt-lg-0,
    .my-lg-0 {
      margin-top: 0 !important;
    }
    .mr-lg-0,
    .mx-lg-0 {
      margin-right: 0 !important;
    }
    .mb-lg-0,
    .my-lg-0 {
      margin-bottom: 0 !important;
    }
    .ml-lg-0,
    .mx-lg-0 {
      margin-left: 0 !important;
    }
    .m-lg-1 {
      margin: 0.25rem !important;
    }
    .mt-lg-1,
    .my-lg-1 {
      margin-top: 0.25rem !important;
    }
    .mr-lg-1,
    .mx-lg-1 {
      margin-right: 0.25rem !important;
    }
    .mb-lg-1,
    .my-lg-1 {
      margin-bottom: 0.25rem !important;
    }
    .ml-lg-1,
    .mx-lg-1 {
      margin-left: 0.25rem !important;
    }
    .m-lg-2 {
      margin: 0.5rem !important;
    }
    .mt-lg-2,
    .my-lg-2 {
      margin-top: 0.5rem !important;
    }
    .mr-lg-2,
    .mx-lg-2 {
      margin-right: 0.5rem !important;
    }
    .mb-lg-2,
    .my-lg-2 {
      margin-bottom: 0.5rem !important;
    }
    .ml-lg-2,
    .mx-lg-2 {
      margin-left: 0.5rem !important;
    }
    .m-lg-3 {
      margin: 1rem !important;
    }
    .mt-lg-3,
    .my-lg-3 {
      margin-top: 1rem !important;
    }
    .mr-lg-3,
    .mx-lg-3 {
      margin-right: 1rem !important;
    }
    .mb-lg-3,
    .my-lg-3 {
      margin-bottom: 1rem !important;
    }
    .ml-lg-3,
    .mx-lg-3 {
      margin-left: 1rem !important;
    }
    .m-lg-4 {
      margin: 1.5rem !important;
    }
    .mt-lg-4,
    .my-lg-4 {
      margin-top: 1.5rem !important;
    }
    .mr-lg-4,
    .mx-lg-4 {
      margin-right: 1.5rem !important;
    }
    .mb-lg-4,
    .my-lg-4 {
      margin-bottom: 1.5rem !important;
    }
    .ml-lg-4,
    .mx-lg-4 {
      margin-left: 1.5rem !important;
    }
    .m-lg-5 {
      margin: 3rem !important;
    }
    .mt-lg-5,
    .my-lg-5 {
      margin-top: 3rem !important;
    }
    .mr-lg-5,
    .mx-lg-5 {
      margin-right: 3rem !important;
    }
    .mb-lg-5,
    .my-lg-5 {
      margin-bottom: 3rem !important;
    }
    .ml-lg-5,
    .mx-lg-5 {
      margin-left: 3rem !important;
    }
    .p-lg-0 {
      padding: 0 !important;
    }
    .pt-lg-0,
    .py-lg-0 {
      padding-top: 0 !important;
    }
    .pr-lg-0,
    .px-lg-0 {
      padding-right: 0 !important;
    }
    .pb-lg-0,
    .py-lg-0 {
      padding-bottom: 0 !important;
    }
    .pl-lg-0,
    .px-lg-0 {
      padding-left: 0 !important;
    }
    .p-lg-1 {
      padding: 0.25rem !important;
    }
    .pt-lg-1,
    .py-lg-1 {
      padding-top: 0.25rem !important;
    }
    .pr-lg-1,
    .px-lg-1 {
      padding-right: 0.25rem !important;
    }
    .pb-lg-1,
    .py-lg-1 {
      padding-bottom: 0.25rem !important;
    }
    .pl-lg-1,
    .px-lg-1 {
      padding-left: 0.25rem !important;
    }
    .p-lg-2 {
      padding: 0.5rem !important;
    }
    .pt-lg-2,
    .py-lg-2 {
      padding-top: 0.5rem !important;
    }
    .pr-lg-2,
    .px-lg-2 {
      padding-right: 0.5rem !important;
    }
    .pb-lg-2,
    .py-lg-2 {
      padding-bottom: 0.5rem !important;
    }
    .pl-lg-2,
    .px-lg-2 {
      padding-left: 0.5rem !important;
    }
    .p-lg-3 {
      padding: 1rem !important;
    }
    .pt-lg-3,
    .py-lg-3 {
      padding-top: 1rem !important;
    }
    .pr-lg-3,
    .px-lg-3 {
      padding-right: 1rem !important;
    }
    .pb-lg-3,
    .py-lg-3 {
      padding-bottom: 1rem !important;
    }
    .pl-lg-3,
    .px-lg-3 {
      padding-left: 1rem !important;
    }
    .p-lg-4 {
      padding: 1.5rem !important;
    }
    .pt-lg-4,
    .py-lg-4 {
      padding-top: 1.5rem !important;
    }
    .pr-lg-4,
    .px-lg-4 {
      padding-right: 1.5rem !important;
    }
    .pb-lg-4,
    .py-lg-4 {
      padding-bottom: 1.5rem !important;
    }
    .pl-lg-4,
    .px-lg-4 {
      padding-left: 1.5rem !important;
    }
    .p-lg-5 {
      padding: 3rem !important;
    }
    .pt-lg-5,
    .py-lg-5 {
      padding-top: 3rem !important;
    }
    .pr-lg-5,
    .px-lg-5 {
      padding-right: 3rem !important;
    }
    .pb-lg-5,
    .py-lg-5 {
      padding-bottom: 3rem !important;
    }
    .pl-lg-5,
    .px-lg-5 {
      padding-left: 3rem !important;
    }
    .m-lg-auto {
      margin: auto !important;
    }
    .mt-lg-auto,
    .my-lg-auto {
      margin-top: auto !important;
    }
    .mr-lg-auto,
    .mx-lg-auto {
      margin-right: auto !important;
    }
    .mb-lg-auto,
    .my-lg-auto {
      margin-bottom: auto !important;
    }
    .ml-lg-auto,
    .mx-lg-auto {
      margin-left: auto !important;
    }
  }

  @media (min-width: 1200px) {
    .m-xl-0 {
      margin: 0 !important;
    }
    .mt-xl-0,
    .my-xl-0 {
      margin-top: 0 !important;
    }
    .mr-xl-0,
    .mx-xl-0 {
      margin-right: 0 !important;
    }
    .mb-xl-0,
    .my-xl-0 {
      margin-bottom: 0 !important;
    }
    .ml-xl-0,
    .mx-xl-0 {
      margin-left: 0 !important;
    }
    .m-xl-1 {
      margin: 0.25rem !important;
    }
    .mt-xl-1,
    .my-xl-1 {
      margin-top: 0.25rem !important;
    }
    .mr-xl-1,
    .mx-xl-1 {
      margin-right: 0.25rem !important;
    }
    .mb-xl-1,
    .my-xl-1 {
      margin-bottom: 0.25rem !important;
    }
    .ml-xl-1,
    .mx-xl-1 {
      margin-left: 0.25rem !important;
    }
    .m-xl-2 {
      margin: 0.5rem !important;
    }
    .mt-xl-2,
    .my-xl-2 {
      margin-top: 0.5rem !important;
    }
    .mr-xl-2,
    .mx-xl-2 {
      margin-right: 0.5rem !important;
    }
    .mb-xl-2,
    .my-xl-2 {
      margin-bottom: 0.5rem !important;
    }
    .ml-xl-2,
    .mx-xl-2 {
      margin-left: 0.5rem !important;
    }
    .m-xl-3 {
      margin: 1rem !important;
    }
    .mt-xl-3,
    .my-xl-3 {
      margin-top: 1rem !important;
    }
    .mr-xl-3,
    .mx-xl-3 {
      margin-right: 1rem !important;
    }
    .mb-xl-3,
    .my-xl-3 {
      margin-bottom: 1rem !important;
    }
    .ml-xl-3,
    .mx-xl-3 {
      margin-left: 1rem !important;
    }
    .m-xl-4 {
      margin: 1.5rem !important;
    }
    .mt-xl-4,
    .my-xl-4 {
      margin-top: 1.5rem !important;
    }
    .mr-xl-4,
    .mx-xl-4 {
      margin-right: 1.5rem !important;
    }
    .mb-xl-4,
    .my-xl-4 {
      margin-bottom: 1.5rem !important;
    }
    .ml-xl-4,
    .mx-xl-4 {
      margin-left: 1.5rem !important;
    }
    .m-xl-5 {
      margin: 3rem !important;
    }
    .mt-xl-5,
    .my-xl-5 {
      margin-top: 3rem !important;
    }
    .mr-xl-5,
    .mx-xl-5 {
      margin-right: 3rem !important;
    }
    .mb-xl-5,
    .my-xl-5 {
      margin-bottom: 3rem !important;
    }
    .ml-xl-5,
    .mx-xl-5 {
      margin-left: 3rem !important;
    }
    .p-xl-0 {
      padding: 0 !important;
    }
    .pt-xl-0,
    .py-xl-0 {
      padding-top: 0 !important;
    }
    .pr-xl-0,
    .px-xl-0 {
      padding-right: 0 !important;
    }
    .pb-xl-0,
    .py-xl-0 {
      padding-bottom: 0 !important;
    }
    .pl-xl-0,
    .px-xl-0 {
      padding-left: 0 !important;
    }
    .p-xl-1 {
      padding: 0.25rem !important;
    }
    .pt-xl-1,
    .py-xl-1 {
      padding-top: 0.25rem !important;
    }
    .pr-xl-1,
    .px-xl-1 {
      padding-right: 0.25rem !important;
    }
    .pb-xl-1,
    .py-xl-1 {
      padding-bottom: 0.25rem !important;
    }
    .pl-xl-1,
    .px-xl-1 {
      padding-left: 0.25rem !important;
    }
    .p-xl-2 {
      padding: 0.5rem !important;
    }
    .pt-xl-2,
    .py-xl-2 {
      padding-top: 0.5rem !important;
    }
    .pr-xl-2,
    .px-xl-2 {
      padding-right: 0.5rem !important;
    }
    .pb-xl-2,
    .py-xl-2 {
      padding-bottom: 0.5rem !important;
    }
    .pl-xl-2,
    .px-xl-2 {
      padding-left: 0.5rem !important;
    }
    .p-xl-3 {
      padding: 1rem !important;
    }
    .pt-xl-3,
    .py-xl-3 {
      padding-top: 1rem !important;
    }
    .pr-xl-3,
    .px-xl-3 {
      padding-right: 1rem !important;
    }
    .pb-xl-3,
    .py-xl-3 {
      padding-bottom: 1rem !important;
    }
    .pl-xl-3,
    .px-xl-3 {
      padding-left: 1rem !important;
    }
    .p-xl-4 {
      padding: 1.5rem !important;
    }
    .pt-xl-4,
    .py-xl-4 {
      padding-top: 1.5rem !important;
    }
    .pr-xl-4,
    .px-xl-4 {
      padding-right: 1.5rem !important;
    }
    .pb-xl-4,
    .py-xl-4 {
      padding-bottom: 1.5rem !important;
    }
    .pl-xl-4,
    .px-xl-4 {
      padding-left: 1.5rem !important;
    }
    .p-xl-5 {
      padding: 3rem !important;
    }
    .pt-xl-5,
    .py-xl-5 {
      padding-top: 3rem !important;
    }
    .pr-xl-5,
    .px-xl-5 {
      padding-right: 3rem !important;
    }
    .pb-xl-5,
    .py-xl-5 {
      padding-bottom: 3rem !important;
    }
    .pl-xl-5,
    .px-xl-5 {
      padding-left: 3rem !important;
    }
    .m-xl-auto {
      margin: auto !important;
    }
    .mt-xl-auto,
    .my-xl-auto {
      margin-top: auto !important;
    }
    .mr-xl-auto,
    .mx-xl-auto {
      margin-right: auto !important;
    }
    .mb-xl-auto,
    .my-xl-auto {
      margin-bottom: auto !important;
    }
    .ml-xl-auto,
    .mx-xl-auto {
      margin-left: auto !important;
    }
  }

  .text-monospace {
    font-family: ${theme.codeFamily} ;
  }

  .text-justify {
    text-align: justify !important;
  }

  .text-nowrap {
    white-space: nowrap !important;
  }

  .text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .text-left {
    text-align: left !important;
  }

  .text-right {
    text-align: right !important;
  }

  .text-center {
    text-align: center !important;
  }

  .text-lowercase {
    text-transform: lowercase !important;
  }

  .text-uppercase {
    text-transform: uppercase !important;
  }

  .text-capitalize {
    text-transform: capitalize !important;
  }

  .font-weight-light {
    font-weight: 300 !important;
  }

  .font-weight-normal {
    font-weight: 400 !important;
  }

  .font-weight-bold {
    font-weight: 700 !important;
  }

  .font-italic {
    font-style: italic !important;
  }

  .text-white {
    color: #fff !important;
  }

  .text-primary {
    color: ${theme.primaryColor} !important;
  }

  .text-normal {
    color: ${theme.normalColor} !important;
  }

  .text-success {
    color: ${theme.successColor} !important;
  }

  .text-info {
    color: ${theme.infoColor} !important;
  }

  .text-warning {
    color: ${theme.warningColor} !important;
  }

  .text-error {
    color: ${theme.errorColor} !important;
  }

  .text-dark {
    color: ${theme.darkColor} !important;
  }

  .text-body {
    color: ${theme.textColor} !important;
  }

  .text-muted {
    color: ${theme.textColorSecondary} !important;
  }

  .text-black {
    color: rgba(0, 0, 0, 1) !important;
  }

  .text-black-50 {
    color: rgba(0, 0, 0, 0.5) !important;
  }

  .text-white-50 {
    color: rgba(255, 255, 255, 0.5) !important;
  }

  .text-white-65 {
    color: rgba(255, 255, 255, 0.5) !important;
  }

  .text-light {
    color: white !important;
  }

  .text-hide {
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
  }

  /* Fixes */
  .mapboxgl-ctrl-group {
    display: inline-block;
    margin: 1rem;
  }
  .rv-discrete-color-legend {
    display: block;
    width: 100%!important;
    text-align: center;
  }
  .rv-discrete-color-legend-item {
    display: inline-block;
  }

  .ant-menu-vertical .ant-menu-item, .ant-menu-vertical-left .ant-menu-item, .ant-menu-vertical-right .ant-menu-item, .ant-menu-inline .ant-menu-item, .ant-menu-vertical .ant-menu-submenu-title, .ant-menu-vertical-left .ant-menu-submenu-title, .ant-menu-vertical-right .ant-menu-submenu-title, .ant-menu-inline .ant-menu-submenu-title,
  .ant-menu-vertical .ant-menu-item:not(:last-child), .ant-menu-vertical-left .ant-menu-item:not(:last-child), .ant-menu-vertical-right .ant-menu-item:not(:last-child), .ant-menu-inline .ant-menu-item:not(:last-child) {
    margin-top: 0;
    margin-bottom: 0;
  }
  .ant-menu-dark .ant-menu-inline.ant-menu-sub {
    box-shadow: none;
  }
  .header-notifications .ant-spin-container {
    overflow: auto;
    height: 220px;
    width: 350px;
  }
  .header-notifications .ant-list-footer {
    padding-left: 1rem;
    padding-right: 1rem;
    border-top: 1px solid rgba(0,0,0,.03)
  }
  /* custom card */
  .ant-card-bordered {
    box-shadow: 0 0 1px rgba(0,0,0,.1);
    border: 0!important;
    background-clip: padding-box;
  }
  .card-head-0 .ant-card-head {
    border: 0;
  }
  .ant-card-actions {
    border-radius: 0 0 ${theme.borderRadiusBase} ${theme.borderRadiusBase};
  }
  .ant-card-head-title {
    font-weight: 700;
  }
  .ant-menu-submenu-open.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow:before {
    transform: rotate(45deg) translateX(3px);
  }
  .ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow:before {
    transform: rotate(-45deg) translateX(3px);
  }
  .ant-menu-submenu-open.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow:after {
    transform: rotate(-45deg) translateX(-3px);
  }
  .ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow:after {
    transform: rotate(45deg) translateX(-3px);
  }
  .ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow:before, .ant-menu-submenu-vertical-left > .ant-menu-submenu-title .ant-menu-submenu-arrow:before, .ant-menu-submenu-vertical-right > .ant-menu-submenu-title .ant-menu-submenu-arrow:before, .ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow:before, .ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow:after, .ant-menu-submenu-vertical-left > .ant-menu-submenu-title .ant-menu-submenu-arrow:after, .ant-menu-submenu-vertical-right > .ant-menu-submenu-title .ant-menu-submenu-arrow:after, .ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow:after {
    height: 1px;
  }
  /* Chart */
  .rv-xy-plot__grid-lines, .rv-xy-plot__axis {
    stroke-width: 0.2;
  }
  .rv-discrete-color-legend-item__color {
    height: 6px;
  }
  .rv-discrete-color-legend-item__color__path {
    stroke-width: 6px;
  }
  /* Chat */
  .chat-drawer .ant-drawer-header,
  .chat-drawer .ant-drawer-body {
    padding: 0;
  }
  .message-modal .ant-modal-content {
    border-radius: 4px 4px 0 0;
  }

  .am-weather-cloud-2 > path, [id^=cloudy-day-] > path {
    stroke-width: 0;
  }

  .ant-input{
    color: #5f5f5f;
  }
`;

export { GlobalStyles, theme };
