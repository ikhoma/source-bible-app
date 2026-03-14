/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace"
        ]
      },
      colors: {
        primary: "#272223",
        muted: "#6C757D",
        page: "#F0EFED",
        surface: {
          base: "#FFFFFF",
          subtle: "#F8F9FA",
          raised: "#ECEAE6",
          muted: "#DDDDDD"
        },
        stone: {
          50: "#F8F9FA",
          100: "#ECEAE6",
          200: "#DDDDDD",
          300: "#C7C7C7",
          400: "#949494",
          500: "#6C757D",
          600: "#495057",
          700: "#212529",
          800: "#272223",
          900: "#000000"
        },
        blue: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          500: "#3B82F6",
          600: "#2563EB"
        },
        accent: {
          interactive: "#2563EB",
          highlight: "#84CC16",
          search: "#FDE047",
          recording: "#EF4444"
        },
        border: {
          subtle: "#DDDDDD",
          strong: "#949494",
          focus: "#93C5FD",
          default: "rgba(199,199,199,0.5)"
        },
        text: {
          primary: "#272223",
          muted: "#6C757D",
          inverse: "#FFFFFF"
        },
        interactive: {
          primary: "#2563EB",
          hover: "#3B82F6",
          selected: "#EFF6FF",
          selectedBorder: "#93C5FD",
          disabled: "rgba(37,99,235,0.4)"
        },
        dark: {
          text: {
            primary: "#E7E5E4",
            muted: "#A8A29E"
          },
          surface: {
            base: "#1C1917",
            subtle: "#221F1E",
            muted: "#312E2B",
            raised: "#403B37"
          },
          interactive: {
            primary: "#3B82F6",
            hover: "#60A5FA",
            selected: "#1E3A8A"
          }
        }
      },
      fontSize: {
        "display-modern": ["36px", { lineHeight: "40px", fontWeight: "700" }],
        "h1-modern": ["30px", { lineHeight: "36px", fontWeight: "700" }],
        "h2-modern": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "h3-modern": ["20px", { lineHeight: "28px", fontWeight: "700" }],
        "verse-modern": ["18px", { lineHeight: "1.35", fontWeight: "400" }],
        "body-modern": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "ui-modern": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "caption-modern": ["12px", { lineHeight: "16px", fontWeight: "600" }],
        "eyebrow": [
          "11px",
          {
            lineHeight: "16px",
            fontWeight: "700",
            letterSpacing: "0.12em",
            textTransform: "uppercase"
          }
        ],
        "meta-mono": ["10px", { lineHeight: "16px", fontWeight: "400" }],
        "display-antique": ["40px", { lineHeight: "48px", fontWeight: "700" }],
        "h1-antique": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "h2-antique": ["26px", { lineHeight: "34px", fontWeight: "700" }],
        "verse-antique": ["20px", { lineHeight: "1.35", fontWeight: "400" }],
        "body-antique": ["18px", { lineHeight: "1.45", fontWeight: "400" }],
        hebrew: ["28px", { fontWeight: "400" }]
      },
      spacing: {
        0: "0px",
        px: "1px",
        0.5: "2px",
        1: "4px",
        1.5: "6px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        24: "96px",
        30: "120px",
        35: "140px"
      },
      borderRadius: {
        sm: "3px",
        md: "4px",
        lg: "8px",
        xl: "10px",
        "2xl": "12px",
        pill: "999px",
        full: "9999px"
      },
      boxShadow: {
        "focus-ring": "0 0 0 3px rgba(59,130,246,0.12)",
        raised: "0 1px 3px rgba(0,0,0,0.1)"
      }
    }
  }
};
