import type React from "react";

type IconProps = {
  className?: string;
};

function Svg({ className, children }: React.PropsWithChildren<IconProps>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M20 7L10 17l-4-4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconDiamond({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M12 3l4.5 5.5L12 21 7.5 8.5 12 3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 8.5H16.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M12 3l7 3v6c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconCircuit({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M7 7h10v10H7V7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 4v3M12 17v3M4 12h3M17 12h3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9 9h6v6H9V9z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </Svg>
  );
}

export function IconTrophy({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M11.6667 33.8889V30.5556H18.3333V25.3889C16.9722 25.0834 15.7569 24.507 14.6875 23.6597C13.6181 22.8125 12.8333 21.75 12.3333 20.4722C10.25 20.2222 8.50694 19.3125 7.10417 17.7431C5.70139 16.1736 5 14.3334 5 12.2222V7.22225H11.6667V3.88892H28.3333V7.22225H35V12.2222C35 14.3334 34.2986 16.1736 32.8958 17.7431C31.4931 19.3125 29.75 20.2222 27.6667 20.4722C27.1667 21.75 26.3819 22.8125 25.3125 23.6597C24.2431 24.507 23.0278 25.0834 21.6667 25.3889V30.5556H28.3333V33.8889H11.6667ZM11.6667 16.8889V10.5556H8.33333V12.2222C8.33333 13.2778 8.63889 14.2292 9.25 15.0764C9.86111 15.9236 10.6667 16.5278 11.6667 16.8889ZM28.3333 16.8889C29.3333 16.5278 30.1389 15.9236 30.75 15.0764C31.3611 14.2292 31.6667 13.2778 31.6667 12.2222V10.5556H28.3333V16.8889Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconCrown({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.29169 34.9999L5.58335 14.9583C4.55558 15.1527 3.64585 14.9166 2.85419 14.2499C2.06252 13.5833 1.66669 12.7221 1.66669 11.6666C1.66669 10.7499 1.99308 9.9652 2.64585 9.31242C3.29863 8.65964 4.08335 8.33325 5.00002 8.33325C5.91669 8.33325 6.70141 8.65964 7.35419 9.31242C8.00697 9.9652 8.33335 10.7499 8.33335 11.6666C8.33335 12.0555 8.2778 12.4166 8.16669 12.7499C8.05558 13.0833 7.88891 13.3888 7.66669 13.6666C8.2778 14.0277 8.89585 14.3263 9.52085 14.5624C10.1459 14.7985 10.8056 14.9166 11.5 14.9166C12.7222 14.9166 13.8542 14.611 14.8959 13.9999C15.9375 13.3888 16.75 12.5555 17.3334 11.4999L18.375 9.58325C17.8472 9.2777 17.4306 8.87492 17.125 8.37492C16.8195 7.87492 16.6667 7.30547 16.6667 6.66659C16.6667 5.74992 16.9931 4.9652 17.6459 4.31242C18.2986 3.65964 19.0834 3.33325 20 3.33325C20.9167 3.33325 21.7014 3.65964 22.3542 4.31242C23.007 4.9652 23.3334 5.74992 23.3334 6.66659C23.3334 7.30547 23.1806 7.87492 22.875 8.37492C22.5695 8.87492 22.1528 9.2777 21.625 9.58325L22.6667 11.4999C23.25 12.5555 24.0625 13.3888 25.1042 13.9999C26.1459 14.611 27.2778 14.9166 28.5 14.9166C29.1945 14.9166 29.8542 14.8055 30.4792 14.5833C31.1042 14.361 31.7222 14.0694 32.3334 13.7083C32.1111 13.4305 31.9445 13.118 31.8334 12.7708C31.7222 12.4235 31.6667 12.0555 31.6667 11.6666C31.6667 10.7499 31.9931 9.9652 32.6459 9.31242C33.2986 8.65964 34.0834 8.33325 35 8.33325C35.9167 8.33325 36.7014 8.65964 37.3542 9.31242C38.007 9.9652 38.3334 10.7499 38.3334 11.6666C38.3334 12.7221 37.9375 13.5833 37.1459 14.2499C36.3542 14.9166 35.4445 15.1527 34.4167 14.9583L30.7084 34.9999H9.29169Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconSwords({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M31.75 34.8888L26.875 30.0554L23.2083 33.7221L22.0416 32.5554C21.4028 31.9165 21.0833 31.1249 21.0833 30.1804C21.0833 29.236 21.4028 28.4443 22.0416 27.8054L29.0833 20.7638C29.7222 20.1249 30.5139 19.8054 31.4583 19.8054C32.4028 19.8054 33.1944 20.1249 33.8333 20.7638L35 21.9304L31.3333 25.5971L36.1666 30.4721C36.5 30.8054 36.6666 31.1943 36.6666 31.6388C36.6666 32.0832 36.5 32.4721 36.1666 32.8054L34.0833 34.8888C33.75 35.2221 33.3611 35.3888 32.9166 35.3888C32.4722 35.3888 32.0833 35.2221 31.75 34.8888ZM36.6666 8.72209L17.75 27.6388L17.9583 27.8054C18.5972 28.4443 18.9166 29.236 18.9166 30.1804C18.9166 31.1249 18.5972 31.9165 17.9583 32.5554L16.7916 33.7221L13.125 30.0554L8.24998 34.8888C7.91665 35.2221 7.52776 35.3888 7.08331 35.3888C6.63887 35.3888 6.24998 35.2221 5.91665 34.8888L3.83331 32.8054C3.49998 32.4721 3.33331 32.0832 3.33331 31.6388C3.33331 31.1943 3.49998 30.8054 3.83331 30.4721L8.66665 25.5971L4.99998 21.9304L6.16665 20.7638C6.80554 20.1249 7.5972 19.8054 8.54165 19.8054C9.48609 19.8054 10.2778 20.1249 10.9166 20.7638L11.0833 20.9721L30 2.05542H36.6666V8.72209ZM11.5833 16.9721L3.33331 8.72209V2.05542H9.99998L18.25 10.3054L11.5833 16.9721Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconEye({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M25.3125 24.4791C26.7708 23.0208 27.5 21.25 27.5 19.1666C27.5 17.0833 26.7708 15.3125 25.3125 13.8541C23.8541 12.3958 22.0833 11.6666 20 11.6666C17.9166 11.6666 16.1458 12.3958 14.6875 13.8541C13.2291 15.3125 12.5 17.0833 12.5 19.1666C12.5 21.25 13.2291 23.0208 14.6875 24.4791C16.1458 25.9375 17.9166 26.6666 20 26.6666C22.0833 26.6666 23.8541 25.9375 25.3125 24.4791ZM16.8125 22.3541C15.9375 21.4791 15.5 20.4166 15.5 19.1666C15.5 17.9166 15.9375 16.8541 16.8125 15.9791C17.6875 15.1041 18.75 14.6666 20 14.6666C21.25 14.6666 22.3125 15.1041 23.1875 15.9791C24.0625 16.8541 24.5 17.9166 24.5 19.1666C24.5 20.4166 24.0625 21.4791 23.1875 22.3541C22.3125 23.2291 21.25 23.6666 20 23.6666C18.75 23.6666 17.6875 23.2291 16.8125 22.3541ZM8.91663 28.2708C5.58329 26.0069 3.16663 22.9722 1.66663 19.1666C3.16663 15.3611 5.58329 12.3263 8.91663 10.0625C12.25 7.79857 15.9444 6.66663 20 6.66663C24.0555 6.66663 27.75 7.79857 31.0833 10.0625C34.4166 12.3263 36.8333 15.3611 38.3333 19.1666C36.8333 22.9722 34.4166 26.0069 31.0833 28.2708C27.75 30.5347 24.0555 31.6666 20 31.6666C15.9444 31.6666 12.25 30.5347 8.91663 28.2708Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconAndroid({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M7 10.5V18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 10c.8-2.3 2.9-4 4-4s3.2 1.7 4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9.5 7.5L8 6M14.5 7.5L16 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="0.9" fill="currentColor" />
      <circle cx="14" cy="10" r="0.9" fill="currentColor" />
    </Svg>
  );
}

export function IconApple({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M16 8.2c-1.2.1-2.3.8-3 1.7-.6.8-1.1 2.1-.9 3.4.2 1.4.9 2.8 1.8 3.8.7.8 1.5 1.7 2.6 1.7 1 0 1.4-.6 2.6-.6s1.5.6 2.6.6c1 0 1.7-.9 2.4-1.7.8-1 1.2-2 1.5-2.6-3.2-1.2-3.7-5.8-.6-7.5-.9-1.1-2.2-1.8-3.6-1.8-1.3 0-2.5.7-3.1.7-.7 0-1.7-.7-2.9-.7-1.5 0-3 .9-3.8 2.2-1.6 2.7-.4 6.7 1.2 8.9.7.9 1.6 1.9 2.7 1.9 1 0 1.4-.6 2.6-.6"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
        opacity="0.0"
      />
      <path
        d="M15.3 5.1c.6-.7 1-1.6.9-2.6-.9.1-1.9.6-2.5 1.3-.6.7-1.1 1.7-.9 2.6 1 .1 1.9-.5 2.5-1.3z"
        fill="currentColor"
      />
      <path
        d="M12.5 7.2c-2.5 0-4.5 2.2-4.5 5.1 0 2.8 1.8 5.7 4.4 5.7 1.1 0 1.6-.6 2.8-.6 1.3 0 1.6.6 2.8.6 2.2 0 4.2-2.5 4.2-5.1 0-2.1-1.1-3.6-2.7-4.4-.6-.3-1.2-.4-1.9-.4-1.3 0-2.4.7-2.9.7-.6 0-1.7-.7-2.2-.7z"
        fill="currentColor"
        opacity="0.95"
      />
    </Svg>
  );
}

export function IconX({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21.175 7.84375H23.9354L17.9054 14.7532L25 24.1569H19.4457L15.0923 18.4548L10.1166 24.1569H7.35357L13.8027 16.764L7 7.84504H12.6957L16.6249 13.056L21.175 7.84375ZM20.2043 22.5009H21.7343L11.86 9.41361H10.2194L20.2043 22.5009Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 7C22.76 7 25 9.24 25 12V20C25 22.76 22.76 25 20 25H12C9.24 25 7 22.76 7 20V12C7 9.24 9.24 7 12 7H20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 12C18.21 12 20 13.79 20 16C20 18.21 18.21 20 16 20C13.79 20 12 18.21 12 16C12 13.79 13.79 12 16 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12.5C21.8284 12.5 22.5 11.8284 22.5 11C22.5 10.1716 21.8284 9.5 21 9.5C20.1716 9.5 19.5 10.1716 19.5 11C19.5 11.8284 20.1716 12.5 21 12.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconTwitch({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15.6401 9.93H17.0701V14.21H15.6401M19.5701 9.93H21.0001V14.21H19.5701M11.0001 6L7.43005 9.57V22.43H11.7101V26L15.2901 22.43H18.1401L24.5701 16V6M23.1401 15.29L20.2901 18.14H17.4301L14.9301 20.64V18.14H11.7101V7.43H23.1401V15.29Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconYouTube({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 19L19.19 16L14 13V19ZM25.56 11.17C25.69 11.64 25.78 12.27 25.84 13.07C25.91 13.87 25.94 14.56 25.94 15.16L26 16C26 18.19 25.84 19.8 25.56 20.83C25.31 21.73 24.73 22.31 23.83 22.56C23.36 22.69 22.5 22.78 21.18 22.84C19.88 22.91 18.69 22.94 17.59 22.94L16 23C11.81 23 9.2 22.84 8.17 22.56C7.27 22.31 6.69 21.73 6.44 20.83C6.31 20.36 6.22 19.73 6.16 18.93C6.09 18.13 6.06 17.44 6.06 16.84L6 16C6 13.81 6.16 12.2 6.44 11.17C6.69 10.27 7.27 9.69 8.17 9.44C8.64 9.31 9.5 9.22 10.82 9.16C12.12 9.09 13.31 9.06 14.41 9.06L16 9C20.19 9 22.8 9.16 23.83 9.44C24.73 9.69 25.31 10.27 25.56 11.17Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconGem({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M11.75 2H4.25001L0.85791 6.5227L8.00001 14.7634L15.1421 6.5227L11.75 2ZM13.5 6H10.7772L8.90216 3H11.25L13.5 6ZM5.15106 7L7.02786 12.115L2.59501 7H5.15106ZM6.21606 7H9.78401L7.99951 11.8606L6.21606 7ZM6.40231 6L8.00001 3.44335L9.59786 6H6.40231ZM10.8491 7H13.405L8.97136 12.1157L10.8491 7ZM4.75001 3H7.09786L5.22286 6H2.50001L4.75001 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconAdult({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9.2 15V9.2h-1V8h3.5v1.2h-1V15H9.2z"
        fill="currentColor"
      />
      <path
        d="M13 15v-1.2l1.6-1.7c.5-.6.7-1 .7-1.4 0-.5-.3-.8-.9-.8-.5 0-1 .2-1.5.6l-.7-1c.7-.6 1.5-1 2.4-1 1.4 0 2.4.8 2.4 2.2 0 .8-.4 1.6-1.2 2.4l-1.1 1.1h2.4V15H13z"
        fill="currentColor"
      />
    </Svg>
  );
}

