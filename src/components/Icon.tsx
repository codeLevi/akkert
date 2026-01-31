type IconName = "whatsapp" | "instagram" | "facebook" | "airbnb" | "chevron";

export default function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  const common = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.8 };

  switch (name) {
    case "chevron":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            d="M20 11.6a7.6 7.6 0 0 1-11.5 6.6L4 19.6l1.4-4.3A7.6 7.6 0 1 1 20 11.6Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.3 8.9c.2-.5.4-.6.7-.6h.5c.2 0 .4 0 .6.4l.7 1.7c.1.3.1.5 0 .7l-.3.4c-.1.2-.2.4 0 .7.3.6 1.2 1.6 2.4 2 .4.2.6.1.8 0l.9-.6c.2-.1.4-.1.6 0l1.6.7c.2.1.4.3.4.5 0 .8-.4 1.6-1.1 1.9-.7.3-1.5.3-2.3 0-2.4-.9-4.6-3.2-5.4-5.6-.2-.7-.1-1.5.2-2.1Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "instagram":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            d="M7.5 3.8h9A3.7 3.7 0 0 1 20.2 7.5v9a3.7 3.7 0 0 1-3.7 3.7h-9A3.7 3.7 0 0 1 3.8 16.5v-9A3.7 3.7 0 0 1 7.5 3.8Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M16.9 7.3h.01" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "facebook":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            d="M14 8.5V7.2c0-1 .8-1.9 1.9-1.9H18V3.6h-2.1A4.2 4.2 0 0 0 11.7 7.8v.7H9.6v2H11.7v9.9h2.3v-9.9H17l.6-2H14Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "airbnb":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            d="M12 4.2c2.2 0 3.7 2 4.7 4.2l2.3 5c.6 1.3-.4 2.8-1.8 2.8-1 0-1.6-.6-2.1-1.4l-1.2-2.1c-.7-1.2-1.1-1.8-1.9-1.8s-1.2.6-1.9 1.8l-1.2 2.1c-.5.8-1.1 1.4-2.1 1.4-1.4 0-2.4-1.5-1.8-2.8l2.3-5C8.3 6.2 9.8 4.2 12 4.2Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 12.1c1.2 0 2.1 1 2.1 2.1S13.2 16.3 12 16.3s-2.1-1-2.1-2.1S10.8 12.1 12 12.1Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
}
