const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

export let style = {
    "width": '720px',
    "height": "240px",
    "font-family": "IBM Plex Sans, sans-serif",
    "font-size": "0.875rem",
    "font-weight": "400",
    "padding": "8px 10px",
    "border-radius": "12px 12px 0 12px",
    "color": `${grey[900]}`,
    "background": `${grey[300]}`,
    "border": `1px solid ${grey[900]}`,
    "box-shadow": `0px 2px 24px rgba(1, 65, 255, 0.5) `,

    "background-attachment": "local",
    // "background-image": `
    //                      linear-gradient(to right, #24292f 10px, transparent 10px),
    //                      linear-gradient(to left, #24292f 10px, transparent 10px),
    //                      repeating-linear-gradient(#24292f, #24292f 30px, #ccc 30px, #ccc 31px, #24292f 31px)
    //                      `,

    "line-height": "31px",
    "overflow": "auto"
}