// globalErrorHandler.js
window.onerror = function () {
    // Clear the page content
    document.body.innerHTML = '';
    // Redirect to the error page
    window.location.href = "/login?err=1";
    return true;
  };
  
  window.addEventListener("unhandledrejection", function () {
    // Clear the page content
    document.body.innerHTML = '';
    // Redirect to the error page
    window.location.href = "/login?err=1";
  });
  