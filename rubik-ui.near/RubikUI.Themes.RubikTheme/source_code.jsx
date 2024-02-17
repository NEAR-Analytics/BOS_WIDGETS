const Rubik = styled.div`
    --rubik-red-color:#f73d3d;
    --rubik-white-color:#fafafa;
      
    --color-primary: #007bff;
    --color-secondary: #6c757d;
    --color-success: #28a745;
    --color-info: #17a2b8;
    --color-warning: #ffc107;
    --color-danger: #dc3545;
    --color-light: #f8f9fa;
    --color-dark: #343a40;
    --color-text: #212529;
    --color-background: #ffffff;
    
    --opacity-light: 0.5;
    --opacity-medium: 0.75;
    --opacity-strong: 0.9;
    
    --font-family-sans-serif: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    --font-family-serif: Georgia, 'Times New Roman', Times, serif;
    --font-family-monospace: Menlo, Monaco, Consolas, 'Courier New', monospace;
    --font-size-base: 1rem; /* 16px */
    --font-size-lg: 1.25rem; /* 20px */
    --font-size-sm: 0.875rem; /* 14px */
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-bold: 700;
    --line-height-base: 1.5;
    
    --spacing-xs: 0.25rem; /* 4px */
    --spacing-sm: 0.5rem; /* 8px */
    --spacing-md: 1rem; /* 16px */
    --spacing-lg: 1.5rem; /* 24px */
    --spacing-xl: 3rem; /* 48px */
    
    --border-radius: 0.25rem; /* 4px */
    --border-radius-lg: 0.5rem; /* 8px */
    --border-radius-circle: 50%;
    --border-width: 1px;
    --border-color: #dee2e6;
    
    --box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    --box-shadow-lg: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    --transition-ease-in-out: all 0.3s ease-in-out;
    --transition-linear: all 0.2s linear;
    
    --zindex-dropdown: 1000;
    --zindex-sticky: 1020;
    --zindex-fixed: 1030;
    --zindex-modal-backdrop: 1040;
    --zindex-modal: 1050;
    --zindex-popover: 1060;
    --zindex-tooltip: 1070;
`;

return {
  Rubik,
};
