/**
 * Automatic dark mode switching for just-the-docs theme
 * Detects system color scheme preference and applies appropriate theme
 */

(function() {
  // Check if system prefers dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Function to set theme based on system preference
  function setThemeBySystemPreference() {
    if (prefersDark.matches) {
      // System prefers dark mode
      if (typeof jtd !== 'undefined' && jtd.setTheme) {
        jtd.setTheme('dark');
      }
    } else {
      // System prefers light mode
      if (typeof jtd !== 'undefined' && jtd.setTheme) {
        jtd.setTheme('light');
      }
    }
  }
  
  // Set theme on page load
  setThemeBySystemPreference();
  
  // Listen for changes to system color scheme preference
  prefersDark.addEventListener('change', setThemeBySystemPreference);
})();
